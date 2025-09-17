import React, { useRef, useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';
import { 
  FaUsers, 
  FaChartLine, 
  FaShieldAlt, 
  FaCogs, 
  FaRobot,
  FaHandshake, 
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
  FaLightbulb,
  FaServer,
  FaCloud,
  FaTools,
  FaQuoteLeft,
  FaCloudUploadAlt,
} from 'react-icons/fa';
import { useLanguage } from "../context.jsx/LanguageContext";

const translations = {
  en: {
    heroTitle: "Empowering Your Business",
    heroParagraph: "We help businesses foster agile teams that accelerate innovation, enhance collaboration, and deliver timely market solutions. Transform your workforce to be adaptive, empowered, and aligned with your business goals.",
    heroButton: "Reach Out Today",
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
    features: [
      {
        icon: FaChartLine,
        title: "Strategic Growth",
        description: "Develop scalable business strategies that accelerate your company's growth and increase market share through data-driven insights and planning.",
        color: '#2563EB',
      },
      {
        icon: FaHandshake,
        title: "Trusted Partnerships",
        description: "Forge long-lasting relationships with clients and partners grounded in transparency, reliability, and mutual success.",
        color: '#14B8A6',
      },
      {
        icon: FaLightbulb,
        title: "Innovative Solutions",
        description: "Implement cutting-edge technologies and creative strategies to solve complex challenges and drive business transformation.",
        color: '#FBBF24',
      },
    ],
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
        avatar: "https://placehold.co/64x64/E2E8F0/1F2937?text=CM",
      },
      {
        text: "Working with them was a game-changer. They helped us navigate a complex market with ease, and their strategic guidance has been invaluable. We highly recommend their services to any business.",
        name: "Jane Smith",
        role: "Founder, HealthPlus",
        avatar: "https://placehold.co/64x64/E2E8F0/1F2937?text=JS",
      },
      {
        text: "The personalized attention and deep industry knowledge we received were exceptional. They truly understood our unique challenges and provided solutions that were both effective and sustainable.",
        name: "David Wilson",
        role: "Director, Global Properties",
        avatar: "https://placehold.co/64x64/E2E8F0/1F2937?text=DW",
      },
    ],
    testimonialsTitle: "What Our Clients Say",
    testimonialsP: "Hear directly from the businesses we've helped achieve their goals and reach new heights.",
    ctaTitle: "Ready to Transform Your Business?",
    ctaP: "Get started today with a free consultation and discover how we can help you achieve your goals.",
    ctaStart: "Start Your Journey",
    ctaLearn: "Learn More About Us",
  },
  ar: {
    heroTitle: "تمكين أعمالك",
    heroParagraph: "نساعد الشركات على تطوير فرق عمل مرنة تسرّع الابتكار وتعزز التعاون وتقدم حلولاً سوقية في الوقت المناسب. حوّل القوى العاملة لديك لتكون متكيفة، متمكنة ومتوافقة مع أهداف عملك.",
    heroButton: "تواصل معنا اليوم",
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
    features: [
      {
        icon: FaChartLine,
        title: "النمو الاستراتيجي",
        description: "تطوير استراتيجيات أعمال قابلة للتوسع تعزز نمو الشركة وزيادة الحصة السوقية عبر رؤى وخطط قائمة على البيانات.",
        color: '#2563EB',
      },
      {
        icon: FaHandshake,
        title: "شراكات موثوقة",
        description: "بناء علاقات طويلة الأمد قائمة على الشفافية والثقة والنجاح المشترك.",
        color: '#14B8A6',
      },
      {
        icon: FaLightbulb,
        title: "حلول مبتكرة",
        description: "تطبيق تقنيات واستراتيجيات مبتكرة لحل التحديات وتحقيق التحول التجاري.",
        color: '#FBBF24',
      },
    ],
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
        avatar: "https://placehold.co/64x64/E2E8F0/1F2937?text=CM",
      },
      {
        text: "العمل معهم غير قواعد اللعبة، مساعدتنا في السوق المعقدة ودعمهم الاستراتيجي كان لا يقدر بثمن، ننصح بخدماتهم بشدة.",
        name: "جين سميث",
        role: "مؤسسة، هيلث بلس",
        avatar: "https://placehold.co/64x64/E2E8F0/1F2937?text=JS",
      },
      {
        text: "الاهتمام الشخصي والمعرفة العميقة بالصناعة كانت استثنائية، فهم تحدياتنا وقدموا حلولاً فعّالة ومستدامة.",
        name: "ديفيد ويلسون",
        role: "مدير، جلوبال بروبرتيز",
        avatar: "https://placehold.co/64x64/E2E8F0/1F2937?text=DW",
      },
    ],
    testimonialsTitle: "ماذا يقول عملاؤنا",
    testimonialsP: "استمع مباشرة من الشركات التي ساعدناها في تحقيق أهدافها والوصول إلى مستويات جديدة.",
    ctaTitle: "جاهز لتحويل عملك؟",
    ctaP: "ابدأ اليوم باستشارة مجانية واكتشف كيف يمكننا مساعدتك في تحقيق أهدافك.",
    ctaStart: "ابدأ رحلتك",
    ctaLearn: "المزيد عنّا",
  },
  he: {
    heroTitle: "העצמת העסק שלך",
    heroParagraph: "אנחנו עוזרים לעסקים לפתח צוותים זריזים שמאיצים חדשנות, משפרים שיתוף פעולה ומביאים פתרונות שוק בזמן. הפוך את העובדים שלך למסתגלים ומותאמים למטרות העסקיות.",
    heroButton: "צור קשר היום",
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
    features: [
      {
        icon: FaChartLine,
        title: "צמיחה אסטרטגית",
        description: "פיתוח אסטרטגיות עסקיות בקנה מידה העוזרות לצמיחה ולהגדלת נתח שוק על בסיס ניתוחי נתונים.",
        color: '#2563EB',
      },
      {
        icon: FaHandshake,
        title: "שותפויות אמינות",
        description: "בניית יחסים ארוכי טווח עם לקוחות ושותפים תוך אמינות ושקיפות.",
        color: '#14B8A6',
      },
      {
        icon: FaLightbulb,
        title: "פתרונות חדשניים",
        description: "הטמעה של טכנולוגיה חדשה וחשיבה יצירתית לפתרון אתגרים וקידום העסק.",
        color: '#FBBF24',
      },
    ],
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
        avatar: "https://placehold.co/64x64/E2E8F0/1F2937?text=CM",
      },
      {
        text: "לעבוד איתם היה מהפך. עזרו לנו להתמצא בשוק מורכב וההכוונה האסטרטגית שלהם יקרה מפז. ממליצים בחום.",
        name: "ג\'יין סמית",
        role: "מייסדת, HealthPlus",
        avatar: "https://placehold.co/64x64/E2E8F0/1F2937?text=JS",
      },
      {
        text: "היחס האישי והידע הרחב שקיבלנו היו יוצאים מן הכלל. הם באמת הבינו אתגרינו ונתנו פתרונות יעילים וברי קיימא.",
        name: "דיויד וילסון",
        role: "מנהל, גלובל פרופרטיז",
        avatar: "https://placehold.co/64x64/E2E8F0/1F2937?text=DW",
      },
    ],
    testimonialsTitle: "מה הלקוחות שלנו אומרים",
    testimonialsP: "קבלו המלצות ישירות מהעסקים שעזרנו להם להגיע להצלחות חדשות.",
    ctaTitle: "מוכן לשדרג את העסק שלך?",
    ctaP: "התחל עכשיו בייעוץ חינם וגלו איך נוכל לעזור להשיג את מטרותיכם.",
    ctaStart: "התחל את המסע שלך",
    ctaLearn: "למידע נוסף",
  },
};

