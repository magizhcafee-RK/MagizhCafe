/* Magizh ↔ AIC B5 bridge
   AIC is read-only. B5 login is mobile/member ID + password.
   The initial 500-coin grant is protected and stored server-side in D1.
*/
(function(){
  const API='https://magizh-api-fdb2.magizhcafee.workers.dev';
  async function b5Login(login,password){
    const r=await fetch(API+'/api/b5/login',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({mobile:String(login||'').trim(),password:String(password||'')})});
    let d=null; try{d=await r.json()}catch(_){}
    if(!r.ok||!d?.success) throw new Error(d?.error||'B5 login failed');
    return d;
  }
  function applyB5(data){
    const member=data.member||{}, coin=data.coin||{}, users=typeof getUsers==='function'?getUsers():{}, id=String(member.memberId||''), old=users[id]||{};
    const balance=Math.max(0,Number(coin.walletBalance)||0);
    const user={...old,id,name:member.name||old.name||'',phone:member.mobile||old.phone||'',email:member.email||old.email||'',memberType:'B5',b5MemberId:id,b5Status:member.status,b5Level:member.level,place:member.place||old.place||'',coins:balance};
    users[id]=user; localStorage.setItem('magizhUsers',JSON.stringify(users));
    sessionStorage.setItem('magizhCurrentUser',JSON.stringify(user)); sessionStorage.setItem('magizhCurrentUserId',id); localStorage.setItem('magizhCoinWallet',String(balance));
    if(typeof updateAllCoinDisplays==='function')updateAllCoinDisplays(balance); if(typeof syncCustomerHeader==='function')syncCustomerHeader(); if(typeof closeRegister==='function')closeRegister();
    return {balance,first:(!!coin.grantedNow||!!coin.walletCreated)};
  }
  window.b5PasswordLogin=async function(){
    const login=document.getElementById('b5RegMobile')?.value.trim()||'', password=document.getElementById('b5RegPassword')?.value||'', status=document.getElementById('b5RegStatus'), btn=document.getElementById('b5PasswordLoginBtn');
    if(!login){if(status)status.textContent='Please enter your B5 Member ID or registered mobile number.';return}
    if(!password){if(status)status.textContent='Please enter your B5 password.';return}
    if(btn){btn.disabled=true;btn.textContent='CHECKING B5…'}
    try{const data=await b5Login(login,password),result=applyB5(data);if(status)status.textContent='';alert(result.first?'Congratulations! 500 Magizh Coins have been credited to your wallet. Your current balance is '+result.balance+' Coins.':'B5 login successful. Your Magizh Coin Wallet balance is '+result.balance+' Coins.');}
    catch(e){if(status)status.textContent=e.message||'B5 login failed.';}
    finally{if(btn){btn.disabled=false;btn.textContent='LOGIN'}}
  };
})();
