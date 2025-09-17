import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'

const translations = {
  en: {
    signin: "Sign In",
    enterCredentials: "Enter your credentials",
    emailAddress: "Email Address",
    password: "Password",
    forgotPassword: "Forgot Password?",
    loginBtn: "Sign In",
    dontHaveAccount: "Don't have an account?",
    signupLink: "Sign up",
    createAccount: "Create your account",
    createAccountSubtitle: "It only takes a minute",
    firstName: "First Name",
    lastName: "Last Name",
    email: "Email",
    phone: "Phone",
    confirmPassword: "Confirm Password",
    signupBtn: "Sign Up",
    alreadyAccount: "Already have an account?",
    loginLink: "Login",
    resetPassword: "Reset Password",
    enterEmailNewPass: "Enter your email and a new password",
    newPassword: "New Password",
    confirmNewPassword: "Confirm New Password",
    resetBtn: "Reset",
    cancelBtn: "Cancel",
    showPassword: "Show password",
    hidePassword: "Hide password",
    invalidCredentials: "Invalid email or password.",
    passwordMismatch: "Passwords do not match.",
    emailRegistered: "Email already registered.",
    successSignup: "Signup successful!",
    successPasswordChange: "Password updated successfully!",
    emailNotFound: "Email not found.",
    sessionExpired: "Session expired, please try again.",
    languageLabel: "Language"
  },
  ar: {
    signin: "تسجيل الدخول",
    enterCredentials: "أدخل بيانات الدخول الخاصة بك",
    emailAddress: "البريد الإلكتروني",
    password: "كلمة المرور",
    forgotPassword: "نسيت كلمة المرور؟",
    loginBtn: "تسجيل الدخول",
    dontHaveAccount: "ليس لديك حساب؟",
    signupLink: "إنشاء حساب",
    createAccount: "أنشئ حسابك",
    createAccountSubtitle: "لن يستغرق إلا دقيقة واحدة",
    firstName: "الاسم الأول",
    lastName: "اسم العائلة",
    email: "البريد الإلكتروني",
    phone: "رقم الجوال",
    confirmPassword: "تأكيد كلمة المرور",
    signupBtn: "إنشاء حساب",
    alreadyAccount: "هل لديك حساب؟",
    loginLink: "تسجيل الدخول",
    resetPassword: "إعادة تعيين كلمة المرور",
    enterEmailNewPass: "أدخل بريدك الإلكتروني وكلمة المرور الجديدة",
    newPassword: "كلمة المرور الجديدة",
    confirmNewPassword: "تأكيد كلمة المرور الجديدة",
    resetBtn: "إعادة تعيين",
    cancelBtn: "إلغاء",
    showPassword: "إظهار كلمة المرور",
    hidePassword: "إخفاء كلمة المرور",
    invalidCredentials: "البريد الإلكتروني أو كلمة المرور غير صحيحة.",
    passwordMismatch: "كلمات المرور غير متطابقة.",
    emailRegistered: "البريد الإلكتروني مسجل مسبقًا.",
    successSignup: "تم التسجيل بنجاح!",
    successPasswordChange: "تم تحديث كلمة المرور بنجاح!",
    emailNotFound: "البريد الإلكتروني غير موجود.",
    sessionExpired: "انتهت الجلسة، يرجى المحاولة مرة أخرى.",
    languageLabel: "اللغة"
  },
  he: {
    signin: "התחברות",
    enterCredentials: "הזן את פרטי ההתחברות שלך",
    emailAddress: "אימייל",
    password: "סיסמה",
    forgotPassword: "שכחת סיסמה?",
    loginBtn: "התחבר",
    dontHaveAccount: "אין לך חשבון?",
    signupLink: "הרשם",
    createAccount: "צור חשבון",
    createAccountSubtitle: "זה לוקח רק דקה",
    firstName: "שם פרטי",
    lastName: "שם משפחה",
    email: "אימייל",
    phone: "טלפון",
    confirmPassword: "אישור סיסמה",
    signupBtn: "הרשמה",
    alreadyAccount: "כבר יש לך חשבון?",
    loginLink: "התחברות",
    resetPassword: "איפוס סיסמה",
    enterEmailNewPass: "הזן את האימייל והסיסמה החדשה שלך",
    newPassword: "סיסמה חדשה",
    confirmNewPassword: "אישור סיסמה חדשה",
    resetBtn: "איפוס",
    cancelBtn: "ביטול",
    showPassword: "הצג סיסמה",
    hidePassword: "הסתר סיסמה",
    invalidCredentials: "אימייל או סיסמה לא תקינים.",
    passwordMismatch: "הסיסמאות אינן תואמות.",
    emailRegistered: "אימייל כבר רשום.",
    successSignup: "הרשמה בוצעה בהצלחה!",
    successPasswordChange: "הסיסמה עודכנה בהצלחה!",
    emailNotFound: "אימייל לא נמצא.",
    sessionExpired: "ה-session פג, אנא נסה מחדש.",
    languageLabel: "שפה"
  }
};

