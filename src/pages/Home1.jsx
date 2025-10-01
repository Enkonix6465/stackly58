import React, { useRef, useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';
import { 
  FaUsers, 
  FaShieldAlt, 
  FaCogs, 
  FaRobot,
  FaBuilding, 
  FaTasks, 
  FaAward,
  FaArrowRight,
  FaCheck,
  FaStar,
  FaGlobe,
  FaBriefcase,
  FaPalette,
  FaUtensils,
  FaLock,
  FaTrophy,
  FaServer,
  FaCloud,
  FaTools,
  FaQuoteLeft,
  FaCloudUploadAlt,
  FaChartLine,
  FaRocket,
  FaDollarSign,
} from 'react-icons/fa';
import { useLanguage } from "../context.jsx/LanguageContext";

const translations = {
  en: {
    heroTitle: "Empowering Your Business",
    heroParagraph: "We help businesses foster agile teams that accelerate innovation, and deliver timely market solutions.",
    heroButton: "Consult",
    aboutUs: "ABOUT US",
    aboutH1: "Build A Strategy That Puts Your Money To Work.",
    aboutP: "At Albert Financial, Wealth Management and Insurance Services we simplify your Financial Plan. Build a strategy that puts your money to work, protects the people you care about most, and when you.",
    aboutList: [
      "Planning your Future Better",
      "Financial planning for safe investment",
      "Experience a brand new financial attitude",
      "Your financial matters according to our plans",
    ],
    aboutMore: "More About Us",
    aboutQuote: "Take your life to Financial Consultant Around The World e next level with Rise, built-in financial consultation with our expert with 10+ years of experience.",
    thirdTitle: "A Journey Of Strategic Brilliance",
    thirdP1: "Founded on a shared passion for driving success, we are a dynamic team of professionals committed to empowering businesses and individuals to thrive in an ever-evolving world.",
    thirdP2: "We are more than advisors, we are partners in your journey. Our dedicated team of four experts brings a wealth of knowledge to every project.",
    thirdStat1: "Years of collective experience",
    thirdStat2: "Remarkable client satisfaction rate",
    stats: [
      {
        number: 120,
        suffix: "+",
        label: "Projects Completed",
        icon: FaTasks,
        details: "Successfully delivered customized solutions across various industries, ensuring quality and timeliness.",
      },
      {
        number: 80,
        suffix: "+",
        label: "Happy Clients",
        icon: FaUsers,
        details: "Trusted by clients worldwide for our professionalism, responsiveness, and tailored business strategies.",
      },
      {
        number: 5,
        suffix: "+",
        label: "Years Experience",
        icon: FaBriefcase,
        details: "Over five years specializing in business transformation through innovative technology and strategy.",
      },
      {
        number: 15,
        suffix: "+",
        label: "Countries Served",
        icon: FaGlobe,
        details: "Global presence providing localized solutions with an understanding of diverse market needs.",
      },
    ],
    testimonials: [
      {
        text: "Our company's financial health has never been better. The team at Albert Financial provided us with a clear, actionable strategy that led to significant growth. Their expertise and dedication are unmatched.",
        name: "Chris Miller",
        role: "CEO, Tech Innovators",
        avatar: "images/MEN1.jpg",
      },
      {
        text: "Working with them was a game-changer. They helped us navigate a complex market with ease, and their strategic guidance has been invaluable. We highly recommend their services to any business.",
        name: "Jane Smith",
        role: "Founder, HealthPlus",
        avatar: "images/WOMEN1.jpg",
      },
      {
        text: "The personalized attention and deep industry knowledge we received were exceptional. They truly understood our unique challenges and provided solutions that were both effective and sustainable.",
        name: "David Wilson",
        role: "Director, Global Properties",
        avatar: "images/MenH2.jpg",
      },
      {
        text: "Exceptional service and results! The team transformed our business operations and helped us achieve record-breaking growth. Their strategic insights and implementation were flawless.",
        name: "Sarah Johnson",
        role: "Managing Director, InnovateCorp",
        avatar: "images/Women2.jpg",
      },
      {
        text: "Professional, reliable, and results-driven. They exceeded our expectations in every aspect of our partnership. Our revenue increased by 150% within the first year of working together.",
        name: "Michael Chen",
        role: "VP Operations, Digital Solutions",
        avatar: "images/Women3.jpg",
      },
      {
        text: "Outstanding expertise and commitment to excellence. They helped us streamline our processes and optimize our financial strategies. Highly recommend for any growing business.",
        name: "Emily Rodriguez",
        role: "Founder, EcoTech Ventures",
        avatar: "images/Women4.jpg",
      },
    ],
    testimonialsTitle: "What Our Clients Say",
    testimonialsP: "Hear directly from the businesses we've helped achieve their goals and reach new heights.",
    ctaTitle: "Ready to Transform Your Business?",
    ctaP: "Get started today with a free consultation and discover how we can help you achieve your goals.",
    ctaStart: "Start Your Journey",
    ctaLearn: "Learn More About Us",
    // Second Section Translations
    secondSection: {
      founded: "FOUNDED",
      valuation: "VALUATION",
      missionText: "We are the leading agency dedicated to enhancing your deals, driving growth, and delivering exceptional results. Trust us to maximize your potential and take your business to the next level.",
      socialProofText: "2k industry leaders.",
    },
    // Our Services Snapshot Section Translations
    servicesSnapshot: {
      title: "Our Services Snapshot",
      subtitle: "Comprehensive consulting solutions designed to accelerate your business growth",
      businessSolution: {
        title: "Business Solution",
        description: "we provide smart, scalable business solutions.",
        linkText: "Know More →"
      },
      marketResearch: {
        title: "Market Research",
        description: "Comprehensive marketing solutions designed.",
        linkText: "Know More →"
      },
      strategyGrowth: {
        title: "Strategy Growth",
        description: "Full-service agency marketing solutions that help brands.",
        linkText: "Know More →"
      },
      financeSolution: {
        title: "Finance Solution",
        description: "Our business marketing services are designed.",
        linkText: "Know More →"
      }
    },
    // CTA Section Translations
    ctaSection: {
      mainTitle: "Strategic Consulting",
      description: "Our expert consultants handle the complexity so you can focus on what matters most for your business.",
      services: [
        "BUSINESS STRATEGY",
        "FINANCIAL CONSULTING", 
        "OPERATIONS OPTIMIZATION",
        "DIGITAL TRANSFORMATION"
      ],
      bannerTitle: "GOT A BUSINESS IN NEED\nOF STRATEGIC GUIDANCE?",
      bannerButton: "Schedule a Call"
    },
  },
  ar: {
    heroTitle: "تمكين أعمالك",
    heroParagraph: "نساعد الشركات على تطوير فرق عمل مرنة تسرّع الابتكار وتعزز التعاون وتقدم حلولاً سوقية في الوقت المناسب. حوّل القوى العاملة لديك لتكون متكيفة، متمكنة ومتوافقة مع أهداف عملك.",
    heroButton: "استشارة",
    aboutUs: "من نحن",
    aboutH1: "ابنِ استراتيجية تجعل مالك يعمل من أجلك.",
    aboutP: "في ألبرت المالية، إدارة الثروة وخدمات التأمين، نبسط خطة المالية الخاصة بك. ابنِ استراتيجية تجعل مالك يعمل من أجلك وتحمي أحبائك.",
    aboutList: [
      "تخطيط أفضل لمستقبلك",
      "تخطيط مالي لاستثمار آمن",
      "اختبر موقف مالي جديد كلياً",
      "أمورك المالية ضمن خططنا",
    ],
    aboutMore: "المزيد عنّا",
    aboutQuote: "ارتق بحياتك إلى المستوى التالي مع Rise، استشارة مالية مدمجة وخبرة أكثر من 10 سنوات.",
    thirdTitle: "رحلة من البراعة الاستراتيجية",
    thirdP1: "تأسست برغبة مشتركة في النجاح، نحن فريق ديناميكي ملتزم بتمكين الأعمال والأفراد في عالم متغير.",
    thirdP2: "نحن أكثر من مستشارين، نحن شركاء في رحلتك. فريقنا المتفاني يملك خبرة هائلة لكل مشروع.",
    thirdStat1: "سنوات من الخبرة الجماعية",
    thirdStat2: "معدل رضا العملاء المذهل",
    stats: [
      {
        number: 120,
        suffix: "+",
        label: "مشاريع منجزة",
        icon: FaTasks,
        details: "تم تقديم حلول مخصصة لمجالات مختلفة مع ضمان الجودة والجدول الزمني.",
      },
      {
        number: 80,
        suffix: "+",
        label: "عملاء سعداء",
        icon: FaUsers,
        details: "ثقة عملائنا حول العالم بمهنيتنا واستجابتنا وخططنا المخصصة.",
      },
      {
        number: 5,
        suffix: "+",
        label: "سنوات الخبرة",
        icon: FaBriefcase,
        details: "أكثر من خمس سنوات في تحويل الأعمال عبر الابتكار والتقنية.",
      },
      {
        number: 15,
        suffix: "+",
        label: "دول مخدومة",
        icon: FaGlobe,
        details: "حضور عالمي وتقديم حلول محلية وفهم احتياجات متنوعة.",
      },
    ],
    testimonials: [
      {
        text: "الصحة المالية لشركتنا في أفضل حالاتها بفضل فريق ألبرت المالي، الاستراتيجية الواضحة قادت لنمو مهم وخدمة لا تضاهى.",
        name: "كريس ميلر",
        role: "الرئيس التنفيذي، المبتكرون التقنيون",
        avatar: "images/MEN1.jpg",
      },
      {
        text: "العمل معهم غير قواعد اللعبة، مساعدتنا في السوق المعقدة ودعمهم الاستراتيجي كان لا يقدر بثمن، ننصح بخدماتهم بشدة.",
        name: "جين سميث",
        role: "مؤسسة، هيلث بلس",
        avatar: "images/WOMEN1.jpg",
      },
      {
        text: "الاهتمام الشخصي والمعرفة العميقة بالصناعة كانت استثنائية، فهم تحدياتنا وقدموا حلولاً فعّالة ومستدامة.",
        name: "ديفيد ويلسون",
        role: "مدير، جلوبال بروبرتيز",
        avatar: "images/MenH2.jpg",
      },
      {
        text: "خدمة استثنائية ونتائج مذهلة! الفريق حول عملياتنا التجارية وساعدنا في تحقيق نمو قياسي. رؤاهم الاستراتيجية وتنفيذها كان مثالي.",
        name: "سارة جونسون",
        role: "مديرة عامة، إنوفيت كورب",
        avatar: "images/Women2.jpg",
      },
      {
        text: "مهنيون، موثوقون، ومدفوعون بالنتائج. تجاوزوا توقعاتنا في كل جانب من شراكتنا. زادت إيراداتنا بنسبة 150% في السنة الأولى.",
        name: "مايكل تشين",
        role: "نائب رئيس العمليات، الحلول الرقمية",
        avatar: "images/Women3.jpg",
      },
      {
        text: "خبرة متميزة والتزام بالتميز. ساعدونا في تبسيط عملياتنا وتحسين استراتيجياتنا المالية. ننصح بشدة لأي شركة نامية.",
        name: "إيميلي رودريغيز",
        role: "مؤسسة، إيكو تك فينتشرز",
        avatar: "images/Women4.jpg",
      },
    ],
    testimonialsTitle: "ماذا يقول عملاؤنا",
    testimonialsP: "استمع مباشرة من الشركات التي ساعدناها في تحقيق أهدافها والوصول إلى مستويات جديدة.",
    ctaTitle: "جاهز لتحويل عملك؟",
    ctaP: "ابدأ اليوم باستشارة مجانية واكتشف كيف يمكننا مساعدتك في تحقيق أهدافك.",
    ctaStart: "ابدأ رحلتك",
    ctaLearn: "المزيد عنّا",
    // Second Section Translations
    secondSection: {
      founded: "تأسست",
      valuation: "التقييم",
      missionText: "نحن الوكالة الرائدة المكرسة لتعزيز صفقاتك، دفع النمو، وتقديم نتائج استثنائية. ثق بنا لتعظيم إمكاناتك ورفع عملك إلى المستوى التالي.",
      socialProofText: "2 ألف من قادة الصناعة.",
    },
    // Our Services Snapshot Section Translations
    servicesSnapshot: {
      title: "لقطة خدماتنا",
      subtitle: "حلول استشارية شاملة مصممة لتسريع نمو عملك",
      businessSolution: {
        title: "حلول الأعمال",
        description: "نقدم حلول أعمال ذكية وقابلة للتوسع.",
        linkText: "اعرف المزيد ←"
      },
      marketResearch: {
        title: "البحث التسويقي",
        description: "حلول تسويقية شاملة مصممة.",
        linkText: "اعرف المزيد ←"
      },
      strategyGrowth: {
        title: "استراتيجية النمو",
        description: "حلول تسويقية شاملة تساعد العلامات التجارية.",
        linkText: "اعرف المزيد ←"
      },
      financeSolution: {
        title: "الحلول المالية",
        description: "خدماتنا التسويقية للأعمال مصممة.",
        linkText: "اعرف المزيد ←"
      }
    },
    // CTA Section Translations
    ctaSection: {
      mainTitle: "الاستشارات الاستراتيجية",
      description: "خبراؤنا الاستشاريون يتولون التعقيدات حتى تتمكن من التركيز على ما يهم أكثر لعملك.",
      services: [
        "الاستراتيجية التجارية",
        "الاستشارات المالية",
        "تحسين العمليات",
        "التحول الرقمي"
      ],
      bannerTitle: "هل لديك عمل يحتاج\nإلى إرشاد استراتيجي؟",
      bannerButton: "جدولة مكالمة"
    },
  },
  he: {
    heroTitle: "העצמת העסק שלך",
    heroParagraph: "אנחנו עוזרים לעסקים לפתח צוותים זריזים שמאיצים חדשנות, משפרים שיתוף פעולה ומביאים פתרונות שוק בזמן. הפוך את העובדים שלך למסתגלים ומותאמים למטרות העסקיות.",
    heroButton: "ייעוץ",
    aboutUs: "עלינו",
    aboutH1: "בנה אסטרטגיה שמייצרת ערך לכספך.",
    aboutP: "באלברט פיננסים, ניהול נכסים ושירותי ביטוח, אנו מפשטים את תוכנית הפיננסים שלך. בנה אסטרטגיה שמייצרת ערך ומגנה על אהוביך כשצריך.",
    aboutList: [
      "תכנון טוב יותר לעתיד שלך",
      "תכנון פיננסי להשקעה בטוחה",
      "גישה פיננסית חדשה",
      "ענייניך הפיננסיים בהתאם לתוכניות שלנו",
    ],
    aboutMore: "עוד עלינו",
    aboutQuote: "קח את חייך לשלב הבא עם Rise, ייעוץ פיננסי מובנה ממומחים עם מעל 10 שנות ניסיון.",
    thirdTitle: "מסע של מצוינות אסטרטגית",
    thirdP1: "הוקמנו מתוך תשוקה משותפת להצלחה. אנו צוות דינמי המחויב להעצים עסקים ואנשים בסביבה משתנה.",
    thirdP2: "אנחנו יותר מיועצים, אנחנו שותפים לדרך. צוות ארבעת המומחים מביא ידע רב לכל פרויקט.",
    thirdStat1: "שנות ניסיון משותפות",
    thirdStat2: "שיעור שביעות רצון לקוחות מרשים",
    stats: [
      {
        number: 120,
        suffix: "+",
        label: "פרויקטים שהושלמו",
        icon: FaTasks,
        details: "הספקה מוצלחת של פתרונות מותאמים למגוון ענפים, באיכות ובזמן.",
      },
      {
        number: 80,
        suffix: "+",
        label: "לקוחות מרוצים",
        icon: FaUsers,
        details: "אמון הלקוחות מכל העולם בזכות מקצועיות, מענה וזמינות.",
      },
      {
        number: 5,
        suffix: "+",
        label: "שנות ניסיון",
        icon: FaBriefcase,
        details: "מעל חמש שנות התמחות בהובלת שינוי בעסק עם טכנולוגיה וחדשנות.",
      },
      {
        number: 15,
        suffix: "+",
        label: "מדינות בהן פעלנו",
        icon: FaGlobe,
        details: "נוכחות גלובלית עם פתרונות מותאמים לפי צרכים מגוונים.",
      },
    ],
    testimonials: [
      {
        text: "הבריאות הכלכלית של החברה שלנו לא הייתה טובה יותר. צוות אלברט פיננסי סיפק תוכנית פעולה ברורה שהובילה לגידול משמעותי. המקצועיות והמחויבות שלהם יוצאת דופן.",
        name: "כריס מילר",
        role: "מנכ\"ל, טק אינובייטורס",
        avatar: "images/MEN1.jpg",
      },
      {
        text: "לעבוד איתם היה מהפך. עזרו לנו להתמצא בשוק מורכב וההכוונה האסטרטגית שלהם יקרה מפז. ממליצים בחום.",
        name: "ג\'יין סמית",
        role: "מייסדת, HealthPlus",
        avatar: "images/WOMEN1.jpg",
      },
      {
        text: "היחס האישי והידע הרחב שקיבלנו היו יוצאים מן הכלל. הם באמת הבינו אתגרינו ונתנו פתרונות יעילים וברי קיימא.",
        name: "דיויד וילסון",
        role: "מנהל, גלובל פרופרטיז",
        avatar: "images/MenH2.jpg",
      },
      {
        text: "שירות יוצא דופן ותוצאות מדהימות! הצוות שינה את פעולות העסק שלנו ועזר לנו להשיג צמיחה שוברת שיאים. התובנות האסטרטגיות שלהם והביצוע היו מושלמים.",
        name: "שרה ג'ונסון",
        role: "מנהלת כללית, InnovateCorp",
        avatar: "images/Women2.jpg",
      },
      {
        text: "מקצועיים, אמינים ומונעי תוצאות. הם עלו על הציפיות שלנו בכל היבט של השותפות. ההכנסות שלנו גדלו ב-150% בשנה הראשונה.",
        name: "מיכאל צ'ן",
        role: "סגן נשיא פעולות, פתרונות דיגיטליים",
        avatar: "images/Women3.jpg",
      },
      {
        text: "מומחיות יוצאת דופן ומחויבות למצוינות. הם עזרו לנו לפשט את התהליכים ולמטב את האסטרטגיות הפיננסיות שלנו. ממליצים בחום לכל עסק גדל.",
        name: "אמילי רודריגז",
        role: "מייסדת, EcoTech Ventures",
        avatar: "images/Women4.jpg",
      },
    ],
    testimonialsTitle: "מה הלקוחות שלנו אומרים",
    testimonialsP: "קבלו המלצות ישירות מהעסקים שעזרנו להם להגיע להצלחות חדשות.",
    ctaTitle: "מוכן לשדרג את העסק שלך?",
    ctaP: "התחל עכשיו בייעוץ חינם וגלו איך נוכל לעזור להשיג את מטרותיכם.",
    ctaStart: "התחל את המסע שלך",
    ctaLearn: "למידע נוסף",
    // Second Section Translations
    secondSection: {
      founded: "נוסדה",
      valuation: "הערכה",
      missionText: "אנחנו הסוכנות המובילה המוקדשת לשיפור העסקאות שלך, קידום הצמיחה והגשת תוצאות יוצאות דופן. סמכו עלינו למקסם את הפוטנציאל שלכם ולקחת את העסק שלכם לשלב הבא.",
      socialProofText: "2 אלף מנהיגי תעשייה.",
    },
    // Our Services Snapshot Section Translations
    servicesSnapshot: {
      title: "תצלום השירותים שלנו",
      subtitle: "פתרונות ייעוץ מקיפים שנועדו להאיץ את צמיחת העסק שלך",
      businessSolution: {
        title: "פתרון עסקי",
        description: "אנחנו מספקים פתרונות עסקיים חכמים וניתנים להרחבה.",
        linkText: "למד עוד ←"
      },
      marketResearch: {
        title: "מחקר שוק",
        description: "פתרונות שיווק מקיפים שנועדו.",
        linkText: "למד עוד ←"
      },
      strategyGrowth: {
        title: "אסטרטגיית צמיחה",
        description: "פתרונות שיווק מקיפים שעוזרים למותגים.",
        linkText: "למד עוד ←"
      },
      financeSolution: {
        title: "פתרון פיננסי",
        description: "שירותי השיווק העסקיים שלנו נועדו.",
        linkText: "למד עוד ←"
      }
    },
    // CTA Section Translations
    ctaSection: {
      mainTitle: "ייעוץ אסטרטגי",
      description: "היועצים המומחים שלנו מטפלים במורכבות כדי שתוכל להתמקד במה שחשוב ביותר לעסק שלך.",
      services: [
        "אסטרטגיה עסקית",
        "ייעוץ פיננסי",
        "אופטימיזציה של פעולות",
        "טרנספורמציה דיגיטלית"
      ],
      bannerTitle: "יש לך עסק שזקוק\nלהכוונה אסטרטגית?",
      bannerButton: "תזמן שיחה"
    },
  },
};

const Home1 = () => {
  const { language, setLanguage } = useLanguage();
  const t = translations[language] || translations.en;

  useEffect(() => {
    document.title = t.heroTitle;
    // Keep LTR direction for the second section language switcher (no RTL)
    // document.documentElement.dir = language === "ar" || language === "he" ? "rtl" : "ltr";
  }, [language, t.heroTitle]);

  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.3 });
  const sectionRef = useRef();
  const [startCount, setStartCount] = useState(false);
  useEffect(() => {
    const onScroll = () => {
      if (!sectionRef.current || startCount) return;
      const rect = sectionRef.current.getBoundingClientRect();
      if (rect.top < window.innerHeight - 100) setStartCount(true);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [startCount]);

  // Testimonial navigation logic
  const [testimonialPage, setTestimonialPage] = useState(0);
  const testimonialsPerPage = 2;
  const totalPages = Math.ceil(t.testimonials.length / testimonialsPerPage);

  const handleTestimonialNext = () => {
    setTestimonialPage(prev => (prev + 1) % totalPages);
  };

  const handleTestimonialPrev = () => {
    setTestimonialPage(prev => (prev - 1 + totalPages) % totalPages);
  };

  // Get current testimonials to display
  const getCurrentTestimonials = () => {
    const startIndex = testimonialPage * testimonialsPerPage;
    return t.testimonials.slice(startIndex, startIndex + testimonialsPerPage);
  };

  // Images for third section
  const images = [
    "images/bs2.jpg", // bottom
    "images/bs3.jpg", // top
  ];

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <video autoPlay muted loop playsInline className="hero-bg-video">
          <source src="images/home1.mp4" type="video/mp4" />
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

      {/* Statistics & Social Proof Section */}
      <section className="stats-social-section">
        <div className="container">
          <div className="stats-social-grid">
            {/* Left Side - Statistics Cards */}
            <div className="stats-cards">
              <motion.div 
                className="stat-card founded-card"
                initial={{ opacity: 0, x: -100, scale: 0.8 }}
                whileInView={{ opacity: 1, x: 0, scale: 1 }}
                transition={{ 
                  duration: 0.8, 
                  type: "spring", 
                  stiffness: 100,
                  damping: 15
                }}
                viewport={{ once: true }}
                whileHover={{ 
                  scale: 1.05, 
                  rotateY: 5,
                  boxShadow: "0 20px 40px rgba(210, 180, 140, 0.3)"
                }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.div 
                  className="stat-number"
                  initial={{ scale: 0, rotate: -180 }}
                  whileInView={{ scale: 1, rotate: 0 }}
                  transition={{ 
                    duration: 1.2, 
                    delay: 0.3,
                    type: "spring",
                    stiffness: 200
                  }}
                  viewport={{ once: true }}
                >
                  2,022
                </motion.div>
                <motion.div 
                  className="stat-label"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.8 }}
                  viewport={{ once: true }}
                >
                  {t.secondSection.founded}
                </motion.div>
              </motion.div>
              
              <motion.div 
                className="stat-card valuation-card"
                initial={{ opacity: 0, x: -100, scale: 0.8 }}
                whileInView={{ opacity: 1, x: 0, scale: 1 }}
                transition={{ 
                  duration: 0.8, 
                  delay: 0.2,
                  type: "spring", 
                  stiffness: 100,
                  damping: 15
                }}
                viewport={{ once: true }}
                whileHover={{ 
                  scale: 1.05, 
                  rotateY: -5,
                  boxShadow: "0 20px 40px rgba(210, 180, 140, 0.3)"
                }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.div 
                  className="stat-number"
                  initial={{ scale: 0, rotate: 180 }}
                  whileInView={{ scale: 1, rotate: 0 }}
                  transition={{ 
                    duration: 1.2, 
                    delay: 0.5,
                    type: "spring",
                    stiffness: 200
                  }}
                  viewport={{ once: true }}
                >
                  $ 40B
                </motion.div>
                <motion.div 
                  className="stat-label"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 1.0 }}
                  viewport={{ once: true }}
                >
                  {t.secondSection.valuation}
                </motion.div>
              </motion.div>
            </div>

            {/* Right Side - Mission & Social Proof */}
            <div className="mission-social">
              <motion.div 
                className="mission-content"
                initial={{ opacity: 0, x: 100, y: 50 }}
                whileInView={{ opacity: 1, x: 0, y: 0 }}
                transition={{ 
                  duration: 1.0,
                  type: "spring",
                  stiffness: 80,
                  damping: 20
                }}
                viewport={{ once: true }}
              >
                <motion.p 
                  className="mission-text"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  viewport={{ once: true }}
                >
                  {t.secondSection.missionText}
                </motion.p>
                
                <motion.div 
                  className="separator-line"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  transition={{ duration: 1.2, delay: 0.6 }}
                  viewport={{ once: true }}
                ></motion.div>
                
                <motion.div 
                  className="social-proof"
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.9 }}
                  viewport={{ once: true }}
                >
                  <div className="avatar-group">
                    <motion.div 
                      className="avatar avatar-1"
                      initial={{ opacity: 0, scale: 0, rotate: -45 }}
                      whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                      transition={{ duration: 0.6, delay: 1.1 }}
                      viewport={{ once: true }}
                      whileHover={{ scale: 1.2, zIndex: 10 }}
                    >
                      <img src="images/Cim1.jpg" alt="Industry Leader 1" />
                    </motion.div>
                    <motion.div 
                      className="avatar avatar-2"
                      initial={{ opacity: 0, scale: 0, rotate: -45 }}
                      whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                      transition={{ duration: 0.6, delay: 1.2 }}
                      viewport={{ once: true }}
                      whileHover={{ scale: 1.2, zIndex: 10 }}
                    >
                      <img src="images/Cim2.jpg" alt="Industry Leader 2" />
                    </motion.div>
                    <motion.div 
                      className="avatar avatar-3"
                      initial={{ opacity: 0, scale: 0, rotate: -45 }}
                      whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                      transition={{ duration: 0.6, delay: 1.3 }}
                      viewport={{ once: true }}
                      whileHover={{ scale: 1.2, zIndex: 10 }}
                    >
                      <img src="images/Cim3.jpg" alt="Industry Leader 3" />
                    </motion.div>
                    <motion.div 
                      className="avatar avatar-plus"
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.6, delay: 1.4 }}
                      viewport={{ once: true }}
                      whileHover={{ scale: 1.2, backgroundColor: "#b8a066" }}
                    >
                      <span>+</span>
                    </motion.div>
                  </div>
                  <motion.span 
                    className="social-text"
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 1.5 }}
                    viewport={{ once: true }}
                  >
                    {t.secondSection.socialProofText}
                  </motion.span>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>

        <style jsx>{`
          .stats-social-section {
            background: var(--stats-bg);
            padding: 100px 0;
            min-height: 500px;
            display: flex;
            align-items: center;
            position: relative;
            overflow: hidden;
          }

          .stats-social-section::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: radial-gradient(circle at 20% 80%, rgba(210, 180, 140, 0.1) 0%, transparent 50%),
                        radial-gradient(circle at 80% 20%, rgba(210, 180, 140, 0.1) 0%, transparent 50%);
            pointer-events: none;
          }

          .stats-social-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 80px;
            align-items: center;
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 40px;
            position: relative;
            z-index: 1;
          }

          .stats-cards {
            display: flex;
            flex-direction: row;
            gap: 20px;
            position: relative;
          }

          .stats-cards::before {
            content: '';
            position: absolute;
            top: -10px;
            left: -10px;
            right: -10px;
            bottom: -10px;
            background: linear-gradient(45deg, rgba(210, 180, 140, 0.1), rgba(210, 180, 140, 0.05));
            border-radius: 20px;
            opacity: 0;
            transition: opacity 0.3s ease;
            pointer-events: none;
          }

          .stats-cards:hover::before {
            opacity: 1;
          }

          .stat-card {
            background: var(--stats-card-bg);
            border: 1px solid var(--stats-card-border);
            border-radius: 15px;
            padding: 50px 40px;
            text-align: center;
            box-shadow: var(--shadow);
            transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
            min-height: 180px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            flex: 1;
            position: relative;
            overflow: hidden;
          }

          .stat-card::before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
            transition: left 0.6s ease;
          }

          .stat-card:hover::before {
            left: 100%;
          }

          .stat-card:hover {
            transform: translateY(-8px) scale(1.02);
            box-shadow: 0 20px 40px rgba(255, 215, 0, 0.3);
          }

          .stat-number {
            font-size: 3rem;
            font-weight: 900;
            color: var(--stats-number-color);
            margin-bottom: 10px;
            line-height: 1;
          }

          .stat-label {
            font-size: 1rem;
            font-weight: 600;
            color: var(--stats-label-color);
            text-transform: uppercase;
            letter-spacing: 1px;
          }

          .mission-social {
            display: flex;
            flex-direction: column;
            justify-content: center;
            position: relative;
          }

          .mission-social::before {
            content: '';
            position: absolute;
            top: -20px;
            left: -20px;
            right: -20px;
            bottom: -20px;
            background: linear-gradient(135deg, rgba(255, 215, 0, 0.05), rgba(255, 215, 0, 0.1));
            border-radius: 25px;
            opacity: 0;
            transition: opacity 0.3s ease;
            pointer-events: none;
          }

          .mission-social:hover::before {
            opacity: 1;
          }

          .mission-text {
            font-size: 1.1rem;
            line-height: 1.6;
            color: var(--stats-text-color);
            margin-bottom: 20px;
            text-align: left;
            position: relative;
            transition: all 0.3s ease;
          }

          .mission-text:hover {
            color: #555;
            transform: translateX(5px);
          }

          .separator-line {
            width: 100%;
            height: 2px;
            background: linear-gradient(90deg, transparent, #D2B48C, transparent);
            margin: 20px 0;
            border-radius: 1px;
            position: relative;
            overflow: hidden;
          }

          .separator-line::after {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.8), transparent);
            animation: shimmer 2s infinite;
          }

          @keyframes shimmer {
            0% { left: -100%; }
            100% { left: 100%; }
          }

          .social-proof {
            display: flex;
            align-items: center;
            gap: 15px;
          }

          .avatar-group {
            display: flex;
            align-items: center;
            position: relative;
            transition: transform 0.3s ease;
          }

          .avatar-group:hover {
            transform: scale(1.05);
          }

          .avatar {
            width: 50px;
            height: 50px;
            border-radius: 50%;
            border: 3px solid white;
            overflow: hidden;
            position: relative;
            z-index: 1;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            cursor: pointer;
          }

          .avatar:not(:first-child) {
            margin-left: -15px;
          }

          .avatar img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            transition: transform 0.3s ease;
          }

          .avatar:hover img {
            transform: scale(1.1);
          }

          .avatar-plus {
            background: #ffd700;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-weight: bold;
            font-size: 1.2rem;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            cursor: pointer;
          }

          .avatar-plus:hover {
            background: #e6c200;
            transform: scale(1.1);
          }

          .social-text {
            font-size: 1rem;
            color: var(--stats-text-color);
            font-weight: 500;
            transition: all 0.3s ease;
            position: relative;
          }

          .social-text:hover {
            color: #ffd700;
            transform: scale(1.05);
          }

          .social-text::after {
            content: '';
            position: absolute;
            bottom: -2px;
            left: 0;
            width: 0;
            height: 2px;
            background: #D2B48C;
            transition: width 0.3s ease;
          }

          .social-text:hover::after {
            width: 100%;
          }

          /* Responsive Design */
          @media (max-width: 768px) {
            .stats-social-section {
              padding: 60px 0;
            }

            .stats-social-grid {
              grid-template-columns: 1fr;
              gap: 40px;
              text-align: center;
            }

            .stats-cards {
              order: 2;
            }

            .mission-social {
              order: 1;
            }

            .stat-card {
              padding: 30px 20px;
              min-height: 120px;
            }

            .stat-number {
              font-size: 2.5rem;
            }

            .mission-text {
              text-align: center;
              font-size: 1rem;
            }

            .social-proof {
              justify-content: center;
            }
          }

          @media (max-width: 480px) {
            .stats-social-section {
              padding: 40px 0;
            }

            .stats-social-grid {
              gap: 30px;
              padding: 0 15px;
            }

            .stat-card {
              padding: 25px 15px;
              min-height: 100px;
            }

            .stat-number {
              font-size: 2rem;
            }

            .stat-label {
              font-size: 0.9rem;
            }

            .avatar {
              width: 40px;
              height: 40px;
            }

            .avatar:not(:first-child) {
              margin-left: -10px;
            }
          }
        `}</style>
      </section>

      {/* Third Section - Images on left, text on right with stats that count up */}
      <section ref={sectionRef} className="third-section w-full py-10 sm:py-16 px-3 sm:px-6 lg:px-8" style={{background: 'var(--third-section-bg)'}}>
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-10">
          {/* Images */}
          <motion.div 
            className="relative w-full lg:w-[45%] flex justify-center items-center min-h-[230px] sm:min-h-[350px] lg:min-h-[380px]"
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ 
              duration: 1.0, 
              type: "spring", 
              stiffness: 80,
              damping: 20
            }}
            viewport={{ once: true }}
          >
            <div className="flex flex-col sm:block w-full">
              {/* Overlap for tablet+; stack for mobile */}
              <motion.img 
                src={images[0]} 
                alt="Consulting Scene" 
                className="rounded-xl shadow-xl w-[92%] mx-auto object-cover z-10 hidden sm:block absolute left-0 bottom-0" 
                style={{ maxWidth: 370, maxHeight: 250, aspectRatio: "4/3", boxShadow: "0 8px 28px rgba(0,0,0,0.17)" }}
                initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
                whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{ 
                  duration: 0.8, 
                  delay: 0.3,
                  type: "spring",
                  stiffness: 100
                }}
                viewport={{ once: true }}
                whileHover={{ 
                  scale: 1.05, 
                  rotate: 2,
                  boxShadow: "0 15px 40px rgba(0,0,0,0.25)"
                }}
              />
              <motion.img 
                src={images[1]} 
                alt="Consulting Discussion" 
                className="rounded-xl shadow-2xl w-[92%] mx-auto object-cover relative z-20 mt-0 sm:w-[82%] sm:relative sm:left-[18%] sm:top-[-15%]" 
                style={{ maxWidth: 370, maxHeight: 270, aspectRatio: "4/3", boxShadow: "0 12px 34px rgba(0,0,0,0.19)" }}
                initial={{ opacity: 0, scale: 0.8, rotate: 10 }}
                whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{ 
                  duration: 0.8, 
                  delay: 0.5,
                  type: "spring",
                  stiffness: 100
                }}
                viewport={{ once: true }}
                whileHover={{ 
                  scale: 1.05, 
                  rotate: -2,
                  boxShadow: "0 20px 50px rgba(0,0,0,0.3)"
                }}
              />
              <motion.img 
                src={images[0]} 
                alt="Consulting Scene" 
                className="rounded-xl shadow-xl w-[92%] mx-auto object-cover z-10 block sm:hidden mt-4" 
                style={{ maxWidth: 370, maxHeight: 250, aspectRatio: "4/3", boxShadow: "0 8px 28px rgba(0,0,0,0.17)" }}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.7 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02 }}
              />
            </div>
          </motion.div>
          
          {/* Text content */}
          <motion.div 
            className="w-full lg:w-[55%] mt-8 lg:mt-0 flex flex-col items-start space-y-6"
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ 
              duration: 1.0, 
              type: "spring", 
              stiffness: 80,
              damping: 20
            }}
            viewport={{ once: true }}
          >
            <motion.h1 
              className="text-3xl sm:text-3xl md:text-3xl font-black leading-tight text-left"
              style={{color: 'var(--third-section-text)'}}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02 }}
            >
              {t.thirdTitle}
            </motion.h1>
            
            <motion.p 
              className="text-sm sm:text-lg text-justify"
              style={{color: 'var(--third-section-text)'}}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              whileHover={{ x: 5 }}
            >
              {t.thirdP1}
            </motion.p>
            
            <motion.p 
              className="text-sm sm:text-lg text-justify"
              style={{color: 'var(--third-section-text)'}}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              viewport={{ once: true }}
              whileHover={{ x: 5 }}
            >
              {t.thirdP2}
            </motion.p>
            
            {/* Stats - ALWAYS text-left */}
            <motion.div 
              className="flex flex-col sm:flex-row items-start gap-7 w-full pt-2 sm:pt-4"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              viewport={{ once: true }}
            >
              <motion.div 
                className="flex-1 text-left"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 1.0 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
              >
                <motion.span 
                  className="block text-2xl sm:text-4xl font-extrabold" 
                  style={{color: '#ffd700'}}
                  initial={{ scale: 0, rotate: -180 }}
                  whileInView={{ scale: 1, rotate: 0 }}
                  transition={{ 
                    duration: 1.2, 
                    delay: 1.2,
                    type: "spring",
                    stiffness: 200
                  }}
                  viewport={{ once: true }}
                >
                  {startCount ? (<CountUp start={0} end={24} duration={1.7} suffix="+" />) : ("0+")}
                </motion.span>
                <motion.span 
                  className="block text-xs sm:text-sm mt-2"
                  style={{color: 'var(--third-section-text)'}}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 1.4 }}
                  viewport={{ once: true }}
                >
                  {t.thirdStat1}
                </motion.span>
              </motion.div>
              
              <motion.div 
                className="flex-1 text-left"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 1.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
              >
                <motion.span 
                  className="block text-2xl sm:text-4xl font-extrabold" 
                  style={{color: '#ffd700'}}
                  initial={{ scale: 0, rotate: 180 }}
                  whileInView={{ scale: 1, rotate: 0 }}
                  transition={{ 
                    duration: 1.2, 
                    delay: 1.3,
                    type: "spring",
                    stiffness: 200
                  }}
                  viewport={{ once: true }}
                >
                  {startCount ? (<CountUp start={0} end={95} duration={1.7} suffix="%" />) : ("0%")}
                </motion.span>
                <motion.span 
                  className="block text-xs sm:text-sm mt-2"
                  style={{color: 'var(--third-section-text)'}}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 1.5 }}
                  viewport={{ once: true }}
                >
                  {t.thirdStat2}
                </motion.span>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>

        <style jsx>{`
          /* Third Section Animations */
          .third-section {
            position: relative;
            overflow: hidden;
          }

          .third-section::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: radial-gradient(circle at 30% 70%, rgba(255, 255, 255, 0.1) 0%, transparent 50%),
                        radial-gradient(circle at 70% 30%, rgba(255, 215, 0, 0.1) 0%, transparent 50%);
            pointer-events: none;
            animation: backgroundShift 8s ease-in-out infinite;
          }

          @keyframes backgroundShift {
            0%, 100% { opacity: 0.3; }
            50% { opacity: 0.6; }
          }

          /* Image hover effects */
          .third-section img {
            transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
            cursor: pointer;
          }

          .third-section img:hover {
            filter: brightness(1.1) contrast(1.05);
          }

          /* Text animations */
          .third-section h1 {
            position: relative;
            transition: all 0.3s ease;
          }

          .third-section h1::after {
            content: '';
            position: absolute;
            bottom: -5px;
            left: 0;
            width: 0;
            height: 3px;
            background: linear-gradient(90deg, #ffd700, #ffffff);
            transition: width 0.6s ease;
          }

          .third-section h1:hover::after {
            width: 100%;
          }

          /* Stats animations */
          .third-section .stat-number {
            position: relative;
            transition: all 0.3s ease;
          }

          .third-section .stat-number::before {
            content: '';
            position: absolute;
            top: -10px;
            left: -10px;
            right: -10px;
            bottom: -10px;
            background: radial-gradient(circle, rgba(255, 215, 0, 0.2) 0%, transparent 70%);
            border-radius: 50%;
            opacity: 0;
            transition: opacity 0.3s ease;
            pointer-events: none;
          }

          .third-section .stat-number:hover::before {
            opacity: 1;
          }

          /* Paragraph animations */
          .third-section p {
            position: relative;
            transition: all 0.3s ease;
          }

          .third-section p::before {
            content: '';
            position: absolute;
            left: -20px;
            top: 0;
            bottom: 0;
            width: 3px;
            background: linear-gradient(180deg, #ffd700, transparent);
            opacity: 0;
            transition: opacity 0.3s ease;
          }

          .third-section p:hover::before {
            opacity: 1;
          }

          /* Responsive animations */
          @media (max-width: 768px) {
            .third-section::before {
              animation: none;
            }
            
            .third-section img:hover {
              transform: scale(1.02);
            }
          }
        `}</style>
      </section>

      {/* Our Services Snapshot Section */}
      <section className="py-20" style={{backgroundColor: 'var(--services-bg)'}}>
        <div className="max-w-7xl mx-auto px-6">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <motion.h2 
              className="text-4xl font-black mb-4"
              style={{color: 'var(--services-title-color)'}}
              animate={{ 
                y: [0, -5, 0],
                transition: { 
                  duration: 3, 
                  repeat: Infinity, 
                  ease: "easeInOut" 
                }
              }}
            >
              {t.servicesSnapshot.title}
            </motion.h2>
            <motion.p 
              className="text-xl whitespace-nowrap"
              style={{color: 'var(--services-text-color)'}}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              {t.servicesSnapshot.subtitle}
            </motion.p>
          </motion.div>
          
          {/* 2x4 Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Row 1 - Column 1: Business Solution Card */}
            <motion.div 
              className="rounded-xl p-8 text-center flex flex-col justify-between min-h-[300px] hover:scale-105 hover:shadow-2xl transition-all duration-300 group"
              style={{ backgroundColor: 'var(--services-card-bg)', border: '1px solid var(--services-card-border)' }}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <div>
                <motion.div 
                  className="flex justify-center items-center mb-6"
                  initial={{ scale: 0, rotate: -180 }}
                  whileInView={{ scale: 1, rotate: 0 }}
                  transition={{ duration: 0.8, delay: 0.2, type: "spring", stiffness: 200 }}
                  viewport={{ once: true }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width={64} height={64} viewBox="0 0 48 48">
                    <path fill="#45413c" d="M1.33 43.11a22.67 1.89 0 1 0 45.34 0a22.67 1.89 0 1 0-45.34 0" opacity={0.15}></path>
                    <path fill="#bf8256" d="M3.85 21.22h40.3V42H3.85Z"></path>
                    <path fill="#915e3a" d="M42.89 21.22H5.11a1.27 1.27 0 0 0-1.26 1.26v6a1 1 0 0 0 .3.13l12.76 3.48a1.2 1.2 0 0 0 .33 0h13.52a1.2 1.2 0 0 0 .33 0l12.76-3.48a1 1 0 0 0 .3-.13v-6a1.27 1.27 0 0 0-1.26-1.26"></path>
                    <path fill="none" stroke="#45413c" strokeLinecap="round" strokeLinejoin="round" d="M3.85 21.22h40.3V42H3.85Z" strokeWidth={1}></path>
                    <path fill="#bf8256" d="M3.22 15.56V24a1.25 1.25 0 0 0 .93 1.21l12.76 3.48a1.3 1.3 0 0 0 .33.05h13.52a1.3 1.3 0 0 0 .33-.05l12.76-3.48a1.25 1.25 0 0 0 .93-1.21v-8.44a1.26 1.26 0 0 0-1.26-1.26h-39a1.26 1.26 0 0 0-1.3 1.26"></path>
                    <path fill="#dea47a" d="M43.52 14.3h-39a1.26 1.26 0 0 0-1.26 1.26v4.25a1.26 1.26 0 0 1 1.26-1.26h39a1.26 1.26 0 0 1 1.26 1.26v-4.25a1.26 1.26 0 0 0-1.26-1.26"></path>
                    <path fill="none" stroke="#45413c" strokeLinecap="round" strokeLinejoin="round" d="M3.22 15.56V24a1.25 1.25 0 0 0 .93 1.21l12.76 3.48a1.3 1.3 0 0 0 .33.05h13.52a1.3 1.3 0 0 0 .33-.05l12.76-3.48a1.25 1.25 0 0 0 .93-1.21v-8.44a1.26 1.26 0 0 0-1.26-1.26h-39a1.26 1.26 0 0 0-1.3 1.26" strokeWidth={1}></path>
                    <path fill="#daedf7" stroke="#45413c" strokeLinecap="round" strokeLinejoin="round" d="M17.07 26.89h13.85v3.78H17.07Zm3.15 3.78h7.56v2.52a1.26 1.26 0 0 1-1.26 1.26h-5a1.26 1.26 0 0 1-1.26-1.26v-2.52h0Z" strokeWidth={1}></path>
                    <path fill="#bf8256" stroke="#45413c" strokeLinecap="round" strokeLinejoin="round" d="M24 24.37a3.78 3.78 0 0 0-3.78 3.78h7.56A3.78 3.78 0 0 0 24 24.37" strokeWidth={1}></path>
                    <path fill="#bf8256" d="M17.07 11.78v2.52h2.52v-2.52a1.26 1.26 0 0 1 1.26-1.26h6.3a1.26 1.26 0 0 1 1.26 1.26v2.52h2.52v-2.52A3.78 3.78 0 0 0 27.15 8h-6.3a3.78 3.78 0 0 0-3.78 3.78"></path>
                    <path fill="#dea47a" d="M27.15 8h-6.3a3.78 3.78 0 0 0-3.78 3.78v1.73a3.78 3.78 0 0 1 3.78-3.78h6.3a3.78 3.78 0 0 1 3.78 3.78v-1.73A3.78 3.78 0 0 0 27.15 8"></path>
                    <path fill="none" stroke="#45413c" strokeLinecap="round" strokeLinejoin="round" d="M17.07 11.78v2.52h2.52v-2.52a1.26 1.26 0 0 1 1.26-1.26h6.3a1.26 1.26 0 0 1 1.26 1.26v2.52h2.52v-2.52A3.78 3.78 0 0 0 27.15 8h-6.3a3.78 3.78 0 0 0-3.78 3.78" strokeWidth={1}></path>
                  </svg>
                </motion.div>
                <motion.h3 
                  className="text-xl font-bold mb-4 transition-colors duration-300"
                  style={{color: 'var(--services-title-color)'}}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  viewport={{ once: true }}
                >
                  {t.servicesSnapshot.businessSolution.title}
                </motion.h3>
                <motion.p 
                  className="text-sm leading-relaxed transition-colors duration-300"
                  style={{color: 'var(--services-text-color)'}}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  viewport={{ once: true }}
                >
                  {t.servicesSnapshot.businessSolution.description}
                </motion.p>
              </div>
              <Link to="/services" className="text-sm font-semibold transition-colors duration-300 mt-6" style={{color: 'var(--services-icon-color)'}}>
                {t.servicesSnapshot.businessSolution.linkText}
              </Link>
            </motion.div>

            {/* Row 1 - Column 2: Image Card */}
            <motion.div 
              className="rounded-xl overflow-hidden hover:scale-105 transition-transform duration-300 group"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <motion.img 
                src="images/bs10.jpg" 
                alt="Business Consulting Meeting" 
                className="w-full h-[300px] object-cover group-hover:scale-110 transition-transform duration-500" 
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>

            {/* Row 1 - Column 3: Market Research Card */}
            <motion.div 
              className="rounded-xl p-8 text-center flex flex-col justify-between min-h-[300px] hover:scale-105 hover:shadow-2xl transition-all duration-300 group"
              style={{ backgroundColor: 'var(--services-card-bg)', border: '1px solid var(--services-card-border)' }}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <div>
                <motion.div 
                  className="flex justify-center items-center mb-6"
                  initial={{ scale: 0, rotate: -180 }}
                  whileInView={{ scale: 1, rotate: 0 }}
                  transition={{ duration: 0.8, delay: 0.4, type: "spring", stiffness: 200 }}
                  viewport={{ once: true }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width={64} height={64} viewBox="0 0 24 24">
                    <g fill="none">
                      <path fill="#66e1ff" d="M9.136 17.288a8.136 8.136 0 1 0 0-16.272a8.136 8.136 0 0 0 0 16.272"></path>
                      <path fill="#c2f3ff" d="m10.767 6.96l2.477 2.474a.956.956 0 0 0 1.352 0l2.39-2.391a8.128 8.128 0 0 0-15.715.05a8.13 8.13 0 0 0 1.24 6.772L9.42 6.96a.956.956 0 0 1 1.348 0"></path>
                      <path stroke="#191919" strokeLinecap="round" strokeLinejoin="round" d="M1.496 11.94a8.13 8.13 0 0 1 14.368-7.35m-.982 10.313l2.232 2.23" strokeWidth={1}></path>
                      <path fill="#c77f67" stroke="#191919" strokeLinecap="round" strokeLinejoin="round" d="M22.522 20.518a1.435 1.435 0 1 1-2.029 2.028l-3.72-3.72a.957.957 0 0 1 0-1.352l.677-.676a.957.957 0 0 1 1.352 0z" strokeWidth={1}></path>
                      <path stroke="#191919" strokeLinecap="round" strokeLinejoin="round" d="m1.002 15.371l8.417-8.41a.957.957 0 0 1 1.352 0l2.473 2.474a.956.956 0 0 0 1.353 0L23 1.025" strokeWidth={1}></path>
                      <path stroke="#191919" strokeLinecap="round" strokeLinejoin="round" d="M20.13 1.025H23v2.87m-5.75 5.757a8.13 8.13 0 0 1-13.316 5.755" strokeWidth={1}></path>
                    </g>
                  </svg>
                </motion.div>
                <motion.h3 
                  className="text-xl font-bold mb-4 transition-colors duration-300"
                  style={{color: 'var(--services-title-color)'}}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  viewport={{ once: true }}
                >
                  {t.servicesSnapshot.marketResearch.title}
                </motion.h3>
                <motion.p 
                  className="text-sm leading-relaxed transition-colors duration-300"
                  style={{color: 'var(--services-text-color)'}}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  viewport={{ once: true }}
                >
                  {t.servicesSnapshot.marketResearch.description}
                </motion.p>
              </div>
              <Link to="/services" className="text-sm font-semibold transition-colors duration-300 mt-6" style={{color: 'var(--services-icon-color)'}}>
                {t.servicesSnapshot.marketResearch.linkText}
              </Link>
            </motion.div>

            {/* Row 1 - Column 4: Image Card */}
            <motion.div 
              className="rounded-xl overflow-hidden hover:scale-105 transition-transform duration-300"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <img src="images/bs20.jpg" alt="Business Strategy Meeting" className="w-full h-[300px] object-cover" />
            </motion.div>

            {/* Row 2 - Column 1: Image Card */}
            <motion.div 
              className="rounded-xl overflow-hidden hover:scale-105 transition-transform duration-300"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              viewport={{ once: true }}
            >
              <img src="images/bs15.jpg" alt="Strategic Planning Session" className="w-full h-[300px] object-cover" />
            </motion.div>

            {/* Row 2 - Column 2: Strategy Growth Card */}
            <motion.div 
              className="rounded-xl p-8 text-center flex flex-col justify-between min-h-[300px] hover:scale-105 hover:shadow-2xl transition-all duration-300 group"
              style={{ backgroundColor: 'var(--services-card-bg)', border: '1px solid var(--services-card-border)' }}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              viewport={{ once: true }}
            >
              <div>
                <motion.div 
                  className="flex justify-center items-center mb-6"
                  initial={{ scale: 0, rotate: -180 }}
                  whileInView={{ scale: 1, rotate: 0 }}
                  transition={{ duration: 0.8, delay: 0.6, type: "spring", stiffness: 200 }}
                  viewport={{ once: true }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width={64} height={64} viewBox="0 0 128 128">
                    <path fill="#ca2c31" d="m3.77 71.73l16.34-16.1l27.82-4.93l-2.75 14.56L7.57 76.82l-2.43-1.05z"></path>
                    <path fill="#a02422" d="M22.94 59.76L5.2 75.88l13.05 6.36l19.81-10.11v-4.77l4.05-10.92zm41.98 28.39l-8.57 3.72l-8.09 17.15s7.12 15.77 7.44 15.77s4.37.32 4.37.32l14.4-16.1l3.64-27.5z"></path>
                    <path fill="#ca2c31" d="M56.5 100.84s4.77-.97 8.17-2.59s7.6-4.04 7.6-4.04l-1.54 13.43l-15.05 17.13s-.59-.73-3.09-6.17c-1.99-4.34-2.68-5.89-2.68-5.89z"></path>
                    <path fill="#f7d74d" d="M31.58 80.66s-5.74-.48-12.03 7.47c-5.74 7.26-8.43 19.08-9.47 22.12s-3.53 3.66-2.7 5.05s4.42 1.31 8.85.76s8.23-1.94 8.23-1.94s-.19.48-.83 1.52c-.23.37-1.03.9-.97 1.45c.14 1.31 11.36 1.34 20.32-7.88c9.68-9.95 4.98-18.11 4.98-18.11z"></path>
                    <path fill="#fbf0b4" d="M33.31 85.29s-6.19.33-11.31 8.28s-7.5 17.16-7.01 17.78c.48.62 10.02-2.83 12.31-2.14c1.57.48.76 2.07 1.18 2.49c.35.35 4.49.94 11.19-6.32c6.71-7.26 5.12-17.46 5.12-17.46z"></path>
                    <path fill="#858585" d="M36.35 74.44s-3.11 2.77-4.22 4.36s-1.11 1.73-1.04 2.21s1.22 5.75 6.01 10.37c5.88 5.67 11.13 6.43 11.89 6.43s5.81-5.67 5.81-5.67z"></path>
                    <path fill="#437687" d="M50.1 91.24s5.04 3.31 13.49.47c11.55-3.88 20.02-12.56 30.51-23.52c10.12-10.58 18.61-23.71 18.61-23.71l-5.95-19.93z"></path>
                    <path fill="#3f545f" d="m67.99 80.33l1.39-4.32l3.48.49s2.65 1.25 4.6 2.16s4.46 1.6 4.46 1.6l-4.95 4.18s-2.7-1.02-4.67-1.88c-2.22-.97-4.31-2.23-4.31-2.23"></path>
                    <path fill="#8dafbf" d="M84.32 16.14s-9.62 5.58-23.41 18.63c-12.43 11.76-21.64 22.4-23.87 31.45c-1.86 7.58-.87 12.18 3.36 17.15c4.47 5.26 9.71 7.87 9.71 7.87s3.94.06 20.38-12.59C91 62.86 107.43 36.42 107.43 36.42z"></path>
                    <path fill="#d83f22" d="M104.18 41.84s-8.37-3.57-14.34-11.9c-5.93-8.27-5.46-13.86-5.46-13.86s4.96-3.89 16.11-8.34c7.5-2.99 17.71-4.52 21.07-2.03s-2.3 14.98-2.3 14.98l-10.31 19.96z"></path>
                    <path fill="#6896a5" d="M68.17 80.4s-7.23-3.69-11.83-8.94c-8.7-9.91-10.5-20.79-10.5-20.79l4.37-5.13S51.3 57.1 60.63 67.09c6.08 6.51 12.43 9.49 12.43 9.49s-1.27 1.07-2.63 2.11c-.87.67-2.26 1.71-2.26 1.71"></path>
                    <path fill="#a02422" d="M112.71 44.48s4.34-5.23 8.45-17.02c5.74-16.44.74-21.42.74-21.42s-1.69 7.82-7.56 18.69c-4.71 8.71-10.41 17-10.41 17s3.14 1.41 4.84 1.9c2.14.62 3.94.85 3.94.85"></path>
                    <path fill="#b3e1ee" d="M39.81 69.66c1.3 1.24 3.27-.06 4.56-3.1c1.3-3.04 1.28-4.74.28-5.46c-1.24-.9-3.32 1.07-4.23 2.82c-1 1.94-1.59 4.8-.61 5.74m45.14-49.53s-7.61 5.47-15.73 12.91c-7.45 6.83-12.39 12.17-13.07 13.41c-.72 1.33-.73 3.21-.17 4.17s1.8 1.46 2.93.62c1.13-.85 9.18-9.75 16.45-16.11c6.65-5.82 11.78-9.51 11.78-9.51s2.08-3.68 1.74-4.52c-.34-.85-3.93-.97-3.93-.97"></path>
                    <path fill="#ed6a65" d="M84.95 20.13s5.62-4.31 11.74-7.34c5.69-2.82 11.35-5.17 12.37-3.13c.97 1.94-5.37 4.58-10.95 8.14s-10.95 7.81-10.95 7.81s-.82-1.5-1.35-2.89a24 24 0 0 1-.86-2.59"></path>
                    <path fill="#e1e1e1" d="M89.59 39.25c-5.57-5.13-13.32-3.75-17.14.81c-3.92 4.7-3.63 11.88 1 16.2c4.21 3.92 12.04 4.81 16.76-.69c4.2-4.88 3.94-12.13-.62-16.32"></path>
                    <path fill="#3f545f" d="M75.33 41.87c-3.31 3.25-3.13 9.69.81 12.63c3.44 2.57 8.32 2.44 11.38-.69s3.06-8.82.19-11.76c-3.3-3.37-8.59-3.9-12.38-.18"></path>
                    <path fill="#a02524" d="M50 76.89s6.19-6.28 6.87-5.6s.59 4.49-2.37 8.73C51.53 84.26 45 91.81 39.83 96.9c-5.1 5.01-12.29 10.74-12.97 10.64c-.53-.08-2.68-1.15-3.54-2.19c-.84-1.03 1.67-5.9 2.68-7.51c1.02-1.61 24-20.95 24-20.95"></path>
                    <path fill="#ca2c31" d="M21.23 101.85c-.08 1.44 2.12 3.54 2.12 3.54L56.87 71.3s-1.57-1.77-6.19 1.1c-4.66 2.9-8.74 6.38-14.76 12.21c-8.39 8.14-14.61 15.8-14.69 17.24"></path>
                    <path fill="#fff" d="M19.06 36.95c-1.11 1.11-1.16 2.89.08 3.91c1.1.91 2.89.32 3.56-.5s.59-2.6-.3-3.48c-.89-.89-2.66-.6-3.34.07"></path>
                    <path fill="#fff" d="M41.02 35.65c-.84.93-.57 2.31.21 2.82s1.95.46 2.52-.24c.51-.63.57-1.89-.21-2.67c-.68-.67-1.98-.51-2.52.09" opacity={0.5}></path>
                    <path fill="#fff" d="M55.55 11.89s1.22-3.48 1.94-3.52c.73-.04 1.78 3.48 1.78 3.48s3.61.04 3.85.57c.31.68-2.31 2.96-2.31 2.96s.85 3.4.45 3.81c-.45.45-3.56-1.34-3.56-1.34s-3.2 2.23-3.89 1.62c-.6-.53.65-4.13.65-4.13s-3-2.19-2.84-2.8c.23-.86 3.93-.65 3.93-.65m41.46 83.44c1.21.67 2.73.29 3.29-1c.51-1.15-.43-2.52-1.28-2.89s-2.34.12-2.88 1.09c-.53.96.14 2.4.87 2.8m17.18-29.49c-.69-1.07-2.18-1.42-3.15-.56c-.94.84-.71 2.16-.18 2.83s1.95.92 2.81.37s.94-2 .52-2.64"></path>
                  </svg>
                </motion.div>
                <motion.h3 
                  className="text-xl font-bold mb-4 transition-colors duration-300"
                  style={{color: 'var(--services-title-color)'}}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.7 }}
                  viewport={{ once: true }}
                >
                  {t.servicesSnapshot.strategyGrowth.title}
                </motion.h3>
                <motion.p 
                  className="text-sm leading-relaxed transition-colors duration-300"
                  style={{color: 'var(--services-text-color)'}}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.8 }}
                  viewport={{ once: true }}
                >
                  {t.servicesSnapshot.strategyGrowth.description}
                </motion.p>
              </div>
              <Link to="/services" className="text-sm font-semibold transition-colors duration-300 mt-6" style={{color: 'var(--services-icon-color)'}}>
                {t.servicesSnapshot.strategyGrowth.linkText}
              </Link>
            </motion.div>

            {/* Row 2 - Column 3: Image Card */}
            <motion.div 
              className="rounded-xl overflow-hidden hover:scale-105 transition-transform duration-300"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              viewport={{ once: true }}
            >
              <img src="images/bs25.jpg" alt="Financial Consulting" className="w-full h-[300px] object-cover" />
            </motion.div>

            {/* Row 2 - Column 4: Finance Solution Card */}
            <motion.div 
              className="rounded-xl p-8 text-center flex flex-col justify-between min-h-[300px] hover:scale-105 hover:shadow-2xl transition-all duration-300 group"
              style={{ backgroundColor: 'var(--services-card-bg)', border: '1px solid var(--services-card-border)' }}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              viewport={{ once: true }}
            >
              <div>
                <motion.div 
                  className="flex justify-center items-center mb-6"
                  initial={{ scale: 0, rotate: -180 }}
                  whileInView={{ scale: 1, rotate: 0 }}
                  transition={{ duration: 0.8, delay: 0.8, type: "spring", stiffness: 200 }}
                  viewport={{ once: true }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width={64} height={64} viewBox="0 0 128 128">
                    <path fill="#fcc21b" d="M68.43 5.38c.89-1.95 2.55-2.5 3.93-2.56c2.1-.1 4.3 1.35 6.37 3.06C80.2 7.54 81.96 8.82 84 9.72c1.41.5 2.81.6 4.23.53c2-.1 4.03-.54 6.04-.64l.11-.01l.91-.08c2.3-.11 4.47.43 6.53 1.62c1.89 1.72 2.72 3.86 2.46 6.44c-.44 2.13-.06 4.08 1.13 5.85c2.05 1.44 4.2 2.7 6.46 3.77c2.34 1.28 3.81 3.21 4.45 5.78c.23 2.72-1.03 4.46-3.75 5.21c-3.54.89-8.3.89-12.31 3.99c-5.86 4.89-7.7 9.82-10.25 10.57c-1.25-1.42-9.05-7.45-22.13-10.34c-2.34-8.07-3.76-27.55.55-37.03"></path>
                    <path fill="#d19b15" d="M81.63 40.69c2.3-4.6 8.85-12.69 10.42-11.09c1.55 1.74-2.02 10.78-4.53 15.21c-.89-.94-3.76-2.91-5.01-3.24"></path>
                    <path fill="#8d6e63" d="M93.2 55.42c-1.35 0-2.67-.69-3.42-1.93c-6.88-11.32-22.46-10.13-22.61-10.11c-2.2.18-4.14-1.44-4.33-3.63a4.006 4.006 0 0 1 3.61-4.34c.84-.08 20.67-1.71 30.17 13.94c1.15 1.89.54 4.35-1.34 5.49c-.66.39-1.37.58-2.08.58"></path>
                    <path fill="#fcc21b" d="M96.06 122.07c-17.13 4.22-40.94 3.92-57.95.56C22.19 119.48 10 110.09 11.4 91.61c1.42-18.7 13.81-36.31 30.85-44.07c16.49-7.51 38.62-11.17 50.28 5.87c2.9 4.24 8.44 13.65 8.7 18.27c.02.37.04.7.12 1.02c.02 1.16.49 2.33 1.63 3.19c7.33 5.55 12.67 12.91 13.65 23c1.16 12.03-10.22 20.63-20.57 23.18"></path>
                    <path fill="#424242" d="M80.87 91.13c-2.08-3.38-5.91-7.05-9.53-10.2l2.81-7.78c2.5 1.95 4.7 3.78 6.42 5.36c.28.27.72.29 1.04.06l6.44-4.79c.18-.14.29-.34.32-.57a.8.8 0 0 0-.21-.62c-1.91-2.13-6.05-5.86-10.58-8.93l1.65-4.56c.19-.52-.07-1.09-.6-1.29l-7.57-2.74c-.52-.19-1.1.08-1.29.6l-1.23 3.41c-7.13-2.21-12.79-1.5-17.23 2.21c-3.48 2.92-4.98 7.09-3.92 10.87c1.08 4.03 4.24 6.79 8.24 10.28l.51.45c.93.8 1.92 1.63 2.89 2.46l-3.42 9.46c-4.49-2.94-8.25-7.01-8.89-7.9a.806.806 0 0 0-1.08-.21l-7.42 4.74c-.18.11-.31.3-.36.52c-.04.21 0 .43.12.61c2.23 3.36 5.88 7.12 9.77 10.06c.93.7 2.33 1.68 4.05 2.71l-1.29 3.55c-.18.52.08 1.09.6 1.28l7.58 2.75c.52.19 1.1-.08 1.29-.6l1.07-2.96c6.92 1.88 13 .79 17.7-3.23c4.54-3.89 5.32-9.35 2.12-15M65.18 68.4l-2.07 5.73c-1.93-1.5-2.96-2.63-2.23-4.25c.76-1.66 2.65-1.77 4.3-1.48m2.05 23.9c1.33 1.29 2.27 2.48 2.36 3.57c.04.62-.19 1.22-.73 1.84c-.94 1.09-2.44 1.3-3.99 1.11z"></path>
                  </svg>
                </motion.div>
                <motion.h3 
                  className="text-xl font-bold mb-4 transition-colors duration-300"
                  style={{color: 'var(--services-title-color)'}}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.9 }}
                  viewport={{ once: true }}
                >
                  {t.servicesSnapshot.financeSolution.title}
                </motion.h3>
                <motion.p 
                  className="text-sm leading-relaxed transition-colors duration-300"
                  style={{color: 'var(--services-text-color)'}}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 1.0 }}
                  viewport={{ once: true }}
                >
                  {t.servicesSnapshot.financeSolution.description}
                </motion.p>
              </div>
              <Link to="/services" className="text-sm font-semibold transition-colors duration-300 mt-6" style={{color: 'var(--services-icon-color)'}}>
                {t.servicesSnapshot.financeSolution.linkText}
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials-section">
        <div className="container">
          <motion.div 
            className="testimonials-header"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <motion.div 
              className="testimonials-title-section"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <motion.h2 
                className="testimonials-title"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                viewport={{ once: true }}
                whileHover={{ 
                  scale: 1.05,
                  transition: { duration: 0.3 }
                }}
              >
                {t.testimonialsTitle}
              </motion.h2>
              <motion.p 
                className="testimonials-subtitle"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
              >
                Trusted by industry leaders worldwide for strategic consulting excellence
              </motion.p>
            </motion.div>
            <motion.div 
              className="testimonials-navigation"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              viewport={{ once: true }}
            >
              <motion.button 
                className="nav-btn" 
                aria-label="Previous testimonial" 
                onClick={handleTestimonialPrev}
                whileHover={{ scale: 1.1, backgroundColor: "rgba(255,255,255,0.1)" }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M15 19l-7-7 7-7"/>
                </svg>
              </motion.button>
              <motion.span 
                className="nav-indicator"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.6 }}
                viewport={{ once: true }}
              >
                {testimonialPage + 1}/{totalPages}
              </motion.span>
              <motion.button 
                className="nav-btn" 
                aria-label="Next testimonial" 
                onClick={handleTestimonialNext}
                whileHover={{ scale: 1.1, backgroundColor: "rgba(255,255,255,0.1)" }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 5l7 7-7 7"/>
                </svg>
              </motion.button>
            </motion.div>
          </motion.div>
          
          <motion.div 
            className="testimonials-grid"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            viewport={{ once: true }}
          >
            {getCurrentTestimonials().map((testimonial, index) => {
              const globalIndex = testimonialPage * testimonialsPerPage + index;
              const useAvatarAsBg = testimonial.avatar && typeof testimonial.avatar === 'string' && testimonial.avatar.includes('images/');
              const backgroundImage = useAvatarAsBg ? testimonial.avatar : `images/bs${(globalIndex % 6) + 1}.jpg`;
              return (
                <motion.div 
                  key={`${testimonialPage}-${index}`} 
                  className="testimonial-card"
                  style={{ backgroundImage: `url(${backgroundImage})` }}
                  initial={{ 
                    opacity: 0, 
                    y: 50, 
                    scale: 0.9,
                    rotateX: -15
                  }}
                  whileInView={{ 
                    opacity: 1, 
                    y: 0, 
                    scale: 1,
                    rotateX: 0
                  }}
                  transition={{ 
                    duration: 0.8, 
                    delay: 0.8 + (index * 0.2),
                    type: "spring",
                    stiffness: 100,
                    damping: 15
                  }}
                  viewport={{ once: true }}
                  whileHover={{ 
                    scale: 1.05,
                    y: -10,
                    rotateY: 5,
                    transition: { duration: 0.3 }
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                    <motion.div 
                      className="testimonial-card-content"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 1.0 + (index * 0.2) }}
                    viewport={{ once: true }}
                  >
                    {!useAvatarAsBg && (
                      <motion.div 
                        className="testimonial-avatar"
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: 1.1 + (index * 0.2) }}
                        viewport={{ once: true }}
                      >
                        <img src={testimonial.avatar} alt={`${testimonial.name} avatar`} />
                      </motion.div>
                    )}
                    <motion.h3 
                      className="testimonial-name"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 1.2 + (index * 0.2) }}
                      viewport={{ once: true }}
                      whileHover={{ 
                        color: "#FFD700",
                        transition: { duration: 0.2 }
                      }}
                    >
                      {testimonial.name}
                    </motion.h3>
                    <motion.p 
                      className="testimonial-designation"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 1.3 + (index * 0.2) }}
                      viewport={{ once: true }}
                    >
                      {testimonial.role}
                    </motion.p>
                    <motion.blockquote 
                      className="testimonial-quote"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 1.4 + (index * 0.2) }}
                      viewport={{ once: true }}
                      whileHover={{ 
                        scale: 1.02,
                        transition: { duration: 0.2 }
                      }}
                    >
                      {testimonial.text}
                    </motion.blockquote>
                  </motion.div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-background">
          <div className="cta-overlay">
            <div className="container">
              <div className="cta-layout">
                {/* Left Side - Main Content */}
                <div className="cta-left-content">
                  <motion.div 
                    className="cta-text-content"
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                  >
                    <h2 className="cta-main-title">
                      {t.ctaSection.mainTitle}
                    </h2>
                    <p className="cta-description">
                      {t.ctaSection.description}
                    </p>
                  </motion.div>
                </div>

                {/* Right Side - Services List */}
                <div className="cta-right-content">
                  <motion.div 
                    className="cta-services-list"
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    viewport={{ once: true }}
                  >
                    <div className="service-item">{t.ctaSection.services[0]}</div>
                    <div className="service-item">{t.ctaSection.services[1]}</div>
                    <div className="service-item">{t.ctaSection.services[2]}</div>
                    <div className="service-item">{t.ctaSection.services[3]}</div>
                  </motion.div>
                </div>
              </div>

              {/* Bottom CTA Banner */}
              <motion.div 
                className="cta-banner"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                viewport={{ once: true }}
              >
                <div className="cta-banner-content">
                  <div className="cta-banner-text">
                    <h3>{t.ctaSection.bannerTitle.split('\n').map((line, index) => (
                      <span key={index}>
                        {line}
                        {index < t.ctaSection.bannerTitle.split('\n').length - 1 && <br />}
                      </span>
                    ))}</h3>
                  </div>
                  <Link to="/contact" className="cta-banner-button">
                    {t.ctaSection.bannerButton}
                  </Link>
                </div>
              </motion.div>
            </div>
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
  background: var(--hero-overlay-bg);
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
  color: var(--hero-text-color);
  max-width: 800px;
  z-index: 2;
  gap: 28px; /* space between title, text, and button */
}

