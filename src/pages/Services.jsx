import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCheck, FaArrowRight } from 'react-icons/fa';
import { FiCode, FiLayout, FiTrendingUp } from 'react-icons/fi';
import { useLanguage } from '../context.jsx/LanguageContext'; // Assuming your language context path

const translations = {
  en: {
    heroTitle: "Our Services",
    heroParagraph:
      "We deliver comprehensive business solutions spanning strategic consulting, technology implementation, and ongoing support to drive innovation and operational excellence.",
    heroButton: "Reach Out Today",

    servicesList: [
      "Cloud Migration & Management",
      "Cybersecurity & Risk Assessment",
      "Custom Software Development",
      "Data Analytics & AI Solutions",
      "24/7 IT Support & Monitoring",
      "DevOps Automation & Consulting",
      "Enterprise Network Architecture",
    ],

    drivingGrowthTitle: "Driving Growth Through Business Solutions",
    drivingGrowthParagraph:
      "We deliver end-to-end business and technology solutions designed to help organizations innovate, optimize operations, and achieve measurable outcomes. By combining strategic insight with modern IT expertise, we empower companies to stay agile and competitive in a rapidly changing digital landscape.",

    whatIOfferTitle: "What I Offer",
    whatIOfferParagraph:
      "Our services are designed to align with your goals, ensuring innovation, efficiency, and long-term success.",

    itServices: [
      {
        title: "Digital Transformation Consulting",
        description:
          "Guiding organizations through digital transformation with strategies that unlock new revenue streams.",
        features: [
          "Business Process Reengineering",
          "Technology Roadmaps",
          "Change Management Strategies",
        ],
        isNew: true,
        color: "#1e90ff",
        image: "images/bs44.jpg",
        icon: FiCode,
      },
      {
        title: "Enterprise IT Modernization",
        description:
          "Upgrading legacy infrastructures with modern, secure, and scalable IT solutions tailored to enterprise demands.",
        features: [
          "Legacy System Integration",
          "Hybrid & Multi-Cloud Architectures",
          "Scalable Infrastructure Planning",
        ],
        isNew: true,
        color: "#008000",
        image: "images/bs33.jpg",
        icon: FiLayout,
      },
      {
        title: "Cybersecurity & Risk Management",
        description:
          "Protecting digital ecosystems through advanced risk assessment and compliance-driven frameworks.",
        features: [
          "Threat Intelligence & Monitoring",
          "Zero Trust Security Models",
          "Regulatory Compliance Solutions",
        ],
        isNew: true,
        color: "#800080",
        image: "images/bs34.jpg",
        icon: FiTrendingUp,
      },
      {
        title: "Data-Driven Business Intelligence",
        description:
          "Empowering enterprises with data analytics, AI insights, and predictive modeling for smarter decision-making.",
        features: [
          "Predictive & Prescriptive Analytics",
          "Big Data Warehousing",
          "Custom BI Dashboards",
        ],
        isNew: true,
        color: "#ff8c00",
        image: "images/bs35.jpg",
        icon: FiCode,
      },
      {
        title: "Customer Experience Solutions",
        description:
          "Enhancing customer engagement through integrated digital platforms and personalized service strategies.",
        features: [
          "Omnichannel Engagement Platforms",
          "User Experience Design",
          "CRM Optimization",
        ],
        isNew: true,
        color: "#20b2aa",
        image: "images/bs36.jpg",
        icon: FiLayout,
      },
      {
        title: "Managed IT & Support Services",
        description:
          "Delivering round-the-clock IT management, monitoring, and proactive support for business operations.",
        features: [
          "24/7 Remote Monitoring",
          "Disaster Recovery Planning",
          "Proactive IT Maintenance",
        ],
        isNew: true,
        color: "#ff4500",
        image: "images/bs37.jpg",
        icon: FiTrendingUp,
      },
    ],

    portfolioTitle: "Our Portfolio",
    portfolioDescription:
      "A showcase of business solutions delivered across diverse industries",
    portfolioCategories: [
      "All",
      "Digital Transformation",
      "Cloud Solutions",
      "Cybersecurity",
      "Data Analytics",
      "Custom Software",
      "CX Solutions",
    ],

    caseStudiesTitle: "See Our Work in Action",
    caseStudiesParagraph:
      "We've helped clients across various industries achieve their goals. Here are a few examples of our success stories.",
    caseStudiesViewDetails: "View Details →",

    pricingTitle: "Flexible Pricing for Tailored Business Solutions",
    pricingParagraph:
      "Choose the plan that best fits your organization's technology goals and growth ambitions — from startups to enterprise scale.",
    pricingMonthly: "Monthly",
    pricingYearly: "Yearly",

    pricingPlans: {
      starter: {
        title: "Starter",
        description:
          "Essential IT solutions for emerging businesses looking to establish a strong digital foundation.",
        features: [
          "Cloud Infrastructure Setup",
          "Basic Cybersecurity Framework",
          "Automated Data Backup",
          "Dedicated Support & Monitoring",
        ],
        buttonText: "Get Started",
      },
      growth: {
        title: "Growth",
        description:
          "Advanced solutions to scale your business with integrated analytics and automation.",
        features: [
          "Everything in Starter",
          "AI-Powered Automation",
          "Comprehensive Cybersecurity & Risk Management",
          "Priority Client Support",
        ],
        buttonText: "Learn More",
        popularBadge: "Most Popular",
      },
      enterprise: {
        title: "Enterprise",
        description:
          "Custom-tailored solutions with dedicated teams and SLA guarantees for complex enterprise needs.",
        features: [
          "Dedicated Project Leadership",
          "Bespoke Software & Systems Integration",
          "Enterprise-Grade Cybersecurity & Compliance",
          "SLA & 24/7 Premium Support",
        ],
        buttonText: "Contact Us",
      },
    },

    ctaTitle: "Ready to Transform Your Business?",
    ctaParagraph:
      "Get started today with a free consultation and discover how we can help you achieve your goals.",
    ctaStartButton: "Start Your Journey",
    ctaLearnMoreButton: "Learn More About Us",
  },

  ar: {
    heroTitle: "تمكين أعمالك",
    heroParagraph:
      "نDeliver comprehensive حلول الأعمال بما في ذلك الاستشارات الإستراتيجية وتنفيذ التكنولوجيا والدعم المستمر لتعزيز الابتكار والتميز التشغيلي.",
    heroButton: "تواصل معنا اليوم",

    servicesList: [
      "الهجرة وإدارة السحابة",
      "الأمن السيبراني وتقييم المخاطر",
      "تطوير البرمجيات المخصصة",
      "تحليلات البيانات وحلول الذكاء الاصطناعي",
      "الدعم الفني والمراقبة على مدار الساعة",
      "الأتمتة واستشارات ديف أوبس",
      "هندسة الشبكات المؤسسية",
    ],

    drivingGrowthTitle: "تحقيق النمو من خلال حلول الأعمال",
    drivingGrowthParagraph:
      "نقدم حلول أعمال وتكنولوجيا متكاملة تساعد المنظمات على الابتكار وتحسين العمليات وتحقيق نتائج قابلة للقياس. من خلال الجمع بين الرؤية الإستراتيجية والخبرة التقنية الحديثة، نمكّن الشركات من البقاء مرنة وتنافسية في ظل بيئة رقمية سريعة التغير.",

    whatIOfferTitle: "ما أقدمه",
    whatIOfferParagraph:
      "تم تصميم خدماتنا لتتوافق مع أهدافك، مع ضمان الابتكار والكفاءة والنجاح على المدى الطويل.",

    itServices: [
      {
        title: "استشارات التحول الرقمي",
        description:
          "توجيه المؤسسات عبر التحول الرقمي باستراتيجيات تفتح مصادر جديدة للدخل.",
        features: [
          "إعادة هندسة العمليات التجارية",
          "خرائط طريق التكنولوجيا",
          "استراتيجيات إدارة التغيير",
        ],
        isNew: true,
        color: "#1e90ff",
        image: "images/bs44.jpg",
        icon: FiCode,
      },
      {
        title: "تحديث تكنولوجيا المعلومات للمؤسسات",
        description:
          "تحديث البنى التحتية القديمة بحلول آمنة وقابلة للتطوير تلبي متطلبات المؤسسات.",
        features: [
          "تكامل الأنظمة القديمة",
          "البنى الهجينة ومتعددة السحابة",
          "تخطيط البنى التحتية القابلة للتوسع",
        ],
        isNew: true,
        color: "#008000",
        image: "images/bs33.jpg",
        icon: FiLayout,
      },
      {
        title: "الأمن السيبراني وإدارة المخاطر",
        description:
          "حماية النظم الرقمية من خلال تقييم المخاطر المتقدم وأطر العمل القائمة على الامتثال.",
        features: [
          "مراقبة واستخبارات التهديدات",
          "نماذج أمان الثقة الصفرية",
          "حلول الامتثال التنظيمي",
        ],
        isNew: true,
        color: "#800080",
        image: "images/bs34.jpg",
        icon: FiTrendingUp,
      },
      {
        title: "الذكاء التجاري المبني على البيانات",
        description:
          "تمكين المؤسسات من خلال تحليلات البيانات، ورؤى الذكاء الاصطناعي، ونمذجة التنبؤ لاتخاذ قرارات أذكى.",
        features: [
          "التحليلات التنبؤية والوصفية",
          "مستودعات البيانات الكبيرة",
          "لوحات معلومات ذكاء الأعمال المخصصة",
        ],
        isNew: true,
        color: "#ff8c00",
        image: "images/bs35.jpg",
        icon: FiCode,
      },
      {
        title: "حلول تجربة العملاء",
        description:
          "تعزيز تفاعل العملاء من خلال منصات رقمية متكاملة واستراتيجيات خدمة مخصصة.",
        features: [
          "منصات التفاعل متعددة القنوات",
          "تصميم تجربة المستخدم",
          "تحسين إدارة علاقات العملاء",
        ],
        isNew: true,
        color: "#20b2aa",
        image: "images/bs36.jpg",
        icon: FiLayout,
      },
      {
        title: "خدمات إدارة ودعم تكنولوجيا المعلومات",
        description:
          "توفير إدارة ومراقبة تقنية على مدار الساعة ودعم استباقي لعمليات الأعمال.",
        features: [
          "المراقبة عن بعد 24/7",
          "تخطيط التعافي من الكوارث",
          "الصيانة الاستباقية لتكنولوجيا المعلومات",
        ],
        isNew: true,
        color: "#ff4500",
        image: "images/bs37.jpg",
        icon: FiTrendingUp,
      },
    ],

    portfolioTitle: "مشاريعنا",
    portfolioDescription:
      "عرض لحلول الأعمال المقدمة عبر صناعات متنوعة",
    portfolioCategories: [
      "الكل",
      "التحول الرقمي",
      "حلول السحابة",
      "الأمن السيبراني",
      "تحليلات البيانات",
      "البرمجيات المخصصة",
      "حلول تجربة العملاء",
    ],

    caseStudiesTitle: "شاهد عملنا في الواقع",
    caseStudiesParagraph:
      "ساعدنا عملاء من مختلف الصناعات على تحقيق أهدافهم. إليك بعض أمثلة نجاحنا.",
    caseStudiesViewDetails: "عرض التفاصيل →",

    pricingTitle: "أسعار مرنة لحلول أعمال مخصصة",
    pricingParagraph:
      "اختر الخطة التي تناسب أهداف التكنولوجيا ونمو مؤسستك — من الشركات الناشئة إلى المؤسسات الكبرى.",
    pricingMonthly: "شهريًا",
    pricingYearly: "سنويًا",

    pricingPlans: {
      starter: {
        title: "البدء",
        description:
          "حلول تقنية أساسية للشركات الناشئة التي تسعى إلى تأسيس قاعدة رقمية قوية.",
        features: [
          "إعداد بنية تحتية سحابية",
          "إطار عمل أمني أساسي",
          "نسخ احتياطي آلي للبيانات",
          "دعم ومراقبة مخصصة",
        ],
        buttonText: "ابدأ الآن",
      },
      growth: {
        title: "النمو",
        description:
          "حلول متقدمة لتوسيع نطاق عملك مع تحليلات متكاملة وأتمتة.",
        features: [
          "كل شيء في خطة البدء",
          "أتمتة مدعومة بالذكاء الاصطناعي",
          "إدارة أمنية شاملة وتقييم المخاطر",
          "دعم أولوية للعملاء",
        ],
        buttonText: "تعرف أكثر",
        popularBadge: "الأكثر شعبية",
      },
      enterprise: {
        title: "المؤسسات",
        description:
          "حلول مخصصة مع فرق مخصصة وضمانات اتفاقية مستوى الخدمة للاحتياجات المعقدة.",
        features: [
          "قيادة مشاريع مخصصة",
          "البرمجيات المخصصة وتكامل النظم",
          "أمن مؤسسي وتوافق مع المعايير",
          "دعم مميز 24/7",
        ],
        buttonText: "اتصل بنا",
      },
    },

    ctaTitle: "هل أنت جاهز لتحويل عملك؟",
    ctaParagraph:
      "ابدأ اليوم باستشارة مجانية واكتشف كيف يمكننا مساعدتك في تحقيق أهدافك.",
    ctaStartButton: "ابدأ رحلتك",
    ctaLearnMoreButton: "تعرف أكثر علينا",
  },

  he: {
    heroTitle: "העצמת העסק שלך",
    heroParagraph:
      "אנו מסייעים לעסקים לפתח צוותים זריזים שמאיצים חדשנות, משפרים שיתוף פעולה ומביאים פתרונות בזמן לשוק. הפוך את כוח העבודה שלך למותאם, מופעל ומכוון למטרות העסקיות שלך.",
    heroButton: "צור קשר היום",

    servicesList: [
      "הגירה וניהול ענן",
      "אבטחת סייבר והערכת סיכונים",
      "פיתוח תוכנה מותאם",
      "אנליטיקה מבוססת נתונים ופתרונות AI",
      "תמיכה ומעקב 24/7",
      "אוטומציה וייעוץ DevOps",
      "ארכיטקטורת רשת ארגונית",
    ],

    drivingGrowthTitle: "קידום צמיחה באמצעות פתרונות עסקיים",
    drivingGrowthParagraph:
      "אנו מספקים פתרונות עסקיים וטכנולוגיים מקיפים המסייעים לארגונים לחדש, לייעל תהליכים ולהשיג תוצאות מדידות. בשילוב בין תובנות אסטרטגיות עם מומחיות IT מודרנית, אנו מעצימים חברות להישאר גמישות ותחרותיות בשוק דיגיטלי משתנה במהירות.",

    whatIOfferTitle: "מה אני מציע",
    whatIOfferParagraph:
      "השירותים שלנו מותאמים למטרות שלך, ומבטיחים חדשנות, יעילות והצלחה ארוכת טווח.",

    itServices: [
      {
        title: "ייעוץ טרנספורמציה דיגיטלית",
        description:
          "הדרכת ארגונים בתהליך טרנספורמציה דיגיטלית עם אסטרטגיות ליצירת מקורות הכנסה חדשים.",
        features: [
          "רה-אינג'ינירינג של תהליכים עסקיים",
          "מפות דרכים טכנולוגיות",
          "אסטרטגיות ניהול שינוי",
        ],
        isNew: true,
        color: "#1e90ff",
        image: "images/bs44.jpg",
        icon: FiCode,
      },
      {
        title: "מודרניזציה של IT ארגוני",
        description:
          "שדרוג תשתיות מיושנות עם פתרונות IT מודרניים, מאובטחים וניתנים להרחבה בהתאמה לצרכי הארגון.",
        features: [
          "אינטגרציה של מערכות מיושנות",
          "ארכיטקטורות היברידיות וריבוי עננים",
          "תכנון תשתיות מתקדמות וניתנות להרחבה",
        ],
        isNew: true,
        color: "#008000",
        image: "images/bs33.jpg",
        icon: FiLayout,
      },
      {
        title: "ניהול סיכונים ואבטחת סייבר",
        description:
          "הגנה על מערכות דיגיטליות באמצעות הערכת סיכונים מתקדמת ומסגרות רגולטוריות.",
        features: [
          "מודיעין ומעקב איומים",
          "מודלים של אבטחת Zero Trust",
          "פתרונות תאימות רגולטורית",
        ],
        isNew: true,
        color: "#800080",
        image: "images/bs34.jpg",
        icon: FiTrendingUp,
      },
      {
        title: "בינה עסקית מבוססת נתונים",
        description:
          "העצמת ארגונים עם אנליטיקה, תובנות AI ומודלים מתקדמים לקבלת החלטות חכמות יותר.",
        features: [
          "אנליטיקות פרדיקטיביות ופרסקריפטיביות",
          "אחסון נתונים גדול",
          "לוחות BI מותאמים אישית",
        ],
        isNew: true,
        color: "#ff8c00",
        image: "images/bs35.jpg",
        icon: FiCode,
      },
      {
        title: "פתרונות חווית לקוח",
        description:
          "שיפור מעורבות הלקוחות באמצעות פלטפורמות דיגיטליות משולבות ואסטרטגיות שירות מותאמות.",
        features: [
          "פלטפורמות מעורבות רב-ערוציות",
          "עיצוב חווית משתמש",
          "אופטימיזציית CRM",
        ],
        isNew: true,
        color: "#20b2aa",
        image: "images/bs36.jpg",
        icon: FiLayout,
      },
      {
        title: "שירותי ניהול ותמיכה ב-IT",
        description:
          "מתן ניהול IT, מעקב ותמיכה פרואקטיבית 24/7 לפעילות עסקית.",
        features: [
          "מעקב מרחוק 24/7",
          "תכנון התאוששות מאסונות",
          "תחזוקת IT פרואקטיבית",
        ],
        isNew: true,
        color: "#ff4500",
        image: "images/bs37.jpg",
        icon: FiTrendingUp,
      },
    ],

    portfolioTitle: "הפורטפוליו שלנו",
    portfolioDescription:
      "תצוגה של פתרונות עסקיים שסופקו במגוון תעשיות",
    portfolioCategories: [
      "הכל",
      "טרנספורמציה דיגיטלית",
      "פתרונות ענן",
      "אבטחת סייבר",
      "אנליטיקה מבוססת נתונים",
      "תוכנה מותאמת",
      "פתרונות חוויית לקוח",
    ],

    caseStudiesTitle: "ראו את העבודה שלנו בפועל",
    caseStudiesParagraph:
      "עזרנו ללקוחות במגוון תעשיות להשיג את יעדיהם. להלן כמה סיפורי הצלחה שלנו.",
    caseStudiesViewDetails: "צפה בפרטים →",

    pricingTitle: "תמחור גמיש לפתרונות עסקיים מותאמים",
    pricingParagraph:
      "בחר את התכנית המתאימה ביותר למטרות הטכנולוגיה והצמיחה של הארגון שלך — מחברות סטארט-אפ ועד ארגוני ענק.",
    pricingMonthly: "חודשי",
    pricingYearly: "שנתי",

    pricingPlans: {
      starter: {
        title: "מתחילים",
        description:
          "פתרונות IT חיוניים לעסקים מתחילים המבקשים לבסס בסיס דיגיטלי חזק.",
        features: [
          "הקמת תשתית ענן",
          "מסגרת אבטחת סייבר בסיסית",
          "גיבוי נתונים אוטומטי",
          "תמיכה ומעקב ייעודי",
        ],
        buttonText: "התחל עכשיו",
      },
      growth: {
        title: "צמיחה",
        description:
          "פתרונות מתקדמים להרחבת העסק שלך עם ניתוחים משולבים ואוטומציה.",
        features: [
          "הכול בתכנית מתחילים",
          "אוטומציה מונעת בינה מלאכותית",
          "ניהול אבטחה וסיכונים מקיף",
          "תמיכת לקוחות בעדיפות גבוהה",
        ],
        buttonText: "למידע נוסף",
        popularBadge: "הנפוץ ביותר",
      },
      enterprise: {
        title: "ארגוני",
        description:
          "פתרונות מותאמים אישית עם צוותים ייעודיים ואבטחות SLA לצרכים ארגוניים מורכבים.",
        features: [
          "ניהול פרויקטים ייעודי",
          "פיתוח תוכנה מותאם ואינטגרציה",
          "אבטחת סייבר ברמה ארגונית והתאמה לתקנים",
          "תמיכה פרימיום 24/7",
        ],
        buttonText: "צור קשר",
      },
    },

    ctaTitle: "מוכן לשנות את העסק שלך?",
    ctaParagraph:
      "התחל היום בייעוץ חינם וגלו כיצד אנו יכולים לעזור לך להשיג את היעדים שלך.",
    ctaStartButton: "התחל את המסע שלך",
    ctaLearnMoreButton: "למידע נוסף עלינו",
  },
};