const LANG_OPTIONS = [
  { value: 'en', label: 'English' },
  { value: 'ar', label: 'العربية' },
  { value: 'he', label: 'עברית' }
];

const EyeSVG = ({ hidden }) =>
  hidden ? (
    <svg height="24" width="24" viewBox="0 0 22 22" fill="none" aria-hidden="true">
      <rect x="2" y="2" width="18" height="18" rx="4"
        fill="#182d3b" stroke="#10a4ff" strokeWidth="2.3" />
      <path d="M7.5 7.5L14.5 14.5" stroke="#10a4ff" strokeWidth="2" />
      <path d="M14.5 7.5L7.5 14.5" stroke="#10a4ff" strokeWidth="2" />
    </svg>
  ) : (
    <svg height="24" width="24" viewBox="0 0 22 22" fill="none" aria-hidden="true">
      <rect x="2" y="2" width="18" height="18" rx="4"
        fill="#182d3b" stroke="#10a4ff" strokeWidth="2.3" />
      <ellipse cx="11" cy="11" rx="5" ry="5" stroke="#10a4ff" strokeWidth="2" />
      <circle cx="11" cy="11" r="1.7" fill="#10a4ff" />
    </svg>
  );

const LangDropdown = ({ language, setLanguage, dir }) => (
  <div
    className="lang-dropdown-fix"
    style={{
      position: 'absolute',
      top: 70,
      [dir === 'rtl' ? 'left' : 'right']: 23,
      zIndex: 2103,
      display: 'flex',
      alignItems: 'center',
      gap: 6,
      flexDirection: dir === 'rtl' ? 'row-reverse' : 'row',
      background: 'rgba(0,0,0,0.3)',
      borderRadius: '6px',
      padding: '2px 9px',
      color: '#fff',
      fontWeight: 600,
      fontSize: 14,
      userSelect: 'none'
    }}>
    <label htmlFor="lang-select" style={{ marginLeft: dir === 'rtl' ? 0 : 3, marginRight: dir === 'rtl' ? 3 : 0 }}>
      {dir === 'rtl' ? 'اللغة' : dir === 'he' ? 'שפה' : 'Language'}:
    </label>
    <select
      id="lang-select"
      value={language}
      onChange={e => setLanguage(e.target.value)}
      aria-label="Select Language"
      style={{
        cursor: 'pointer',
        borderRadius: '3px',
        padding: '2px 7px',
        border: 'none',
        outline: 'none',
        fontWeight: 600,
        fontSize: 14,
        background: 'rgba(255,255,255,0.9)',
        color: '#000',
        direction: 'ltr'
      }}
    >
      {LANG_OPTIONS.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
    </select>
    <style>{`
      @media (max-width: 600px) {
        .lang-dropdown-fix {
          top: 72px !important;
          right: 16px !important;
          left: unset !important;
        }
      }
      @media (max-width: 430px) {
        .lang-dropdown-fix {
          top: 68px !important;
          right: 8px !important;
          left: unset !important;
          font-size: 12px !important;
        }
      }
    `}</style>
  </div>
);

const Login = () => {
  const navigate = useNavigate();

  const [showSignup, setShowSignup] = useState(false);
  const [showForgot, setShowForgot] = useState(false);

  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const [signupData, setSignupData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });

  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotPassword, setForgotPassword] = useState('');
  const [forgotConfirm, setForgotConfirm] = useState('');
  const [forgotStep, setForgotStep] = useState(1);

  const [error, setError] = useState('');
  const [language, setLanguage] = useState('en');
  const dir = ['ar', 'he'].includes(language) ? 'rtl' : 'ltr';

  useEffect(() => {
    document.title = 'Login - ForStackly Business Solutions';
  }, []);

  const handleLogin = e => {
    e.preventDefault();
    if (loginEmail === 'admin@enkonix.in' && loginPassword === 'admin123') {
      localStorage.setItem('firstname', 'admin');
      localStorage.setItem('lastname', 'dashboard');
      localStorage.setItem('email', loginEmail);
      navigate('/admin-dashboard');
      return;
    }
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find(u => u.email === loginEmail && u.password === loginPassword);
    if (user) {
      localStorage.setItem('firstname', user.firstName || '');
      localStorage.setItem('lastname', user.lastName || '');
      localStorage.setItem('email', user.email || '');
      navigate('/home1');
    } else {
      setError(translations[language].invalidCredentials);
    }
  };

  const handleSignup = e => {
    e.preventDefault();
    if (signupData.password !== signupData.confirmPassword) {
      setError(translations[language].passwordMismatch);
      return;
    }
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    if (users.find(u => u.email === signupData.email)) {
      setError(translations[language].emailRegistered);
      return;
    }
    const now = new Date();
    const newUser = {
      ...signupData,
      signupTime: now.toLocaleTimeString(),
      signupDate: now.toISOString().slice(0, 10),
      signupTimestamp: now.toISOString()
    };
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    alert(translations[language].successSignup);
    setShowSignup(false);
    setSignupData({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      password: '',
      confirmPassword: ''
    });
    setError('');
  };

  const handleForgotVerify = e => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const idx = users.findIndex(u => u.email === forgotEmail.trim());
    if (idx === -1) {
      setError(translations[language].emailNotFound);
      setTimeout(() => {
        setError('');
        setShowForgot(false);
        setForgotStep(1);
        setForgotEmail('');
        setForgotPassword('');
        setForgotConfirm('');
        navigate('/');
      }, 1500);
      return;
    }
    setError('');
    setForgotStep(2);
  };

  const handleForgotPassword = e => {
    e.preventDefault();
    if (forgotPassword !== forgotConfirm) {
      setError(translations[language].passwordMismatch);
      return;
    }
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const idx = users.findIndex(u => u.email === forgotEmail.trim());
    if (idx === -1) {
      setError(translations[language].sessionExpired);
      setShowForgot(false);
      setForgotStep(1);
      setForgotEmail('');
      setForgotPassword('');
      setForgotConfirm('');
      return;
    }
    users[idx].password = forgotPassword;
    localStorage.setItem('users', JSON.stringify(users));
    alert(translations[language].successPasswordChange);
    setShowForgot(false);
    setForgotStep(1);
    setForgotEmail('');
    setForgotPassword('');
    setForgotConfirm('');
    navigate('/');
  };

  return (
    <div
      className={`glass-login-bg ${dir === 'rtl' ? 'rtl' : ''}`}
      style={{ direction: dir, position: 'relative' }}
    >
      {/* Logo */}
      <div
        style={{
          position: 'absolute',
          top: 18,
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 2102,
          background: '#fff',
          borderRadius: '18px',
          padding: '4px 24px 4px 24px',
          minWidth: 100,
          boxShadow: '0 4px 16px #21489908',
          display: 'flex',
          alignItems: 'center'
        }}>
        <img
          src="images/logo.png"
          alt="Stackly Logo"
          style={{
            height: 37,
            width: 'auto',
            objectFit: 'contain',
            display: 'block'
          }}
        />
      </div>
      {/* Language Picker */}
      <LangDropdown language={language} setLanguage={setLanguage} dir={dir} />
      <motion.div
        className={`glass-login-card${showSignup && !showForgot ? " signup-active" : ""}`}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}>
        <div className="form-container">
          {error && (
            <motion.div
              className="error-message"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
            >{error}</motion.div>
          )}

          {!showSignup && !showForgot && (
            <>
              <div className="form-header">
                <h2>{translations[language].signin}</h2>
                <p>{translations[language].enterCredentials}</p>
              </div>
              <form onSubmit={handleLogin} className="login-form" dir={dir}>
                <div className="form-group">
                  <label htmlFor="loginEmail">{translations[language].emailAddress}</label>
                  <input
                    id="loginEmail"
                    type="email"
                    className="form-control"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    placeholder={translations[language].emailAddress}
                    required
                    style={{ direction: dir }}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="loginPassword">{translations[language].password}</label>
                  <div style={{ position: 'relative' }}>
                    <input
                      id="loginPassword"
                      type={showPassword ? "text" : "password"}
                      className="form-control"
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      placeholder={translations[language].password}
                      required
                      style={{ direction: dir }}
                    />
                    <button
                      type="button"
                      className="glass-password-toggle"
                      onClick={() => setShowPassword(!showPassword)}
                      aria-label={showPassword ? translations[language].hidePassword : translations[language].showPassword}
                      tabIndex="-1"
                      style={{
                        right: dir === 'rtl' ? 'auto' : 7,
                        left: dir === 'rtl' ? 7 : 'auto'
                      }}
                    >
                      <EyeSVG hidden={showPassword} />
                    </button>
                  </div>
                </div>
                <div className="form-options" style={{ textAlign: dir === 'rtl' ? 'left' : 'right' }}>
                  <button
                    type="button"
                    className="forgot-link"
                    onClick={() => {
                      setError('');
                      setShowForgot(true);
                    }}
                  >
                    {translations[language].forgotPassword}
                  </button>
                </div>
                <motion.button
                  type="submit"
                  className="btn btn-primary btn-block"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {translations[language].loginBtn}
                </motion.button>
              </form>
              <div className="signup-link" style={{ direction: dir, textAlign: dir === 'rtl' ? 'left' : 'right' }}>
                {translations[language].dontHaveAccount}&nbsp;
                <button
                  type="button"
                  className="inline-link"
                  onClick={() => {
                    setError('');
                    setShowSignup(true);
                  }}
                >
                  {translations[language].signupLink}
                </button>
              </div>
            </>
          )}

          {showSignup && !showForgot && (
            <>
              <div className="signup-header">
                <h2 className="signup-header-main">{translations[language].createAccount}</h2>
                <p className="signup-header-sub">{translations[language].createAccountSubtitle}</p>
              </div>
              <form onSubmit={handleSignup} className="login-form signup-form" dir={dir}>
                <div className="form-group">
                  <label htmlFor="firstName">{translations[language].firstName}</label>
                  <input
                    id="firstName"
                    type="text"
                    className="form-control"
                    value={signupData.firstName}
                    onChange={(e) => setSignupData({ ...signupData, firstName: e.target.value })}
                    required
                    style={{ direction: dir }}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="lastName">{translations[language].lastName}</label>
                  <input
                    id="lastName"
                    type="text"
                    className="form-control"
                    value={signupData.lastName}
                    onChange={(e) => setSignupData({ ...signupData, lastName: e.target.value })}
                    required
                    style={{ direction: dir }}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="signupEmail">{translations[language].email}</label>
                  <input
                    id="signupEmail"
                    type="email"
                    className="form-control"
                    value={signupData.email}
                    onChange={(e) => setSignupData({ ...signupData, email: e.target.value })}
                    required
                    style={{ direction: dir }}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="phone">{translations[language].phone}</label>
                  <input
                    id="phone"
                    type="tel"
                    className="form-control"
                    value={signupData.phone}
                    onChange={(e) => setSignupData({ ...signupData, phone: e.target.value })}
                    required
                    style={{ direction: dir }}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="signupPassword">{translations[language].password}</label>
                  <input
                    id="signupPassword"
                    type="password"
                    className="form-control"
                    value={signupData.password}
                    onChange={(e) => setSignupData({ ...signupData, password: e.target.value })}
                    required
                    style={{ direction: dir }}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="confirmPassword">{translations[language].confirmPassword}</label>
                  <input
                    id="confirmPassword"
                    type="password"
                    className="form-control"
                    value={signupData.confirmPassword}
                    onChange={(e) => setSignupData({ ...signupData, confirmPassword: e.target.value })}
                    required
                    style={{ direction: dir }}
                  />
                </div>
                <motion.button
                  type="submit"
                  className="btn btn-primary btn-block"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {translations[language].signupBtn}
                </motion.button>
              </form>
              <div className="signup-link" style={{ direction: dir, textAlign: dir === 'rtl' ? 'left' : 'right' }}>
                {translations[language].alreadyAccount}&nbsp;
                <button
                  type="button"
                  className="inline-link"
                  onClick={() => {
                    setError('');
                    setShowSignup(false);
                  }}
                >
                  {translations[language].loginLink}
                </button>
              </div>
            </>
          )}

          {showForgot && (
            <>
              <div className="form-header">
                <h2>{translations[language].resetPassword}</h2>
                <p>{translations[language].enterEmailNewPass}</p>
              </div>
              <form onSubmit={forgotStep === 1 ? handleForgotVerify : handleForgotPassword} className="login-form" dir={dir}>
                <div className="form-group">
                  <label htmlFor="forgotEmail">{translations[language].email}</label>
                  <input
                    id="forgotEmail"
                    type="email"
                    className="form-control"
                    value={forgotEmail}
                    onChange={(e) => setForgotEmail(e.target.value)}
                    required
                    disabled={forgotStep === 2}
                    style={{ direction: dir }}
                  />
                </div>
                {forgotStep === 1 && (
                  <motion.button
                    type="submit"
                    className="btn btn-primary btn-block"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Verify
                  </motion.button>
                )}
                {forgotStep === 2 && (
                  <>
                    <div className="form-group">
                      <label htmlFor="forgotPassword">{translations[language].newPassword}</label>
                      <input
                        id="forgotPassword"
                        type="password"
                        className="form-control"
                        value={forgotPassword}
                        onChange={(e) => setForgotPassword(e.target.value)}
                        required
                        style={{ direction: dir }}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="forgotConfirm">{translations[language].confirmNewPassword}</label>
                      <input
                        id="forgotConfirm"
                        type="password"
                        className="form-control"
                        value={forgotConfirm}
                        onChange={(e) => setForgotConfirm(e.target.value)}
                        required
                        style={{ direction: dir }}
                      />
                    </div>
                    <motion.button
                      type="submit"
                      className="btn btn-primary btn-block"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {translations[language].resetBtn}
                    </motion.button>
                  </>
                )}
                <button
                  type="button"
                  className="btn btn-cancel btn-block"
                  onClick={() => {
                    setError('')
                    setShowForgot(false);
                    setForgotStep(1);
                    setForgotEmail('');
                    setForgotPassword('');
                    setForgotConfirm('');
                  }}
                >
                  {translations[language].cancelBtn}
                </button>
              </form>
            </>
          )}
        </div>
        <style>{`
        .glass-login-bg {
          min-height: 100vh;
          background: radial-gradient(circle at 60% 15%, #1849b9 0%, #223953 50%, #0f121b 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          overflow: hidden;
        }
        .glass-login-card {
          background: rgba(28, 39, 60, 0.75);
          border-radius: 28px;
          box-shadow: 0 0 56px 12px #2798ee44, 0 0 24px #11d0fa30;
          padding: 30px 15px 18px 15px;
          max-width: 400px;
          min-width: 300px;
          width: 100%;
          margin: auto;
          backdrop-filter: blur(18px) saturate(145%);
          border: 2.1px solid #14cdff49;
        }
        .glass-login-card.signup-active {
          padding: 18px 10px 10px 10px;
          max-width: 510px;
        }
        .signup-header-main {
          font-size: 2.3rem;
          font-weight: 900;
          color: #eaf8ff;
          text-align: center;
          letter-spacing: 0.5px;
          margin-top: 0;
          font-family: 'Montserrat', 'Segoe UI', Arial, sans-serif;
          margin-bottom: 2px;
        }
        .signup-header-sub {
          color: #aad9ff;
          font-size: 1.14rem;
          font-weight: 400;
          text-align: center;
          margin-bottom: 16px;
          margin-top: 0;
          letter-spacing: 0.04em;
        }
        .signup-form .form-group { margin-bottom: 7px; }
        .signup-form { padding-bottom: 4px; }
        @media (max-width: 530px) {
          .signup-header-main { font-size: 1.38rem; }
          .signup-header-sub { font-size: 0.89rem; }
        }
        .form-header h2 { color: #eaf8ff; text-align: center; font-size: 2.2rem; font-weight: 800; margin-bottom: 8px;}
        .form-header p { color: #77d7fc; text-align: center; margin-bottom: 16px; font-size: 1.08rem;}
        .form-group { margin-bottom: 10px;}
        .form-group label { color: #b2e7ff; font-size: 0.96rem; margin-bottom: 5px; font-weight: 500;}
        .form-control {
          width: 100%;
          padding: 6.2px 11px;
          font-size: 0.97rem;
          border-radius: 8px;
          background: rgba(33, 70, 120, 0.14);
          color: #e6f4ff;
          border: 1.07px solid #0abaff35;
          box-sizing: border-box;
        }
        .form-control:focus {
          border-color: #18d8fd;
          background: rgba(75, 205, 255, 0.09);
        }
        .glass-login-field { margin-bottom: 12px; }
        .glass-password-toggle {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          background: none;
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 32px;
          height: 32px;
          border-radius: 7px;
          box-shadow: 0 0 6px #12b3ff38, 0 1.5px 7px #20e8ff25;
          transition: box-shadow 0.2s, border-color 0.18s;
        }
        .glass-password-toggle:focus { outline: 2px solid #12b3ff; }
        .glass-password-toggle svg { display: block; }
        .btn, .btn-primary, .btn-block {
          width: 100%;
          font-family: inherit;
          font-size: 0.98rem;
          font-weight: 700;
          border: none;
          outline: none;
          cursor: pointer;
          border-radius: 10px;
          padding: 8.5px 0 7px 0;
          background: linear-gradient(98deg, #26acff 5%, #3745f3 100%);
          color: #f6feff;
          box-shadow: 0 1px 7px #18c8ff33, 0 0 3px #2b5cff35;
          letter-spacing: 1.1px;
          margin-top: 10px;
          transition: background 0.13s, box-shadow 0.11s, filter 0.13s;
          position: relative;
          z-index: 1;
        }
        .btn + .btn, .btn-block + .btn-block, .btn-primary + .btn-primary {
          margin-top: 7px;
        }
        .btn:hover, .btn-primary:hover, .btn-block:hover {
          background: linear-gradient(92deg, #35c5ff 0%, #2940e6 100%);
          filter: brightness(1.055);
          box-shadow: 0 5px 18px #17e3ff40, 0 0 12px #2b5cff77;
        }
        .btn:active, .btn-primary:active, .btn-block:active {
          filter: brightness(0.98);
          box-shadow: 0 2px 8px #008cff45;
        }
        .signup-link, .form-header p { color: #b2e7ff; }
        .inline-link, .forgot-link {
          background: none; border: none; color: #1ee1ff; text-decoration: underline; font-weight: 700; cursor: pointer; transition: color 0.16s;
        }
        .inline-link:hover, .forgot-link:hover { color: #eafdff; }
        .error-message {
          background: rgba(36, 0, 38, 0.65);
          color: #fe4a7a;
          border: 1px solid #fe4a7a55;
          border-radius: 10px;
          padding: 9px 14px;
          margin-bottom: 8px;
          text-align: center;
        }
        @media (max-width: 530px) {
          .glass-login-card { padding: 11px 2.5vw 9px 2.5vw; min-width: 0; border-radius: 14px; }
          .form-header h2 { font-size: 1.23rem;}
          .form-header p { font-size: .93rem; }
        }
        @media (max-width: 600px) {
          .glass-login-bg {
            align-items: flex-start !important;
          }
        }
      `}</style>
      </motion.div>
    </div>
  );
};

export default Login;