.hero-title {
  color: var(--hero-text-color);
  font-size: 3rem;
  font-weight: 900;
  line-height: 1.1;
  margin-bottom: 0;
  opacity: 0;
  animation: slideIn 1s ease-out forwards 0.5s;
  text-shadow: var(--hero-title-shadow);
}


.hero-paragraph {
  font-size: 1.1rem;
  margin: 0;
  opacity: 0;
  animation: fadeUp 1s ease-out forwards 1s;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: var(--hero-text-color);
}

.hero-button {
  margin-top: 0;
  padding: 14px 36px;
  font-size: 1.1rem;
  font-weight: 600;
  color: #fff;
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
  transform: scale(1.1);
}

/* Responsive adjustments */
@media (max-width: 700px) {
  .hero-content {
    max-width: 95vw;
    padding: 0 10px;
    gap: 18px;
  }
  .hero-title {
    font-size: 2.5rem;
  }
  .hero-paragraph {
    font-size: 1rem;
    white-space: nowrap;
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

        {/* About Me Section */}

        .aboutme-section {
          padding: 60px 0;
          background: #142133;
          color: #f3f6fb;
          font-family: 'Segoe UI',Arial,sans-serif;
        }
        .aboutme-container {
          max-width: 1050px;
          margin: 0 auto;
          padding: 0 22px;
        }
        .aboutme-heading {
          text-align: center;
          font-size: 3rem;
          font-weight: 700;
          margin-bottom: 18px;
          letter-spacing: 1px;
        }
        .aboutme-intro {
          max-width: 780px;
          margin: 0 auto 48px;
          color: #d1dae2;
          line-height: 1.7;
          font-size: 1.23rem;
          text-align: center;
        }
        .aboutme-grid {
          display: flex;
          gap: 62px;
          align-items: center;
          justify-content: center;
          flex-wrap: wrap;
        }
        .aboutme-photo-col {
          flex: 1 1 340px;
          display: flex;
          align-items: center;
          justify-content: center;
          min-width: 260px;
        }
        .aboutme-glow {
          width: 340px;
          height: 340px;
          background: #16202e;
          border-radius: 50%;
  display: flex;
  align-items: center;
}



{/*stats section*/}
.stats {
  background: linear-gradient(135deg, #D2B48C, #cdb177, #b8a066);
  color: #eef2f3;
  padding: 60px 0;
  min-height: 350px;
  display: flex;
  align-items: center;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  width: 100%;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 40px;
  text-align: center;
}

.stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: rgba(255,255,255,0.1);
  border-radius: 200px;
  padding: 30px 20px;
  box-shadow: 0 8px 24px rgba(0,0,0,0.4);
  transition: transform 0.3s ease;
}

.stat-item:hover {
  transform: translateY(-10px);
  box-shadow: 0 12px 36px rgba(255, 255, 255, 0.6);
}

.stat-icon {
  font-size: 4rem;
  color: #000000ff; /* accent green */
  margin-bottom: 20px;
  filter: drop-shadow(0 0 6px #c2c0c0ff);
}

.stat-item h3 {
  font-size: 3.5rem;
  font-weight: 900;
  color: #fff;
  margin: 0 0 12px 0;
  letter-spacing: 1px;
}

.stat-item p {
  font-size: 1.25rem;
  font-weight: 600;
  color: #d1d9db;
  margin: 0;
}

@media (max-width: 768px) {
  .stats-grid {
    grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
    gap: 25px;
  }
  .stat-item h3 {
    font-size: 2.5rem;
  }
  .stat-icon {
    font-size: 3rem;
  }
}


{/* Services Section */}

.aboutme-section {
  width: 100vw;
  min-width: 100vw;
  position: relative;
  left: 50%;
  right: 50%;
  margin-left: -50vw;
  margin-right: -50vw;
  background: var(--bg-color);
  color: var(--text-color);
  font-family: 'Segoe UI', Arial, sans-serif;
  padding: 60px 0;
}
.aboutme-inner {
  max-width: 1150px;
  margin: 0 auto;
  padding: 0 8px;
}
.aboutme-heading {
  text-align: center;
  font-size: 2.5rem;
  font-weight: 800;
  margin-bottom: 16px;
  color: var(--heading-color);
  letter-spacing: 1px;
}
.aboutme-intro {
  max-width: 840px;
  margin: 0 auto 36px auto;
  color: var(--text-muted);
  line-height: 1.55;
  font-size: 1.09rem;
  text-align: center;
}
.aboutme-grid {
  display: flex;
  gap: 44px;
  align-items: center;
  justify-content: center;
  flex-wrap: nowrap;
  margin-left: -102px;
  padding-top:30px;
}
.aboutme-photo-col {
  flex: 1 1 320px;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 200px;
}
.aboutme-glow {
  width: 380px;
  height: 380px;
  background: var(--bg-color);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 0 68px 14px var(--primary-color), 0 0 140px 0 var(--primary-color);
  animation: glowme 2.2s infinite alternate;
  position: relative;
}
.aboutme-photo-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
  background: var(--card-bg);
  display: block;
}

@keyframes glowme {
  0%   { box-shadow: 0 0 40px var(--primary-color), 0 0 10px var(--primary-color);}
  50%  { box-shadow: 0 0 100px var(--primary-color), 0 0 30px var(--primary-color);}
  100% { box-shadow: 0 0 24px var(--primary-color), 0 0 30px var(--primary-color);}
}

.aboutme-skill-col {
  flex: 1 1 400px;
  min-width: 210px;
  max-width: 490px;
}

.aboutme-skills-heading {
  font-size: 1.28rem;
  color: var(--primary-color);
  font-weight: 700;
  margin-bottom: 28px;
  margin-top: 0;
}

.aboutme-skill-item {
  margin-bottom: 22px;
}
.aboutme-skill-label-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 1.05rem;
  margin-bottom: 6px;
}
.aboutme-skill-level {
  color: var(--primary-color);
  font-weight: 600;
  font-size: 1rem;
}
.aboutme-bar-bg {
  background: var(--sidebar-bg);
  border-radius: 18px;
  width: 100%;
  height: 13px;
  overflow: hidden;
}
.aboutme-bar {
  height: 13px;
  border-radius: 18px;
  background: linear-gradient(90deg, var(--primary-color) 0%, var(--accent-color) 100%);
  transition: width 1s cubic-bezier(.13,.67,.43,.98);
}
.aboutme-glow:hover {
  transform: scale(1.08); /* scale up 8% on hover */
  box-shadow: 0 0 60px 12px var(--primary-color), 0 0 150px 10px var(--primary-color);
}

/* Tablet */
@media (max-width: 1000px) {
  .aboutme-inner { max-width: 99vw; padding: 0 2vw; }
  .aboutme-grid { gap: 18px; }
  .aboutme-glow { width: 150px; height: 150px;}
}

@media (max-width: 700px) {
  .aboutme-section {
    padding: 3  0px 0 25px 0;
    min-width: 100vw;
  }
  .aboutme-inner { padding: 0 8px; }
  .aboutme-heading {
    font-size: 1.7rem;
    margin-bottom: 16px;
    letter-spacing: 1px;
  }
  .aboutme-intro {
    font-size: 1.05rem;
    margin-bottom: 20px;
    line-height: 1.5;
    max-width: 95vw;
  }
  .aboutme-grid {
    flex-direction: column;
    gap: 34px;
    align-items: center;
    justify-content: center;
    margin-left: 0;
    width: 100%;
    padding-top:50px;
  }
  .aboutme-photo-col,
  .aboutme-skill-col {
    min-width: 0;
    max-width: 100vw;
    flex-basis: 100%;
    margin: 0 auto;
    justify-content: center;
    align-items: center;
  }
  .aboutme-glow {
    width: 305px;
    height: 305px;
    margin-bottom: 16px;
    /* Remove white background to get rid of white ring! */
    background: transparent !important;
    border: none !important;
    box-shadow: 0 0 40px 8px var(--primary-color), 0 0 100px 0 var(--primary-color);
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    overflow: visible;
  }
  .aboutme-photo-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 50%;
    display: block;
    background: transparent;
    border: none;
    /* Don't set fixed px, let it stretch to fill parent */
  }
  .aboutme-skills-heading {
    font-size: 1.12rem;
    margin-bottom: 20px;
  }
  .aboutme-skill-item {
    margin-bottom: 22px;
  }
  .aboutme-skill-label-row {
    font-size: 1.05rem;
  }
  .aboutme-skill-level {
    font-size: 1.05rem;
  }
  .aboutme-bar-bg {
    height: 12px;
  }
     .aboutme-skill-col {
    max-width: 94vw;      /* Make list almost as wide as the screen */
    width: 100vw;
    margin: 0 auto;
    padding: 0 2vw;
  }

  .aboutme-skill-label-row {
    font-size: 1.2rem;    /* Bolder text for mobile */
  }

  .aboutme-bar-bg,
  .aboutme-bar {
    height: 20px;         /* Thick bars for easy touch and bold look */
    border-radius: 12px;
  }
}
}



