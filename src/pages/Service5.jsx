import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  FaCode,
  FaLaptopCode,
  FaMobileAlt,
  FaServer,
  FaDatabase,
  FaPalette,
  FaCheck,
  FaEye,
  FaArrowRight,
} from 'react-icons/fa';
import { useLanguage } from '../context.jsx/LanguageContext';

const translations = {
  en: {
    documentTitle: 'Customer Experience Solutions - ForStackly Business Solutions',
    heroTitle: 'Customer Experience Solutions',
    heroParagraph:
      'Deliver seamless, personalized customer experiences powered by data-driven insights, advanced analytics, and continuous optimization to foster loyalty and business growth.',
    heroButton: 'Contact Us',

    benefitsTitle: 'Why Choose Our Customer Experience Solutions?',
    benefitsCards: [
      {
        title: 'Advanced Customer Analytics',
        brief: 'Deep insights into customer behavior and preferences.',
        detail: 'Leverage sophisticated analytics to understand customer journeys and optimize experiences.',
        gradientFrom: 'from-indigo-500',
        gradientTo: 'to-blue-600',
        icon: FaCode,
      },
      {
        title: 'Personalization Engine',
        brief: 'Tailor experiences to individual customer needs and preferences.',
        detail: 'AI-powered recommendations and dynamic content delivery for maximum engagement.',
        gradientFrom: 'from-green-500',
        gradientTo: 'to-teal-600',
        icon: FaLaptopCode,
      },
      {
        title: 'Real-time Interaction Management',
        brief: 'Instant response capabilities across all customer touchpoints.',
        detail: 'Seamless omnichannel support with intelligent routing and context preservation.',
        gradientFrom: 'from-red-500',
        gradientTo: 'to-pink-600',
        icon: FaMobileAlt,
      },
      {
        title: 'Omnichannel Integration',
        brief: 'Unified customer experience across all channels and platforms.',
        detail: 'Consistent messaging and service quality regardless of customer\'s chosen interaction method.',
        gradientFrom: 'from-purple-500',
        gradientTo: 'to-indigo-600',
        icon: FaEye,
      },
      {
        title: 'Predictive Customer Intelligence',
        brief: 'Anticipate customer needs before they arise.',
        detail: 'Machine learning algorithms that predict behavior patterns and recommend proactive solutions.',
        gradientFrom: 'from-yellow-400',
        gradientTo: 'to-orange-500',
        icon: FaServer,
      },
        {
        title: 'Customer Journey Optimization',
        brief: 'Continuous improvement of customer touchpoints and processes.',
        detail: 'Data-driven insights to refine every stage of the customer lifecycle.',
        gradientFrom: 'from-cyan-500',
        gradientTo: 'to-sky-600',
        icon: FaDatabase,
      },
    ],

    benefitsSectionTitle: 'Transform Your Customer Experience',
    benefitsSectionDescription:
      'We deliver comprehensive customer experience solutions that drive loyalty, increase satisfaction, and accelerate business growth through intelligent automation and personalized engagement.',
    benefitsList: [
      'Unlock customer preferences with advanced behavioral analytics',
      'Boost engagement through intelligent personalization strategies',
      'Streamline support workflows with AI-powered automation',
      'Protect customer data with enterprise-grade security protocols',
      'Enable seamless cross-platform experiences and interactions',
      'Achieve measurable improvements in customer satisfaction and retention',
    ],

    galleryTitle: 'Customer Experience Portfolio',
    gallerySubtitle: 'See how we\'ve helped businesses enhance customer satisfaction and exceed expectations.',

    costEstimatorTitle: 'Estimate Your Customer Experience Investment',
    costEstimatorDescription:
      'Use our interactive tool to get a clear and immediate estimate for your customer experience solutions.',
    sliderLabels: {
      vcpu: 'Touchpoint Complexity (%)',
      ram: 'Personalization Memory (GB)',
      storage: 'Customer Data Capacity (GB)',
    },
    totalCostLabel: 'Estimated Monthly Customer Experience Cost',
    contactButton: 'Contact Us for a Custom Quote',

    ctaTitle: 'Ready to Transform Your Customer Experience?',
    ctaParagraph: 'Contact us today to start your customer experience journey and achieve greater loyalty.',
    ctaStartButton: 'Begin Optimization',
    ctaLearnMoreButton: 'Learn More About Us',
  },

  ar: {
    documentTitle: 'حلول تجربة العملاء - حلول الأعمال فورستاكلي',
    heroTitle: 'حلول تجربة العملاء',
    heroParagraph:
      'قدّم تجارب عملاء سلسة وشخصية مدعومة برؤى معتمدة على البيانات، تحليلات متقدمة، وتحسين مستمر لتعزيز الولاء ونمو الأعمال.',
    heroButton: 'اتصل بنا',

    benefitsTitle: 'لماذا تختار حلول تجربة العملاء لدينا؟',
    benefitsCards: [
      {
        title: 'تحليلات العملاء المتقدمة',
        brief: 'رؤى عميقة حول سلوك العملاء وتفضيلاتهم.',
        detail: 'استفد من التحليلات المتطورة لفهم رحلات العملاء وتحسين التجارب.',
        gradientFrom: 'from-indigo-500',
        gradientTo: 'to-blue-600',
        icon: FaCode,
      },
      {
        title: 'محرك التخصيص',
        brief: 'تخصيص التجارب وفقًا لاحتياجات وتفضيلات العملاء الفردية.',
        detail: 'التوصيات المدعومة بالذكاء الاصطناعي وتسليم المحتوى الديناميكي لأقصى تفاعل.',
        gradientFrom: 'from-green-500',
        gradientTo: 'to-teal-600',
        icon: FaLaptopCode,
      },
      {
        title: 'إدارة التفاعل الفوري',
        brief: 'قدرات الاستجابة الفورية عبر جميع نقاط الاتصال مع العملاء.',
        detail: 'دعم متعدد القنوات سلس مع التوجيه الذكي والحفاظ على السياق.',
        gradientFrom: 'from-red-500',
        gradientTo: 'to-pink-600',
        icon: FaMobileAlt,
      },
      {
        title: 'التكامل متعدد القنوات',
        brief: 'تجربة عميل سلسة عبر جميع القنوات والمنصات.',
        detail: 'رسائل ونوعية خدمة متسقة بغض النظر عن طريقة التفاعل المختارة للعميل.',
        gradientFrom: 'from-purple-500',
        gradientTo: 'to-indigo-600',
        icon: FaEye,
      },
      {
        title: 'ذكاء العملاء التنبؤي',
        brief: 'توقع احتياجات العملاء قبل ظهورها.',
        detail: 'خوارزميات التعلم الآلي التي تتنبأ بأنماط السلوك وتوصي بحلول استباقية.',
        gradientFrom: 'from-yellow-400',
        gradientTo: 'to-orange-500',
        icon: FaServer,
      },
      {
        title: 'تحسين رحلة العميل',
        brief: 'التحسين المستمر لنقاط الاتصال مع العملاء والعمليات.',
        detail: 'رؤى معتمدة على البيانات لتحسين كل مرحلة من مراحل دورة حياة العميل.',
        gradientFrom: 'from-cyan-500',
        gradientTo: 'to-sky-600',
        icon: FaDatabase,
      },
    ],

    benefitsSectionTitle: 'حوّل تجربة عملاؤك',
    benefitsSectionDescription:
      'نقدّم حلول شاملة لتجربة العملاء تعزز الولاء وترفع الرضا وتعجّل النمو من خلال الأتمتة الذكية والتفاعل الشخصي.',
    benefitsList: [
      'اكشف تفضيلات العملاء من خلال تحليلات السلوك المتقدمة',
      'عزز التفاعل من خلال استراتيجيات التخصيص الذكية',
      'بسّط سير عمل الدعم مع الأتمتة المدعومة بالذكاء الاصطناعي',
      'حمي بيانات العملاء باستخدام بروتوكولات أمنية على مستوى المؤسسات',
      'مكّن تجارب واجهة سلسة عبر المنصات المختلفة',
      'حقّق تحسينات قابلة للقياس في رضا العملاء والاحتفاظ بهم',
    ],

    galleryTitle: 'محفظة حلول تجربة العملاء',
    gallerySubtitle: 'شاهد كيف ساعدنا الأعمال على تحسين رضا العملاء وتجاوز التوقعات.',

    costEstimatorTitle: 'قدّر استثمارك في تجربة العملاء',
    costEstimatorDescription:
      'استخدم أداتنا التفاعلية للحصول على تقدير واضح وفوري لحلول تغربة العملاء المتخصصة.',
    sliderLabels: {
      vcpu: 'تعقيد نقاط التفاعل (%)',
      ram: 'ذاكرة التخصيص (جيجابايت)',
      storage: 'سعة بيانات العملاء (جيجابايت)',
    },
    totalCostLabel: 'التكلفة الشهرية المقدرة لحلول تجربة العملاء',
    contactButton: 'اتصل بنا لطلب عرض مخصص',

    ctaTitle: 'هل أنت مستعد لتحويل تجربة عملاؤك؟',
    ctaParagraph: 'اتصل بنا اليوم للبدء في رحلة تحسين تجربة العملاء وتحقيق ولاء أكبر.',
    ctaStartButton: 'ابدأ التحسين',
    ctaLearnMoreButton: 'تعرف علينا أكثر',
  },

  he: {
    documentTitle: 'פתרונות חווית לקוח - פתרונות פורסטאקלי לעסקים',
    heroTitle: 'פתרונות חווית לקוח',
    heroParagraph:
      'מספקים חוויות לקוח חלקות ואישיות המונעות על ידי תובנות מונחות נתונים, אנליטיקה מתקדמת ואופטימיזציה מתמשכת לחיזוק נאמנות וצמיחה עסקית.',
    heroButton: 'צור קשר',

    benefitsTitle: 'מדוע לבחור בפתרונות חווית הלקוח שלנו?',
    benefitsCards: [
      {
        title: 'אנליטיקה מתקדמת של לקוחות',
        brief: 'תובנות עמוקות על התנהגות הלקוחות והעדפותיהם.',
        detail: 'מנף אנליטיקה מתקדמת להבנת מסעות הלקוחות ואופטימיזציה של החוויות.',
        gradientFrom: 'from-indigo-500',
        gradientTo: 'to-blue-600',
        icon: FaCode,
      },
      {
        title: 'מנוע ההתאמה האישית',
        brief: 'התאמת חוויות לצרכים ולהעדפות של כל לקוח בנפרד.',
        detail: 'המלצות מונעות בינה מלאכותית ואספקת תוכן דינמי לסימום ההתקשרות.',
        gradientFrom: 'from-green-500',
        gradientTo: 'to-teal-600',
        icon: FaLaptopCode,
      },
      {
        title: 'ניהול אינטראקציה בזמן אמת',
        brief: 'יכולות תגובה מיידיות בכל נקודות המגע עם הלקוח.',
        detail: 'תמיכה רב-ערוצית חלקה עם ניתוב חכם ושימור קונטקסט.',
        gradientFrom: 'from-red-500',
        gradientTo: 'to-pink-600',
        icon: FaMobileAlt,
      },
      {
        title: 'אינטגרציה רב-ערוצית',
        brief: 'חווית לקוח אחידה על פני כל הערוצים והפלטפורמות.',
        detail: 'העברת מסרים ואיכות שירות עקבית ללא קשר לדרך האינטראקציה הנבחרת.',
        gradientFrom: 'from-purple-500',
        gradientTo: 'to-indigo-600',
        icon: FaEye,
      },
      {
        title: 'בינה חיזויית של לקוחות',
        brief: 'צפיית הצרכים של הלקוח לפני שהם מתפתחים.',
        detail: 'אלגוריתמי למידת מכונה שמנבאים דפוסי התנהגות וממליצים על פתרונות פרואקטיביים.',
        gradientFrom: 'from-yellow-400',
        gradientTo: 'to-orange-500',
        icon: FaServer,
      },
      {
        title: 'אופטימיזציה של מסע הלקוח',
        brief: 'שיפור מתמיד של נקודות מגע עם הלקוח ותהליכים.',
        detail: 'תובנות מונחות נתונים לשכלול כל שלב במחזור חיי הלקוח.',
        gradientFrom: 'from-cyan-500',
        gradientTo: 'to-sky-600',
        icon: FaDatabase,
      },
    ],

    benefitsSectionTitle: 'הפוך את חווית הלקוח שלך',
    benefitsSectionDescription:
      'אנו מספקים פתרונות מקיפים לחווית לקוח שמניעים נאמנות, מעלים את שביעות הרצון ומאיצים את הצמיחה העסקית באמצעות אוטומציה חכמה והתקשרות אישית.',
    benefitsList: [
      'גלה העדפות לקוחות עם אנליטיקה מתקדמת של התנהגות',
      'עצום את העניין באמצעות אסטרטגיות התאמה אישית חכמות',
      'הפשט תהליכי תמיכה עם אוטומציה מונעת בינה מלאכותית',
      'הגן על נתוני לקוחות עם פרוטוקולי אבטחה ברמת ארגון',
      'אפשר חוויות חלקות על פני פלטפורמות שונות',
      'השג שיפורים הניתנים למדידה בשביעות רצון הלקוח והחזקתם',
    ],

    galleryTitle: 'פורטפוליו חווית לקוח',
    gallerySubtitle: 'ראה איך עזרנו לעסקים לשפר את שביעות רצון הלקוחות ולעבור הציפיות.',

    costEstimatorTitle: 'הערך את השקעתך בחוויית לקוח',
    costEstimatorDescription:
      'השתמש בכלי ה-interactive שלנו לקבלת הערכה ברורה ומיידית לפתרונות חווית לקוח מותאמים.',
    sliderLabels: {
      vcpu: 'מורכבות נקודות מגע (%)',
      ram: 'זיכרון התאמה אישית (GB)',
      storage: 'קיבולת נתוני לקוח (GB)',
    },
    totalCostLabel: 'עלות חודשית משוערת של חווית לקוח',
    contactButton: 'צור קשר לקבלת הצעת מחיר מותאמת',

    ctaTitle: 'מוכן להפוך את חווית הלקוח שלך?',
    ctaParagraph: 'צור קשר עוד היום להתחלת מסע השיפור בחווית הלקוח והשגת נאמנות רבה יותר.',
    ctaStartButton: 'התחל אופטימיזציה',
    ctaLearnMoreButton: 'למידע נוסף עלינו',
  },
};