const Home1 = () => {
  const { language } = useLanguage();
  const t = translations[language] || translations.en;

  useEffect(() => {
    document.title = t.heroTitle;
    document.documentElement.dir = language === "ar" || language === "he" ? "rtl" : "ltr";
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

  // Testimonial carousel logic
  const [currentIndex, setCurrentIndex] = useState(0);
  const [animDirection, setAnimDirection] = useState("right");
  const timeoutRef = useRef(null);
  useEffect(() => {
    timeoutRef.current = setTimeout(() => { handleNext(); }, 5000);
    return () => clearTimeout(timeoutRef.current);
  }, [currentIndex]);
  const handleNext = () => {
    setAnimDirection("right");
    setCurrentIndex(prev => (prev + 1) % t.testimonials.length);
  };
  const handlePrev = () => {
    setAnimDirection("left");
    setCurrentIndex(prev => (prev - 1 + t.testimonials.length) % t.testimonials.length);
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

      {/* About section */}
      <>
        <style>{`
          @keyframes slideInUp { from { transform: translateY(20px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
          .animate-slide-up { animation: slideInUp 0.8s ease-out; }
          @keyframes fadeInScale { from { transform: scale(0.9); opacity: 0; } to { transform: scale(1); opacity: 1; } }
          .animate-fade-in-scale { animation: fadeInScale 0.6s ease-out; }
          .business-h1 { text-align: justify; }
          @media (max-width: 1023px) { .business-h1 { font-size: 1.05rem !important; } }
          @media (max-width: 640px) { .business-h1 { font-size: 1.1rem !important; } }
          .business-justify { text-align: justify !important; }
        `}</style>
        <div className="min-h-screen flex items-center justify-center bg-[var(--bg-color)] py-12 px-2 sm:px-4 lg:px-8">
          <div className="max-w-7xl mx-auto w-full">
            <div className="bg-[var(--card-bg)] rounded-3xl shadow-xl overflow-hidden flex flex-col md:flex-row-reverse animate-slide-up">
              {/* Right side */}
              <div className="w-full md:w-1/2 p-5 sm:p-8 lg:p-16 flex flex-col justify-center">
                <span className="text-xs sm:text-sm font-semibold text-[var(--primary-color)] bg-[var(--primary-color)]/20 px-2 sm:px-3 py-1 rounded-full w-fit mb-2 sm:mb-4">
                  {t.aboutUs}
                </span>
                <h1 className="business-h1 text-2xl sm:text-3xl md:text-4xl font-bold text-[var(--heading-color)] leading-tight mb-4 md:mb-6 animate-fade-in-scale">
                  {t.aboutH1}
                </h1>
                <p className="business-justify text-sm sm:text-base md:text-lg text-[var(--text-muted)] mb-6 md:mb-8">
                  {t.aboutP}
                </p>
                <ul className="space-y-4 text-[var(--text-color)] mb-6 business-justify">
                  {t.aboutList.map((item, i) => (
                    <li className="flex items-start" key={i}>
                      <span className="check-icon inline-flex w-6 h-6 rounded-full bg-[var(--primary-color)] text-white justify-center items-center mr-2">
                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <Link to="/about" className="mt-4 sm:mt-8 px-6 py-3 bg-[var(--primary-color)] text-white font-semibold rounded-lg shadow-md hover:bg-[var(--secondary-color)] transition-colors duration-300 w-fit">
                  {t.aboutMore}
                </Link>
              </div>
              {/* Left side */}
              <div className="w-full md:w-1/2 relative min-h-[270px]">
                <img src="images/bs1.jpg" alt="Business professionals at work" className="w-full h-full object-cover" />
                {/* Quote card */}
                <div className="absolute bottom-2 left-2 right-2 sm:bottom-8 sm:left-8 sm:right-auto bg-[var(--card-bg)] rounded-lg p-3 sm:p-6 shadow-xl w-full sm:w-2/3 lg:w-3/4 transform transition-transform duration-500 ease-in-out hover:scale-105">
                  <p className="business-justify text-xs sm:text-sm md:text-base italic text-[var(--text-muted)]">
                    {t.aboutQuote}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>

      {/* Third Section - Images on left, text on right with stats that count up */}
      <section ref={sectionRef} className="w-full bg-[var(--bg-color)] py-10 sm:py-16 px-3 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-10">
          {/* Images */}
          <div className="relative w-full lg:w-[45%] flex justify-center items-center min-h-[230px] sm:min-h-[350px] lg:min-h-[380px]">
            <div className="flex flex-col sm:block w-full">
              {/* Overlap for tablet+; stack for mobile */}
              <img src={images[0]} alt="Consulting Scene" className="rounded-xl shadow-xl w-[92%] mx-auto object-cover z-10 hidden sm:block absolute left-0 bottom-0" style={{ maxWidth: 370, maxHeight: 250, aspectRatio: "4/3", boxShadow: "0 8px 28px rgba(0,0,0,0.17)" }} />
              <img src={images[1]} alt="Consulting Discussion" className="rounded-xl shadow-2xl w-[92%] mx-auto object-cover relative z-20 mt-0 sm:w-[82%] sm:relative sm:left-[18%] sm:top-[-15%]" style={{ maxWidth: 370, maxHeight: 270, aspectRatio: "4/3", boxShadow: "0 12px 34px rgba(0,0,0,0.19)" }} />
              <img src={images[0]} alt="Consulting Scene" className="rounded-xl shadow-xl w-[92%] mx-auto object-cover z-10 block sm:hidden mt-4" style={{ maxWidth: 370, maxHeight: 250, aspectRatio: "4/3", boxShadow: "0 8px 28px rgba(0,0,0,0.17)" }} />
            </div>
          </div>
          {/* Text content */}
          <div className="w-full lg:w-[55%] mt-8 lg:mt-0 flex flex-col items-start space-y-6">
            <h1 className="text-xl sm:text-3xl md:text-4xl font-bold text-[var(--heading-color)] leading-tight text-left">{t.thirdTitle}</h1>
            <p className="text-sm sm:text-lg text-[var(--text-muted)] text-justify">{t.thirdP1}</p>
            <p className="text-sm sm:text-lg text-[var(--text-muted)] text-justify">{t.thirdP2}</p>
            {/* Stats - ALWAYS text-left */}
            <div className="flex flex-col sm:flex-row items-start gap-7 w-full pt-2 sm:pt-4">
              <div className="flex-1 text-left">
                <span className="block text-2xl sm:text-4xl font-extrabold text-[var(--primary-color)]">
                  {startCount ? (<CountUp start={0} end={24} duration={1.7} suffix="+" />) : ("0+")}
                </span>
                <span className="block text-xs sm:text-sm text-[var(--text-muted)] mt-2">
                  {t.thirdStat1}
                </span>
              </div>
              <div className="flex-1 text-left">
                <span className="block text-2xl sm:text-4xl font-extrabold text-[var(--primary-color)]">
                  {startCount ? (<CountUp start={0} end={95} duration={1.7} suffix="%" />) : ("0%")}
                </span>
                <span className="block text-xs sm:text-sm text-[var(--text-muted)] mt-2">
                  {t.thirdStat2}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section features-section">
        <div className="container">
          <motion.div className="section-header text-center" initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}>
            <h2>{t.features[0].title}</h2>
            <p>{t.features[0].description}</p>
          </motion.div>
          <div className="features-grid">
            {t.features.map(({ icon: Icon, title, description, color }, index) => (
              <motion.div className="feature-card" key={index} initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: index * 0.15 }} viewport={{ once: true }} whileHover={{ y: -10, boxShadow: '0 12px 40px rgba(0, 123, 255, 0.5)' }}>
                <div className="feature-icon" style={{ backgroundColor: color }}><Icon size={36} /></div>
                <h3>{title}</h3>
                <p>{description}</p>
                <Link to="/services" className="feature-link">{language === "ar" ? "اعرف المزيد" : language === "he" ? "למידע נוסף" : "Learn More"} <FaArrowRight /></Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

     

      {/* Testimonials Section */}
      <section id="testimonials-section" className="py-16 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: "var(--bg-color)" }}>
        <div className="max-w-4xl mx-auto text-center" style={{ color: "var(--text-color)" }}>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4" style={{ color: "var(--heading-color)" }}>
            {t.testimonialsTitle}
          </h2>
          <p className="text-base sm:text-lg max-w-2xl mx-auto mb-12" style={{ color: "var(--text-muted)" }}>
            {t.testimonialsP}
          </p>
        </div>
        <div className="max-w-4xl mx-auto relative testimonial-carousel">
          <div className="testimonial-container relative overflow-hidden min-h-[220px] sm:min-h-[200px] xs:min-h-[auto]">
            {t.testimonials.map((tt, i) => {
              const isActive = i === currentIndex;
              return (
                <article key={i}
                  className={`testimonial-slide transition-opacity duration-500 ease-in-out absolute inset-0 flex flex-col items-center text-center p-8 sm:p-6 xs:p-4 rounded-2xl shadow-xl ${isActive ? "opacity-100 z-10" : "opacity-0 -z-10 pointer-events-none"}`}
                  style={{
                    backgroundColor: "var(--card-bg)",
                    color: "var(--text-color)",
                    transitionProperty: "opacity",
                    transitionDuration: "500ms",
                    transitionTimingFunction: "ease-in-out",
                  }}
                  aria-hidden={!isActive}
                >
                  <p className="text-lg sm:text-base xs:text-sm italic mb-6" style={{ color: "var(--text-muted)" }}>&ldquo;{tt.text}&rdquo;</p>
                  <div className="flex items-center justify-center">
                    <img src={tt.avatar} alt={`Photo of ${tt.name}`} className="w-16 h-16 sm:w-14 sm:h-14 xs:w-12 xs:h-12 rounded-full mr-4" />
                    <div>
                      <h4 className="text-xl sm:text-lg xs:text-base font-semibold" style={{ color: "var(--heading-color)" }}>{tt.name}</h4>
                      <p className="text-sm xs:text-xs" style={{ color: "var(--text-muted)" }}>{tt.role}</p>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
          {/* Navigation Buttons */}
          <div className="flex justify-center gap-4 mt-6 sm:mt-4 xs:mt-3">
            <button aria-label="Previous testimonial" className="p-2 rounded-full bg-white shadow-md text-gray-600 hover:bg-gray-200 transition-colors dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700" onClick={() => { clearTimeout(timeoutRef.current); handlePrev(); }} type="button">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
            </button>
            <button aria-label="Next testimonial" className="p-2 rounded-full bg-white shadow-md text-gray-600 hover:bg-gray-200 transition-colors dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700" onClick={() => { clearTimeout(timeoutRef.current); handleNext(); }} type="button">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
            </button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-overlay">
          <div className="container">
            <motion.div className="cta-content text-center" initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }}>
              <h2>{t.ctaTitle}</h2>
              <p>{t.ctaP}</p>
              <div className="cta-buttons">
                <Link to="/contact" className="btn btn-primary btn-large">
                  {t.ctaStart} <FaArrowRight />
                </Link>
                <Link to="/about" className="btn btn-outline btn-large">
                  {t.ctaLearn}
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

        {/*features-section */}
.features-section {
  background: var(--sidebar-bg);
  padding: 72px 24px;
}

.section-header {
  margin-bottom: 60px;
  text-align: center;
}

.section-header h2 {
  font-size: 3rem;
  margin-bottom: 18px;
  color: var(--heading-color);
  font-weight: 900;
  letter-spacing: 0.05em;
}

.section-header p {
  font-size: 1.4rem;
  color: var(--text-muted);
  margin: 0 auto 0 auto;
  max-width: 700px;
  font-weight: 500;
  letter-spacing: 0.02em;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 36px;
  max-width: 1200px;
  margin: 0 auto;
}

.feature-card {
  background: var(--card-bg);
  color: var(--text-color);
  border-radius: 1.25rem;
  padding: 36px 28px 44px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  transition: box-shadow 0.3s ease, transform 0.35s ease;
  cursor: pointer;
  min-height: 390px;
  border: none;
}

.feature-card:hover {
  box-shadow: 0 16px 48px rgba(0, 123, 255, 0.25);
  transform: translateY(-15px) scale(1.07);
}

.feature-icon {
  font-size: 58px;
  background-color: currentColor;
  color: var(--card-bg);
  width: 96px;
  height: 96px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 30px;
  filter: drop-shadow(0 0 16px currentColor);
  transition: background-color 0.3s ease, filter 0.3s ease, transform 0.3s ease;
}

.feature-card:hover .feature-icon {
  filter: drop-shadow(0 0 30px currentColor);
  transform: scale(1.25);
}

.feature-card h3 {
  font-size: 1.8rem;
  margin-bottom: 20px;
  font-weight: 900;
  color: var(--heading-color);
  text-align: justify;
}

.feature-card p {
  font-size: 1.1rem;
  color: var(--text-muted);
  margin-bottom: 32px;
  line-height: 1.7;
  flex-grow: 1;
  text-align: justify;
}

.feature-link {
  color: var(--primary-color);
  font-weight: 700;
  font-size: 1.1rem;
  display: inline-flex;
  align-items: center;
  gap: 10px;
  text-decoration: none;
  transition: color 0.3s ease, transform 0.3s ease;
  text-align: justify; /* Optional */
}

.feature-link:hover {
  color: var(--accent-color);
  transform: translateX(12px);
}

/* Tablet (≤ 992px) */
@media (max-width: 992px) {
  .features-grid {
    grid-template-columns: 1fr;
    max-width: 100vw;
    padding: 0 16px;
  }
  
  .feature-card {
    min-height: auto; /* allow cards to shrink for narrow screens */
    padding: 28px 20px 32px;
  }
  
  .feature-card h3 {
    font-size: 1.5rem;
  }
  
  .feature-card p {
    font-size: 1rem;
  }
  
  .section-header h2 {
    font-size: 2.2rem;
  }
  
  .section-header p {
    font-size: 1.1rem;
    max-width: 90vw;
  }
}

/* Mobile (≤ 640px) */
@media (max-width: 640px) {
  .features-section {
    padding: 48px 12px;
  }
  .section-header {
    margin-bottom: 40px;
  }
  
  .feature-card {
    padding: 20px 16px 24px;
    min-height: auto;
  }
  
  .feature-card h3 {
    font-size: 1.3rem;
    margin-bottom: 16px;
  }
  
  .feature-card p {
    font-size: 0.80rem;
    margin-bottom: 20px;
    line-height: 1.5;
  }
  
  .section-header h2 {
    font-size: 1.8rem;
  }
  
  .section-header p {
    font-size: 1rem;
    max-width: 100%;
  }
  
  .feature-link {
    font-size: 1rem;
    gap: 6px;
  }
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
  background: linear-gradient(135deg, #5058c9ff, #3b77eeff, #2f83e3ff);
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
      background: var(--bg-color);
      color: var(--text-color);
      padding: 64px 0 66px 0;
      width: 100vw;
    }
    .testimonials-inner {
      max-width: 820px;
      margin: 0 auto;
      padding: 0 16px;
      text-align: center;
    }
    .testimonials-heading {
      font-size: 2.4rem;
      font-weight: 800;
      letter-spacing: 0.04em;
      margin-bottom: 12px;
      color: var(--heading-color);
    }
    .testimonials-subheading {
      font-size: 1.1rem;
      color: var(--text-muted);
      margin-bottom: 46px;
    }
    .testimonials-fade-wrapper {
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    .testimonial-card-unique {
      background: var(--card-bg);
      border: 2px solid var(--border-color);
      box-shadow: 0 6px 28px rgba(8,36,68,0.09);
      padding: 38px 28px 24px 28px;
      border-radius: 18px;
      margin-bottom: 18px;
      min-height: 170px;
      max-width: 650px;
      transform: scale(0.97);
      opacity: 0;
      transition: opacity 400ms, transform 400ms;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }
    .testimonial-card-enter-active {
      opacity: 1;
      transform: scale(1);
    }
    .testimonial-text {
      font-size: 1.18rem;
      font-style: italic;
      color: var(--text-color);
      margin-bottom: 28px;
      word-break: break-word;
      line-height: 1.7;
    }
    .testimonial-author-name {
      font-weight: 700;
      color: var(--primary-color);
      font-size: 1.08rem;
      margin-bottom: 2px;
    }
    .testimonial-author-title {
      color: var(--text-muted);
      font-size: 0.97rem;
    }
    .testimonial-dots {
      display: flex;
      justify-content: center;
      margin-top: 14px;
      gap: 10px;
    }
    .testimonial-dot {
      width: 12px;
      height: 12px;
      border-radius: 50%;
      border: none;
      background: var(--border-color);
      transition: background 0.3s;
      cursor: pointer;
      outline: none;
      margin: 0 2px;
    }
    .testimonial-dot.active {
      background: var(--primary-color);
    }
    .testimonial-dot:hover {
      background: var(--primary-color);
    }
    @media (max-width: 600px) {
      .testimonials-section {
        padding: 36px 0 46px 0;
      }
      .testimonials-heading {
        font-size: 1.35rem;
      }
      .testimonial-card-unique, .testimonial-card-enter-active {
        padding: 16px 6vw 18px 6vw;
      }
      .testimonial-text {
        font-size: 1.02rem;
      }
    }

    
{/* cta section */}

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
  .btn-primary, .btn-outline, .btn-large {
  display: inline-flex;           /* Ensures horizontal layout! */
  align-items: center;            /* Vertically centers content */
  justify-content: center;        /* Centers content horizontally */
  gap: 8px;                       /* Space between text and icon */
}

.btn-primary svg {
  font-size: 1.3rem;
  vertical-align: middle;
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
          .cta-content h2 {
  font-size: 1.5rem;
  margin-bottom: 20px;
  color:#fff;
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