/* For very small screens */
@media (max-width: 400px) {
  .aboutme-inner { padding: 0 2px; }
  .aboutme-heading { font-size: 1.23rem; }
  .aboutme-glow { width: 88px; height: 88px; }
  .aboutme-photo-img { width: 100%; height: 100%; }
}


/* Section heading */

.section-preview {
  padding: 70px 0;
}
.section-preview .services h2 {
  font-size: 2.5rem;
  margin-bottom: 1.5rem;
  color: var(--primary-heading-color);
  text-align: left; /* Keep heading left-aligned */
}

/* Paragraph text */
.section-preview .services p {
  font-size: 1.1rem;
  line-height: 1.6;
  margin-bottom: 2rem;
  color: var(--secondary-text-color);
  text-align: justify; /* ✅ Text justified */
}

/* List container */
.section-preview .section-list {
  list-style: none;
  padding: 0;
  margin: 0 0 2rem;
  display: flex;
  flex-wrap: wrap;
  gap: 1rem 2rem;
}

/* List items */
.section-preview .section-list li {
  display: flex;
  align-items: center;
  font-size: 1rem;
  color: var(--primary-text-color);
  width: calc(50% - 1rem);
  text-align: left; /* Keep list items aligned left */
}

/* Icon inside list item */
.section-preview .section-list li svg {
  color: var(--accent-color);
  margin-right: 0.5rem;
  flex-shrink: 0;
}