const Services = () => {
  const { language } = useLanguage();
  const t = translations[language] || translations.en;

  // Document direction for Arabic and Hebrew
  useEffect(() => {
    document.documentElement.dir = language === 'ar' || language === 'he' ? 'rtl' : 'ltr';
  }, [language]);

  const [isYearly, setIsYearly] = useState(false);
  const handleToggleChange = () => setIsYearly((prev) => !prev);

  const monthlyPrices = [199, 499];
  const yearlyPrices = monthlyPrices.map((price) => Math.round(price * 12 * 0.8)); // 20% discount yearly

  const images = [
    'images/service1.jpg',
    'images/services2.jpg',
    'images/services3.jpg',
  ];
  const videoSrc = 'images/videoss3.mp4';

  const [currentIndex, setCurrentIndex] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const servicesList = t.servicesList;

  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [choices, setChoices] = useState({});

  const handleCardClick = (stepId, value) => {
    setChoices((prev) => ({ ...prev, [stepId]: value }));
    setTimeout(() => {
      if (currentStep < 3) setCurrentStep((prev) => prev + 1);
      else setCurrentStep(4);
    }, 300);
  };

  const handleBack = () => {
    if (currentStep > 1) setCurrentStep((prev) => prev - 1);
  };
  const handleStartOver = () => {
    setCurrentStep(1);
    setChoices({});
    setTimeout(() => navigate('/contact'), 100);
  };

  const caseStudiesData = [
    {
      title:
        language === 'ar'
          ? 'التحول الرقمي'
          : language === 'he'
          ? 'טרנספורמציה דיגיטלית'
          : 'Digital Transformation',
      description:
        language === 'ar'
          ? 'ساعدنا علامة تجارية كبرى على تحديث أنظمتها القديمة، مما أدى إلى زيادة بنسبة 30% في الكفاءة التشغيلية.'
          : language === 'he'
          ? 'עזרנו למותג קמעונאי גדול לעדכן את המערכות הישנות שלו, מה שהוביל לעלייה של 30% ביעילות התפעולית.'
          : 'Helped a large retail brand modernize their legacy systems, resulting in a 30% increase in operational efficiency.',
    },
    {
      title:
        language === 'ar'
          ? 'تطوير تطبيقات الأجهزة المحمولة'
          : language === 'he'
          ? 'פיתוח אפליקציות מובייל'
          : 'Mobile App Development',
      description:
        language === 'ar'
          ? 'طورنا تطبيقًا عالي التقييم لشركة ناشئة في مجال التكنولوجيا المالية، وحصل على أكثر من مليون مستخدم في السنة الأولى.'
          : language === 'he'
          ? 'פיתחנו אפליקציה מדורגת גבוהה עבור סטארט-אפ פיננסי, שצברה למעלה ממיליון משתמשים בשנה הראשונה.'
          : 'Developed a highly-rated mobile application for a fintech startup, which gained over 1 million users in its first year.',
    },
    {
      title:
        language === 'ar'
          ? 'الهجرة السحابية والأمان'
          : language === 'he'
          ? 'הגירה ואבטחה בענן'
          : 'Cloud Migration & Security',
      description:
        language === 'ar'
          ? 'تم نقل بنية تحتية لشركة SaaS بنجاح إلى السحابة، مما عزز الأمان وخفض تكاليف الاستضافة بنسبة 40%.'
          : language === 'he'
          ? 'העברנו בהצלחה תשתית של חברת SaaS לענן, מה ששיפר את האבטחה והפחית עלויות אחסון ב-40%.'
          : "Successfully migrated a B2B SaaS company's infrastructure to the cloud, enhancing security and reducing hosting costs by 40%.",
    },
    {
      title:
        language === 'ar'
          ? 'تحسين التجارة الإلكترونية'
          : language === 'he'
          ? 'אופטימיזציה למסחר אלקטרוני'
          : 'E-commerce Optimization',
      description:
        language === 'ar'
          ? 'أعدنا تصميم عملية السداد لمتجر عبر الإنترنت، مما أدى إلى انخفاض بنسبة 25% في التخلي عن السلة وزيادة بنسبة 15% في معدلات التحويل.'
          : language === 'he'
          ? 'שידרגנו את תהליך התשלום בחנות המקוונת, מה שהוביל לירידה של 25% בהשארת עגלה ועלייה של 15% בממדי ההמרה.'
          : "Revamped an online store's checkout process, leading to a 25% decrease in cart abandonment and a 15% increase in conversion rates.",
    },
    {
      title:
        language === 'ar'
          ? 'تحليلات البيانات والذكاء الاصطناعي'
          : language === 'he'
          ? 'אנליטיקה ו-AI'
          : 'Data Analytics & AI',
      description:
        language === 'ar'
          ? 'نفذنا لوحة تحكم تحليلات مخصصة مدعومة بالذكاء الاصطناعي لشركة لوجستيات، مما أدى إلى تحسين مسارات التسليم وتوفير آلاف في تكاليف الوقود.'
          : language === 'he'
          ? 'מימשנו לוח מחוונים אנליטי מבוסס AI לחברת לוגיסטיקה, לשפר את נתיבי ההובלה ולחסוך אלפי דולרים בעלויות דלק.'
          : 'Implemented a custom AI-driven analytics dashboard for a logistics company, optimizing delivery routes and saving thousands in fuel costs.',
    },
    {
      title:
        language === 'ar'
          ? 'تصميم تجربة المستخدم (UX)'
          : language === 'he'
          ? 'עיצוב חוויית משתמש (UX)'
          : 'User Experience (UX) Design',
      description:
        language === 'ar'
          ? 'أعدنا تصميم بوابة الإنترنت لبنك مالي لتكون أكثر سهولة، مما أدى إلى تحسين معدلات رضا المستخدمين بنسبة 50%.'
          : language === 'he'
          ? 'עיצבנו מחדש פורטל אינטרנטי של מוסד פיננסי להיות אינטואיטיבי יותר, ושיפרנו את ציוני שביעות הרצון ב-50%.'
          : "Redesigned a financial institution's online banking portal to be more intuitive, improving user satisfaction scores by 50%.",
    },
  ];

  const itemsToShow = 3;
  const [visibleCount, setVisibleCount] = useState(itemsToShow);
  const [modalData, setModalData] = useState(null);
  const loadMore = () => {
    setVisibleCount((prev) => Math.min(prev + itemsToShow, caseStudiesData.length));
  };

  const itServices = t.itServices;
  const portfolioCategories = t.portfolioCategories;

  const portfolioItems = [
    { id: 1, title: language === 'ar' ? 'تحول رقمي لمزود الرعاية الصحية' : language === 'he' ? 'טרנספורמציה דיגיטלית לספק בריאות' : 'Digital Transformation for Healthcare Provider', category: t.portfolioCategories[1], image: 'images/bs38.jpg' },
    { id: 2, title: language === 'ar' ? 'هجرة سحابية مؤسسية لشركة مالية' : language === 'he' ? 'הגירת ענן ארגונית לחברת פיננסים' : 'Enterprise Cloud Migration for Finance Firm', category: t.portfolioCategories[2], image: 'images/bs39.jpg' },
    { id: 3, title: language === 'ar' ? 'تحديث الأمن السيبراني لشركة ناشئة' : language === 'he' ? 'שדרוג אבטחת סייבר לסטארט-אפ' : 'Cybersecurity Overhaul for Tech Startup', category: t.portfolioCategories[3], image: 'images/bs40.jpg' },
    { id: 4, title: language === 'ar' ? 'تحليلات مدعومة بالذكاء الاصطناعي لتجزئة البيع بالتجزئة' : language === 'he' ? 'אנליטיקה מבוססת AI לרשת קמעונאית' : 'AI-Powered Analytics for Retail Chain', category: t.portfolioCategories[4], image: 'images/bs41.jpg' },
    { id: 5, title: language === 'ar' ? 'تطوير CRM مخصص للعقارات' : language === 'he' ? 'פיתוח CRM מותאם לנדל"ן' : 'Custom CRM Development for Real Estate', category: t.portfolioCategories[5], image: 'images/bs42.jpg' },
    { id: 6, title: language === 'ar' ? 'منصة تجربة العملاء للاتصالات' : language === 'he' ? 'פלטפורמת חוויית לקוח לתקשורת' : 'Customer Experience Platform for Telecom', category: t.portfolioCategories[6], image: 'images/bs43.jpg' },
  ];

  const [portfolioFilter, setPortfolioFilter] = useState(portfolioCategories[0]);
  const filteredItems =
    portfolioFilter === portfolioCategories[0]
      ? portfolioItems
      : portfolioItems.filter((item) => item.category === portfolioFilter);

  return (
    <div className="services-page">
      {/* Hero Section */}
      <section className="hero-section">
        <video autoPlay muted loop playsInline className="hero-bg-video">
          <source src="images/service.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        <div className="hero-overlay">
          <div className="hero-content" dir={language === 'ar' || language === 'he' ? 'rtl' : 'ltr'}>
            <h1 className="hero-title">{t.heroTitle}</h1>
            <p className="hero-paragraph">{t.heroParagraph}</p>

            <Link to="/contact" className="hero-button animate-fade-up-delayed">
              {t.heroButton}
            </Link>
          </div>
        </div>
      </section>

      {/* Services video Section */}
      <section className="bg-[var(--bg-color)] text-[var(--text-color)] px-8 py-8 font-poppins transition-all duration-300">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Left Video */}
          <div className="flex justify-center items-center">
            <AnimatePresence mode="wait">
              <motion.video
                key="service-video"
                src={videoSrc}
                autoPlay
                loop
                muted
                controls
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1 }}
                className="w-full h-[500px] rounded-2xl shadow-lg object-cover bg-[var(--card-bg)]"
              />
            </AnimatePresence>
          </div>

          {/* Right Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col justify-center text-left"
            dir={language === 'ar' || language === 'he' ? 'rtl' : 'ltr'}
          >
            <h2 className="text-[1.8rem] font-bold text-[var(--heading-color)] mb-5 leading-[1.1] font-[Segoe UI,Tahoma,Geneva,Verdana,sans-serif] transition-colors duration-300">
              {t.drivingGrowthTitle}
            </h2>
            <p className="mb-6 leading-relaxed text-base text-[var(--text-color)] text-justify">
              {t.drivingGrowthParagraph}
            </p>
            <ul className="list-none p-0 m-0">
              {servicesList.map((item, i) => (
                <motion.li
                  key={i}
                  whileHover={{ scale: 1.05, x: 5 }}
                  transition={{ duration: 0.2 }}
                  className="flex items-center mb-3 text-base text-[var(--text-color)]"
                >
                  <span className="inline-block w-[10px] h-[10px] rounded-full mr-3 bg-[var(--text-color)]"></span>
                  {item}
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="section it-grid-section" dir={language === 'ar' || language === 'he' ? 'rtl' : 'ltr'}>
        <div className="container">
          <motion.div
            className="it-section-header align-center"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2>{t.whatIOfferTitle}</h2>
            <p>{t.whatIOfferParagraph}</p>
          </motion.div>

          <div className="it-services-flex">
            {itServices.map((service, index) => {
              const Icon = service.icon;
              return (
                <motion.div
                  key={service.title}
                  className="it-service-tile"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -10 }}
                >
                  <div className="it-img-box">
                    <img src={service.image} alt={service.title} />
                    <div className="it-img-overlay">
                      {Icon && <Icon className="it-service-icon" style={{ color: service.color }} />}
                    </div>
                    {service.isNew && <span className="it-badge-new">{language === 'ar' ? 'جديد!' : language === 'he' ? 'חדש!' : 'New!'}</span>}
                  </div>
                  <div className="it-card-content">
                    <h3>{service.title}</h3>
                    <p>{service.description}</p>
                    <div className="it-feature-list">
                      {service.features.map((feature, idx) => (
                        <div key={idx} className="it-feature-row">
                          <FaCheck className="it-check" />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                    <Link to={`/service${index + 1}`} className="it-link" style={{ color: service.color }}>
                      {language === 'ar' ? 'تعرف أكثر' : language === 'he' ? 'למידע נוסף' : 'Learn More'} <FaArrowRight />
                    </Link>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section className="portfolio-section" dir={language === 'ar' || language === 'he' ? 'rtl' : 'ltr'}>
        <div className="portfolio-header text-center">
          <h2>{t.portfolioTitle}</h2>
          <p>{t.portfolioDescription}</p>
        </div>

        {/* Portfolio Filters */}
        <div className="portfolio-filters">
          {portfolioCategories.map((cat) => (
            <button
              key={cat}
              className={portfolioFilter === cat ? 'active' : ''}
              onClick={() => setPortfolioFilter(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Portfolio Grid */}
        <div className="portfolio-grid">
          {filteredItems.map((item) => (
            <div key={item.id} className="portfolio-card">
              <img src={item.image} alt={item.title} />
              <h3>{item.title}</h3>
              <p>{item.category}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Case Studies Section */}
      <section
        className="gradient-bg py-20 mt-16 md:mt-4"
        style={{ backgroundColor: 'var(--bg-color)' }}
        dir={language === 'ar' || language === 'he' ? 'rtl' : 'ltr'}
      >
        <div className="container mx-auto px-4 text-center" style={{ color: 'var(--text-color)' }}>
          <h2 className="text-4xl md:text-5xl font-extrabold leading-tight mb-4" style={{ color: 'var(--primary-color)' }}>
            {t.caseStudiesTitle}
          </h2>
          <p className="text-lg md:text-xl font-light mb-12 max-w-3xl mx-auto" style={{ color: 'var(--text-muted)' }}>
            {t.caseStudiesParagraph}
          </p>

          <div
            id="case-studies-grid"
            className={`grid gap-8 ${visibleCount === 3 ? 'three-items-layout' : 'default-layout'}`}
            style={{ color: 'var(--text-color)' }}
          >
            {caseStudiesData.slice(0, visibleCount).map((study, index) => (
              <div
                key={index}
                className="bg-white text-gray-800 rounded-2xl shadow-xl p-8 cursor-pointer transform transition duration-300 hover:scale-105"
                style={{
                  backgroundColor: 'var(--card-bg)',
                  color: 'var(--text-color)',
                  boxShadow: 'var(--shadow)',
                }}
                onClick={() => setModalData(study)}
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') setModalData(study);
                }}
                role="button"
                aria-label={`View details of ${study.title}`}
              >
                <h3 className="text-2xl font-bold mb-2" style={{ color: 'var(--primary-color)' }}>
                  {study.title}
                </h3>
                <p className="text-gray-500 mb-4" style={{ color: 'var(--text-muted)' }}>
                  {study.description.length > 100 ? study.description.substring(0, 100) + '...' : study.description}
                </p>
                <span className="text-primary font-semibold" style={{ color: 'var(--primary-color)' }}>
                  {t.caseStudiesViewDetails}
                </span>
              </div>
            ))}
          </div>

          {visibleCount < caseStudiesData.length && (
            <button
              onClick={loadMore}
              className="mt-12 bg-indigo-600 text-white font-semibold py-3 px-8 rounded-full shadow-lg hover:bg-indigo-700 transition duration-300"
              style={{ backgroundColor: 'var(--primary-color)', boxShadow: 'var(--shadow)' }}
            >
              {language === 'ar' ? 'عرض المزيد من دراسات الحالة' : language === 'he' ? 'טען עוד מקרים' : 'Load More Case Studies'}
            </button>
          )}
        </div>

        {/* Modal */}
        {modalData && (
          <div
            id="case-study-modal"
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
            aria-describedby="modal-description"
            onClick={() => setModalData(null)}
            tabIndex={-1}
            onKeyDown={(e) => {
              if (e.key === 'Escape') setModalData(null);
            }}
          >
            <div
              className="bg-white text-gray-800 rounded-2xl shadow-2xl p-8 max-w-2xl mx-4 relative transform scale-100 opacity-100 transition-all duration-300"
              style={{
                backgroundColor: 'var(--card-bg)',
                color: 'var(--text-color)',
                boxShadow: 'var(--shadow)',
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                id="close-modal-btn"
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 focus:outline-none"
                onClick={() => setModalData(null)}
                aria-label="Close modal"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <h3 id="modal-title" className="text-3xl font-bold mb-4" style={{ color: 'var(--primary-color)' }}>
                {modalData.title}
              </h3>
              <p id="modal-description" className="text-lg text-gray-700" style={{ color: 'var(--text-muted)' }}>
                {modalData.description}
              </p>
            </div>
          </div>
        )}
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="bg-[var(--bg-color)] text-[var(--text-color)] py-12" dir={language === 'ar' || language === 'he' ? 'rtl' : 'ltr'}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-4 text-[var(--heading-color)]">
            {t.pricingTitle}
          </h2>
          <p className="text-lg mb-12 max-w-2xl mx-auto text-[var(--text-muted)]">{t.pricingParagraph}</p>

          {/* Pricing Toggle */}
          <div className="flex justify-center mb-12">
            <div className="relative w-48 h-12">
              <span
                className="absolute top-1 left-1 h-10 w-22 rounded-full bg-[var(--card-bg)] shadow-md transition-transform duration-300"
                style={{
                  width: '92px',
                  transform: isYearly ? 'translateX(96px)' : 'translateX(0)',
                }}
                aria-hidden="true"
              ></span>
              <button
                className={`absolute top-0 left-0 w-1/2 h-full z-10 rounded-full font-semibold transition-colors duration-200 ${
                  !isYearly ? 'text-[var(--heading-color)]' : 'text-[var(--text-muted)]'
                }`}
                style={{ background: 'none', border: 'none' }}
                onClick={() => !isYearly && handleToggleChange({ target: { checked: false } })}
                type="button"
                tabIndex={0}
              >
                {t.pricingMonthly}
              </button>
              <button
                className={`absolute top-0 right-0 w-1/2 h-full z-10 rounded-full font-semibold transition-colors duration-200 ${
                  isYearly ? 'text-[var(--heading-color)]' : 'text-[var(--text-muted)]'
                }`}
                style={{ background: 'none', border: 'none' }}
                onClick={() => isYearly && handleToggleChange({ target: { checked: true } })}
                type="button"
                tabIndex={0}
              >
                {t.pricingYearly}
              </button>
              <div className="absolute inset-0 bg-[var(--sidebar-bg)] rounded-full pointer-events-none"></div>
            </div>
          </div>

          {/* Pricing Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 px-4 sm:px-6 lg:px-0">
            {/* Starter Plan */}
            <div className="bg-[var(--card-bg)] p-8 rounded-2xl shadow-lg border border-transparent hover:border-[var(--primary-color)] transition-all duration-300 transform hover:scale-105">
              <h3 className="text-2xl font-semibold mb-3 text-[var(--heading-color)]">{t.pricingPlans.starter.title}</h3>
              <p className="text-[var(--text-muted)] mb-8">{t.pricingPlans.starter.description}</p>
              <div className="mb-8 flex items-baseline justify-center space-x-1">
                <span className="text-5xl font-extrabold text-[var(--primary-color)]">{isYearly ? yearlyPrices[0] : monthlyPrices[0]}</span>
                <span className="text-lg text-[var(--text-muted)]">/{isYearly ? 'yr' : 'mo'}</span>
              </div>
              <ul className="text-[var(--text-color)] mb-8 space-y-4 text-left">
                {t.pricingPlans.starter.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center">
                    <FaCheck className="h-5 w-5 mr-3 text-[var(--primary-color)]" />
                    {feature}
                  </li>
                ))}
              </ul>
              <a
                href="/contact"
                className="block w-full py-3 bg-[var(--primary-color)] text-white font-semibold rounded-lg hover:bg-[var(--secondary-color)] transition-colors duration-200"
              >
                {t.pricingPlans.starter.buttonText}
              </a>
            </div>

            {/* Growth Plan */}
            <div className="bg-[var(--primary-color)] text-[var(--card-bg)] p-8 rounded-2xl shadow-xl border-4 border-[var(--secondary-color)] relative transition-transform duration-300 transform scale-105">
              {t.pricingPlans.growth.popularBadge && (
                <span className="absolute top-4 right-4 bg-[var(--warning-color)] text-[var(--danger-color)] text-xs font-bold px-3 py-1 rounded-full uppercase shadow-sm">
                  {t.pricingPlans.growth.popularBadge}
                </span>
              )}
              <h3 className="text-2xl font-semibold mb-3">{t.pricingPlans.growth.title}</h3>
              <p className="mb-8 text-[var(--card-bg)] opacity-90">{t.pricingPlans.growth.description}</p>
              <div className="mb-8 flex items-baseline justify-center space-x-1">
                <span className="text-5xl font-extrabold text-white">{isYearly ? yearlyPrices[1] : monthlyPrices[1]}</span>
                <span className="text-lg text-[var(--card-bg)] opacity-90">/{isYearly ? 'yr' : 'mo'}</span>
              </div>
              <ul className="text-white mb-8 space-y-4 text-left">
                {t.pricingPlans.growth.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center">
                    <FaCheck className="h-5 w-5 mr-3 text-white" />
                    {feature}
                  </li>
                ))}
              </ul>
              <a
                href="/contact"
                className="block w-full py-3 bg-[var(--card-bg)] text-[var(--primary-color)] font-semibold rounded-lg hover:bg-[var(--sidebar-bg)] transition-colors duration-200"
              >
                {t.pricingPlans.growth.buttonText}
              </a>
            </div>

            {/* Enterprise Plan */}
            <div className="bg-[var(--card-bg)] p-8 rounded-2xl shadow-lg border border-transparent hover:border-[var(--primary-color)] transition-all duration-300 transform hover:scale-105">
              <h3 className="text-2xl font-semibold mb-3 text-[var(--heading-color)]">{t.pricingPlans.enterprise.title}</h3>
              <p className="text-[var(--text-muted)] mb-8">{t.pricingPlans.enterprise.description}</p>
              <div className="mb-8 flex items-baseline justify-center space-x-1">
                <span className="text-5xl font-extrabold text-[var(--primary-color)]">Custom</span>
              </div>
              <ul className="text-[var(--text-color)] mb-8 space-y-4 text-left">
                {t.pricingPlans.enterprise.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center">
                    <FaCheck className="h-5 w-5 mr-3 text-[var(--primary-color)]" />
                    {feature}
                  </li>
                ))}
              </ul>
              <a
                href="/contact"
                className="block w-full py-3 bg-[var(--primary-color)] text-white font-semibold rounded-lg hover:bg-[var(--secondary-color)] transition-colors duration-200"
              >
                {t.pricingPlans.enterprise.buttonText}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section" dir={language === 'ar' || language === 'he' ? 'rtl' : 'ltr'}>
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
        .home2-page {
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


{/*what i offer section*/}

  .services-section {
    padding: 1rem; /* Reduce section padding for mobile */
  }

  .it-services-flex {
  display: grid;
  grid-template-columns: repeat(3, 1fr); /* Always 3 equal columns */
  gap: 2rem; /* Space between tiles */
}

/* Tablet view: switch to 2 columns */
@media (max-width: 1024px) {
  .it-services-flex {
    grid-template-columns: repeat(2, 1fr);
  }
}

/* Mobile view: single column stack */
@media (max-width: 640px) {
  .it-services-flex {
    grid-template-columns: 1fr;
  }
}


  .services-heading {
    font-size: 1.1rem; /* Slightly smaller heading for mobile */
    margin-bottom: 1.5rem; /* Reduce spacing below the heading */
  }

  .services-content {
    text-align: center;
    padding: 0 0.5rem; /* Add horizontal padding for readability */
  }

  .services-text {
    font-size: 0.95rem; /* Decrease paragraph font size */
    margin-bottom: 1rem; /* Decrease space below paragraph */
  }

  .services-item {
    font-size: 0.95rem; /* Decrease feature bullet font size */
    margin-bottom: 0.5rem; /* Reduce margin between items */
  }

  .services-image img {
    height: 240px; /* Reduce image height for mobile */
  }
}




