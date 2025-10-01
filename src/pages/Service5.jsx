import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
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
} from "react-icons/fa";
import { useLanguage } from "../context.jsx/LanguageContext"; // Adjust path as needed

const translations = {
  en: {
    documentTitle: "Data-Driven Business Intelligence - ForStackly Business Solutions",
    heroTitle: "Customer Experience Solutions",
    heroParagraph:
      "Deliver seamless, personalized customer experiences powered by data-driven insights, advanced analytics, and continuous optimization to foster loyalty and business growth.",
    heroButton: "Contact Us",

    benefitsTitle: "Why Choose Our Data-Driven Business Intelligence Solutions?",
    benefitsCards: [
      {
        title: "Scalable Analytics Architecture",
        brief: "Seamlessly scale your analytics pipelines to accommodate growing data volumes.",
        detail: "Flexible infrastructure designed to evolve with your business needs.",
        gradientFrom: "from-indigo-500",
        gradientTo: "to-blue-600",
        icon: FaCode,
      },
      {
        title: "Robust Data Security",
        brief: "Protect your sensitive data with advanced encryption, access controls, and compliance monitoring.",
        detail: "Maintain trust and meet regulatory standards.",
        gradientFrom: "from-green-500",
        gradientTo: "to-teal-600",
        icon: FaLaptopCode,
      },
      {
        title: "Optimized Performance",
        brief: "Deliver fast, reliable analytics for timely and confident decision making.",
        detail: "Dynamic resource allocation during peak processing.",
        gradientFrom: "from-red-500",
        gradientTo: "to-pink-600",
        icon: FaMobileAlt,
      },
      {
        title: "Proactive Monitoring",
        brief: "Continuously observe your data pipelines and analytic processes.",
        detail: "Early detection and rapid resolution of anomalies.",
        gradientFrom: "from-purple-500",
        gradientTo: "to-indigo-600",
        icon: FaEye,
      },
      {
        title: "Seamless Integration",
        brief: "Connect with numerous data sources and analytics platforms effortlessly.",
        detail: "Flexible and adaptable to diverse business requirements.",
        gradientFrom: "from-yellow-400",
        gradientTo: "to-orange-500",
        icon: FaServer,
      },
      {
        title: "24/7 Analytics Support",
        brief: "Dedicated expert support to keep your analytics running seamlessly.",
        detail: "Ensures consistent, reliable insights around the clock.",
        gradientFrom: "from-cyan-500",
        gradientTo: "to-sky-600",
        icon: FaDatabase,
      },
    ],

    benefitsSectionTitle: "Why Choose Our Business Intelligence Services?",
    benefitsSectionDescription:
      "We provide next-generation BI platforms that unlock, secure, and visualize the value hiding in your data for accelerated business success.",
    benefitsList: [
      "Reveal growth opportunities with deep, data-driven insights",
      "Respond to trends and challenges using real-time intelligence",
      "Streamline operations and optimize performance with predictive analytics",
      "Protect sensitive information with world-class data governance",
      "Give every team member the tools for confident data exploration",
      "Achieve business agility and lasting strategic advantage",
    ],

    galleryTitle: "BI Project Portfolio",
    gallerySubtitle: "See how we’ve helped businesses grow with innovative BI and analytics solutions.",

    costEstimatorTitle: "Estimate Your Analytics Investment",
    costEstimatorDescription:
      "Use our interactive tool to obtain a clear and immediate estimate for your business intelligence analytics needs.",
    sliderLabels: {
      vcpu: "Model Complexity (%)",
      ram: "Processing Memory (GB)",
      storage: "Data Storage Capacity (GB)",
    },
    totalCostLabel: "Estimated Monthly BI Analytics Cost",
    contactButton: "Contact Us for a Custom Quote",

    ctaTitle: "Ready to Accelerate Your Business Intelligence?",
    ctaParagraph:
      "Contact us today to power your growth with next-generation analytics and actionable intelligence.",
    ctaStartButton: "Start Your Data Journey",
    ctaLearnMoreButton: "Learn More About Us",
  },

  ar: {
    documentTitle: "[translate:ج.Business Intelligence المدعوم بالبيانات - حلول الأعمال فورستاكلي]",
    heroTitle: "[translate:حلول تجربة العملاء]",
    heroParagraph:
      "[translate:قدّم تجارب عملاء سلسة وشخصية مدعومة برؤى معتمدة على البيانات، تحليلات متقدمة، وتحسين مستمر لتعزيز الولاء ونمو الأعمال.]",
    heroButton: "[translate:اتصل بنا]",

    benefitsTitle: "[translate:لماذا تختار حلول الذكاء التجاري المدعوم بالبيانات؟]",
    benefitsCards: [
      {
        title: "[translate:بنية تحليلات قابلة للتوسع]",
        brief: "[translate:قم بتوسيع خطوط التحليلات بسلاسة لاستيعاب كميات بيانات متزايدة.]",
        detail: "[translate:بنية تحتية مرنة مصممة للتطور مع احتياجات عملك.]",
        gradientFrom: "from-indigo-500",
        gradientTo: "to-blue-600",
        icon: FaCode,
      },
      {
        title: "[translate:أمان بيانات قوي]",
        brief: "[translate:حماية بياناتك الحساسة باستخدام التشفير المتقدم، ضوابط الوصول، ورصد الامتثال.]",
        detail: "[translate:الحفاظ على الثقة والامتثال للمعايير التنظيمية.]",
        gradientFrom: "from-green-500",
        gradientTo: "to-teal-600",
        icon: FaLaptopCode,
      },
      {
        title: "[translate:أداء محسن]",
        brief: "[translate:تقديم تحليلات سريعة وموثوقة لاتخاذ القرارات بثقة وفي الوقت المناسب.]",
        detail: "[translate:تخصيص الموارد الديناميكي خلال فترات الذروة.]",
        gradientFrom: "from-red-500",
        gradientTo: "to-pink-600",
        icon: FaMobileAlt,
      },
      {
        title: "[translate:مراقبة استباقية]",
        brief: "[translate:مراقبة مستمرة لأنابيب البيانات والعمليات التحليلية.]",
        detail: "[translate:الكشف المبكر وحل الانحرافات بسرعة.]",
        gradientFrom: "from-purple-500",
        gradientTo: "to-indigo-600",
        icon: FaEye,
      },
      {
        title: "[translate:تكامل سلس]",
        brief: "[translate:الاتصال بسهولة بمصادر بيانات ومنصات تحليل متعددة.]",
        detail: "[translate:مرونة وقابلية التكيف مع متطلبات أعمال متنوعة.]",
        gradientFrom: "from-yellow-400",
        gradientTo: "to-orange-500",
        icon: FaServer,
      },
      {
        title: "[translate:دعم التحليلات 24/7]",
        brief: "[translate:دعم خبير مخصص للحفاظ على سير التحليلات بسلاسة.]",
        detail: "[translate:ضمان رؤى موثوقة ومتواصلة طوال الوقت.]",
        gradientFrom: "from-cyan-500",
        gradientTo: "to-sky-600",
        icon: FaDatabase,
      },
    ],

    benefitsSectionTitle: "[translate:لماذا تختار خدمات ذكاء الأعمال لدينا؟]",
    benefitsSectionDescription:
      "[translate:نقدم منصات ذكاء أعمال متقدمة تؤمن البيانات وتكشف قيمتها لتسريع نجاح الأعمال.]",
    benefitsList: [
      "[translate:كشف فرص النمو من خلال رؤى عميقة مستندة إلى البيانات]",
      "[translate:التفاعل مع الاتجاهات والتحديات من خلال ذكاء فوري]",
      "[translate:تحسين العمليات والأداء باستخدام تحليلات تنبؤية]",
      "[translate:حماية المعلومات الحساسة بحوكمة بيانات على مستوى عالمي]",
      "[translate:تمكين جميع أعضاء الفريق من أدوات استكشاف البيانات بثقة]",
      "[translate:تحقيق مرونة الأعمال وميزة استراتيجية دائمة]",
    ],

    galleryTitle: "[translate:محفظة مشاريع ذكاء الأعمال]",
    gallerySubtitle: "[translate:شاهد كيف ساعدنا الأعمال على النمو بحلول ذكاء الأعمال والتحليلات المبتكرة.]",

    costEstimatorTitle: "[translate:قدّر استثمارك في التحليلات]",
    costEstimatorDescription: "[translate:استخدم أداتنا التفاعلية للحصول على تقدير فوري وواضح لمتطلبات تحليلات ذكاء الأعمال.]",
    sliderLabels: {
      vcpu: "[translate:تعقيد النموذج (%)]",
      ram: "[translate:ذاكرة المعالجة (جيجابايت)]",
      storage: "[translate:سعة تخزين البيانات (جيجابايت)]",
    },
    totalCostLabel: "[translate:التكلفة الشهرية المقدرة لتحليلات ذكاء الأعمال]",
    contactButton: "[translate:اتصل بنا لطلب عرض مخصص]",

    ctaTitle: "[translate:هل أنت مستعد لتعزيز ذكاء أعمالك؟]",
    ctaParagraph: "[translate:اتصل بنا اليوم لتعزيز نموك باستخدام تحليلات متقدمة وذكاء قابل للتنفيذ.]",
    ctaStartButton: "[translate:ابدأ رحلتك]", 
    ctaLearnMoreButton: "[translate:تعرف علينا أكثر]",
  },

  he: {
    documentTitle:
      "[translate:ניתוח עסקי מונחה נתונים - פתרונות פורסטאקלי לעסקים]",
    heroTitle: "[translate:פתרונות חווית לקוח]",
    heroParagraph:
      "[translate:מספקים חוויות לקוח חלקות ואישיות המונעות על ידי תובנות מונחות נתונים, אנליטיקה מתקדמת ואופטימיזציה מתמשכת לחיזוק נאמנות וצמיחה עסקית.]",
    heroButton: "[translate:צור קשר]",

    benefitsTitle:
      "[translate:מדוע לבחור בפתרונות ניהול עסק מונחי נתונים שלנו?]",
    benefitsCards: [
      {
        title: "[translate:ארכיטקטורת אנליטיקה ניתנת להרחבה]",
        brief:
          "[translate:הרחב את צינורות האנליטיקה שלך בקלות להתמודדות עם נפחי נתונים גדלים.]",
        detail: "[translate:תשתית גמישה המתוכננת להתפתח עם צורכי העסק שלך.]",
        gradientFrom: "from-indigo-500",
        gradientTo: "to-blue-600",
        icon: FaCode,
      },
      {
        title: "[translate:אבטחת נתונים חזקה]",
        brief:
          "[translate:הגן על הנתונים הרגישים שלך עם הצפנה מתקדמת, בקרות גישה ומעקב תאימות.]",
        detail: "[translate:שמור על אמון ועמידה בתקנים רגולטוריים.]",
        gradientFrom: "from-green-500",
        gradientTo: "to-teal-600",
        icon: FaLaptopCode,
      },
      {
        title: "[translate:ביצועים מותאמים]",
        brief:
          "[translate:ספק אנליטיקה מהירה ואמינה לקבלת החלטות בזמן ובביטחון.]",
        detail: "[translate:הקצאת משאבים דינמית בשיא העומס.]",
        gradientFrom: "from-red-500",
        gradientTo: "to-pink-600",
        icon: FaMobileAlt,
      },
      {
        title: "[translate:ניטור פרואקטיבי]",
        brief:
          "[translate:השגחה רציפה על תהליכי הנתונים והאנליטיקה שלך.]",
        detail: "[translate:זיהוי מוקדם ופתרון מהיר של אנומליות.]",
        gradientFrom: "from-purple-500",
        gradientTo: "to-indigo-600",
        icon: FaEye,
      },
      {
        title: "[translate:אינטגרציה חלקה]",
        brief:
          "[translate:חיבור קל בין מקורות נתונים ופלטפורמות אנליטיות שונות.]",
        detail: "[translate:גמישות והתאמה לדרישות עסק מגוונות.]",
        gradientFrom: "from-yellow-400",
        gradientTo: "to-orange-500",
        icon: FaServer,
      },
      {
        title: "[translate:תמיכה באנליטיקה 24/7]",
        brief:
          "[translate:תמיכה מקצועית ייעודית לשמירת פעילות רציפה ואמינה של האנליטיקה.]",
        detail: "[translate:הבטחת תובנות אמינות וזמינות מסביב לשעון.]",
        gradientFrom: "from-cyan-500",
        gradientTo: "to-sky-600",
        icon: FaDatabase,
      },
    ],

    benefitsSectionTitle:
      "[translate:מדוע לבחור בשירותי מדעי הנתונים והאנליטיקה שלנו?]",
    benefitsSectionDescription:
      "[translate:אנו מספקים פלטפורמות BI מתקדמות שמאפשרות חשיפת ערך, אבטחת מידע והמחשת תובנות לצמיחה עסקית מהירה.]",
    benefitsList: [
      "[translate:חשיפת מגמות והזדמנויות מתוך נתוני ארגון גולמיים]",
      "[translate:קבלת BI בזמן אמת להובלה בענף שלך]",
      "[translate:אופטימיזציה של קבלת החלטות באמצעות אנליטיקה חזויה ומייעצת]",
      "[translate:שמירה על פרטיות ואבטחת מידע ברמה הגבוהה ביותר]",
      "[translate:העצמת צוותים לחקירת נתונים ללא צורך במומחיות טכנית]",
      "[translate:תמיכה בצמיחה קיימת באמצעות פעולות אסטרטגיות מבוססות נתונים]",
    ],

    galleryTitle: "[translate:פורטפוליו פרויקטים ל-BI]",
    gallerySubtitle:
      "[translate:חקור את ההיסטוריה שלנו בקידום צמיחה עסקית דרך יוזמות BI מוצלחות.]",

    costEstimatorTitle: "[translate:הערך את ההשקעה האנליטית שלך]",
    costEstimatorDescription:
      "[translate:השתמש בכלי האינטראקטיבי שלנו לקבלת הערכה מדויקת ומהירה לצרכי תשתית BI מונחה נתונים.]",
    sliderLabels: {
      vcpu: "[translate:מורכבות מודל (%)]",
      ram: "[translate:זיכרון עיבוד (GB)]",
      storage: "[translate:קיבולת אחסון נתונים (GB)]",
    },
    totalCostLabel: "[translate:עלות BI חודשית מוערכת]",
    contactButton: "[translate:צור קשר לקבלת הצעת מחיר מותאמת]",

    ctaTitle: "[translate:מוכן להאיץ את BI העסקי שלך?]",
    ctaParagraph:
      "[translate:צור קשר עוד היום להניע את הצמיחה שלך עם אנליטיקה מתקדמת ותובנות אפקטיביות.]",
    ctaStartButton: "[translate:התחל את המסע שלך]",
    ctaLearnMoreButton: "[translate:למידע נוסף עלינו]",
  },
};