/* Responsive full width list items on small screens */
@media (max-width: 576px) {
  .section-preview .section-list li {
    width: 100%;
    text-align: left;
  }
}

/* Button container */
.section-preview .section-btn-container {
  margin-top: 2rem;
  text-align: left;
}

/* Button style */
.section-preview .btn,
.section-preview .view-all-btn,
.section-preview .view-btn {
  background-color: var(--primary-color);
  color: var(--bg-color); /* adaptive text color */
  padding: 0.8rem 2rem;
  border-radius: 0px;
  text-decoration: none;
  font-weight: 600;
  border: none;
  transition:
    background-color 0.2s ease,
    transform 0.16s cubic-bezier(.19,1,.22,1),
    box-shadow 0.18s;
  display: inline-block;
  box-shadow: 0 2px 8px rgba(0, 123, 255, 0.10);
  cursor: pointer;
}

/* Button hover and focus */
.section-preview .btn:hover,
.section-preview .view-all-btn:hover,
.section-preview .view-btn:hover,
.section-preview .btn:focus,
.section-preview .view-all-btn:focus,
.section-preview .view-btn:focus {
  background-color: var(--secondary-color);
  transform: translateY(-2px);
  box-shadow: var(--shadow-hover);
  color: var(--bg-color);
  outline: none;
}