{/* Portfolio Section */}
.portfolio-section {
  position: relative;
  padding: 80px 24px;
  background: var(--bg-color);
  color: var(--text-color);
  overflow: hidden;
  border-radius: 18px;
}

/* Dynamic subtle moving dot background */
.portfolio-section::before {
  content: "";
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 0;
  background: radial-gradient(circle at center,
    var(--primary-color) 2px,
    transparent 3px);
  background-size: 40px 40px;
  animation: moveDots 30s linear infinite;
  opacity: 0.15; /* Increased opacity for visibility */
}

@media (prefers-color-scheme: dark) {
  .portfolio-section::before {
    background: radial-gradient(circle at center,
      var(--accent-color) 3px,
      transparent 4px);
    opacity: 0.2; /* Slightly higher in dark mode */
  }
}

@keyframes moveDots {
  0% {
    background-position: 0 0;
  }
  100% {
    background-position: 40px 40px;
  }
}

/* Header */
.portfolio-header {
  text-align: center;
  margin-bottom: 32px;
  position: relative;
  z-index: 1;
}
.portfolio-header h2 {
  font-size: 2.6rem;
  font-weight: 800;
  margin-bottom: 8px;
  color: var(--heading-color);
}
.portfolio-header p {
  font-size: 1.1rem;
  color: var(--text-muted);
  margin: 0;
}

