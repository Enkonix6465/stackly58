import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaSun, FaMoon } from 'react-icons/fa';

const ThemeToggle = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Check for saved theme preference or default to light mode
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme) {
      setIsDarkMode(savedTheme === 'dark');
      document.documentElement.setAttribute('data-theme', savedTheme);
    } else if (prefersDark) {
      setIsDarkMode(true);
      document.documentElement.setAttribute('data-theme', 'dark');
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = isDarkMode ? 'light' : 'dark';
    setIsDarkMode(!isDarkMode);
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  };

  return (
    <motion.button
      className="theme-toggle"
      onClick={toggleTheme}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.5 }}
      aria-label={`Switch to ${isDarkMode ? 'light' : 'dark'} mode`}
    >
      <motion.div
        className="theme-toggle-inner"
        animate={{ rotate: isDarkMode ? 180 : 0 }}
        transition={{ duration: 0.3 }}
      >
        {isDarkMode ? (
          <FaSun className="theme-toggle-icon sun" />
        ) : (
          <FaMoon className="theme-toggle-icon moon" />
        )}
      </motion.div>
      
      <span className="theme-toggle-label">
        {isDarkMode ? 'Light' : 'Dark'} Mode
      </span>

      <style jsx>{`
        .theme-toggle {
          display: flex;
          align-items: center;
          gap: 8px;
          position: fixed;
          top: 20px;
          right: 20px;
          z-index: 1000;
          background: var(--card-bg);
          border: 2px solid var(--border-color);
          border-radius: 50px;
          padding: 10px 15px;
          cursor: pointer;
          font-family: inherit;
          font-size: 0.9rem;
          font-weight: 500;
          color: var(--text-color);
          box-shadow: var(--shadow-light);
          transition: all 0.3s ease;
        }

        .theme-toggle:hover {
          transform: translateY(-2px);
          box-shadow: var(--shadow);
          border-color: var(--primary-color);
        }

        .theme-toggle-inner {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 24px;
          height: 24px;
        }

        .theme-toggle-icon {
          font-size: 1.2rem;
          transition: all 0.3s ease;
        }

        .theme-toggle-icon.sun {
          color: #f39c12;
        }

        .theme-toggle-icon.moon {
          color: var(--primary-color);
        }

        .theme-toggle-label {
          font-size: 0.85rem;
          white-space: nowrap;
        }

        @media (max-width: 768px) {
          .theme-toggle {
            top: 80px;
            right: 15px;
            padding: 8px 12px;
            font-size: 0.8rem;
          }

          .theme-toggle-icon {
            font-size: 1rem;
          }

          .theme-toggle-label {
            display: none;
          }
        }
      `}</style>
    </motion.button>
  );
};

export default ThemeToggle;
