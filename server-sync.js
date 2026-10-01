(function(){

  // ==========================================
  // MAGIZH CAFE - CLOUDFLARE SERVER SYNC
  // ==========================================

  const API_BASE =
    'https://magizh-api-fdb2.magizhcafee.workers.dev';

  const DEFAULT_KEYS = [
    'magizhUsers',
    'magizhOrders',
    'magizhProducts',
    'magizhCategories',
    'magizhSettings',
    'magizhB5',
    'magizhCoinWallet'
  ];

  const SYNC_KEYS = Array.isArray(window.MAGIZH_SYNC_KEYS)
    ? window.MAGIZH_SYNC_KEYS
    : DEFAULT_KEYS;

  const KEY_SET = new Set(SYNC_KEYS);

  const nativeSet =
    localStorage.setItem.bind(localStorage);

  const nativeRemove =
    localStorage.removeItem.bind(localStorage);

  let syncing = false;
  let flushRunning = false;

  const pending = new Map();


  function shouldSync(key){
    return KEY_SET.has(String(key || ''));
  }


  function apiUrl(path){
    return API_BASE + path;
  }


  function scheduleFlush(){

    if(flushRunning || !pending.size){
      return;
    }

    flushPending();
  }


  async function putOne(key, value){

    try{

      const r = await fetch(
        apiUrl('/api/state'),
        {
          method: 'PUT',

          headers: {
            'Content-Type': 'application/json'
          },

          body: JSON.stringify({
            key: key,
            value: value
          })
        }
      );

      if(!r.ok){
        throw new Error(
          'HTTP ' + r.status
        );
      }

      return true;

    }catch(e){

      console.error(
        'Magizh Cloudflare PUT error:',
        e
      );

      return false;
    }
  }


  async function flushPending(){

    if(flushRunning){
      return;
    }

    flushRunning = true;

    try{

      while(pending.size){

        const [
          key,
          value
        ] =
          pending.entries()
            .next()
            .value;

        const ok =
          await putOne(
            key,
            value
          );

        if(!ok){
          break;
        }

        if(
          pending.get(key) === value
        ){

          pending.delete(key);
        }
      }

    }finally{

      flushRunning = false;
    }
  }


  async function push(
    key,
    value
  ){

    if(!shouldSync(key)){
      return false;
    }

    pending.set(
      String(key),
      value
    );

    scheduleFlush();

    return true;
  }


  async function pull(){

    try{

      const params =
        new URLSearchParams();

      if(SYNC_KEYS.length){

        params.set(
          'keys',
          SYNC_KEYS.join(',')
        );
      }

      const r =
        await fetch(
          apiUrl(
            '/api/state?' +
            params.toString()
          ),
          {
            cache: 'no-store'
          }
        );

      if(!r.ok){
        return false;
      }

      const j =
        await r.json();

      if(!j.state){
        return false;
      }

      syncing = true;

      Object.entries(
        j.state
      ).forEach(
        ([k,v]) => {

          // Don't overwrite a local value
          // which is waiting to be uploaded.
          if(pending.has(k)){
            return;
          }

          if(
            v === null ||
            typeof v === 'undefined'
          ){

            nativeRemove(k);

          }else{

            nativeSet(
              k,
              typeof v === 'string'
                ? v
                : JSON.stringify(v)
            );
          }
        }
      );

      syncing = false;

      window.dispatchEvent(
        new Event(
          'magizhServerSync'
        )
      );

      return true;

    }catch(e){

      syncing = false;

      console.error(
        'Magizh Cloudflare GET error:',
        e
      );

      return false;
    }
  }


  // ==========================================
  // INTERCEPT localStorage.setItem
  // ==========================================

  localStorage.setItem =
    function(key,value){

      nativeSet(
        key,
        value
      );

      if(
        !syncing &&
        shouldSync(key)
      ){

        push(
          key,
          String(value)
        );
      }
    };


  // ==========================================
  // INTERCEPT localStorage.removeItem
  // ==========================================

  localStorage.removeItem =
    function(key){

      nativeRemove(key);

      if(
        !syncing &&
        shouldSync(key)
      ){

        push(
          key,
          null
        );
      }
    };


  // ==========================================
  // PUBLIC SYNC API
  // ==========================================

  window.magizhServerSync = {

    pull: pull,

    push: push,

    flush: flushPending

  };


  // ==========================================
  // INITIAL SYNC
  // ==========================================

  pull();


  // ==========================================
  // PERIODIC UPLOAD
  // ==========================================

  setInterval(
    flushPending,
    2000
  );


  // ==========================================
  // PERIODIC DOWNLOAD
  // ==========================================

  setInterval(
    pull,
    20000
  );

})();