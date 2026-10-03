/* Magizh ↔ AIC B5 bridge
   Final version: B5 uses Member ID/mobile + password only. No OTP UI.
   The actual password check and one-time 500-coin grant happen server-side.
*/
(function(){
  const API = '/api/b5';
  window.magizhB5Lookup = async function(login, password){
    const response = await fetch(API + '/login', {
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify({login:String(login||'').trim(),password:String(password||'')})
    });
    let data=null; try{data=await response.json()}catch(_){ }
    if(!response.ok || !data?.success) throw new Error(data?.error || 'B5 login failed.');
    return data;
  };
})();
