/* Magizh ↔ AIC B5 bridge
   Uses the existing AIC B5 member data read-only.
   No AIC data is written or modified.
*/
(function () {
  const API = 'https://magizh-api-fdb2.magizhcafee.workers.dev';

  function normalizeMobile(v) {
    return String(v || '').replace(/\D/g, '');
  }

  function saveMagizhB5User(member, balance) {
    const users = typeof getUsers === 'function' ? getUsers() : {};
    const id = String(member.memberId || '').trim();
    const old = users[id] || {};
    const user = {
      ...old,
      id,
      name: member.name || old.name || '',
      phone: member.mobile || old.phone || '',
      email: member.email || old.email || '',
      memberType: 'B5',
      b5MemberId: id,
      b5Status: member.status || '',
      b5Level: member.level ?? null,
      coins: balance
    };
    users[id] = user;
    localStorage.setItem('magizhUsers', JSON.stringify(users));
    sessionStorage.setItem('magizhCurrentUser', JSON.stringify(user));
    sessionStorage.setItem('magizhCurrentUserId', id);
    localStorage.setItem('magizhCoinWallet', String(balance));
    if (typeof updateAllCoinDisplays === 'function') updateAllCoinDisplays(balance);
    if (typeof syncCustomerHeader === 'function') syncCustomerHeader();
    return user;
  }

  async function b5LoginFromAic(mobile, password) {
    const response = await fetch(API + '/api/b5/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ mobile: normalizeMobile(mobile), password: String(password || '') })
    });
    const data = await response.json().catch(() => ({}));
    if (!response.ok || !data?.success || !data?.member) {
      throw new Error(data?.error || 'B5 login failed');
    }
    return data;
  }

  // Fix for the existing embedded B5 login.
  // The old b5Login() called /api/member/login on the Magizh Worker,
  // which returned a generic response without `member`, causing:
  // "Cannot read properties of undefined (reading 'id')".
  window.b5Login = async function () {
    const mobileEl = document.getElementById('b5LoginMobile');
    const passwordEl = document.getElementById('b5LoginPassword');
    const msg = document.getElementById('b5LoginMsg');
    const gate = document.getElementById('B5_MEMBER_GATE');
    const mobile = mobileEl?.value.trim() || '';
    const password = passwordEl?.value || '';

    if (!/^\d{10}$/.test(mobile)) {
      if (msg) msg.textContent = 'Mobile Number must be exactly 10 digits';
      return;
    }
    if (!password) {
      if (msg) msg.textContent = 'Password is required';
      return;
    }

    const button = document.querySelector('#b5LoginStep .b5-primary');
    if (button) {
      button.disabled = true;
      button.textContent = 'CHECKING…';
    }

    try {
      const data = await b5LoginFromAic(mobile, password);
      const member = data.member;
      const users = typeof getUsers === 'function' ? getUsers() : {};
      const id = member.memberId;
      const old = users[id] || {};
      const existingBalance = Number(old.coins || 0);
      const balance = data.coin?.grantedNow
        ? existingBalance + Number(data.coin.grantedCoins || 0)
        : existingBalance;

      saveMagizhB5User(member, balance);
      localStorage.setItem('BORNTOWIN5_MEMBER_ID', id);

      // Populate the existing B5 member header if that function exists,
      // but do not call the old B5 refresh endpoints from Magizh.
      if (typeof b5Fill === 'function') b5Fill(member);
      if (gate) gate.style.display = 'none';

      alert(data.coin?.grantedNow
        ? 'B5 login successful. 500 Coins have been added to your Magizh wallet.'
        : 'B5 login successful. Your existing Magizh coin balance is unchanged.');
    } catch (error) {
      if (msg) msg.textContent = error.message || 'B5 login failed.';
    } finally {
      if (button) {
        button.disabled = false;
        button.textContent = 'LOGIN';
      }
    }
  };

  // Keep the existing B5 registration bridge working as a separate path.
  async function lookupB5(mobile) {
    const response = await fetch(API + '/api/b5/lookup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ mobile: normalizeMobile(mobile) })
    });
    const data = await response.json().catch(() => ({}));
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
    try {
      const data = await lookupB5(ph);
      const member = data.member;
      const users = typeof getUsers === 'function' ? getUsers() : {};
      const id = member.memberId;
      const old = users[id] || {};
      const existingBalance = Number(old.coins || 0);
      const balance = data.coin.grantedNow
        ? existingBalance + Number(data.coin.grantedCoins || 0)
        : existingBalance;
      saveMagizhB5User(member, balance);
      if (typeof closeRegister === 'function') closeRegister();
      alert(data.coin.grantedNow
        ? 'B5 account verified. 500 Coins have been added to your Magizh wallet.'
        : 'B5 account verified. Your existing Magizh coin balance is unchanged.');
    } catch (error) {
      if (status) status.textContent = error.message || 'B5 verification failed.';
      alert(error.message || 'B5 verification failed.');
    }
  };
})();
