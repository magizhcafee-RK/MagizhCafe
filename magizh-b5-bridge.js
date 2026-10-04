/* Magizh ↔ AIC B5 bridge compatibility shim.
   B5 authentication and the one-time 500-coin grant are handled securely by
   the Magizh Worker at /api/b5/login. No AIC secret is stored in the browser.
*/
(function(){
  window.magizhB5BridgeReady=true;
})();
