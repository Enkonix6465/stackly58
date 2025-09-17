import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLanguage } from '../context.jsx/LanguageContext';

// Use public folder path for logo
const logo = 'images/logo.png';

const Header = () => {
  const navigate = useNavigate();
  const { language, setLanguage } = useLanguage();

  // States
  const [isAvatarDropdownOpen, setIsAvatarDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isHomeDropdownOpen, setIsHomeDropdownOpen] = useState(false);
  const [isServicesDropdownOpen, setIsServicesDropdownOpen] = useState(false);
  const [theme, setTheme] = useState('light');
  const [initials, setInitials] = useState('?');

  const homeDropdownTimeout = useRef();
  const servicesDropdownTimeout = useRef();

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
    },
  };
  const t = translations[language];

  // Load Theme & Apply RTL on mount and language change
  useEffect(() => {
    const storedTheme = localStorage.getItem('theme') || 'light';
    setTheme(storedTheme);
    document.documentElement.dir = language === 'ar' || language === 'he' ? 'rtl' : 'ltr';
  }, [language]);

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

  // Language change handler
  const handleLanguageChange = (lang) => {
    setLanguage(lang);
    localStorage.setItem('language', lang);
    document.documentElement.dir = lang === 'ar' || lang === 'he' ? 'rtl' : 'ltr';
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
                    Digital Transformation Consulting
                  </Link>
                  <Link to="/service2" className="block px-4 py-2 hover:bg-[var(--hover-bg)]" onClick={() => setIsServicesDropdownOpen(false)}>
                    Enterprise IT Modernization
                  </Link>
                  <Link to="/service3" className="block px-4 py-2 hover:bg-[var(--hover-bg)]" onClick={() => setIsServicesDropdownOpen(false)}>
                    Cybersecurity & Risk Management
                  </Link>
                  <Link to="/service4" className="block px-4 py-2 hover:bg-[var(--hover-bg)]" onClick={() => setIsServicesDropdownOpen(false)}>
                    Data-Driven Business Intelligence
                  </Link>
                  <Link to="/service5" className="block px-4 py-2 hover:bg-[var(--hover-bg)]" onClick={() => setIsServicesDropdownOpen(false)}>
                    Customer Experience Solutions
                  </Link>
                  <Link to="/service6" className="block px-4 py-2 hover:bg-[var(--hover-bg)]" onClick={() => setIsServicesDropdownOpen(false)}>
                    Managed IT & Support Services
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

            {/* Language Selector */}
            <select
              value={language}
              onChange={e => handleLanguageChange(e.target.value)}
              className="bg-[var(--card-bg)] border border-[var(--border-color)] rounded px-2 py-1 text-[var(--text-color)]"
            >
              <option value="en">English</option>
              <option value="ar">العربية</option>
              <option value="he">עברית</option>
            </select>

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
              className="w-10 h-10 rounded-full border flex items-center justify-center hover:bg-[var(--hover-bg)]"
              onClick={toggleTheme}
              aria-label="Toggle Theme"
            >
              {theme === "light" ? "☀️" : "🌙"}
            </button>
          </div>

          {/* Mobile and Tablet Responsive Icons */}
          <div className="flex items-center gap-2 min-[480px]:hidden">
            {/* Language Selector */}
            <select
              value={language}
              onChange={e => handleLanguageChange(e.target.value)}
              className="w-14 h-10 rounded-full border border-[var(--border-color)] text-center text-[var(--text-color)] bg-[var(--card-bg)]"
              style={{ minWidth: "48px", fontWeight: 500 }}
            >
              <option value="en">EN</option>
              <option value="ar">AR</option>
              <option value="he">HE</option>
            </select>

            {/* Theme Toggle */}
            <button
              className="w-10 h-10 rounded-full border border-[var(--border-color)] flex items-center justify-center hover:bg-[var(--hover-bg)]"
              onClick={toggleTheme}
              aria-label="Toggle Theme"
            >
              {theme === "light" ? (
                <svg
                  className="w-6 h-6 text-[var(--text-color)]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 3v1m0 16v1m8.66-8.66h-1M4.34 12H3m15.07 4.93l-.71-.71M6.34 6.34l-.71-.71m12.02 12.02l-.71-.71M6.34 17.66l-.71-.71"
                  />
                </svg>
              ) : (
                <svg
                  className="w-6 h-6 text-[var(--text-color)]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-9-9" />
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
                   Cloud Infrastructure
                  </Link>
                  <Link to="/service2" className="block px-4 py-2 text-[var(--text-color)] hover:bg-[var(--hover-bg)] rounded-md" onClick={() => { setIsServicesDropdownOpen(false); setIsMobileMenuOpen(false); }}>
                    Cybersecurity Solutions
                  </Link>
                  <Link to="/service3" className="block px-4 py-2 text-[var(--text-color)] hover:bg-[var(--hover-bg)] rounded-md" onClick={() => { setIsServicesDropdownOpen(false); setIsMobileMenuOpen(false); }}>
                    AI & Automation
                  </Link>
                  <Link to="/service4" className="block px-4 py-2 text-[var(--text-color)] hover:bg-[var(--hover-bg)] rounded-md" onClick={() => { setIsServicesDropdownOpen(false); setIsMobileMenuOpen(false); }}>
                   Business Intelligence
                  </Link>
                  <Link to="/service5" className="block px-4 py-2 text-[var(--text-color)] hover:bg-[var(--hover-bg)] rounded-md" onClick={() => { setIsServicesDropdownOpen(false); setIsMobileMenuOpen(false); }}>
                    DevOps & CI/CD Services
                  </Link>
                  <Link to="/service6" className="block px-4 py-2 text-[var(--text-color)] hover:bg-[var(--hover-bg)] rounded-md" onClick={() => { setIsServicesDropdownOpen(false); setIsMobileMenuOpen(false); }}>
                    IT Consulting & Support
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