/* Filters */
.portfolio-filters {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 14px;
  margin-bottom: 40px;
  position: relative;
  z-index: 1;
}
.portfolio-filters button {
  background: var(--card-bg);
  color: var(--text-color);
  border: 1.8px solid var(--border-color);
  padding: 10px 24px;
  border-radius: 40px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.3s ease, color 0.3s ease, border-color 0.3s ease;
}
.portfolio-filters button:hover,
.portfolio-filters button.active {
  background: var(--primary-color);
  color: white;
  border-color: var(--primary-color);
}

/* Portfolio Grid with responsive columns */
.portfolio-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 28px;
  position: relative;
  z-index: 1;
  justify-content: center; /* Center items if fewer than 3 */
}


@media (max-width: 1024px) {
  .portfolio-grid {
    grid-template-columns: repeat(2, 1fr); /* 2 columns tablet */
  }
}

@media (max-width: 600px) {
  .portfolio-grid {
    grid-template-columns: 1fr; /* 1 column mobile */
  }
}

/* Portfolio cards */
.portfolio-card {
  background: var(--card-bg);
  border-radius: 22px;
  box-shadow: var(--shadow);
  border: 3px solid transparent;
  background-image: linear-gradient(var(--bg-color), var(--bg-color)),
                    linear-gradient(135deg, var(--primary-color), var(--accent-color));
  background-origin: padding-box, border-box;
  background-clip: padding-box, border-box;
  overflow: hidden;
  cursor: pointer;
  transition: box-shadow 0.3s ease, border-image-source 0.3s ease;
  display: flex;
  flex-direction: column;
}

