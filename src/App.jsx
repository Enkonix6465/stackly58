import React, { useState, useEffect } from "react";
import ScrollToTop from "./components/ScrollToTop";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home1 from "./pages/Home1";
import Home2 from "./pages/Home2";
import AboutUs from "./pages/AboutUs";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import AdminDashboard from "./pages/AdminDashboard";
import Services from "./pages/Services";
import Service1 from "./pages/Service1";
import Service2 from "./pages/Service2";
import Service3 from "./pages/Service3";
import Service4 from "./pages/Service4";
import Service5 from "./pages/Service5";
import Service6 from "./pages/Service6";
import Contact from "./pages/Contact";
import Blog from "./pages/Blog";
import BlogList from "./pages/BlogList";
import Blog1 from "./pages/Blog1";
import Blog2 from "./pages/Blog2";
import Blog3 from "./pages/Blog3";
import Blog4 from "./pages/Blog4";
import Blog5 from "./pages/Blog5";

// Import Language Context
import { LanguageProvider, useLanguage } from "./context.jsx/LanguageContext";

function AppContent() {
  const location = useLocation();
  const { language } = useLanguage();

  const hideLayout = ["/", "/login", "/signup", "/forgot-password", "/admin-dashboard"].includes(location.pathname);

  return (
    <div className="App">
      {!hideLayout && <Header />}
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/home1" element={<Home1 />} />
          <Route path="/home2" element={<Home2 />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/services" element={<Services />} />
          <Route path="/service1" element={<Service1 />} />
          <Route path="/service2" element={<Service2 />} />
          <Route path="/service3" element={<Service3 />} />
          <Route path="/service4" element={<Service4 />} />
          <Route path="/service5" element={<Service5 />} />
          <Route path="/service6" element={<Service6 />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog-list" element={<BlogList />} />
          <Route path="/blog1" element={<Blog1 />} />
          <Route path="/blog2" element={<Blog2 />} />
          <Route path="/blog3" element={<Blog3 />} />
          <Route path="/blog4" element={<Blog4 />} />
          <Route path="/blog5" element={<Blog5 />} />
        </Routes>
      </motion.main>
      {!hideLayout && <Footer />}
    </div>
  );
}

function App() {
  const [language, setLanguage] = useState(() => {
    // Force reset to English for now - remove this line after testing
    localStorage.setItem('language', 'en');
    
    // Load language from localStorage on app start, default to English
    const storedLanguage = localStorage.getItem('language');
    console.log('App.jsx - Initial language check:', { storedLanguage });
    
    // If no language is stored or if it's not a valid language, default to English
    if (!storedLanguage || !['en', 'ar', 'he'].includes(storedLanguage)) {
      localStorage.setItem('language', 'en');
      console.log('App.jsx - Setting language to English');
      return 'en';
    }
    console.log('App.jsx - Using stored language:', storedLanguage);
    return storedLanguage;
  });

  // Update localStorage when language changes
  useEffect(() => {
    localStorage.setItem('language', language);
    console.log('App.jsx - Language changed to:', language);
  }, [language]);

  // Force reset language on app start (temporary fix)
  useEffect(() => {
    console.log('App.jsx - Force resetting language to English');
    setLanguage('en');
  }, []);

  return (
    <Router>
      <LanguageProvider language={language} setLanguage={setLanguage}>
        <ScrollToTop />
        <AppContent />
      </LanguageProvider>
    </Router>
  );
}

export default App;