/* Visual container for image */
.section-preview .services-visual {
  display: flex;
  justify-content: center;
  align-items: center;
}

/* Image wrapper */
.section-preview .section-image {
  width: 100%;
  max-width: 550px;
  height: 400px;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  transition: transform 0.5s ease;
}

/* Image hover effect */
.section-preview .section-image:hover {
  transform: scale(1.02);
}

/* Image itself */
.section-preview .section-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  border-radius: 12px;
}

/* ============= RESPONSIVE ============= */

/* Tablet (≤ 992px) */
@media (max-width: 992px) {
  .section-preview .services h2 {
    text-align: left; /* Keep heading left-aligned */
  }

  .section-preview .services p {
    text-align: justify; /* Maintain justified text */
    margin-left: auto;
    margin-right: auto;
  }

  .section-preview .section-btn-container {
    text-align: left;
  }
}

/* Mobile (≤ 576px) */
@media (max-width: 576px) {
  .section-preview .services h2 {
    font-size: 1.6rem;
    text-align: left; /* Heading left-aligned */
  }

  .section-preview .services p {
    font-size: 1rem;
    line-height: 1.6;
    text-align: justify; /* Maintain justified text */
  }

  .section-preview .section-btn-container {
    text-align: left;
  }

  .section-preview .section-list li {
    width: 100%;
    text-align: left;
  }
}


