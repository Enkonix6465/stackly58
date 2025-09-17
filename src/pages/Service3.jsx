import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  FaShieldAlt,
  FaLock,
  FaUserSecret,
  FaBug,
  FaNetworkWired,
  FaClipboardCheck,
  FaCheck,
  FaArrowRight,
} from 'react-icons/fa';
import { useLanguage } from '../context.jsx/LanguageContext'; // Adjust path as needed

const translations = {
  en: {
    documentTitle: 'Cybersecurity & Risk Management - ForStackly Business Solutions',
    heroTitle: 'Cybersecurity & Risk Management',
    heroParagraph:
      'Protect your business with comprehensive cybersecurity strategies, including threat intelligence, data privacy safeguards, and continuous risk management. Stay resilient with proactive defenses and compliance-driven solutions.',
    heroButton: 'Contact Us',

    benefitsTitle: 'Why Choose Our Cybersecurity & Risk Management?',
    benefitsCards: [
      {
        title: 'Advanced Threat Protection',
        brief: 'Continuous defense against evolving cyber threats and malware.',
        detail: 'Protect your business 24/7 with intelligent threat hunting and incident response.',
        gradientFrom: 'from-indigo-500',
        gradientTo: 'to-blue-600',
        icon: FaShieldAlt,
      },
      {
        title: 'Data Encryption & Privacy',
        brief: 'Protect confidential information anywhere in your environment.',
        detail: 'Ensures compliance and safeguards sensitive data across endpoints and cloud.',
        gradientFrom: 'from-green-500',
        gradientTo: 'to-teal-600',
        icon: FaLock,
      },
      {
        title: 'Access Control & Identity Management',
        brief: 'Ensure only the right users access the right resources.',
        detail: 'Robust policies and multi-factor authentication to secure your organization.',
        gradientFrom: 'from-red-500',
        gradientTo: 'to-pink-600',
        icon: FaUserSecret,
      },
      {
        title: 'Vulnerability Assessment',
        brief: 'Identify risks before they become problems with routine security scans.',
        detail: 'Continuous scanning and remediation to close security gaps.',
        gradientFrom: 'from-purple-500',
        gradientTo: 'to-indigo-600',
        icon: FaBug,
      },
      {
        title: 'Network & Endpoint Security',
        brief: 'Firewalls, monitoring, and remediation for devices and networks.',
        detail: 'Comprehensive protection layers guard your infrastructure from attacks.',
        gradientFrom: 'from-yellow-400',
        gradientTo: 'to-orange-500',
        icon: FaNetworkWired,
      },
      {
        title: 'Regulatory Compliance & Reporting',
        brief: 'Stay audit-ready with customized compliance frameworks and reports.',
        detail: 'Streamlining your certifications and regulatory adherence.',
        gradientFrom: 'from-cyan-500',
        gradientTo: 'to-sky-600',
        icon: FaClipboardCheck,
      },
    ],

    benefitsSectionTitle: 'Our Cybersecurity & Risk Solutions',
    benefitsSectionDescription:
      'We offer next-generation, layered security strategies that keep businesses resilient, compliant, and secure against complex risks.',
    benefitsList: [
      'Best-in-class protection against cyber attacks',
      'Proactive threat detection and rapid incident response',
      'Compliance with industry standards and regulations',
      'Secure user access and robust identity management',
      '24/7 monitoring from certified cybersecurity specialists',
      'Transparent pricing for scalable security operations',
    ],

    galleryTitle: 'Security Projects Portfolio',
    gallerySubtitle:
      'Explore recent deployments of our cybersecurity and risk management solutions for clients worldwide.',

    costEstimatorTitle: 'Estimate Your Cybersecurity Costs',
    costEstimatorDescription:
      'Use our interactive tool to estimate your protection, monitoring, and compliance budget based on endpoints, users, and incident storage.',
    sliderLabels: {
      vcpu: 'Protected Endpoints',
      ram: 'Monitored User Accounts',
      storage: 'Incident Log Storage (GB)',
    },
    totalCostLabel: 'Estimated Monthly Cybersecurity Budget',
    contactButton: 'Contact Us for a Custom Quote',

    ctaTitle: 'Ready to Strengthen Your Cybersecurity?',
    ctaParagraph:
      'Partner with us to defend your business, achieve compliance, and respond rapidly to digital risks with world-class cybersecurity and risk management solutions.',
    ctaStartButton: 'Request a Security Consultation',
    ctaLearnMoreButton: 'Learn More About Cyber Defense',
  },

  ar: {
    documentTitle: '[translate:إدارة الأمن السيبراني والمخاطر - حلول الأعمال فورستاكلي]',
    heroTitle: '[translate:إدارة الأمن السيبراني والمخاطر]',
    heroParagraph:
      '[translate:احمِ أعمالك باستراتيجيات أمن سيبراني شاملة، بما في ذلك استخبارات التهديدات، حماية خصوصية البيانات، وإدارة المخاطر المستمرة. حافظ على المرونة من خلال الدفاعات الاستباقية والحلول التي تلتزم بالتشريعات.]',
    heroButton: '[translate:اتصل بنا]',

    benefitsTitle: '[translate:لماذا تختار إدارة الأمن السيبراني والمخاطر لدينا؟]',
    benefitsCards: [
      {
        title: '[translate:حماية متقدمة من التهديدات]',
        brief: '[translate:دفاع مستمر ضد التهديدات السيبرانية والبرمجيات الخبيثة المتطورة.]',
        detail: '[translate:حماية أعمالك على مدار 24/7 مع الصيد الذكي للتهديدات والاستجابة للحوادث.]',
        gradientFrom: 'from-indigo-500',
        gradientTo: 'to-blue-600',
        icon: FaShieldAlt,
      },
      {
        title: '[translate:تشفير البيانات والخصوصية]',
        brief: '[translate:حماية المعلومات السرية في أي مكان بيئتك.]',
        detail: '[translate:ضمان الالتزام وحماية البيانات الحساسة عبر نقاط النهاية والسحابة.]',
        gradientFrom: 'from-green-500',
        gradientTo: 'to-teal-600',
        icon: FaLock,
      },
      {
        title: '[translate:التحكم في الوصول وإدارة الهوية]',
        brief: '[translate:التأكد من وصول المستخدمين المناسبين للموارد الصحيحة فقط.]',
        detail: '[translate:سياسات قوية والمصادقة متعددة العوامل لتأمين مؤسستك.]',
        gradientFrom: 'from-red-500',
        gradientTo: 'to-pink-600',
        icon: FaUserSecret,
      },
      {
        title: '[translate:تقييم الثغرات الأمنية]',
        brief: '[translate:تحديد المخاطر قبل أن تتحول لمشاكل من خلال الفحوصات الأمنية الروتينية.]',
        detail: '[translate:الفحص المستمر والمعالجة لسد الثغرات الأمنية.]',
        gradientFrom: 'from-purple-500',
        gradientTo: 'to-indigo-600',
        icon: FaBug,
      },
      {
        title: '[translate:أمن الشبكات ونقاط النهاية]',
        brief: '[translate:جدران حماية، المراقبة، والمعالجة للأجهزة والشبكات.]',
        detail: '[translate:طبقات حماية شاملة تحمي بنيتك التحتية من الهجمات.]',
        gradientFrom: 'from-yellow-400',
        gradientTo: 'to-orange-500',
        icon: FaNetworkWired,
      },
      {
        title: '[translate:الامتثال والتنظيم والتقارير]',
        brief: '[translate:ابقَ مستعدًا للتدقيق من خلال أطر الامتثال والتقارير المخصصة.]',
        detail: '[translate:تبسيط شهاداتك والالتزام بالتنظيمات.]',
        gradientFrom: 'from-cyan-500',
        gradientTo: 'to-sky-600',
        icon: FaClipboardCheck,
      },
    ],

    benefitsSectionTitle: '[translate:حلول الأمن السيبراني وإدارة المخاطر]',
    benefitsSectionDescription:
      '[translate:نقدم استراتيجيات أمنية متعددة المستويات من الجيل التالي تُبقي الأعمال مرنة ومتوافقة وآمنة ضد المخاطر المعقدة.]',
    benefitsList: [
      '[translate:أفضل حماية ضد الهجمات السيبرانية]',
      '[translate:الكشف المبكر عن التهديدات والاستجابة السريعة للحوادث]',
      '[translate:الامتثال للمعايير الصناعية والتنظيمية]',
      '[translate:وصول آمن للمستخدم وإدارة هوية قوية]',
      '[translate:مراقبة 24/7 من متخصصين معتمدين في الأمن السيبراني]',
      '[translate:تسعير شفاف لعمليات الأمن القابلة للتوسع]',
    ],

    galleryTitle: '[translate:محفظة مشاريع الأمن السيبراني]',
    gallerySubtitle:
      '[translate:استكشف عمليات نشر حلول الأمن السيبراني وإدارة المخاطر التي نفذناها للعملاء حول العالم.]',

    costEstimatorTitle: '[translate:قدّر تكاليف الأمن السيبراني]',
    costEstimatorDescription:
      '[translate:استخدم أداتنا التفاعلية لتقدير ميزانيتك للحماية، والرصد، والامتثال بناءً على عدد نقاط النهاية والمستخدمين وحجم تخزين الحوادث.]',
    sliderLabels: {
      vcpu: '[translate:نقاط النهاية المحمية]',
      ram: '[translate:حسابات المستخدمين المراقبة]',
      storage: '[translate:تخزين سجلات الحوادث (جيجا بايت)]',
    },
    totalCostLabel: '[translate:ميزانية الأمن السيبراني الشهرية المقدرة]',
    contactButton: '[translate:اتصل بنا لعرض سعر مخصص]',

    ctaTitle: '[translate:هل أنت مستعد لتعزيز الأمن السيبراني لديك؟]',
    ctaParagraph:
      '[translate:شراكة معنا للدفاع عن عملك، وتحقيق الامتثال، والاستجابة السريعة للمخاطر الرقمية بحلول أمنية وإدارية رائدة عالمياً.]',
    ctaStartButton: '[translate:اطلب استشارة أمنية]',
    ctaLearnMoreButton: '[translate:تعرف أكثر على الدفاع السيبراني]',
  },

  he: {
    documentTitle: '[translate:ניהול אבטחת סייבר וסיכונים - פתרונות עסקיים פורסטאקלי]',
    heroTitle: '[translate:ניהול אבטחת סייבר וסיכונים]',
    heroParagraph:
      '[translate:הגן על העסק שלך עם אסטרטגיות אבטחה מקיפות, כולל מודיעין איומים, הגנות פרטיות נתונים, וניהול סיכונים מתמשך. שמור על חוסן עם הגנות פרואקטיביות ופתרונות תואמי תקנות.]',
    heroButton: '[translate:צור קשר]',

    benefitsTitle: '[translate:למה לבחור בניהול אבטחת סייבר וסיכונים שלנו?]',
    benefitsCards: [
      {
        title: '[translate:הגנה מתקדמת מפני איומים]',
        brief: '[translate:הגנה רציפה מפני איומי סייבר ומאלוורים מתפתחים.]',
        detail: '[translate:הגנת העסק שלך 24/7 עם איתור איומים ותגובה לאירועים חכמה.]',
        gradientFrom: 'from-indigo-500',
        gradientTo: 'to-blue-600',
        icon: FaShieldAlt,
      },
      {
        title: '[translate:הצפנת נתונים ופרטיות]',
        brief: '[translate:הגן על מידע סודי בכל מקום בסביבתך.]',
        detail: '[translate:מבטיח תאימות ומגנים על נתונים רגישים בנקודות קצה ובענן.]',
        gradientFrom: 'from-green-500',
        gradientTo: 'to-teal-600',
        icon: FaLock,
      },
      {
        title: '[translate:שליטה בגישה וניהול זהויות]',
        brief: '[translate:ודא שמשתמשים נכונים ניגשים למשאבים הנכונים בלבד.]',
        detail: '[translate:מדיניות חזקה ואימות דו-שלבי לאבטחת הארגון שלך.]',
        gradientFrom: 'from-red-500',
        gradientTo: 'to-pink-600',
        icon: FaUserSecret,
      },
      {
        title: '[translate:הערכת פגיעויות]',
        brief: '[translate:זיהוי סיכונים לפני שהם הופכים לבעיות באמצעות סריקות אבטחה שגרתיות.]',
        detail: '[translate:סריקה מתמשכת ותיקון פגיעויות.]',
        gradientFrom: 'from-purple-500',
        gradientTo: 'to-indigo-600',
        icon: FaBug,
      },
      {
        title: '[translate:אבטחת רשת ונקודות קצה]',
        brief: '[translate:חומות אש, ניטור ותגובה למכשירים ורשתות.]',
        detail: '[translate:שכבות הגנה מקיפות המגנות על התשתית שלך מפני התקפות.]',
        gradientFrom: 'from-yellow-400',
        gradientTo: 'to-orange-500',
        icon: FaNetworkWired,
      },
      {
        title: '[translate:ציות ודו"חות רגולטוריים]',
        brief: '[translate:הישאר מוכן לבדיקה עם מסגרות ודוחות מותאמים אישית.]',
        detail: '[translate:פישוט תהליכי אישור ועמידה בתקנות.]',
        gradientFrom: 'from-cyan-500',
        gradientTo: 'to-sky-600',
        icon: FaClipboardCheck,
      },
    ],

    benefitsSectionTitle: '[translate:פתרונות אבטחת סייבר וניהול סיכונים]',
    benefitsSectionDescription:
      '[translate:אנו מציעים אסטרטגיות אבטחה רב-שכבתיות מדור הבא לשמירה על עסק עמיד, תואם ובטוח מפני סיכונים מורכבים.]',
    benefitsList: [
      '[translate:הגנה מתקדמת מפני התקפות סייבר]',
      '[translate:איתור איומים פרואקטיבי ותגובה מהירה לאירועים]',
      '[translate:עמידה בתקנים ורגולציות בתעשייה]',
      '[translate:גישה מאובטחת וניהול זהויות חזק]',
      '[translate:ניטור 24/7 על ידי מומחים מוסמכים]',
      '[translate:תמחור שקוף לתפעול אבטחה מדרגית]',
    ],

    galleryTitle: '[translate:פורטפוליו פרויקטי אבטחה]',
    gallerySubtitle:
      '[translate:חקור פריסות אחרונות של פתרונות אבטחת סייבר וניהול סיכונים ללקוחות ברחבי העולם.]',

    costEstimatorTitle: '[translate:הערך את עלויות אבטחת הסייבר שלך]',
    costEstimatorDescription:
      '[translate:השתמש בכלי האינטראקטיבי שלנו להערכת התקציב שלך לאבטחה, ניטור וציות לפי נקודות קצה, משתמשים ואחסון אירועים.]',
    sliderLabels: {
      vcpu: '[translate:נקודות קצה מוגנות]',
      ram: '[translate:חשבונות משתמשים מנוטרים]',
      storage: '[translate:אחסון יומני אירועים (גיגה-בייט)]',
    },
    totalCostLabel: '[translate:תקציב אבטחת הסייבר החודשי המשוער]',
    contactButton: '[translate:צור קשר לקבלת הצעת מחיר מותאמת]',

    ctaTitle: '[translate:מוכן לחיזוק אבטחת הסייבר שלך?]',
    ctaParagraph:
      '[translate:שיתוף פעולה איתנו להגנה על העסק שלך, השגת תאימות ותגובה מהירה לסיכונים דיגיטליים עם פתרונות אבטחה וניהול סיכונים מהשורה הראשונה.]',
    ctaStartButton: '[translate:בקש ייעוץ אבטחה]',
    ctaLearnMoreButton: '[translate:למד עוד על הגנת סייבר]',
  },
};

