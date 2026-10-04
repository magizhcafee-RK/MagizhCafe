/* Magizh ↔ AIC B5 bridge compatibility layer.
   B5 login is handled by index.html -> /api/b5/login.
   No OTP UI or demo OTP is used. */
(function(){
  window.magizhB5Bridge = {
    loginEndpoint: '/api/b5/login',
    initialCoins: 500
  };
})();