{/* Testimonials Section */}

.testimonials-section {
  background: var(--testimonials-bg);
  padding: 100px 0;
  width: 100vw;
  position: relative;
  overflow: hidden;
}

.testimonials-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: -50%;
  width: 200%;
  height: 100%;
  background: linear-gradient(45deg, transparent 30%, rgba(255, 215, 0, 0.03) 50%, transparent 70%);
  animation: shimmer 8s ease-in-out infinite;
  pointer-events: none;
}

@keyframes shimmer {
  0%, 100% { transform: translateX(-100%); }
  50% { transform: translateX(100%); }
}

.testimonials-section .container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 40px;
}

.testimonials-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 60px;
}

.testimonials-title-section {
  flex: 1;
  text-align: center;
  margin-bottom: 20px;
}

.testimonials-label {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.9rem;
  font-weight: 600;
  color: #999;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.testimonial-icon {
  font-size: 1rem;
  color: #ffd700;
}

.testimonials-title {
  font-size: 3rem;
  font-weight: 900;
  color: var(--testimonials-title-color);
  margin: 0 0 15px 0;
  line-height: 1.1;
  position: relative;
  cursor: pointer;
  font-family: 'Segoe UI', Arial, sans-serif;
  letter-spacing: -0.02em;
}


.testimonials-subtitle {
  font-size: 1.2rem;
  color: var(--testimonials-text-color);
  margin: 0;
  font-weight: 400;
  line-height: 1.5;
}