.portfolio-card:hover {
  box-shadow: var(--shadow-hover);
  border-image-slice: 1;
  border-image-source: linear-gradient(315deg, var(--primary-color), var(--accent-color));
  border-radius: 22px;
}

/* Image */
.portfolio-card img {
  width: 100%;
  aspect-ratio: 4 / 3;
  object-fit: cover;
  border-radius: 18px 18px 0 0;
  transition: transform 0.3s ease;
}

.portfolio-card:hover img {
  transform: scale(1.05);
}

/* Title and Category */
.portfolio-card h3 {
  font-size: 1.28rem;
  font-weight: 700;
  color: var(--heading-color);
  margin: 16px 16px 0 16px;
}

.portfolio-card p {
  font-size: 0.95rem;
  font-weight: 500;
  margin: 4px 16px 20px 16px;
  color: var(--text-muted);
}

/* Responsive font size for portfolio header */
@media (max-width: 768px) {
  .portfolio-header h2 {
    font-size: 1.9rem;
  }
  .portfolio-filters {
    gap: 10px;
  }
}


{/*case studies*/}

/* Desktop: 3 columns of equal width */
#case-studies-grid.default-layout {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
}

/* Tablet: 2 columns */
@media (max-width: 1024px) {
  #case-studies-grid.default-layout {
    grid-template-columns: repeat(2, 1fr);
  }
}