const Service5 = () => {
  const { language } = useLanguage();
  const t = translations[language] || translations.en;

  useEffect(() => {
    document.title = t.documentTitle;
  }, [t.documentTitle]);

  const navigate = useNavigate();

  const [vcpu, setVcpu] = useState(8);
  const [ram, setRam] = useState(16);
  const [storage, setStorage] = useState(500);
  const [totalCost, setTotalCost] = useState(0);

  const VCPU_COST = 0.05;
  const RAM_COST = 0.02;
  const STORAGE_COST = 0.0001;

  useEffect(() => {
    const cost = vcpu * VCPU_COST + ram * RAM_COST + storage * STORAGE_COST;
    setTotalCost(cost);
  }, [vcpu, ram, storage]);

  const handleGetQuote = () => {
    navigate('/contact');
  };

  return (
    <div className="service-page">
      <div className="home-page">
        {/* Hero Section */}
        <section className="hero-section">
          <video autoPlay muted loop playsInline className="hero-bg-video">
            <source src="images/service5.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <div className="hero-overlay">
            <div className="hero-content">
              <h1 className="hero-title animate-slide-in">{t.heroTitle}</h1>
              <p className="hero-paragraph animate-fade-up">{t.heroParagraph}</p>
              <Link to="/contact" className="hero-button animate-fade-up-delayed">
                {t.heroButton}
              </Link>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section
          className="py-16 md:py-24 bg-gray-100 dark:bg-gray-800 rounded-xl shadow-inner my-12 text-gray-800 dark:text-gray-200"
          style={{ backgroundColor: 'var(--bg-color)' }}
        >
          <h2 className="text-center text-3xl md:text-4xl font-bold mb-12">{t.benefitsTitle}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4">
            {t.benefitsCards.map(({ title, brief, detail, gradientFrom, gradientTo, icon: Icon }, i) => (
              <div
                key={i}
                className={`group p-8 rounded-2xl shadow-lg transition-transform duration-300 transform cursor-pointer bg-gradient-to-br ${gradientFrom} ${gradientTo}`}
              >
                <div className="flex items-center justify-center w-16 h-16 rounded-full bg-white/20 text-white mb-6 transform group-hover:scale-110 transition-transform">
                  <Icon className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-white">{title}</h3>
                <p className="text-gray-200 transition-opacity duration-300 group-hover:opacity-0">{brief}</p>
                <p className="text-gray-200 opacity-0 max-h-0 group-hover:opacity-100 group-hover:max-h-40 transition-all duration-300 ease-in-out">
                  {detail}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Benefits Detail Section */}
        <section className="section benefits-section">
          <div className="container">
            <div className="grid-2">
              <motion.div
                className="benefits-content"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <h2>{t.benefitsSectionTitle}</h2>
                <p>{t.benefitsSectionDescription}</p>

                <div className="benefits-list">
                  {t.benefitsList.map((benefit, idx) => (
                    <motion.div
                      key={idx}
                      className="benefit-item"
                      initial={{ opacity: 0, x: -30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: idx * 0.1 }}
                      viewport={{ once: true }}
                    >
                      <FaCheck className="check-icon" />
                      <span>{benefit}</span>
                    </motion.div>
                  ))}
                </div>

                <Link to="/contact" className="btn btn-primary">
                  {t.contactButton} <FaArrowRight />
                </Link>
              </motion.div>

              <motion.div
                className="benefits-visual"
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <div className="benefits-image">
                  <img src="images/bs59.jpg" alt="Customer Experience Solutions Visual" />
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Gallery Section */}
        <section className="section gallery-wrapper">
          <div className="container">
            <motion.div
              className="gallery-header"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
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
          <section
            className="py-16 md:py-4 bg-[var(--bg-color)] rounded-xl shadow-2xl my-12 text-[var(--text-color)] transition-colors duration-300"
            style={{ boxShadow: 'var(--shadow)' }}
          >
            <h2 className="text-center text-3xl md:text-4xl font-bold mb-4">{t.costEstimatorTitle}</h2>
            <p className="text-center text-lg text-[var(--text-muted)] max-w-2xl mx-auto mb-12">{t.costEstimatorDescription}</p>

            <div className="max-w-4xl mx-auto p-8 rounded-xl bg-gradient-to-br from-indigo-50 to-blue-100 dark:from-[#1a202c] dark:to-[#2d3748] shadow-xl transition-colors duration-300">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {/* Touchpoint Complexity */}
                <div className="group bg-[var(--card-bg)] dark:bg-[#2d3748] p-6 rounded-xl shadow-lg hover:shadow-[var(--shadow-hover)] transition-all duration-300 border-2 border-yellow-400">
                  <label
                    htmlFor="vcpu-slider"
                    className="block text-xl font-semibold mb-2 text-gray-800 dark:text-white"
                  >
                    {t.sliderLabels.vcpu}
                  </label>
                  <div className="flex items-center space-x-4">
                    <input
                      type="range"
                      id="vcpu-slider"
                      min="1"
                      max="100"
                      value={vcpu}
                      onChange={(e) => setVcpu(Number(e.target.value))}
                      className="w-full h-2 bg-[var(--input-bg)] rounded-lg appearance-none cursor-pointer"
                      style={{ boxShadow: 'var(--shadow)', transition: 'all 0.2s ease-in-out' }}
                    />
                    <span className="w-16 text-center text-xl font-bold text-gray-800 dark:text-white">
                      {vcpu}%
                    </span>
                  </div>
                </div>

                {/* Personalization Memory */}
                <div className="group bg-[var(--card-bg)] dark:bg-[#2d3748] p-6 rounded-xl shadow-lg hover:shadow-[var(--shadow-hover)] transition-all duration-300 border-2 border-yellow-400">
                  <label className="block text-xl font-semibold mb-2 text-gray-800 dark:text-white" htmlFor="ram-slider">{t.sliderLabels.ram}</label>
                  <div className="flex items-center space-x-4">
                    <input
                      type="range"
                      id="ram-slider"
                      min="4"
                      max="64"
                      value={ram}
                      onChange={(e) => setRam(Number(e.target.value))}
                      className="w-full h-2 bg-[var(--input-bg)] rounded-lg appearance-none cursor-pointer"
                      style={{ boxShadow: 'var(--shadow)', transition: 'all 0.2s ease-in-out' }}
                    />
                    <span className="w-16 text-center text-xl font-bold text-gray-800 dark:text-white">
                      {ram} GB
                    </span>
                  </div>
                </div>

                {/* Customer Data Storage */}
                <div className="group bg-[var(--card-bg)] dark:bg-[#2d3748] p-6 rounded-xl shadow-lg hover:shadow-[var(--shadow-hover)] transition-all duration-300 border-2 border-yellow-400">
                  <label htmlFor="storage-slider" className="block text-xl font-semibold mb-2 text-gray-800 dark:text-white">{t.sliderLabels.storage}</label>
                  <div className="flex items-center space-x-4">
                    <input
                      type="range"
                      id="storage-slider"
                      min="100"
                      max="4000"
                      value={storage}
                      onChange={(e) => setStorage(Number(e.target.value))}
                      className="w-full h-2 bg-[var(--input-bg)] rounded-lg appearance-none cursor-pointer"
                      style={{ boxShadow: 'var(--shadow)', transition: 'all 0.2s ease-in-out' }}
                    />
                    <span className="w-16 text-center text-xl font-bold text-gray-800 dark:text-white">
                      {storage} GB
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-12 text-center">
                <p className="text-3xl font-light mb-2 text-gray-800 dark:text-white">
                  {t.totalCostLabel}
                </p>
                <p className="text-5xl md:text-6xl font-extrabold tracking-tight text-gray-800 dark:text-white">
                  ${totalCost.toFixed(2)}
                </p>
                <button
                  onClick={handleGetQuote}
                  className="mt-8 inline-block bg-[#ffd700] hover:bg-[#e6c200] text-black font-bold py-3 px-8 rounded-full shadow-lg transition duration-300 transform hover:scale-105"
                >
                  {t.contactButton}
                </button>
              </div>
            </div>
          </section>
        </main>

        {/* CTA Section */}
        <section className="cta-section">
          <div className="cta-overlay">
            <div className="container">
              <motion.div
                className="cta-content text-center"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <h2>{t.ctaTitle}</h2>
                <p>{t.ctaParagraph}</p>
                <div className="cta-buttons">
                  <Link to="/contact" className="btn btn-primary btn-large">
                    {t.ctaStartButton} <FaArrowRight />
                  </Link>
                  <Link to="/about" className="btn btn-outline btn-large">
                    {t.ctaLearnMoreButton}
                  </Link>
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
    color: #fff; /* ✅ force white text so it's visible on dark video background in light mode */
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
    color: #000;
    background-color: #ffd700;
    border-radius: 10px;
    text-decoration: none;
    border: none;
    transition: background-color 0.3s, transform 0.3s;
    opacity: 0;
    animation: fadeUp 1s ease-out forwards 1.5s;
  }

  .hero-button:hover {
    background-color: #e6c200;
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
    font-size: 1.15rem;                
    background: var(--accent-bg, #e0f7e9); 
    padding: 8px;
    border-radius: 50%;
    box-shadow: 0 0 6px var(--accent-color, #28a745); 
    transition: background 0.3s, color 0.3s;
  }

    /* Light theme (optional, if you use a root variable) */
    :root {
    --accent-color: #111;     
    --accent-bg: #eaeaea;     
  }


  /* Dark theme (assuming body.dark is toggled for dark mode) */
  body.dark .check-icon {
    color: #5cffb1;                          
    background: rgba(40,167,69,0.22);        
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
    background: var(--sidebar-bg); 
    padding: 80px 40px;
    font-family: "Segoe UI", sans-serif;
    transition: background-color 0.3s ease; 
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
  background: url('/images/CTAServices.jpg') center/cover no-repeat fixed; 
  padding: 0 0;
  color: white;
}

  .cta-overlay {
    background-color: rgba(0, 0, 0, 0.5); 
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

            .gallery-row {
  display: flex;
  flex-direction: row;
  gap: 20px;
  align-items: stretch;
  margin-bottom: 40px; 
}
.gallery-row.reverse {
  flex-direction: row-reverse;
  padding-top: 20px; 
}

        `}</style>
        </div>
      </div>
    );
  };

  export default Service5;