const Service1 = () => {
  const { language } = useLanguage();
  const t = translations[language] || translations.en;

  useEffect(() => {
    document.title = t.documentTitle;
  }, [t.documentTitle]);

  const navigate = useNavigate();

  const [vcpu, setVcpu] = useState(8); // Protected Endpoints
  const [ram, setRam] = useState(16); // Monitored User Accounts
  const [storage, setStorage] = useState(500); // Incident Log Storage (GB)
  const [totalCost, setTotalCost] = useState(0);

  const VCPU_COST = 0.10;
  const RAM_COST = 0.08;
  const STORAGE_COST = 0.0003;

  useEffect(() => {
    const cost = vcpu * VCPU_COST + ram * RAM_COST + storage * STORAGE_COST;
    setTotalCost(cost);
  }, [vcpu, ram, storage]);

  const handleGetQuote = () => {
    navigate('/contact');
  };

  return (
    <div className="service-page" dir={language === 'ar' || language === 'he' ? 'rtl' : 'ltr'}>
      <div className="home-page">

        {/* Hero Section */}
        <section className="hero-section">
          <video autoPlay muted loop playsInline className="hero-bg-video">
            <source src="images/service3.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <div className="hero-overlay">
            <div className="hero-content">
              <h1 className="hero-title animate-slide-in">{t.heroTitle}</h1>
              <p className="hero-paragraph animate-fade-up">{t.heroParagraph}</p>
              <Link to="/contact" className="hero-button animate-fade-up-delayed">{t.heroButton}</Link>
            </div>
          </div>
        </section>

        {/* Features Cards Section */}
        <section className="py-16 md:py-24 bg-gray-100 dark:bg-gray-800 rounded-xl shadow-inner my-12 text-gray-800 dark:text-gray-200" style={{ backgroundColor: "var(--bg-color)" }}>
          <h2 className="text-center text-3xl md:text-4xl font-bold mb-12">{t.benefitsTitle}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4">
            {t.benefitsCards.map(({ title, brief, detail, gradientFrom, gradientTo, icon: Icon }, i) => (
              <div key={i} className={`group p-8 rounded-2xl shadow-lg transition-transform duration-300 transform cursor-pointer bg-gradient-to-br ${gradientFrom} ${gradientTo}`}>
                <div className="flex items-center justify-center w-16 h-16 rounded-full bg-white/20 text-white mb-6 transform group-hover:scale-110 transition-transform">
                  <Icon className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-white">{title}</h3>
                <p className="text-gray-200 transition-opacity duration-300 group-hover:opacity-0">{brief}</p>
                <p className="text-gray-200 opacity-0 max-h-0 group-hover:opacity-100 group-hover:max-h-40 transition-all duration-300 ease-in-out">{detail}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Benefits List Section */}
        <section className="section benefits-section">
          <div className="container">
            <div className="grid-2">
              <motion.div className="benefits-content" initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }}>
                <h2>{t.benefitsSectionTitle}</h2>
                <p>{t.benefitsSectionDescription}</p>
                <div className="benefits-list">
                  {t.benefitsList.map((benefit, idx) => (
                    <motion.div key={idx} className="benefit-item" initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: idx * 0.1 }} viewport={{ once: true }}>
                      <FaCheck className="check-icon" />
                      <span>{benefit}</span>
                    </motion.div>
                  ))}
                </div>
                <Link to="/contact" className="btn btn-primary">{t.contactButton} <FaArrowRight /></Link>
              </motion.div>
              <motion.div className="benefits-visual" initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }}>
                <div className="benefits-image">
                  <img src="images/bs57.jpg" alt="Cybersecurity & Risk Visual" />
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Gallery Section */}
        <section className="section gallery-wrapper">
          <div className="container">
            <motion.div className="gallery-header" initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}>
              <h2 className="gallery-title">{t.galleryTitle}</h2>
              <p className="gallery-subtitle">{t.gallerySubtitle}</p>
            </motion.div>
            <div className="gallery-container">
              <div className="gallery-row">
                <div className="gallery-big">
                  <img src="images/bs46.jpg" alt="Transformation overview" />
                </div>
                <div className="gallery-grid">
                  <img src="images/bs47.jpg" alt="Project 1" />
                  <img src="images/bs48.jpg" alt="Project 2" />
                  <img src="images/bs49.jpg" alt="Project 3" />
                  <img src="images/bs50.jpg" alt="Project 4" />
                </div>
              </div>
              <div className="gallery-row reverse">
                <div className="gallery-big">
                  <img src="images/bs55.jpg" alt="Global network map" />
                </div>
                <div className="gallery-grid">
                  <img src="images/bs52.jpg" alt="Project 5" />
                  <img src="images/bs53.jpg" alt="Project 6" />
                  <img src="images/bs54.jpg" alt="Project 7" />
                  <img src="images/bs51.jpg" alt="Project 8" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Cost Estimator Section */}
        <main className="container mx-auto px-4 md:px-8">
          <section className="py-16 md:py-4 bg-[var(--bg-color)] rounded-xl shadow-2xl my-12 text-[var(--text-color)] transition-colors" style={{ boxShadow: 'var(--shadow)' }}>
            <h2 className="text-center text-3xl md:text-4xl font-bold mb-4">{t.costEstimatorTitle}</h2>
            <p className="text-center text-lg text-[var(--text-muted)] max-w-4xl mx-auto mb-12">{t.costEstimatorDescription}</p>
            <div className="max-w-4xl mx-auto p-8 rounded-xl bg-gradient-to-br from-indigo-50 to-blue-100 dark:from-[#1a202c] dark:to-[#2d3748] shadow-xl transition-colors">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="group bg-[var(--card-bg)] dark:bg-[#2d3748] p-6 rounded-xl shadow-lg hover:shadow-[var(--shadow-hover)]">
                  <label htmlFor="vcpu-slider" className="block text-xl font-semibold mb-2" style={{ color: '#fff' }}>{t.sliderLabels.vcpu}</label>
                  <div className="flex items-center space-x-4">
                    <input type="range" id="vcpu-slider" min="1" max="1000" value={vcpu} onChange={(e) => setVcpu(Number(e.target.value))} className="w-full h-2 bg-[var(--input-bg)] rounded-lg appearance-none cursor-pointer" style={{ boxShadow: 'var(--shadow)', transition: 'all 0.2s ease-in-out' }} />
                    <span className="w-16 text-center text-xl font-bold" style={{ color: '#fff' }}>{vcpu}</span>
                  </div>
                </div>

                <div className="group bg-[var(--card-bg)] dark:bg-[#2d3748] p-6 rounded-xl shadow-lg hover:shadow-[var(--shadow-hover)]">
                  <label htmlFor="ram-slider" className="block text-xl font-semibold mb-2" style={{ color: '#fff' }}>{t.sliderLabels.ram}</label>
                  <div className="flex items-center space-x-4">
                    <input type="range" id="ram-slider" min="1" max="500" value={ram} onChange={(e) => setRam(Number(e.target.value))} className="w-full h-2 bg-[var(--input-bg)] rounded-lg appearance-none cursor-pointer" style={{ boxShadow: 'var(--shadow)', transition: 'all 0.2s ease-in-out' }} />
                    <span className="w-16 text-center text-xl font-bold" style={{ color: '#fff' }}>{ram}</span>
                  </div>
                </div>

                <div className="group bg-[var(--card-bg)] dark:bg-[#2d3748] p-6 rounded-xl shadow-lg hover:shadow-[var(--shadow-hover)]">
                  <label htmlFor="storage-slider" className="block text-xl font-semibold mb-2" style={{ color: '#fff' }}>{t.sliderLabels.storage}</label>
                  <div className="flex items-center space-x-4">
                    <input type="range" id="storage-slider" min="50" max="10000" value={storage} onChange={(e) => setStorage(Number(e.target.value))} className="w-full h-2 bg-[var(--input-bg)] rounded-lg appearance-none cursor-pointer" style={{ boxShadow: 'var(--shadow)', transition: 'all 0.2s ease-in-out' }} />
                    <span className="w-16 text-center text-xl font-bold" style={{ color: '#fff' }}>{storage}</span>
                  </div>
                </div>
              </div>
              <div className="mt-12 text-center">
                <p className="text-lg" style={{ color: '#fff' }}>{t.totalCostLabel}</p>
                <p className="text-6xl font-extrabold text-indigo-500">${totalCost.toFixed(2)}</p>
                <button onClick={handleGetQuote} className="mt-8 px-8 py-3 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold shadow transition duration-300">{t.contactButton}</button>
              </div>
            </div>
          </section>
        </main>

        {/* CTA Section */}
        <section className="cta-section">
          <div className="cta-overlay">
            <div className="container">
              <motion.div className="cta-content text-center" initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }}>
                <h2>{t.ctaTitle}</h2>
                <p>{t.ctaParagraph}</p>
                <div className="cta-buttons">
                  <Link to="/contact" className="btn btn-primary btn-large">{t.ctaStartButton} <FaArrowRight /></Link>
                  <Link to="/about" className="btn btn-outline btn-large">{t.ctaLearnMoreButton}</Link>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

   


              

        <style jsx>{`
          .home-page {
            padding-top: 80px;
          }

        .hero-section {
    position: relative;
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    margin: 0;
    padding: 0;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .hero-bg-video {
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    object-fit: cover;
    z-index: -1;
  }

  .hero-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1;
  }

  .hero-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;   /* ensures vertical centering inside overlay */
    text-align: center;
    color: #fff;
    max-width: 800px;
    z-index: 2;
    gap: 28px; /* space between title, text, and button */
  }

  .hero-title {
    color: #fff; /* ✅ force white text so it’s visible on dark video background in light mode */
    font-size: 2.8rem;
    font-weight: bold;
    line-height: 1.1;
    margin-bottom: 0;
    opacity: 0;
    animation: slideIn 1s ease-out forwards 0.5s;
  }


  .hero-paragraph {
    font-size: 1.25rem;
    margin: 0;
    opacity: 0;
    animation: fadeUp 1s ease-out forwards 1s;
  }

  .hero-button {
    margin-top: 0;
    padding: 14px 36px;
    font-size: 1.1rem;
    font-weight: 600;
    color: #fff;
    background-color: #224DB7;
    border-radius: 10px;
    text-decoration: none;
    border: none;
    transition: background-color 0.3s, transform 0.3s;
    opacity: 0;
    animation: fadeUp 1s ease-out forwards 1.5s;
  }

  .hero-button:hover {
    background-color: #000;
    transform: scale(1.05);
  }

  /* Responsive adjustments */
  @media (max-width: 700px) {
    .hero-content {
      max-width: 95vw;
      padding: 0 10px;
      gap: 18px;
    }
    .hero-title {
      font-size: 2rem;
    }
    .hero-paragraph {
      font-size: 1rem;
    }
    .hero-button {
      font-size: 1rem;
    }
  }

  /* Animations */
  @keyframes slideIn {
    0% { opacity: 0; transform: translateY(-20px);}
    100% { opacity: 1; transform: translateY(0);}
  }
  @keyframes fadeUp {
    0% { opacity: 0; transform: translateY(20px);}
    100% { opacity: 1; transform: translateY(0);}
  }

          .hero-text h1 {
            font-size: 3.5rem;
            font-weight: 800;
            line-height: 1.2;
            margin-bottom: 20px;
            color: white;
          }

          .gradient-text {
            background: linear-gradient(45deg, #ffd700, #ff6b6b);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
          }

          .hero-text p {
            font-size: 1.2rem;
            line-height: 1.6;
            margin-bottom: 30px;
            opacity: 0.9;
          }

          .hero-buttons {
            display: flex;
            gap: 20px;
            flex-wrap: wrap;
          }

          .hero-visual {
            position: relative;
          }

          .hero-image {
            position: relative;
            border-radius: 20px;
            overflow: hidden;
            border-radius: 200px;
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
          }

          .hero-image img {
            width: 100%;
            height: 400px;
            object-fit: cover;
          }

          @keyframes float {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-10px); }
          }

          

          .card-icon {
            font-size: 2rem;
            color: var(--primary-color);
          }

          .card-content h4 {
            color: var(--heading-color);
            margin: 0 0 5px 0;
            font-size: 1rem;
          }

          .card-content p {
            color: var(--text-muted);
            margin: 0;
            font-size: 0.9rem;
          }

  .features-section {
    background: var(--sidebar-bg);
    padding: 80px 0;
  }

  .features-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 30px;
    margin-top: 60px;
  }
    .feature-card {
    background: var(--card-bg, #111);
    border: 1px solid rgba(0, 123, 255, 0.4);
    border-radius: 16px;
    padding: 32px 24px;
    text-align: center;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.25);
    display: flex;
    flex-direction: column;
    align-items: center;   /* Center horizontally */
    justify-content: flex-start; /* Keep content top-aligned */
  }

  .feature-card.premium-card {
    position: relative;
    background: rgba(20, 20, 20, 0.9);
    padding: 40px 30px;
    border-radius: 20px;
    text-align: center;
    overflow: hidden;
    color: #fff;
    z-index: 1;
  }

  .feature-card.premium-card::before {
    content: "";
    position: absolute;
    inset: 0;
    border-radius: inherit;
    padding: 2px;
    background: linear-gradient(270deg, #4f9fff, #a855f7, #4f9fff);
    background-size: 600% 600%;
    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    animation: borderMove 6s linear infinite;
    z-index: -1;
  }

  @keyframes borderMove {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }

  .feature-icon {
    font-size: 3rem;
    color: #4f9fff;
    margin-bottom: 20px;
  }

  .feature-card h3 {
    font-size: 1.3rem;
    margin-bottom: 15px;
    color: #fff;
  }

  .feature-card p {
    font-size: 0.95rem;
    line-height: 1.6;
    color: #bbb;
  }

  .btn-learn {
    margin-top: 40px;
  }
  .btn-learn-wrapper {
    display: flex;
    justify-content: center;  /* horizontal center */
    align-items: center;      /* vertical center */
    width: 100%;
    margin-top: 20px;         /* optional spacing */
  }

  .btn-learn {
    background: linear-gradient(90deg, #3b82f6, #a855f7);
    color: #fff;
    padding: 12px 28px;
    border: none;
    border-radius: 9999px;  /* pill shape */
    font-size: 1rem;
    font-weight: 500;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 8px;               /* spacing between text & arrow */
    transition: transform 0.2s ease, box-shadow 0.2s ease;
  }

  .btn-learn:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 15px rgba(0, 0, 0, 0.15);
  }



          .benefits-section {
            background: var(--bg-color);
          }

          .benefits-content h2 {
            font-size: 2.0rem;
            color: var(--heading-color);
            margin-bottom: 20px;
          }

          .benefits-content p {
    font-size: 1.02rem;
    color: var(--text-color);
    line-height: 1.6;
    margin-bottom: 30px;
    text-align: justify;                /* Justified paragraph */
    letter-spacing: 0.1px;              /* Slight letter spacing for professionalism */
  }


          .benefits-list {
            margin-bottom: 40px;
          }

          .benefit-item {
            display: flex;
            align-items: center;
            gap: 15px;
            margin-bottom: 20px;
            font-size: 1rem;
            color: var(--text-color);
          }

        .check-icon {
    color: var(--accent-color, #28a745);
    font-size: 1.15rem;                 /* Slightly larger for visibility */
    background: var(--accent-bg, #e0f7e9); /* Soft green for light mode */
    padding: 8px;
    border-radius: 50%;
    box-shadow: 0 0 6px var(--accent-color, #28a745); /* Glow/silhouette effect */
    transition: background 0.3s, color 0.3s;
  }

    /* Light theme (optional, if you use a root variable) */
    :root {
    --accent-color: #111;     /* Black for icon color */
    --accent-bg: #eaeaea;     /* Light grey for background dot */
  }


  /* Dark theme (assuming body.dark is toggled for dark mode) */
  body.dark .check-icon {
    color: #5cffb1;                          /* Bright green for dark */
    background: rgba(40,167,69,0.22);        /* Slightly brighter dot */
    box-shadow: 0 0 8px #5cffb1;
  }


          .benefits-image {
            border-radius: 50px;
            overflow: hidden;
            box-shadow: var(--shadow);
          }

          .benefits-image img {
            width: 100%;
            height: 570px;
            object-fit: cover;
            border-radius: 50px;
          }

          .gallery-wrapper {
    background: var(--sidebar-bg); /* Uses sidebar background for both themes */
    padding: 80px 40px;
    font-family: "Segoe UI", sans-serif;
    transition: background-color 0.3s ease; /* Smooth transition on theme change */
  }


  .gallery-header {
    text-align: center;
    max-width: 800px;
    margin: 0 auto 60px;
  }

  .gallery-title {
    font-size: 2.5rem;
    font-weight: 700;
    color: var(--heading-color);
    margin-bottom: 15px;
  }

  .gallery-subtitle {
    font-size: 1.1rem;
    color: var(--text-muted);
    line-height: 1.6;
  }


  .gallery-container {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .gallery-row {
    display: flex;
    flex-direction: row;
    gap: 20px;
    align-items: stretch;
  }

  .gallery-row.reverse {
    flex-direction: row-reverse;
  }

  .gallery-big img {
    width: 100%;
    height: 500px;
    object-fit: cover;
    border-radius: 16px;
    box-shadow: 0 8px 20px rgba(0,0,0,0.1);
  }

  .gallery-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
    flex: 1;
  }

  .gallery-grid img {
    width: 100%;
    height: 240px;
    object-fit: cover;
    border-radius: 12px;
    box-shadow: 0 6px 15px rgba(0,0,0,0.08);
    transition: transform 0.3s ease;
  }

  .gallery-grid img:hover {
    transform: scale(1.03);
  }

  /* Responsive */
  @media (max-width: 992px) {
    .gallery-row,
    .gallery-row.reverse {
      flex-direction: column;
    }
    .gallery-big img {
      height: 350px;
    }
    .gallery-grid img {
      height: 180px;
    }
  }


        .cta-section {
  position: relative;
  background: url('/images/bs69.jpg') center/cover no-repeat fixed; /* fixed background */
  padding: 0 0;
  color: white;
}

  .cta-overlay {
    background-color: rgba(0, 0, 0, 0.5); /* Dark overlay for readability */
    padding: 100px 0;
  }

  .cta-content {
    max-width: 700px;
    margin: auto;
    color:#fff;
  }

  .cta-content h2 {
    font-size: 2.5rem;
    margin-bottom: 20px;
    color:#fff;
  }

  .cta-content p {
    font-size: 1.2rem;
    margin-bottom: 30px;
  }

  .cta-buttons {
    display: flex;
    justify-content: center;
    gap: 15px;
  }

  .btn {
    padding: 12px 25px;
    border-radius: 5px;
    font-weight: bold;
    text-decoration: none;
    transition: 0.3s;
  }

  .btn-primary {
    background: #ff6600;
    color: white;
  }

  .btn-primary:hover {
    background: #e65c00;
  }

  .btn-outline {
    border: 2px solid white;
    color: white;
  }

  .btn-outline:hover {
    background: white;
    color: black;
  }


  .btn {
    padding: 12px 25px;
    border-radius: 5px;
    font-weight: bold;
    text-decoration: none;
    transition: 0.3s;
  }

  .btn-primary {
    background: #224DB7;
    color: white;
  }

  .btn-primary:hover {
    background: #224DB7;
  }

  .btn-outline {
    border: 2px solid white;
    color: white;
  }

  .btn-outline:hover {
    background: white;
    color: black;
  }
  .btn-primary, .btn-outline, .btn-large {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
  }
  .btn-primary svg {
    font-size: 1.3rem;
    vertical-align: middle;
  }



          .faq-section {
            background: var(--sidebar-bg);
            padding: 0 0;
            padding-bottom: 40px;
            margin-top:-40px;
          }

          .faq-list {
            max-width: 800px;
            margin: 60px auto 0;
          }

          .faq-item {
            background: var(--card-bg);
            padding: 30px;
            border-radius: 15px;
            margin-bottom: 20px;
            box-shadow: var(--shadow);
            border: 1px solid var(--border-color);
          }

          .faq-item h4 {
            color: var(--heading-color);
            font-size: 1.2rem;
            margin-bottom: 15px;
          }

          .faq-item p {
            color: var(--text-color);
            line-height: 1.6;
            margin: 0;
          }

        src/pages/Home2.jsx

            .hero-text h1 {
              font-size: 2.5rem;
            }

            .process-step {
              flex-direction: column;
              text-align: center;
            }

            .step-number {
              width: auto;
            }

            .testimonials-grid {
              grid-template-columns: 1fr;
            }
          }
            .gallery-row {
  display: flex;
  flex-direction: row;
  gap: 20px;
  align-items: stretch;
  margin-bottom: 40px; /* Adds space between rows */
}
.gallery-row.reverse {
  flex-direction: row-reverse;
  padding-top: 20px; /* Adds top padding for reverse rows */
}

        `}</style>
        </div>
      </div>
    );
  };

  export default Service1;