/* Mobile: single column with max-width for nice padding */
@media (max-width: 640px) {
  #case-studies-grid.default-layout,
  #case-studies-grid.three-items-layout {
    grid-template-columns: 1fr;
  }
  #case-studies-grid > div {
    max-width: 90vw; /* limit card width on mobile for breathing room */
    margin-left: auto;
    margin-right: auto;
  }
}

/* Three-items special layout */
#case-studies-grid.three-items-layout {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
}

/* Tablet special layout for 3 items: 2 columns, centered 3rd */
@media (max-width: 1024px) and (min-width: 641px) {
  #case-studies-grid.three-items-layout {
    grid-template-columns: repeat(2, 1fr);
  }

  #case-studies-grid.three-items-layout > :nth-child(3) {
    grid-column: 1 / span 2;
    justify-self: center;
    max-width: 60%;
  }
}

/* Mobile Reset centering and spanning for 3rd card */
@media (max-width: 640px) {
  #case-studies-grid {
    grid-template-columns: 1fr !important;
    padding-left: 1rem;
    padding-right: 1rem;
  }
}

}








{/* IT services */}

    .it-grid-section {
  background: var(--bg-color);
  padding: 0 0;
}

.it-section-header.align-center {
  text-align: center;
  margin-bottom: 24px;
}
.it-section-header.align-center h2 {
  color: var(--heading-color);
  font-size: 2.3rem;
  font-weight: 800;
  margin-bottom: 8px;
}
.it-section-header.align-center p {
  color: var(--text-muted);
  font-size: 1.1rem;
}