.testimonials-navigation {
  display: flex;
  align-items: center;
  gap: 12px;
}

.nav-btn {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  color: #ffd700;
  position: relative;
  overflow: hidden;
  outline: none;
}

.nav-btn::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0;
  height: 0;
  background: radial-gradient(circle, rgba(255, 215, 0, 0.3) 0%, transparent 70%);
  border-radius: 50%;
  transform: translate(-50%, -50%);
  transition: all 0.3s ease;
}

.nav-btn:hover::before {
  width: 100px;
  height: 100px;
}

.nav-btn:hover {
  background: rgba(255, 255, 255, 0.2);
  border-color: rgba(255, 215, 0, 0.5);
  color: #ffd700;
  transform: scale(1.1);
  box-shadow: 0 4px 20px rgba(255, 215, 0, 0.3);
}

.nav-indicator {
  font-size: 0.9rem;
  color: #ffd700;
  font-weight: 500;
}

.testimonials-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 30px;
}

.testimonial-card {
  position: relative;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: var(--shadow);
  border: 1px solid var(--testimonials-card-border);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  min-height: 400px;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  cursor: pointer;
  perspective: 1000px;
}

.testimonial-card:hover {
  transform: translateY(-10px) scale(1.02);
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.2);
}

.testimonial-card::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(45deg, rgba(255, 215, 0, 0.1) 0%, transparent 50%);
  opacity: 0;
  transition: opacity 0.3s ease;
  pointer-events: none;
}