const Service1 = () => {
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
    navigate("/contact");
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

        {/* Features/Benefits Cards */}
        <section
          className="py-16 md:py-24 bg-gray-100 dark:bg-gray-800 rounded-xl shadow-inner my-12 text-gray-800 dark:text-gray-200"
          style={{ backgroundColor: "var(--bg-color)" }}
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

        {/* Benefits Section */}
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
                  <img src="images/bs59.jpg" alt="Data-Driven BI Visual" />
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
            className="py-16 md:py-4 bg-[var(--bg-color)] rounded-xl shadow-2xl my-12 text-[var(--text-color)] transition-colors"
            style={{ boxShadow: "var(--shadow)" }}
          >
            <h2 className="text-center text-3xl md:text-4xl font-bold mb-4">{t.costEstimatorTitle}</h2>
            <p className="text-center text-lg text-[var(--text-muted)] max-w-2xl mx-auto mb-12">{t.costEstimatorDescription}</p>
            <div className="max-w-4xl mx-auto p-8 rounded-xl bg-gradient-to-br from-indigo-50 to-blue-100 dark:from-[#1a202c] dark:to-[#2d3748] shadow-xl transition-colors duration-300">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <div className="group bg-[var(--card-bg)] dark:bg-[#2d3748] p-6 rounded-xl shadow-lg hover:shadow-[var(--shadow-hover)] transition-all duration-300 border-2 border-yellow-400">
                  <label htmlFor="vcpu-slider" className="block text-xl font-semibold mb-2 text-gray-800 dark:text-white">
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
                      style={{ boxShadow: "var(--shadow)", transition: "all 0.2s ease-in-out" }}
                    />
                    <span className="w-16 text-center text-xl font-bold text-gray-800 dark:text-white">
                      {vcpu}%
                    </span>
                  </div>
                </div>
                <div className="group bg-[var(--card-bg)] dark:bg-[#2d3748] p-6 rounded-xl shadow-lg hover:shadow-[var(--shadow-hover)] transition-all duration-300 border-2 border-yellow-400">
                  <label htmlFor="ram-slider" className="block text-xl font-semibold mb-2 text-gray-800 dark:text-white">
                    {t.sliderLabels.ram}
                  </label>
                  <div className="flex items-center space-x-4">
                    <input
                      type="range"
                      id="ram-slider"
                      min="1"
                      max="256"
                      value={ram}
                      onChange={(e) => setRam(Number(e.target.value))}
                      className="w-full h-2 bg-[var(--input-bg)] rounded-lg appearance-none cursor-pointer"
                      style={{ boxShadow: "var(--shadow)", transition: "all 0.2s ease-in-out" }}
                    />
                    <span className="w-16 text-center text-xl font-bold text-gray-800 dark:text-white">
                      {ram} GB
                    </span>
                  </div>
                </div>
                <div className="group bg-[var(--card-bg)] dark:bg-[#2d3748] p-6 rounded-xl shadow-lg hover:shadow-[var(--shadow-hover)] transition-all duration-300 border-2 border-yellow-400">
                  <label htmlFor="storage-slider" className="block text-xl font-semibold mb-2 text-gray-800 dark:text-white">
                    {t.sliderLabels.storage}
                  </label>
                  <div className="flex items-center space-x-4">
                    <input
                      type="range"
                      id="storage-slider"
                      min="10"
                      max="5000"
                      value={storage}
                      onChange={(e) => setStorage(Number(e.target.value))}
                      className="w-full h-2 bg-[var(--input-bg)] rounded-lg appearance-none cursor-pointer"
                      style={{ boxShadow: "var(--shadow)", transition: "all 0.2s ease-in-out" }}
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
            font-size: 1.9rem;
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
  background: url('/images/CTAServices.jpg') center/cover no-repeat fixed; /* fixed background */
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
    background: #ffd700;
    color: #000;
  }

  .btn-primary:hover {
    background: #e6c200;
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
