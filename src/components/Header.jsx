import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLanguage } from '../context.jsx/LanguageContext';

// Use public folder path for logo
const logo = 'images/logo.png';

const Header = () => {
  const navigate = useNavigate();
  const { language, setLanguage } = useLanguage();
  
  // Debug log
  console.log('Header - Current language:', language);

  // States
  const [isAvatarDropdownOpen, setIsAvatarDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isHomeDropdownOpen, setIsHomeDropdownOpen] = useState(false);
  const [isServicesDropdownOpen, setIsServicesDropdownOpen] = useState(false);
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);
  const [theme, setTheme] = useState('light');
  const [initials, setInitials] = useState('?');

  const homeDropdownTimeout = useRef();
  const servicesDropdownTimeout = useRef();
  const desktopLanguageDropdownRef = useRef(null);
  const mobileLanguageDropdownRef = useRef(null);

  // Translations
  const translations = {
    en: {
      home: 'Home',
      home1: 'Home 1',
      home2: 'Home 2',
      about: 'About',
      services: 'Services',
      allServices: 'All Services',
      blog: 'Blog',
      contact: 'Contact',
      logout: 'Logout',
      service1: 'Digital Transformation Consulting',
      service2: 'Enterprise IT Modernization',
      service3: 'Cybersecurity & Risk Management',
      service4: 'Data-Driven Business Intelligence',
      service5: 'Customer Experience Solutions',
      service6: 'Managed IT & Support Services',
    },
    ar: {
      home: 'الرئيسية',
      home1: 'الصفحة الرئيسية 1',
      home2: 'الصفحة الرئيسية 2',
      about: 'معلومات عنا',
      services: 'الخدمات',
      allServices: 'كل الخدمات',
      blog: 'المدونة',
      contact: 'اتصل',
      logout: 'تسجيل الخروج',
      service1: 'استشارات التحول الرقمي',
      service2: 'تحديث تقنية المعلومات المؤسسية',
      service3: 'الأمن السيبراني وإدارة المخاطر',
      service4: 'ذكاء الأعمال القائم على البيانات',
      service5: 'حلول تجربة العملاء',
      service6: 'خدمات تقنية المعلومات المدارة والدعم',
    },
    he: {
      home: 'בית',
      home1: 'דף הבית 1',
      home2: 'דף הבית 2',
      about: 'אודות',
      services: 'שירותים',
      allServices: 'כל השירותים',
      blog: 'בלוג',
      contact: 'צור קשר',
      logout: 'התנתק',
      service1: 'ייעוץ טרנספורמציה דיגיטלית',
      service2: 'מודרניזציה של IT ארגוני',
      service3: 'אבטחת סייבר וניהול סיכונים',
      service4: 'בינה עסקית מבוססת נתונים',
      service5: 'פתרונות חוויית לקוחות',
      service6: 'שירותי IT מנוהלים ותמיכה',
    },
  };
  const t = translations[language];

  // Load Theme on mount
  useEffect(() => {
    const storedTheme = localStorage.getItem('theme') || 'light';
    setTheme(storedTheme);
  }, []);

  // Update theme in DOM
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    window.dispatchEvent(new Event('theme-changed'));
  }, [theme]);

  // Update initials from localStorage
  useEffect(() => {
    const updateInitials = () => {
      const firstname = (localStorage.getItem('firstname') || '').trim();
      const lastname = (localStorage.getItem('lastname') || '').trim();
      let newInitials = '';
      if (firstname.length > 0) newInitials += firstname[0].toUpperCase();
      if (lastname.length > 0) newInitials += lastname[0].toUpperCase();
      if (!newInitials) newInitials = '?';
      setInitials(newInitials);
    };
    updateInitials();
    window.addEventListener('storage', updateInitials);
    window.addEventListener('theme-changed', updateInitials);
    return () => {
      window.removeEventListener('storage', updateInitials);
      window.removeEventListener('theme-changed', updateInitials);
    };
  }, []);

  // Close language dropdown on outside click or ESC
  useEffect(() => {
    const handleClickOutside = (event) => {
      const clickedInsideDesktop = desktopLanguageDropdownRef.current && desktopLanguageDropdownRef.current.contains(event.target);
      const clickedInsideMobile = mobileLanguageDropdownRef.current && mobileLanguageDropdownRef.current.contains(event.target);
      if (!clickedInsideDesktop && !clickedInsideMobile) setIsLanguageDropdownOpen(false);
    };
    const handleEsc = (event) => {
      if (event.key === 'Escape') setIsLanguageDropdownOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEsc);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEsc);
    };
  }, []);

  // Language change handler
  const handleLanguageChange = (lang) => {
    // Validate language before setting
    const validLanguages = ['en', 'ar', 'he'];
    if (validLanguages.includes(lang)) {
      setLanguage(lang);
      localStorage.setItem('language', lang);
    }
  };

  // Toggles
  const toggleTheme = () => setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const toggleHomeDropdown = () => setIsHomeDropdownOpen(!isHomeDropdownOpen);
  const toggleServicesDropdown = () => setIsServicesDropdownOpen(!isServicesDropdownOpen);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full bg-[var(--card-bg)] border-b border-[var(--border-color)] transition-colors duration-300">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex pl-4 sm:pl-6 lg:pl-14 items-center">
            <button onClick={() => navigate('/home1')} className="focus:outline-none">
              <img src={logo} alt="STACKLY" className="h-6 sm:h-8 w-auto" />
            </button>
          </div>

          {/* Desktop Nav */}
          <div className="hidden min-[480px]:flex items-center space-x-8">
            {/* Home Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => {
                if (homeDropdownTimeout.current) clearTimeout(homeDropdownTimeout.current);
                setIsHomeDropdownOpen(true);
              }}
              onMouseLeave={() => {
                homeDropdownTimeout.current = setTimeout(() => setIsHomeDropdownOpen(false), 200);
              }}
            >
              <button
                onClick={() => navigate('/home1')}
                className="flex items-center text-[var(--text-color)] hover:text-[var(--hover-color)]"
              >
                {t.home}
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {isHomeDropdownOpen && (
                <div className="absolute top-full left-0 mt-2 w-48 rounded-md shadow-lg border py-2 bg-[var(--sidebar-bg)] border-[var(--border-color)]">
                  <Link to="/home1" className="block px-4 py-2 hover:bg-[var(--hover-bg)]" onClick={() => setIsHomeDropdownOpen(false)}>
                    {t.home1}
                  </Link>
                  <Link to="/home2" className="block px-4 py-2 hover:bg-[var(--hover-bg)]" onClick={() => setIsHomeDropdownOpen(false)}>
                    {t.home2}
                  </Link>
                </div>
              )}
            </div>

            <Link to="/about" className="hover:text-[var(--hover-color)]">
              {t.about}
            </Link>

            {/* Services Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => {
                if (servicesDropdownTimeout.current) clearTimeout(servicesDropdownTimeout.current);
                setIsServicesDropdownOpen(true);
              }}
              onMouseLeave={() => {
                servicesDropdownTimeout.current = setTimeout(() => setIsServicesDropdownOpen(false), 200);
              }}
            >
              <button onClick={() => navigate('/services')} className="flex items-center hover:text-[var(--hover-color)]">
                {t.services}
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {isServicesDropdownOpen && (
                <div className="absolute top-full left-0 mt-2 w-48 rounded-md shadow-lg border py-2 bg-[var(--sidebar-bg)] border-[var(--border-color)]">
                  <Link to="/services" className="block px-4 py-2 hover:bg-[var(--hover-bg)]" onClick={() => setIsServicesDropdownOpen(false)}>
                    {t.allServices}
                  </Link>
                  <Link to="/service1" className="block px-4 py-2 hover:bg-[var(--hover-bg)]" onClick={() => setIsServicesDropdownOpen(false)}>
                    {t.service1}
                  </Link>
                  <Link to="/service2" className="block px-4 py-2 hover:bg-[var(--hover-bg)]" onClick={() => setIsServicesDropdownOpen(false)}>
                    {t.service2}
                  </Link>
                  <Link to="/service3" className="block px-4 py-2 hover:bg-[var(--hover-bg)]" onClick={() => setIsServicesDropdownOpen(false)}>
                    {t.service3}
                  </Link>
                  <Link to="/service4" className="block px-4 py-2 hover:bg-[var(--hover-bg)]" onClick={() => setIsServicesDropdownOpen(false)}>
                    {t.service4}
                  </Link>
                  <Link to="/service5" className="block px-4 py-2 hover:bg-[var(--hover-bg)]" onClick={() => setIsServicesDropdownOpen(false)}>
                    {t.service5}
                  </Link>
                  <Link to="/service6" className="block px-4 py-2 hover:bg-[var(--hover-bg)]" onClick={() => setIsServicesDropdownOpen(false)}>
                    {t.service6}
                  </Link>
                </div>
              )}
            </div>

            <Link to="/blog" className="hover:text-[var(--hover-color)]">
              {t.blog}
            </Link>

            <Link to="/contact" className="hover:text-[var(--hover-color)]">
              {t.contact}
            </Link>

            {/* Language Selector - custom dropdown */}
            <div className="relative" ref={desktopLanguageDropdownRef}>
              <button
                onClick={() => setIsLanguageDropdownOpen((prev) => !prev)}
                className="w-10 h-10 rounded-full border border-[var(--border-color)] flex items-center justify-center hover:bg-[var(--hover-bg)] transition-colors duration-200"
                aria-label="Select Language"
              >
                <svg className="w-5 h-5 text-[var(--text-color)]" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M12 3a9 9 0 100 18 9 9 0 000-18zm0 0s3 3.5 3 9-3 9-3 9m0-18s-3 3.5-3 9 3 9 3 9M3 12h18"/>
                </svg>
              </button>
              {isLanguageDropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 rounded-lg shadow-lg border bg-[var(--sidebar-bg)] border-[var(--border-color)] py-2 z-50">
                  <button onClick={() => { handleLanguageChange('en'); setIsLanguageDropdownOpen(false); }} className={`w-full flex items-center gap-3 px-4 py-2 hover:bg-[var(--hover-bg)] ${language === 'en' ? 'bg-[var(--hover-bg)]' : ''}`}>
                    <span className="w-8 text-left font-semibold">US</span>
                    <span className="flex-1 text-left">English</span>
                    {language === 'en' && (<span className="text-[var(--primary-color)]">✓</span>)}
                  </button>
                  <button onClick={() => { handleLanguageChange('ar'); setIsLanguageDropdownOpen(false); }} className={`w-full flex items-center gap-3 px-4 py-2 hover:bg-[var(--hover-bg)] ${language === 'ar' ? 'bg-[var(--hover-bg)]' : ''}`}>
                    <span className="w-8 text-left font-semibold">SA</span>
                    <span className="flex-1 text-left">العربية</span>
                    {language === 'ar' && (<span className="text-[var(--primary-color)]">✓</span>)}
                  </button>
                  <button onClick={() => { handleLanguageChange('he'); setIsLanguageDropdownOpen(false); }} className={`w-full flex items-center gap-3 px-4 py-2 hover:bg-[var(--hover-bg)] ${language === 'he' ? 'bg-[var(--hover-bg)]' : ''}`}>
                    <span className="w-8 text-left font-semibold">IL</span>
                    <span className="flex-1 text-left">עברית</span>
                    {language === 'he' && (<span className="text-[var(--primary-color)]">✓</span>)}
                  </button>
                </div>
              )}
            </div>

            {/* Avatar */}
            <div className="relative">
              <button
                className="w-10 h-10 rounded-full bg-[var(--primary-color)] text-white"
                onClick={() => setIsAvatarDropdownOpen(!isAvatarDropdownOpen)}
              >
                {initials}
              </button>
              {isAvatarDropdownOpen && (
                <div className="absolute right-0 mt-2 w-32 rounded-md shadow-lg border py-2 bg-[var(--sidebar-bg)] border-[var(--border-color)]">
                  <button
                    className="block w-full text-left px-4 py-2 hover:bg-[var(--hover-bg)]"
                    onClick={() => {
                      setIsAvatarDropdownOpen(false);
                      navigate("/login");
                    }}
                  >
                    {t.logout}
                  </button>
                </div>
              )}
            </div>

            {/* Theme Toggle */}
            <button
              className="w-10 h-10 rounded-full border border-[var(--border-color)] flex items-center justify-center hover:bg-[var(--hover-bg)] transition-colors duration-200"
              onClick={toggleTheme}
              aria-label="Toggle Theme"
            >
              {theme === "light" ? (
                <svg
                  className="w-5 h-5 text-yellow-500"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.166a.75.75 0 00-1.06-1.06l-1.591 1.59a.75.75 0 101.06 1.061l1.591-1.59zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM17.834 18.894a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 10-1.061 1.06l1.59 1.591zM12 18a.75.75 0 01.75.75V21a.75.75 0 01-1.5 0v-2.25A.75.75 0 0112 18zM7.758 17.303a.75.75 0 00-1.061-1.06l-1.591 1.59a.75.75 0 001.06 1.061l1.591-1.59zM6 12a.75.75 0 01-.75.75H3a.75.75 0 010-1.5h2.25A.75.75 0 016 12zM6.697 7.757a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 00-1.061 1.06l1.59 1.591z" />
                </svg>
              ) : (
                <svg
                  className="w-5 h-5 text-blue-400"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path fillRule="evenodd" d="M9.528 1.718a.75.75 0 01.162.819A8.97 8.97 0 009 6a9 9 0 009 9 8.97 8.97 0 003.463-.69.75.75 0 01.981.98 10.503 10.503 0 01-9.694 6.46c-5.799 0-10.5-4.701-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 01.818.162z" clipRule="evenodd" />
                </svg>
              )}
            </button>
          </div>

          {/* Mobile and Tablet Responsive Icons */}
          <div className="flex items-center gap-2 min-[480px]:hidden">
            {/* Language Selector - mobile */}
            <div className="relative" ref={mobileLanguageDropdownRef}>
              <button
                onClick={() => setIsLanguageDropdownOpen((prev) => !prev)}
                className="w-10 h-10 rounded-full border border-[var(--border-color)] flex items-center justify-center hover:bg-[var(--hover-bg)]"
                aria-label="Select Language"
              >
                <svg className="w-5 h-5 text-[var(--text-color)]" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M12 3a9 9 0 100 18 9 9 0 000-18zm0 0s3 3.5 3 9-3 9-3 9m0-18s-3 3.5-3 9 3 9 3 9M3 12h18"/>
                </svg>
              </button>
              {isLanguageDropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 rounded-lg shadow-lg border bg-[var(--sidebar-bg)] border-[var(--border-color)] py-2 z-50">
                  <button onClick={() => { handleLanguageChange('en'); setIsLanguageDropdownOpen(false); }} className={`w-full flex items-center gap-3 px-4 py-2 hover:bg-[var(--hover-bg)] ${language === 'en' ? 'bg-[var(--hover-bg)]' : ''}`}>
                    <span className="w-8 text-left font-semibold">US</span>
                    <span className="flex-1 text-left">English</span>
                    {language === 'en' && (<span className="text-[var(--primary-color)]">✓</span>)}
                  </button>
                  <button onClick={() => { handleLanguageChange('ar'); setIsLanguageDropdownOpen(false); }} className={`w-full flex items-center gap-3 px-4 py-2 hover:bg-[var(--hover-bg)] ${language === 'ar' ? 'bg-[var(--hover-bg)]' : ''}`}>
                    <span className="w-8 text-left font-semibold">SA</span>
                    <span className="flex-1 text-left">العربية</span>
                    {language === 'ar' && (<span className="text-[var(--primary-color)]">✓</span>)}
                  </button>
                  <button onClick={() => { handleLanguageChange('he'); setIsLanguageDropdownOpen(false); }} className={`w-full flex items-center gap-3 px-4 py-2 hover:bg-[var(--hover-bg)] ${language === 'he' ? 'bg-[var(--hover-bg)]' : ''}`}>
                    <span className="w-8 text-left font-semibold">IL</span>
                    <span className="flex-1 text-left">עברית</span>
                    {language === 'he' && (<span className="text-[var(--primary-color)]">✓</span>)}
                  </button>
                </div>
              )}
            </div>

            {/* Theme Toggle */}
            <button
              className="w-10 h-10 rounded-full border border-[var(--border-color)] flex items-center justify-center hover:bg-[var(--hover-bg)] transition-colors duration-200"
              onClick={toggleTheme}
              aria-label="Toggle Theme"
            >
              {theme === "light" ? (
                <svg
                  className="w-5 h-5 text-yellow-500"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.166a.75.75 0 00-1.06-1.06l-1.591 1.59a.75.75 0 101.06 1.061l1.591-1.59zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM17.834 18.894a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 10-1.061 1.06l1.59 1.591zM12 18a.75.75 0 01.75.75V21a.75.75 0 01-1.5 0v-2.25A.75.75 0 0112 18zM7.758 17.303a.75.75 0 00-1.061-1.06l-1.591 1.59a.75.75 0 001.06 1.061l1.591-1.59zM6 12a.75.75 0 01-.75.75H3a.75.75 0 010-1.5h2.25A.75.75 0 016 12zM6.697 7.757a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 00-1.061 1.06l1.59 1.591z" />
                </svg>
              ) : (
                <svg
                  className="w-5 h-5 text-blue-400"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path fillRule="evenodd" d="M9.528 1.718a.75.75 0 01.162.819A8.97 8.97 0 009 6a9 9 0 009 9 8.97 8.97 0 003.463-.69.75.75 0 01.981.98 10.503 10.503 0 01-9.694 6.46c-5.799 0-10.5-4.701-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 01.818.162z" clipRule="evenodd" />
                </svg>
              )}
            </button>

            {/* Avatar */}
            <button
              className="w-10 h-10 rounded-full bg-[var(--primary-color)] flex items-center justify-center text-white font-semibold focus:outline-none"
              onClick={() => setIsAvatarDropdownOpen(!isAvatarDropdownOpen)}
              tabIndex={0}
            >
              {initials}
            </button>

            {/* Hamburger */}
            <button
              onClick={toggleMobileMenu}
              className="w-10 h-10 rounded-full border border-[var(--border-color)] flex items-center justify-center hover:bg-[var(--hover-bg)]"
              aria-label="Toggle Menu"
            >
              <svg
                className="w-6 h-6 text-[var(--text-color)]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="min-[480px]:hidden border-t border-[var(--border-color)] bg-[var(--card-bg)]">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <div className="relative">
              <button
                onClick={toggleHomeDropdown}
                className="flex items-center justify-between w-full px-3 py-2 text-[var(--text-color)] hover:bg-[var(--hover-bg)] rounded-md"
              >
                {t.home}
                <svg
                  className={`w-4 h-4 transition-transform duration-200 ${isHomeDropdownOpen ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {isHomeDropdownOpen && (
                <div className="pl-4 space-y-1">
                  <a href="/home1" className="block px-3 py-2 text-[var(--text-color)] hover:bg-[var(--hover-bg)] rounded-md" onClick={() => { setIsHomeDropdownOpen(false); setIsMobileMenuOpen(false); }}>
                    {t.home1}
                  </a>
                  <a href="/home2" className="block px-3 py-2 text-[var(--text-color)] hover:bg-[var(--hover-bg)] rounded-md" onClick={() => { setIsHomeDropdownOpen(false); setIsMobileMenuOpen(false); }}>
                    {t.home2}
                  </a>
                </div>
              )}
            </div>

            <Link to="/about" className="block px-3 py-2 text-[var(--text-color)] hover:bg-[var(--hover-bg)] rounded-md" onClick={() => { setIsMobileMenuOpen(false) }}>
              {t.about}
            </Link>

            <div className="relative">
              <button
                onClick={toggleServicesDropdown}
                className="flex items-center justify-between w-full px-3 py-2 text-[var(--text-color)] hover:bg-[var(--hover-bg)] rounded-md"
              >
                {t.services}
                <svg
                  className={`w-4 h-4 transition-transform duration-200 ${isServicesDropdownOpen ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {isServicesDropdownOpen && (
                <div className="pl-4 space-y-1">
                  <Link to="/services" className="block px-4 py-2 text-[var(--text-color)] hover:bg-[var(--hover-bg)] rounded-md" onClick={() => { setIsServicesDropdownOpen(false); setIsMobileMenuOpen(false); }}>
                    {t.allServices}
                  </Link>
                  <Link to="/service1" className="block px-4 py-2 text-[var(--text-color)] hover:bg-[var(--hover-bg)] rounded-md" onClick={() => { setIsServicesDropdownOpen(false); setIsMobileMenuOpen(false); }}>
                    {t.service1}
                  </Link>
                  <Link to="/service2" className="block px-4 py-2 text-[var(--text-color)] hover:bg-[var(--hover-bg)] rounded-md" onClick={() => { setIsServicesDropdownOpen(false); setIsMobileMenuOpen(false); }}>
                    {t.service2}
                  </Link>
                  <Link to="/service3" className="block px-4 py-2 text-[var(--text-color)] hover:bg-[var(--hover-bg)] rounded-md" onClick={() => { setIsServicesDropdownOpen(false); setIsMobileMenuOpen(false); }}>
                    {t.service3}
                  </Link>
                  <Link to="/service4" className="block px-4 py-2 text-[var(--text-color)] hover:bg-[var(--hover-bg)] rounded-md" onClick={() => { setIsServicesDropdownOpen(false); setIsMobileMenuOpen(false); }}>
                    {t.service4}
                  </Link>
                  <Link to="/service5" className="block px-4 py-2 text-[var(--text-color)] hover:bg-[var(--hover-bg)] rounded-md" onClick={() => { setIsServicesDropdownOpen(false); setIsMobileMenuOpen(false); }}>
                    {t.service5}
                  </Link>
                  <Link to="/service6" className="block px-4 py-2 text-[var(--text-color)] hover:bg-[var(--hover-bg)] rounded-md" onClick={() => { setIsServicesDropdownOpen(false); setIsMobileMenuOpen(false); }}>
                    {t.service6}
                  </Link>
                </div>
              )}
            </div>

            <Link to="/blog" className="block px-3 py-2 text-[var(--text-color)] hover:bg-[var(--hover-bg)] rounded-md" onClick={() => { setIsMobileMenuOpen(false) }}>
              {t.blog}
            </Link>

            <Link to="/contact" className="block px-3 py-2 text-[var(--text-color)] hover:bg-[var(--hover-bg)] rounded-md" onClick={() => { setIsMobileMenuOpen(false) }}>
              {t.contact}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