.it-services-flex {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 32px;
  margin-top: 10px;
}

.it-service-tile {
  background: var(--card-bg);
  border-radius: 15px;
  overflow: hidden;
  box-shadow: var(--shadow);
  border: 1px solid var(--border-color);
  transition: all 0.3s cubic-bezier(.62,.02,.34,1.03);
  display: flex;
  flex-direction: column;
  position: relative;
}

.it-service-tile:hover {
  box-shadow: var(--shadow-hover);
}

.it-img-box {
  position: relative;
  height: 200px;
  overflow: hidden;
  border-radius: 15px 15px 0 0;
}
.it-img-box img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s cubic-bezier(.62,.02,.34,1.03);
}
.it-service-tile:hover .it-img-box img {
  transform: scale(1.08);
}

.it-img-overlay {
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0,0,0,0.36);
  display: flex;
  align-items: center;
  justify-content: center;
}

.it-service-icon {
  font-size: 2.4rem;
  filter: drop-shadow(0 2px 4px rgba(0,0,0,0.21));
}

.it-badge-new {
  position: absolute;
  top: 18px;
  right: 18px;
  background: rgba(255,21,21,0.09);
  color: #e60023;
  border: 1.5px solid #e60023;
  font-weight: 700;
  font-size: 1.07rem;
  padding: 7px 20px 6px 20px;
  border-radius: 1.7em;
  z-index: 2;
  box-shadow: 0 6px 26px 0 rgba(255,0,30,0.07);
  letter-spacing: 1px;
}