.testimonial-card:hover::after {
  opacity: 1;
}


.testimonial-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(to right, rgba(255, 215, 0, 0.85) 0%, rgba(255, 215, 0, 0.6) 30%, rgba(255, 215, 0, 0.3) 60%, rgba(255, 215, 0, 0.1) 80%, transparent 100%);
  z-index: 1;
}

.testimonial-card-content {
  position: relative;
  z-index: 2;
  padding: 40px 30px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
}

.testimonial-avatar {
  width: 64px;
  height: 64px;
  border-radius: 9999px;
  overflow: hidden;
  border: 3px solid rgba(255, 215, 0, 0.8);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.25);
  margin-bottom: 10px;
}

.testimonial-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

/* Focus on face for Emily Rodriguez */
.testimonial-avatar img[alt*="Emily Rodriguez"] {
  object-position: center top;
}

.testimonial-name {
  font-size: 1.8rem;
  font-weight: 900;
  color: var(--testimonials-text-color);
  margin: 0 0 8px 0;
  line-height: 1.2;
}

.testimonial-designation {
  font-size: 1rem;
  color: var(--testimonials-text-color);
  margin: 0 0 20px 0;
  font-weight: 500;
  opacity: 0.9;
}

.testimonial-quote {
  font-size: 1.1rem;
  color: var(--testimonials-text-color);
  font-style: italic;
  line-height: 1.6;
  margin: 0;
  font-weight: 400;
  opacity: 0.95;
}

/* Responsive Design */
@media (max-width: 768px) {
  .testimonials-section {
    padding: 60px 0;
  }
  
  .testimonials-section .container {
    padding: 0 20px;
  }
  
  .testimonials-header {
    flex-direction: column;
    gap: 20px;
    margin-bottom: 40px;
  }
  
  .testimonials-title-section {
    margin-bottom: 0;
  }
  
  .testimonials-title {
    font-size: 2.5rem;
  }
  
  .testimonials-subtitle {
    font-size: 1rem;
  }
  
  .testimonials-navigation {
    align-self: center;
  }
  
  .testimonials-grid {
    grid-template-columns: 1fr;
    gap: 20px;
  }
  
  .testimonial-card {
    min-height: 350px;
  }
  
  .testimonial-card-content {
    padding: 30px 25px;
  }
  
  .testimonial-name {
    font-size: 1.5rem;
  }
  
  .testimonial-quote {
    font-size: 1rem;
  }
}

@media (max-width: 480px) {
  .testimonials-section {
    padding: 40px 0;
  }
  
  .testimonials-section .container {
    padding: 0 15px;
  }
  
  .testimonials-title {
    font-size: 2rem;
  }
  
  .testimonials-subtitle {
    font-size: 0.9rem;
  }
  
  .testimonial-card {
    min-height: 300px;
  }
  
  .testimonial-card-content {
    padding: 25px 20px;
  }
  
  .testimonial-name {
    font-size: 1.3rem;
  }
  
  .testimonial-designation {
    font-size: 0.9rem;
  }
  
  .testimonial-quote {
    font-size: 0.95rem;
  }
}

    
{/* CTA Section - Template Design */}

        .cta-section {
  position: relative;
  padding: 0;
  color: var(--cta-text-color);
  min-height: 100vh;
  display: flex;
  align-items: center;
}

.cta-background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: url('images/CTAH1.jpg') center/cover no-repeat;
  background-attachment: fixed;
  z-index: 1;
}

.cta-background::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: var(--cta-overlay-bg);
  z-index: 2;
}

.cta-overlay {
  padding: 80px 0;
  position: relative;
  z-index: 3;
}

.cta-layout {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 80px;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 40px;
  min-height: 60vh;
}

.cta-left-content {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.cta-text-content {
  text-align: left;
}

.cta-main-title {
  font-size: 3.5rem;
  font-weight: 900;
  color: var(--cta-text-color);
  line-height: 1.1;
  margin-bottom: 30px;
  font-family: 'Segoe UI', Arial, sans-serif;
  letter-spacing: -0.02em;
  white-space: nowrap;
}

.cta-description {
  font-size: 1.2rem;
  color: var(--cta-text-color);
  line-height: 1.6;
  margin: 0;
  font-weight: 400;
  opacity: 0.9;
}

.cta-right-content {
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

.cta-services-list {
  display: flex;
  flex-direction: column;
  gap: 15px;
  text-align: left;
  align-items: flex-start;
}

.service-item {
  font-size: 1.1rem;
  font-weight: 600;
  color: white;
  text-transform: uppercase;
  letter-spacing: 1px;
  padding: 12px 16px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  transition: color 0.3s ease;
  width: 100%;
  text-align: left;
  position: relative;
}

.service-item:hover {
  color: #ffd700; /* Gold accent color */
}

.cta-banner {
  position: absolute;
  bottom: 20px;
  left: 20px;
  right: 20px;
  background: #ffd700; /* Gold background */
  padding: 30px 0;
  margin-top: 40px;
  border-radius: 15px;
}

.cta-banner-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.cta-banner-text h3 {
  font-size: 1.4rem;
  font-weight: 700;
  color: black;
  margin: 0;
  line-height: 1.3;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.cta-banner-button {
  background: var(--cta-button-bg);
  color: #000;
  padding: 15px 30px;
  border-radius: 25px;
  text-decoration: none;
  font-weight: 600;
  font-size: 1rem;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.cta-banner-button:hover {
  background: var(--cta-button-hover-bg);
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
}

/* Responsive Design */
@media (max-width: 768px) {
  .cta-layout {
    grid-template-columns: 1fr;
    gap: 40px;
    text-align: center;
    padding: 0 20px;
  }

  .cta-left-content {
    order: 1;
  }

  .cta-right-content {
    order: 2;
    justify-content: center;
  }

  .cta-services-list {
    text-align: left;
    align-items: flex-start;
  }

  .cta-main-title {
    font-size: 2.5rem;
  }

  .cta-description {
    font-size: 1rem;
  }

  .cta-banner-content {
    flex-direction: column;
    gap: 20px;
    text-align: center;
    padding: 0 20px;
  }

  .cta-banner-text h3 {
    font-size: 1.2rem;
  }
}

@media (max-width: 480px) {
  .cta-section {
    min-height: auto;
  }

  .cta-overlay {
    padding: 60px 0;
  }

  .cta-layout {
    gap: 30px;
    padding: 0 15px;
  }

  .cta-main-title {
    font-size: 2rem;
  }

  .cta-description {
    font-size: 0.9rem;
  }

  .service-item {
    font-size: 1rem;
  }

  .cta-banner {
    padding: 20px 0;
  }

  .cta-banner-text h3 {
    font-size: 1rem;
  }

  .cta-banner-button {
    padding: 12px 25px;
    font-size: 0.9rem;
  }
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

        .services-content p {
          font-size: 0.9rem;
          line-height: 1.6;
          text-align: justify;
          margin-bottom: 30px;
          color: var(--text-color);
        }

          .hero-text h1 {
            font-size: 2.5rem;
          }
            .section-header h2 {
          font-size: 1.9rem;
          margin-bottom: 15px;
        }

          .stats-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 20px;
          }

          .hero-buttons,
          .cta-buttons {
            justify-content: center;
          }

          .services-content {
            text-align: center;
            margin-bottom: 40px;
          }
        }
      `}</style>
    </div>
  );
};

export default Home1;
