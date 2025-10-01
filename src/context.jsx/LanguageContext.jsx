import React, { createContext, useContext, useState, useEffect } from 'react';

// Create the Language Context
const LanguageContext = createContext();

// Language Provider Component
export const LanguageProvider = ({ children, language: initialLanguage, setLanguage: setLanguageProp }) => {
  const [language, setLanguage] = useState(() => {
    // Ensure we always have a valid language, default to English
    const validLanguages = ['en', 'ar', 'he'];
    console.log('LanguageContext - Initial language:', initialLanguage);
    
    if (initialLanguage && validLanguages.includes(initialLanguage)) {
      console.log('LanguageContext - Using initial language:', initialLanguage);
      return initialLanguage;
    }
    console.log('LanguageContext - Defaulting to English');
    return 'en';
  });

  // Update language when prop changes
  useEffect(() => {
    if (initialLanguage && initialLanguage !== language) {
      setLanguage(initialLanguage);
    }
  }, [initialLanguage]);

  // Update parent component when language changes
  useEffect(() => {
    if (setLanguageProp) {
      setLanguageProp(language);
    }
  }, [language, setLanguageProp]);

  const value = {
    language,
    setLanguage,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

// Custom hook to use the Language Context
export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export default LanguageContext;