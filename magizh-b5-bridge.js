/* Magizh ↔ AIC B5 bridge
   Existing AIC B5 data is read-only. OTP is intentionally not used.
   The current page owns the B5 login UI; this file only keeps a small
   compatibility hook for any older page code that still calls b5Login().
*/
(function(){
  const API='https://magizh-api-fdb2.magizhcafee.workers.dev';
  window.b5Login=window.b5Login||async function(){
    if(typeof window.verifyB5RegisterLogin==='function') return window.verifyB5RegisterLogin();
    const mobile=document.getElementById('b5LoginMobile')?.value?.trim()||'';
    const password=document.getElementById('b5LoginPassword')?.value||'';
    if(!/^\d{10}$/.test(mobile)||!password) return;
    const r=await fetch(API+'/api/b5/login',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({mobile,password})});
    const d=await r.json().catch(()=>({}));
    if(!r.ok||!d.success) throw new Error(d.error||'B5 login failed');
    return d;
  };
})();