.it-card-content {
  padding: 30px 30px 20px 30px;
  background: var(--card-bg);
}
.it-card-content h3 {
  font-size: 1.32rem;
  color: var(--heading-color);
  font-weight: 800;
  margin-bottom: 14px;
}
.it-card-content p {
  color: var(--text-color);
  font-size: 1.07rem;
  line-height: 1.63;
  margin-bottom: 16px;
}
.it-feature-list {
  margin-bottom: 20px;
}
.it-feature-row {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 7px;
  font-size: 0.97rem;
  color: var(--text-color);
}
.it-check {
  color: var(--accent-color);
  font-size: 0.87rem;
}
.it-link {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.23s;
}
.it-link:hover {
  transform: translateX(7px);
}

/* Responsive */
@media (max-width: 768px) {
  .it-services-flex {
    grid-template-columns: 1fr;
    gap: 20px;
  }
  .it-card-content {
    padding: 20px 16px 18px 16px;
    text-align: left;
  }
  .it-section-header.align-center h2 {
    font-size: 1.6rem;
  }
}



{/*freelancer services */}



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



        @media (max-width: 768px) {
          .hero-content {
            grid-template-columns: 1fr;
            text-align: center;
          }
            .services-content h2 {
          font-size: 0.9rem;
          margin-bottom: 20px;
          margin-left: -20px;
        }

    

      `}</style>
    </div>
  );
};

export default Services;
