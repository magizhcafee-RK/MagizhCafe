/* Magizh ↔ AIC B5 bridge
   Loads after index.html's existing scripts.
   Keeps the existing B5 screen/OTP UI; only replaces the demo B5 lookup step.
*/
(function () {
  const API = 'https://magizh-api-fdb2.magizhcafee.workers.dev';

  async function lookupB5(mobile) {
    const response = await fetch(API + '/api/b5/lookup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ mobile: String(mobile || '').replace(/\D/g, '') })
    });
    let data = null;
    try { data = await response.json(); } catch (_) {}
    if (!response.ok || !data?.success || !data?.found) {
      throw new Error(data?.error || 'B5 member not found');
    }
    return data;
  }

  window.sendB5RegisterOtp = function () {
    const ph = document.getElementById('b5RegMobile')?.value.trim() || '';
    if (!/^\d{10}$/.test(ph)) {
      alert('Please enter a valid 10-digit mobile number.');
      return;
    }
    // Keep the existing demo OTP UI for now. The AIC lookup is performed only
    // after OTP verification, so this change does not alter the existing UI.
    window.__magizhB5DemoOtp = String(Math.floor(100000 + Math.random() * 900000));
    const otp = document.getElementById('b5RegOtp');
    const verify = document.getElementById('b5VerifyBtn');
    const send = document.getElementById('b5SendOtpBtn');
    const status = document.getElementById('b5RegStatus');
    if (otp) otp.style.display = 'block';
    if (verify) verify.style.display = 'block';
    if (send) send.textContent = 'Resend OTP';
    if (status) status.textContent = 'Demo OTP: ' + window.__magizhB5DemoOtp;
  };

  window.verifyB5RegisterOtp = async function () {
    const ph = document.getElementById('b5RegMobile')?.value.trim() || '';
    const otp = document.getElementById('b5RegOtp')?.value.trim() || '';
    const status = document.getElementById('b5RegStatus');
    if (otp !== window.__magizhB5DemoOtp) {
      alert('Invalid OTP.');
      return;
    }

    const verify = document.getElementById('b5VerifyBtn');
    if (verify) {
      verify.disabled = true;
      verify.textContent = 'Checking B5…';
    }
    try {
      const data = await lookupB5(ph);
      const member = data.member;
      const users = typeof getUsers === 'function' ? getUsers() : {};
      const id = member.memberId;
      const old = users[id] || {};
      const existingBalance = Number(old.coins ?? (typeof getWallet === 'function' ? getWallet() : 0)) || 0;
      const balance = data.coin.grantedNow ? existingBalance + Number(data.coin.grantedCoins || 0) : existingBalance;

      users[id] = {
        ...old,
        id,
        name: member.name || old.name || '',
        phone: member.mobile || ph,
        email: member.email || old.email || '',
        memberType: 'B5',
        b5MemberId: member.memberId,
        b5Status: member.status,
        b5Level: member.level,
        coins: balance
      };

      localStorage.setItem('magizhUsers', JSON.stringify(users));
      sessionStorage.setItem('magizhCurrentUser', JSON.stringify(users[id]));
      sessionStorage.setItem('magizhCurrentUserId', id);
      localStorage.setItem('magizhCoinWallet', String(balance));

      if (typeof updateAllCoinDisplays === 'function') updateAllCoinDisplays(balance);
      if (typeof syncCustomerHeader === 'function') syncCustomerHeader();
      if (typeof closeRegister === 'function') closeRegister();

      alert(data.coin.grantedNow
        ? 'B5 account verified. 500 Coins have been added to your Magizh wallet.'
        : 'B5 account verified. Your existing Magizh coin balance is unchanged.');
    } catch (error) {
      if (status) status.textContent = error.message || 'B5 verification failed.';
      alert(error.message || 'B5 verification failed.');
    } finally {
      if (verify) {
        verify.disabled = false;
        verify.textContent = 'Verify & Continue';
      }
    }
  };

  // If a B5 user is already logged in, re-check the AIC membership on open.
  // The server grants the initial 500 only once, so this is safe on refresh.
  async function refreshExistingB5Grant() {
    try {
      const user = typeof getLoggedUser === 'function' ? getLoggedUser() : null;
      if (!user || user.memberType !== 'B5') return;
      const mobile = user.phone || '';
      if (!/^\d{10}$/.test(String(mobile).replace(/\D/g, ''))) return;
      const data = await lookupB5(mobile);
      if (!data.coin.grantedNow) return;
      const users = typeof getUsers === 'function' ? getUsers() : {};
      const id = data.member.memberId;
      const current = users[id] || user;
      const balance = (Number(current.coins) || 0) + Number(data.coin.grantedCoins || 0);
      users[id] = { ...current, id, memberType: 'B5', b5MemberId: id, coins: balance };
      localStorage.setItem('magizhUsers', JSON.stringify(users));
      sessionStorage.setItem('magizhCurrentUser', JSON.stringify(users[id]));
      sessionStorage.setItem('magizhCurrentUserId', id);
      localStorage.setItem('magizhCoinWallet', String(balance));
      if (typeof updateAllCoinDisplays === 'function') updateAllCoinDisplays(balance);
      if (typeof syncCustomerHeader === 'function') syncCustomerHeader();
    } catch (_) {
      // Do not block the Magizh home page if AIC is temporarily unavailable.
    }
  }

  window.addEventListener('DOMContentLoaded', refreshExistingB5Grant, { once: true });
})();
