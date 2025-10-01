import React, { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowUpRight } from "lucide-react";
import { FaArrowRight } from 'react-icons/fa';
import { useLanguage } from "../context.jsx/LanguageContext";

const clean = (s) =>
  typeof s === "string" ? s.replace(/\[translate:(.*?)\]/g, "$1") : s;

const t = {
  // Section 1: Hero
  hero: { en: "Accelerate with Scalable Tech", ar: "تمكين أعمالك بالتقنيات القابلة للتوسع", he: "האץ את העסק שלך עם טכנולוגיה ניתנת להרחבה" },
  heroDesc: { en: "Delivering innovative solutions that streamline operations and drive transformative growth.", ar: "نقدم حلولاً مبتكرة لتحسين العمليات، تعزيز الأمان، ودفع النمو التحويلي. لنصنع مستقبل أعمالك معاً.", he: "אנו מספקים פתרונות חדשניים לייעול תהליכים, חיזוק אבטחה וצמיחה עסקית. בואו נבנה יחד את עתיד העסק שלכם." },
  heroBtn: { en: "Connect", ar: "تواصل معنا اليوم", he: "צור קשר עוד היום" },
  // Section 2: Hero Consulting Section
  heroConsulting: {
    welcome: { en: "WELCOME TO BUSTAR AGENCY", ar: "مرحباً بكم في وكالة بستار", he: "ברוכים הבאים לסוכנות בוסטאר" },
    title: { en: "Driving innovation through strategic consulting", ar: "قيادة الابتكار من خلال الاستشارات الاستراتيجية", he: "הנעת חדשנות דרך ייעוץ אסטרטגי" },
    experienceLabel: { en: "Years Of Experience", ar: "سنوات من الخبرة", he: "שנות ניסיון" },
    description: { en: "We believe that every business is unique and our approach is never one size fits all. We tailor our strategies to fit your goals, culture, and industry dynamics.", ar: "نؤمن بأن كل عمل فريد من نوعه ونهجنا ليس حلاً واحداً يناسب الجميع. نخصص استراتيجياتنا لتناسب أهدافك وثقافتك وديناميكيات الصناعة.", he: "אנו מאמינים שכל עסק הוא ייחודי והגישה שלנו לעולם לא מתאימה לכולם. אנו מתאימים את האסטרטגיות שלנו למטרות, התרבות והדינמיקה של התעשייה שלך." },
    button: { en: "Explore More", ar: "استكشف المزيد", he: "גלה עוד" }
  },
  // Section 2: Image Grid and Overlay/Right
  gridCardText: [
    { en: "Innovative Collaboration", ar: "تعاون مبتكر", he: "שיתוף פעולה חדשני" },
    { en: "Solutions Hub", ar: "مركز الحلول", he: "מרכז פתרונות" },
    { en: "New Markets", ar: "أسواق جديدة", he: "שווקים חדשים" },
    { en: "Strategic Planning", ar: "تخطيط استراتيجي", he: "תכנון אסטרטגי" },
    { en: "Driving Business Excellence Forward.", ar: "دفع التميز في الأعمال للأمام.", he: "דוחפים את מצוינות העסקים קדימה." }
  ],
  // Section 3: Modern Consultancy Section
  modernConsultancy: {
    preHeadline: { en: "CONSULTANCY PLATFORM", ar: "منصة الاستشارات", he: "פלטפורמת ייעוץ" },
    headline: { en: "Transform your business with our comprehensive consultancy platform", ar: "حول عملك مع منصة الاستشارات الشاملة الخاصة بنا", he: "שנה את העסק שלך עם פלטפורמת הייעוץ המקיפה שלנו" },
    cards: [
      {
        number: "01",
        title: { en: "Industry Solutions", ar: "حلول الصناعة", he: "פתרונות תעשייה" },
        description: { en: "Specialized consultancy services tailored to your industry's unique challenges and opportunities.", ar: "خدمات استشارية متخصصة مصممة خصيصاً لتحديات وفرص صناعتك الفريدة.", he: "שירותי ייעוץ מתמחים המותאמים לאתגרים והזדמנויות הייחודיים של התעשייה שלך." },
        tags: [
          { en: "Healthcare", ar: "الرعاية الصحية", he: "בריאות" },
          { en: "Financial Services", ar: "الخدمات المالية", he: "שירותים פיננסיים" },
          { en: "Manufacturing", ar: "التصنيع", he: "ייצור" },
          { en: "Technology", ar: "التكنولوجيا", he: "טכנולוגיה" }
        ],
        link: { en: "Explore Industry Solutions →", ar: "استكشف حلول الصناعة →", he: "גלה פתרונות תעשייה →" }
      },
      {
        number: "02",
        title: { en: "Platform Services", ar: "خدمات المنصة", he: "שירותי פלטפורמה" },
        description: { en: "Comprehensive consultancy services delivered through our integrated platform for maximum efficiency and results.", ar: "خدمات استشارية شاملة يتم تقديمها من خلال منصتنا المتكاملة للحصول على أقصى كفاءة ونتائج.", he: "שירותי ייעוץ מקיפים הניתנים דרך הפלטפורמה המשולבת שלנו למקסימום יעילות ותוצאות." },
        tags: [
          { en: "Strategic Planning", ar: "التخطيط الاستراتيجي", he: "תכנון אסטרטגי" },
          { en: "Digital Transformation", ar: "التحول الرقمي", he: "טרנספורמציה דיגיטלית" },
          { en: "Process Optimization", ar: "تحسين العمليات", he: "אופטימיזציה של תהליכים" },
          { en: "Change Management", ar: "إدارة التغيير", he: "ניהול שינוי" }
        ],
        link: { en: "Explore Platform Services →", ar: "استكشف خدمات المنصة →", he: "גלה שירותי פלטפורמה →" }
      },
      {
        number: "03",
        title: { en: "Platform Solutions", ar: "حلول المنصة", he: "פתרונות פלטפורמה" },
        description: { en: "Customized consultancy solutions powered by our advanced platform technology for scalable business growth.", ar: "حلول استشارية مخصصة مدعومة بتقنية منصتنا المتقدمة للنمو التجاري القابل للتوسع.", he: "פתרונות ייעוץ מותאמים אישית המונעים על ידי טכנולוגיית הפלטפורמה המתקדמת שלנו לצמיחה עסקית ניתנת להרחבה." },
        tags: [
          { en: "Business Intelligence", ar: "ذكاء الأعمال", he: "בינה עסקית" },
          { en: "Automation Tools", ar: "أدوات الأتمتة", he: "כלי אוטומציה" },
          { en: "Data Analytics", ar: "تحليل البيانات", he: "ניתוח נתונים" },
          { en: "Cloud Integration", ar: "التكامل السحابي", he: "אינטגרציה בענן" }
        ],
        link: { en: "Explore Platform Solutions →", ar: "استكشف حلول المنصة →", he: "גלה פתרונות פלטפורמה →" }
      }
    ]
  },
  rightBlock: {
    h1: { en: "Unique Business Solutions For Your Vision", ar: "حلول أعمال فريدة لرؤيتك", he: "פתרונות עסקיים ייחודיים עבור חזונך" },
    p: { en: "Unlock new growth with strategic, AI-powered solutions crafted for today's dynamic market. We empower organizations to adapt, thrive, and innovate with confidence.", ar: "افتح أبواب النمو مع حلول استراتيجية مدعومة بالذكاء الاصطناعي مصممة لسوق اليوم الديناميكي. نمكن المؤسسات من التكيف والازدهار والابتكار بثقة.", he: "פתחו צמיחה חדשה עם פתרונות אסטרטגיים מונעי AI לשוק הדינמי של היום. אנו מעצימים ארגונים להסתגל, לפרוח ולחדש בביטחון." },
    sections: [
      { h3: { en: "Market Expansion Consulting", ar: "استشارات التوسع في السوق", he: "ייעוץ להתרחבות בשוק" }, p: { en: "Identify new opportunities and design scalable strategies to boost business reach and revenue.", ar: "حدد فرص جديدة وصمم استراتيجيات قابلة للتوسع لتعزيز نطاق العمل والإيرادات.", he: "זהו הזדמנויות חדשות ועצבו אסטרטגיות ניתנות להרחבה להגדלת השוק וההכנסות." } },
      { h3: { en: "Process Automation", ar: "أتمتة العمليات", he: "אוטומציה של תהליכים" }, p: { en: "Implement intelligent workflows that free up resources and increase operational efficiency.", ar: "قم بتطبيق سير عمل ذكي لتحرير الموارد وزيادة الكفاءة التشغيلية.", he: "יישום תהליכים חכמים לפינוי משאבים והגדלת יעילות תפעולית." } },
      { h3: { en: "Customer Insight Platforms", ar: "منصات فهم العملاء", he: "פלטפורמות לתובנות לקוח" }, p: { en: "Harness advanced analytics to deepen understanding of markets and personalize customer experiences.", ar: "استخدم التحليل المتقدم لتعميق فهمك للأسواق وتخصيص تجارب العملاء.", he: "השתמשו בניתוח מתקדם להעמקת הבנה של השווקים ולהתאמה אישית של חווית הלקוח." } }
    ]
  },
  // Section 4: Why Choose Us
  whyChooseUs: {
    h2: { en: "Why Choose Us", ar: "لماذا تختارنا", he: "למה לבחור בנו" },
    h1: { en: "Your Trusted Partner for Success", ar: "شريكك الموثوق للنجاح", he: "השותף המהימן שלך להצלחה" },
    p: { en: "We combine expertise, innovation, and dedication to deliver exceptional results that drive your business forward.", ar: "نجمع بين الخبرة والابتكار والتفاني لتقديم نتائج استثنائية تدفع عملك إلى الأمام.", he: "אנו משלבים מומחיות, חדשנות ומסירות כדי לספק תוצאות יוצאות דופן שמקדמות את העסק שלך." },
    features: [
      { 
        icon: "🎯", 
        title: { en: "Strategic Expertise", ar: "الخبرة الاستراتيجية", he: "מומחיות אסטרטגית" }, 
        desc: { en: "30+ years of proven experience in strategic consulting and business transformation.", ar: "أكثر من 30 عاماً من الخبرة المثبتة في الاستشارات الاستراتيجية وتحويل الأعمال.", he: "יותר מ-30 שנות ניסיון מוכח בייעוץ אסטרטגי ובטרנספורמציה עסקית." } 
      },
      { 
        icon: "🚀", 
        title: { en: "Innovation Focus", ar: "التركيز على الابتكار", he: "מיקוד בחדשנות" }, 
        desc: { en: "Cutting-edge solutions powered by the latest technologies and methodologies.", ar: "حلول متطورة مدعومة بأحدث التقنيات والمنهجيات.", he: "פתרונות מתקדמים המונעים על ידי הטכנולוגיות והמתודולוגיות העדכניות ביותר." } 
      },
      { 
        icon: "🤝", 
        title: { en: "Client Partnership", ar: "شراكة العملاء", he: "שותפות לקוחות" }, 
        desc: { en: "We work as an extension of your team, ensuring seamless collaboration and results.", ar: "نعمل كامتداد لفريقك، مما يضمن التعاون السلس والنتائج المثمرة.", he: "אנו עובדים כהרחבה של הצוות שלך, ומבטיחים שיתוף פעולה חלק ותוצאות." } 
      }
    ]
  },
  // Section 5: Testimonials
  testimonials: {
    subtitle: { en: "Our testimonial", ar: "شهاداتنا", he: "המלצות שלנו" },
    title: { en: "2356+ Customer Feedback's", ar: "2356+ تقييمات العملاء", he: "2356+ משובי לקוחות" },
    items: [
      {
        title: { en: "Great Business Solution", ar: "حل أعمال رائع", he: "פתרון עסקי מעולה" },
        text: { en: "Dabus nisl aliquet congue tellus nascetur lectus sagpien mattis arcu dictums augue volutpat felis etiam suspendisse.", ar: "دابوس نيسل أليكيت كونج تيلوس ناسيتور ليكتوس ساجبيان ماتيس أركو ديكتومس أوج فولوتبات فيليس إيتام سوسبينديس.", he: "דבוס ניסל אליקויט קונג טלוס נאסטור לקטוס סאגפיאן מאטיס ארקו דיקטומס אוג וולוטפט פליס אטיאם סוספנדיס." },
        name: { en: "William Henry", ar: "ويليام هنري", he: "ויליאם הנרי" },
        position: { en: "Finance Catalyst Agency", ar: "وكالة محفز التمويل", he: "סוכנות זרז פיננסי" },
        rating: 5
      },
      {
        title: { en: "Smart Enterprise Solution", ar: "حل مؤسسي ذكي", he: "פתרון ארגוני חכם" },
        text: { en: "I can't recommend The Gourmet Haven enough. It's a place for special occasions, date nights, or whenever you're in the mood.", ar: "لا أستطيع أن أوصي بـ The Gourmet Haven بما فيه الكفاية. إنه مكان للمناسبات الخاصة، مواعيد العشاء، أو كلما كنت في المزاج المناسب.", he: "אני לא יכול להמליץ על The Gourmet Haven מספיק. זה מקום לאירועים מיוחדים, ערבי רומנטיקה, או מתי שאתה במצב רוח." },
        name: { en: "Julian Wyat", ar: "جوليان وايت", he: "ג'וליאן וויאט" },
        position: { en: "Marketer Manager", ar: "مدير التسويق", he: "מנהל שיווק" },
        rating: 5
      },
      {
        title: { en: "Advanced Business", ar: "أعمال متقدمة", he: "עסקים מתקדמים" },
        text: { en: "Working with as our IT Sp game-changer. Their dee quick problem-solving sh", ar: "العمل معنا كمغير قواعد اللعبة في تكنولوجيا المعلومات. حلولهم السريعة للمشاكل", he: "עבודה איתנו כמשנה משחק בתחום ה-IT. הפתרונות המהירים שלהם לבעיות" },
        name: { en: "Beckett Hayc", ar: "بيكيت هايك", he: "בקט הייק" },
        position: { en: "IT Specialist Worker", ar: "متخصص تقنية المعلومات", he: "מומחה IT" },
        rating: 5
      }
    ]
  },
  // Section 6: CTA
  ctaTitle: { en: "Transform Your Business", ar: "حول عملك", he: "שנה את העסק שלך" },
  ctaDesc: { en: "Join thousands of businesses that have accelerated their growth with our comprehensive consultancy platform.", ar: "انضم إلى آلاف الشركات التي سرعت نموها مع منصة الاستشارات الشاملة الخاصة بنا.", he: "הצטרפו לאלפי עסקים שהאיצו את הצמיחה שלהם עם פלטפורמת הייעוץ המקיפה שלנו." },
  ctaOffer: { en: "Start your transformation journey with our expert consultancy platform", ar: "ابدأ رحلة التحول مع منصة الاستشارات المتخصصة الخاصة بنا", he: "התחילו את מסע השינוי עם פלטפורמת הייעוץ המומחית שלנו" },
  ctaDiscount: { en: "30%", ar: "30%", he: "30%" },
  ctaDiscountText: { en: "off first consultation", ar: "خصم على الاستشارة الأولى", he: "הנחה על הייעוץ הראשון" },
  ctaButton: { en: "Get Started", ar: "ابدأ الآن", he: "התחל עכשיו" }
};

const Home2 = () => {
  const { language } = useLanguage();
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const testimonialImages = [
    'images/T1H2.jpg',
    'images/T2H2.jpg',
    'images/T3H2.jpg'
  ];

  useEffect(() => {
    document.title = clean(t.hero[language]);
  }, [language]);

  // Auto-advance testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % t.testimonials.items.length);
    }, 5000); // Change every 5 seconds

    return () => clearInterval(interval);
  }, []);


  return (
    <div className="home2-page">
      {/* Section 1: Hero */}
      <section className="hero-section">
        <video autoPlay muted loop playsInline className="hero-bg-video">
          <source src="images/home2.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="hero-overlay">
          <div className="hero-content">
            <h1 className="hero-title animate-slide-in">{clean(t.hero[language])}</h1>
            <p className="hero-paragraph animate-fade-up">{clean(t.heroDesc[language])}</p>
            <Link to="/contact" className="hero-button animate-fade-up-delayed">
              {clean(t.heroBtn[language])}
            </Link>
          </div>
        </div>
      </section>

      {/* Section 2: Hero Consulting Section - Two Column Layout */}
      <section className="hero-consulting-section">
        <div className="hero-consulting-container">
          {/* Left Column - Text Content */}
          <motion.div 
            className="hero-consulting-left"
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="hero-consulting-content">
              <motion.div 
                className="hero-consulting-header"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
              >
                {clean(t.heroConsulting.welcome[language])}
              </motion.div>
              <motion.h1 
                className="hero-consulting-title"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                viewport={{ once: true }}
              >
                {clean(t.heroConsulting.title[language])}
              </motion.h1>
              <motion.div 
                className="hero-consulting-experience"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                viewport={{ once: true }}
              >
                <div className="experience-left-section">
                  <motion.div 
                    className="experience-counter"
                    initial={{ scale: 0, rotate: -180 }}
                    whileInView={{ scale: 1, rotate: 0 }}
                    transition={{ duration: 0.8, delay: 1, type: "spring", stiffness: 200 }}
                    viewport={{ once: true }}
                  >
                    <span className="experience-number">30</span>
                    <span className="experience-plus">+</span>
                  </motion.div>
                  <motion.div 
                    className="experience-label"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 1.2 }}
                    viewport={{ once: true }}
                  >
                    {clean(t.heroConsulting.experienceLabel[language])}
                  </motion.div>
                </div>
                <div className="experience-separator"></div>
                <motion.div 
                  className="hero-consulting-description"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 1.4 }}
                  viewport={{ once: true }}
                >
                  <p>
                    {clean(t.heroConsulting.description[language])}
                  </p>
                </motion.div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1.6 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
                whileTap={{ scale: 0.95 }}
              >
                <Link to="/about" className="hero-consulting-button">
                  {clean(t.heroConsulting.button[language])}
                  <ArrowUpRight className="hero-consulting-arrow" />
                </Link>
              </motion.div>
            </div>
          </motion.div>
          
          {/* Right Column - Professional Image */}
          <motion.div 
            className="hero-consulting-right"
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <motion.div 
              className="hero-consulting-image-container"
              initial={{ scale: 0.8, rotate: -5 }}
              whileInView={{ scale: 1, rotate: 0 }}
              transition={{ duration: 0.8, delay: 0.5, type: "spring", stiffness: 100 }}
              viewport={{ once: true }}
              whileHover={{ 
                scale: 1.05, 
                rotate: 2,
                transition: { duration: 0.4 }
              }}
            >
              <motion.img 
                src="images/bs20.jpg" 
                alt="Professional consulting team" 
                className="hero-consulting-image"
                initial={{ scale: 1.2, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1, delay: 0.7 }}
                viewport={{ once: true }}
              />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Section 3: Modern Consultancy Section */}
      <section className="consultancy-section">
        <div className="consultancy-background">
          <div className="consultancy-overlay">
            <div className="consultancy-container">
              <motion.div 
                className="consultancy-header"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <motion.div 
                  className="consultancy-pre-headline"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  viewport={{ once: true }}
                >
                  {clean(t.modernConsultancy.preHeadline[language])}
                </motion.div>
                <motion.h1 
                  className="consultancy-headline"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  viewport={{ once: true }}
                >
                  {clean(t.modernConsultancy.headline[language])}
                </motion.h1>
              </motion.div>
              
              <div className="consultancy-cards-container">
                {t.modernConsultancy.cards.map((card, index) => (
                  <motion.div 
                    key={index}
                    className={`consultancy-card ${index === 0 ? 'card-industries' : index === 1 ? 'card-services' : 'card-solutions'}`}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.8 + (index * 0.2) }}
                    viewport={{ once: true }}
                    whileHover={{ 
                      scale: 1.05, 
                      y: -10,
                      transition: { duration: 0.3 }
                    }}
                  >
                    <motion.div 
                      className="card-number"
                      initial={{ scale: 0, rotate: -180 }}
                      whileInView={{ scale: 1, rotate: 0 }}
                      transition={{ duration: 0.8, delay: 1 + (index * 0.2), type: "spring", stiffness: 200 }}
                      viewport={{ once: true }}
                    >
                      {card.number}
                    </motion.div>
                    <div className="card-divider"></div>
                    <motion.h3 
                      className="card-title"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 1.2 + (index * 0.2) }}
                      viewport={{ once: true }}
                    >
                      {clean(card.title[language])}
                    </motion.h3>
                    <motion.p 
                      className="card-description"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 1.4 + (index * 0.2) }}
                      viewport={{ once: true }}
                    >
                      {clean(card.description[language])}
                    </motion.p>
                    <motion.div 
                      className="card-tags"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 1.6 + (index * 0.2) }}
                      viewport={{ once: true }}
                    >
                      {card.tags.map((tag, tagIndex) => (
                        <span key={tagIndex} className={`tag ${index === 1 ? 'tag-red' : ''}`}>
                          {clean(tag[language])}
                        </span>
                      ))}
                    </motion.div>
                    <motion.a 
                      href="#" 
                      className="card-link"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 1.8 + (index * 0.2) }}
                      viewport={{ once: true }}
                      whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
                    >
                      {clean(card.link[language])}
                    </motion.a>
                  </motion.div>
                ))}

              </div>
            </div>
          </div>
        </div>
      </section>


      {/* Section 4: Why Choose Us */}
      <motion.section 
        className="why-choose-us-section"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="why-choose-us-container">
          {/* Left Column - Content */}
          <motion.div 
            className="why-choose-us-left"
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="why-choose-us-content">
              <motion.div 
                className="why-choose-us-header"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
              >
                {clean(t.whyChooseUs.h2[language])}
              </motion.div>
              <motion.h1 
                className="why-choose-us-title"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                viewport={{ once: true }}
              >
                {clean(t.whyChooseUs.h1[language])}
              </motion.h1>
              <motion.p 
                className="why-choose-us-description"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                viewport={{ once: true }}
              >
                {clean(t.whyChooseUs.p[language])}
              </motion.p>
              
              <motion.div 
                className="why-choose-us-features"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.0 }}
                viewport={{ once: true }}
              >
                {t.whyChooseUs.features.map((feature, index) => (
                  <motion.div 
                    key={index} 
                    className="feature-item"
                    initial={{ opacity: 0, x: -50, y: 30 }}
                    whileInView={{ opacity: 1, x: 0, y: 0 }}
                    transition={{ duration: 0.6, delay: 1.2 + (index * 0.2) }}
                    viewport={{ once: true }}
                    whileHover={{ 
                      scale: 1.02, 
                      x: 10,
                      transition: { duration: 0.3 }
                    }}
                  >
                    <motion.div 
                      className="feature-icon"
                      initial={{ scale: 0, rotate: -180 }}
                      whileInView={{ scale: 1, rotate: 0 }}
                      transition={{ duration: 0.8, delay: 1.4 + (index * 0.2), type: "spring", stiffness: 200 }}
                      viewport={{ once: true }}
                      whileHover={{ 
                        scale: 1.15, 
                        rotate: 10,
                        transition: { duration: 0.3 }
                      }}
                    >
                      {feature.icon}
                    </motion.div>
                    <div className="feature-content">
                      <motion.h3 
                        className="feature-title"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 1.6 + (index * 0.2) }}
                        viewport={{ once: true }}
                      >
                        {clean(feature.title[language])}
                      </motion.h3>
                      <motion.p 
                        className="feature-description"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 1.8 + (index * 0.2) }}
                        viewport={{ once: true }}
                      >
                        {clean(feature.desc[language])}
                      </motion.p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </motion.div>
          
          {/* Right Column - Curved Image */}
          <motion.div 
            className="why-choose-us-right"
            initial={{ opacity: 0, x: 100, y: 50 }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <motion.div 
              className="why-choose-us-image-container"
              initial={{ scale: 0.8, rotate: -5 }}
              whileInView={{ scale: 1, rotate: 0 }}
              transition={{ duration: 0.8, delay: 0.5, type: "spring", stiffness: 100 }}
              viewport={{ once: true }}
              whileHover={{ 
                scale: 1.05, 
                rotate: 2,
                transition: { duration: 0.4 }
              }}
            >
              <motion.img 
                src="images/bs21.jpg" 
                alt="Why Choose Us" 
                className="why-choose-us-image"
                initial={{ scale: 1.2, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1, delay: 0.7 }}
                viewport={{ once: true }}
              />
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* Section 5: Testimonials */}
      <motion.section 
        className="testimonials-section"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="testimonials-container">
          <motion.div 
            className="testimonials-header"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <motion.div 
              className="testimonials-subtitle"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              {clean(t.testimonials.subtitle[language])}
            </motion.div>
            <motion.h2 
              className="testimonials-title"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              viewport={{ once: true }}
            >
              {clean(t.testimonials.title[language])}
            </motion.h2>
          </motion.div>
          
          <motion.div 
            className="testimonials-carousel"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="testimonials-track" style={{ transform: `translateX(-${currentTestimonial * 100}%)` }}>
              {t.testimonials.items.map((testimonial, index) => (
                <motion.div 
                  key={index}
                  className="testimonial-card"
                  initial={{ opacity: 0, scale: 0.8, y: 50 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 1.0 + (index * 0.2) }}
                  viewport={{ once: true }}
                  whileHover={{ 
                    scale: 1.02, 
                    y: -5,
                    transition: { duration: 0.3 }
                  }}
                >
                  <motion.h3 
                    className="testimonial-card-title"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 1.2 + (index * 0.2) }}
                    viewport={{ once: true }}
                  >
                    {clean(testimonial.title[language])}
                  </motion.h3>
                  <motion.p 
                    className="testimonial-text"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 1.4 + (index * 0.2) }}
                    viewport={{ once: true }}
                  >
                    "{clean(testimonial.text[language])}"
                  </motion.p>
                  
                  <motion.div 
                    className="testimonial-customer"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 1.6 + (index * 0.2) }}
                    viewport={{ once: true }}
                  >
                    <motion.div 
                      className="customer-avatar"
                      initial={{ scale: 0, rotate: -180 }}
                      whileInView={{ scale: 1, rotate: 0 }}
                      transition={{ duration: 0.6, delay: 1.8 + (index * 0.2), type: "spring", stiffness: 200 }}
                      viewport={{ once: true }}
                      whileHover={{ 
                        scale: 1.1, 
                        rotate: 5,
                        transition: { duration: 0.3 }
                      }}
                    >
                      <img 
                        src={testimonialImages[index % testimonialImages.length]} 
                        alt={clean(testimonial.name[language])}
                        className="avatar-image"
                      />
                    </motion.div>
                    <div className="customer-info">
                      <motion.h4 
                        className="customer-name"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 2.0 + (index * 0.2) }}
                        viewport={{ once: true }}
                      >
                        {clean(testimonial.name[language])}
                      </motion.h4>
                      <motion.p 
                        className="customer-position"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 2.2 + (index * 0.2) }}
                        viewport={{ once: true }}
                      >
                        {clean(testimonial.position[language])}
                      </motion.p>
                    </div>
                  </motion.div>
                  
                  <motion.div 
                    className="testimonial-rating"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 2.4 + (index * 0.2) }}
                    viewport={{ once: true }}
                  >
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <motion.span 
                        key={i} 
                        className="star"
                        initial={{ opacity: 0, scale: 0 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3, delay: 2.6 + (index * 0.2) + (i * 0.1) }}
                        viewport={{ once: true }}
                        whileHover={{ 
                          scale: 1.2, 
                          transition: { duration: 0.2 }
                        }}
                      >
                        ★
                      </motion.span>
                    ))}
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </motion.div>
          
          <motion.div 
            className="testimonials-pagination"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.2 }}
            viewport={{ once: true }}
          >
            {t.testimonials.items.map((_, index) => (
              <motion.button
                key={index}
                className={`pagination-dot ${index === currentTestimonial ? 'active' : ''}`}
                onClick={() => setCurrentTestimonial(index)}
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 1.4 + (index * 0.1) }}
                viewport={{ once: true }}
                whileHover={{ 
                  scale: 1.2, 
                  transition: { duration: 0.2 }
                }}
                whileTap={{ scale: 0.9 }}
              />
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Section 6: CTA */}
      <section className="cta-section">
        <div className="cta-overlay">
          <div className="cta-container">
            <motion.div 
              className="cta-content"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="cta-left">
                <h2 className="cta-title">{clean(t.ctaTitle[language])}</h2>
                <p className="cta-description">{clean(t.ctaDesc[language])}</p>
              </div>
              
              <div className="cta-right">
                <div className="cta-box">
                  <div className="cta-offer-text">
                    <p>{clean(t.ctaOffer[language])}</p>
                  </div>
                  <div className="cta-offer-section">
                    <div className="cta-discount">
                      <span className="discount-percentage">{clean(t.ctaDiscount[language])}</span>
                      <span className="discount-text">{clean(t.ctaDiscountText[language])}</span>
                    </div>
                    <Link to="/contact" className="cta-button">
                      {clean(t.ctaButton[language])}
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
   

      <style jsx>{`
        .home2-page {
          padding-top: 80px;
        }

        /* Testimonials Section Styles */
        .testimonials-section {
          background: linear-gradient(135deg, #ffd700 0%, #000000 100%);
          position: relative;
          overflow: hidden;
          padding: 80px 0;
        }

        .testimonials-section::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-image: 
            radial-gradient(circle at 20% 20%, rgba(255, 255, 255, 0.05) 0%, transparent 50%),
            radial-gradient(circle at 80% 80%, rgba(255, 255, 255, 0.03) 0%, transparent 50%),
            radial-gradient(circle at 40% 60%, rgba(255, 255, 255, 0.02) 0%, transparent 50%);
          pointer-events: none;
        }

        .testimonials-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 20px;
          position: relative;
          z-index: 1;
        }

        .testimonials-header {
          text-align: center;
          margin-bottom: 60px;
        }

        .testimonials-subtitle {
          font-size: 0.875rem;
          font-weight: 500;
          color: #ffffff;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          margin-bottom: 20px;
          font-family: 'Segoe UI', Arial, sans-serif;
        }

        .testimonials-title {
          font-size: 3.5rem;
          font-weight: 900;
          color: #ffffff;
          line-height: 1.2;
          margin: 0;
          font-family: 'Segoe UI', Arial, sans-serif;
        }

        .testimonials-carousel {
          position: relative;
          overflow: hidden;
          margin-bottom: 40px;
        }

        .testimonials-track {
          display: flex;
          transition: transform 0.5s ease-in-out;
        }

        .testimonial-card {
          min-width: 100%;
          background: var(--card-bg);
          border-radius: 16px;
          padding: 40px;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
          margin: 0 10px;
          position: relative;
          border: 1px solid var(--border-color);
          transition: background-color 0.3s ease, border-color 0.3s ease;
        }

        .testimonial-card-title {
          font-size: 1.5rem;
          font-weight: 800;
          color: var(--heading-color);
          margin: 0 0 20px 0;
          line-height: 1.3;
          font-family: 'Segoe UI', Arial, sans-serif;
          transition: color 0.3s ease;
        }

        .testimonial-text {
          font-size: 1rem;
          line-height: 1.6;
          color: var(--text-color);
          margin: 0 0 30px 0;
          font-style: italic;
          font-family: 'Segoe UI', Arial, sans-serif;
          transition: color 0.3s ease;
        }

        .testimonial-customer {
          display: flex;
          align-items: center;
          gap: 16px;
          margin-bottom: 20px;
        }

        .customer-avatar {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          overflow: hidden;
          position: relative;
        }

        .customer-avatar::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(135deg, #3b82f6, #1d4ed8);
          border-radius: 50%;
          z-index: 1;
        }

        .avatar-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          position: relative;
          z-index: 2;
        }

        .customer-info {
          flex: 1;
        }

        .customer-name {
          font-size: 1.125rem;
          font-weight: 700;
          color: var(--heading-color);
          margin: 0 0 4px 0;
          font-family: 'Segoe UI', Arial, sans-serif;
          transition: color 0.3s ease;
        }

        .customer-position {
          font-size: 0.875rem;
          color: var(--text-muted);
          margin: 0;
          font-family: 'Segoe UI', Arial, sans-serif;
          transition: color 0.3s ease;
        }

        .testimonial-rating {
          display: flex;
          gap: 4px;
        }

        .star {
          color: #ffd700;
          font-size: 1.25rem;
        }

        .testimonials-pagination {
          display: flex;
          justify-content: center;
          gap: 12px;
        }

        .pagination-dot {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          border: 2px solid #ffffff;
          background: transparent;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .pagination-dot.active {
          background: #ffffff;
        }

        .pagination-dot:hover {
          background: rgba(255, 255, 255, 0.5);
        }

        /* Responsive Design for Testimonials */
        @media (max-width: 1024px) {
          .testimonials-title {
            font-size: 2.5rem;
          }

          .testimonial-card {
            padding: 30px;
          }
        }

        @media (max-width: 768px) {
          .testimonials-section {
            padding: 50px 0;
          }

          .testimonials-container {
            padding: 0 15px;
          }

          .testimonials-title {
            font-size: 2rem;
          }

          .testimonials-header {
            margin-bottom: 40px;
          }

          .testimonial-card {
            padding: 24px;
            margin: 0 5px;
          }

          .testimonial-card-title {
            font-size: 1.25rem;
          }

          .testimonial-text {
            font-size: 0.9rem;
          }

          .customer-avatar {
            width: 50px;
            height: 50px;
          }

          .customer-name {
            font-size: 1rem;
          }

          .customer-position {
            font-size: 0.8rem;
          }
        }

        /* Why Choose Us Section Styles */
        .why-choose-us-section {
          min-height: 100vh;
          background-color: var(--bg-color);
          display: flex;
          align-items: center;
          padding: 80px 0;
          transition: background-color 0.3s ease;
        }

        .why-choose-us-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 20px;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 80px;
          align-items: center;
        }

        .why-choose-us-left {
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .why-choose-us-content {
          max-width: 600px;
          width: 100%;
        }

        .why-choose-us-header {
          font-size: 0.875rem;
          font-weight: 600;
          color: #ffd700;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          margin-bottom: 20px;
          font-family: 'Segoe UI', Arial, sans-serif;
        }

        .why-choose-us-title {
          font-size: 3rem;
          font-weight: 900;
          color: var(--heading-color);
          line-height: 1.2;
          margin-bottom: 24px;
          font-family: 'Segoe UI', Arial, sans-serif;
          transition: color 0.3s ease;
        }

        .why-choose-us-description {
          font-size: 1.125rem;
          line-height: 1.7;
          color: var(--text-color);
          margin-bottom: 40px;
          font-family: 'Segoe UI', Arial, sans-serif;
          transition: color 0.3s ease;
        }

        .why-choose-us-features {
          display: flex;
          flex-direction: column;
          gap: 32px;
        }

        .feature-item {
          display: flex;
          align-items: flex-start;
          gap: 20px;
        }

        .feature-icon {
          width: 60px;
          height: 60px;
          background: linear-gradient(135deg, #ffd700, #ff6b6b);
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.5rem;
          flex-shrink: 0;
          box-shadow: 0 4px 12px rgba(255, 215, 0, 0.3);
        }

        .feature-content {
          flex: 1;
        }

        .feature-title {
          font-size: 1.25rem;
          font-weight: 700;
          color: var(--heading-color);
          margin-bottom: 8px;
          font-family: 'Segoe UI', Arial, sans-serif;
          transition: color 0.3s ease;
        }

        .feature-description {
          font-size: 1rem;
          line-height: 1.6;
          color: var(--text-color);
          font-family: 'Segoe UI', Arial, sans-serif;
          transition: color 0.3s ease;
        }

        .why-choose-us-right {
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .why-choose-us-image-container {
          width: 100%;
          max-width: 500px;
          height: 600px;
          border-radius: 50px 20px 50px 20px;
          overflow: hidden;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
          position: relative;
        }

        .why-choose-us-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.3s ease;
        }

        .why-choose-us-image-container:hover .why-choose-us-image {
          transform: scale(1.05);
        }

        /* Responsive Design for Why Choose Us */
        @media (max-width: 1024px) {
          .why-choose-us-container {
            grid-template-columns: 1fr;
            gap: 60px;
            text-align: center;
          }

          .why-choose-us-title {
            font-size: 2.5rem;
          }

          .why-choose-us-features {
            align-items: center;
          }

          .feature-item {
            max-width: 500px;
          }
        }

        @media (max-width: 768px) {
          .why-choose-us-section {
            padding: 60px 0;
          }

          .why-choose-us-container {
            padding: 0 15px;
            gap: 40px;
          }

          .why-choose-us-title {
            font-size: 2rem;
          }

          .why-choose-us-description {
            font-size: 1rem;
          }

          .why-choose-us-image-container {
            max-width: 100%;
            height: 400px;
            border-radius: 30px 10px 30px 10px;
          }

          .feature-item {
            flex-direction: column;
            text-align: center;
            gap: 16px;
          }

          .feature-icon {
            width: 50px;
            height: 50px;
            font-size: 1.25rem;
          }
        }

        /* Modern Consultancy Section Styles */
        .consultancy-section {
          position: relative;
          width: 100%;
          min-height: 100vh;
          overflow: hidden;
        }

        .consultancy-background {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-image: url('/images/CONSULTANCY PLATFORM.jpg');
          background-size: cover;
          background-position: center;
          background-attachment: fixed;
        }

        .consultancy-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.6);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1;
        }

        .consultancy-container {
          max-width: 1200px;
          width: 100%;
          padding: 80px 20px;
          text-align: center;
          position: relative;
          z-index: 2;
        }

        .consultancy-header {
          margin-bottom: 80px;
        }

        .consultancy-pre-headline {
          font-size: 0.875rem;
          font-weight: 600;
          color: #ffffff;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          margin-bottom: 30px;
          opacity: 1;
          font-family: 'Segoe UI', Arial, sans-serif;
          text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
        }

        .consultancy-headline {
          font-size: 3.5rem;
          font-weight: 900;
          color: #ffffff;
          line-height: 1.2;
          margin: 0;
          text-align: center;
          text-shadow: 0 4px 8px rgba(0, 0, 0, 0.7);
          font-family: 'Segoe UI', Arial, sans-serif;
        }

        .consultancy-cards-container {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 40px;
          max-width: 1200px;
          margin: 0 auto;
        }

        .consultancy-card {
          background: var(--card-bg);
          border-radius: 16px;
          padding: 40px;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);
          transition: transform 0.3s ease, box-shadow 0.3s ease, background-color 0.3s ease;
          position: relative;
          overflow: hidden;
          backdrop-filter: none;
          -webkit-backdrop-filter: none;
          border: 1px solid var(--border-color);
          display: flex;
          flex-direction: column;
        }

        .consultancy-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 16px 48px rgba(0, 0, 0, 0.4);
        }

        .card-industries {
          background: var(--card-bg);
        }

        .card-services {
          background: rgba(255, 215, 0, 0.95);
        }

        .card-solutions {
          background: var(--card-bg);
        }

        .card-number {
          font-size: 0.875rem;
          font-weight: 600;
          color: var(--heading-color);
          text-transform: uppercase;
          letter-spacing: 0.1em;
          margin-bottom: 8px;
          font-family: 'Segoe UI', Arial, sans-serif;
          transition: color 0.3s ease;
        }

        .card-divider {
          width: 40px;
          height: 2px;
          background: var(--heading-color);
          margin-bottom: 20px;
          opacity: 0.8;
          transition: background-color 0.3s ease;
        }

        .card-title {
          font-size: 2rem;
          font-weight: 800;
          color: var(--heading-color);
          margin: 0 0 20px 0;
          line-height: 1.2;
          text-shadow: none;
          font-family: 'Segoe UI', Arial, sans-serif;
          transition: color 0.3s ease;
        }

        .card-description {
          font-size: 1rem;
          color: var(--text-color);
          line-height: 1.6;
          margin: 0 0 30px 0;
          opacity: 1;
          text-shadow: none;
          font-family: 'Segoe UI', Arial, sans-serif;
          transition: color 0.3s ease;
        }

        .card-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-bottom: 30px;
        }

        .tag {
          background: rgba(255, 215, 0, 0.2);
          color: var(--heading-color);
          padding: 6px 12px;
          border-radius: 20px;
          font-size: 0.875rem;
          font-weight: 600;
          border: 1px solid rgba(255, 215, 0, 0.4);
          font-family: 'Segoe UI', Arial, sans-serif;
          transition: color 0.3s ease;
        }

        .tag-red {
          background: rgba(0, 0, 0, 0.15);
          color: var(--heading-color);
          border: 1px solid rgba(0, 0, 0, 0.3);
          font-weight: 600;
          transition: color 0.3s ease;
        }

        .card-link {
          color: var(--heading-color);
          text-decoration: none;
          font-weight: 700;
          font-size: 1rem;
          display: inline-block;
          transition: opacity 0.3s ease, color 0.3s ease;
          font-family: 'Segoe UI', Arial, sans-serif;
          margin-top: auto;
          align-self: flex-start;
        }

        .card-link:hover {
          opacity: 0.8;
        }

        /* Responsive Design */
        @media (max-width: 1024px) {
          .consultancy-cards-container {
            grid-template-columns: 1fr;
            gap: 30px;
            max-width: 600px;
          }

          .consultancy-headline {
            font-size: 2.5rem;
          }

          .consultancy-container {
            padding: 60px 20px;
          }
        }

        @media (max-width: 768px) {
          .consultancy-headline {
            font-size: 2rem;
          }

          .consultancy-container {
            padding: 40px 15px;
          }

          .consultancy-card {
            padding: 30px;
          }

          .card-title {
            font-size: 1.5rem;
          }

          .consultancy-header {
            margin-bottom: 60px;
          }
        }


        /* Hero Consulting Section Styles - Exact Design Characteristics */
        .hero-consulting-section {
          min-height: 80vh; /* Reduced from 100vh */
          background-color: var(--bg-color); /* Clean background for corporate feel */
          display: flex;
          align-items: center;
          padding: 40px 0; /* Reduced from 80px */
          transition: background-color 0.3s ease;
        }

        .hero-consulting-container {
          max-width: 1200px; /* Back to two-column width */
          margin: 0 auto;
          padding: 0 20px;
          display: grid;
          grid-template-columns: 1fr 1fr; /* Two-column layout */
          gap: 60px; /* Back to larger gap for two columns */
          align-items: center;
        }

        .hero-consulting-left {
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .hero-consulting-content {
          max-width: 500px;
          width: 100%;
        }

        /* Small label - Thin, uppercase, more visible color */
        .hero-consulting-header {
          font-size: 0.75rem;
          font-weight: 300; /* Thin weight */
          color: var(--text-muted); /* Theme-aware color for better visibility */
          text-transform: uppercase;
          letter-spacing: 0.1em;
          margin-bottom: 20px;
          font-family: 'Segoe UI', Arial, sans-serif;
          transition: color 0.3s ease;
        }

        /* Heading - Bold, large, dark gray */
        .hero-consulting-title {
          font-size: 3rem;
          font-weight: 900; /* Bold */
          color: var(--heading-color); /* Theme-aware color for headings */
          line-height: 1.1;
          margin-bottom: 30px; /* Reduced from 40px */
          font-family: 'Segoe UI', Arial, sans-serif;
          transition: color 0.3s ease;
        }

        .hero-consulting-experience {
          display: flex;
          align-items: flex-start;
          gap: 0;
          margin-bottom: 30px; /* Reduced from 40px */
        }

        .experience-left-section {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          margin-right: 20px;
        }

        .experience-counter {
          display: flex;
          flex-direction: row;
          align-items: baseline;
          margin-bottom: 10px;
        }

        /* Number - Extra-large, impactful, dark gray */
        .experience-number {
          font-size: 10rem; /* Even larger for maximum impact */
          font-weight: 900; /* Bold for impact */
          color: var(--heading-color); /* Theme-aware color */
          line-height: 1;
          margin: 0;
          font-family: 'Segoe UI', Arial, sans-serif;
          transition: color 0.3s ease;
        }

        .experience-plus {
          font-size: 5rem; /* Larger plus symbol to match */
          font-weight: 900;
          color: var(--heading-color); /* Theme-aware color */
          line-height: 1;
          margin: 0;
          margin-left: 12px; /* Slightly larger gap */
          font-family: 'Segoe UI', Arial, sans-serif;
          transition: color 0.3s ease;
        }

        .experience-separator {
          width: 2px;
          height: 180px; /* Increased height for much larger 30 */
          background-color: var(--border-color);
          margin: 0 20px;
          flex-shrink: 0;
          transition: background-color 0.3s ease;
        }

        .hero-consulting-description {
          flex: 1;
          margin: 0;
        }

        .experience-label {
          font-size: 1rem;
          font-weight: 500;
          color: var(--text-muted); /* Theme-aware muted color */
          margin: 0; /* No margin since it's positioned below counter */
          font-family: 'Segoe UI', Arial, sans-serif;
          transition: color 0.3s ease;
        }

        /* Body text - Medium, gray for readability */
        .hero-consulting-description p {
          font-size: 1rem; /* Medium size */
          line-height: 1.6;
          color: var(--text-color); /* Theme-aware color for readability */
          margin: 0; /* No bottom margin since button is outside */
          font-family: 'Segoe UI', Arial, sans-serif;
          transition: color 0.3s ease;
        }

        /* CTA Button - Accent beige */
        .hero-consulting-button {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 16px 32px; /* Larger padding for bigger button */
          background-color: transparent;
          border: 2px solid #ffd700; /* Accent gold */
          border-radius: 8px;
          color: #ffd700; /* Accent gold */
          font-size: 1.1rem; /* Slightly larger font */
          font-weight: 600;
          text-decoration: none;
          cursor: pointer;
          transition: all 0.3s ease;
          margin-top: 20px; /* Spacing from experience section */
          width: fit-content; /* Button width fits content */
          align-self: flex-start; /* Align to left */
          font-family: 'Segoe UI', Arial, sans-serif;
        }

        .hero-consulting-button:hover {
          background-color: #ffd700; /* Accent gold background on hover */
          color: white;
          transform: translateY(-2px);
        }

        .hero-consulting-arrow {
          width: 16px;
          height: 16px;
        }

        .hero-consulting-right {
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .hero-consulting-image-container {
          width: 100%;
          max-width: 600px; /* Back to larger size for two-column layout */
          height: 500px; /* Fixed height for better proportions */
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
        }

        .hero-consulting-image {
          width: 100%;
          height: 100%; /* Fill the container height */
          display: block;
          object-fit: cover; /* Ensure proper cropping */
        }

        /* Responsive Design - Two Column Layout */
        @media (max-width: 1024px) {
          .hero-consulting-container {
            grid-template-columns: 1fr; /* Single column on tablet */
            gap: 40px;
            text-align: center;
          }

          .hero-consulting-title {
            font-size: 2.5rem; /* Maintain bold, large */
            color: var(--heading-color); /* Theme-aware color */
          }

          .hero-consulting-experience {
            justify-content: center;
            align-items: center;
          }

          .experience-left-section {
            margin-right: 0;
            align-items: center;
          }

          .experience-counter {
            margin-bottom: 10px;
            flex-direction: row; /* Keep horizontal layout */
            align-items: baseline;
          }

          .experience-number {
            font-size: 8rem; /* Still extra-large */
            color: var(--heading-color); /* Theme-aware color */
          }

          .experience-plus {
            font-size: 4rem;
            color: var(--heading-color); /* Theme-aware color */
            margin-left: 12px; /* Maintain gap */
          }

          .experience-separator {
            height: 120px; /* Adjusted for tablet */
          }

          .hero-consulting-description p {
            color: var(--text-color); /* Theme-aware color for readability */
          }
        }

        @media (max-width: 768px) {
        .hero-consulting-section {
          padding: 30px 0; /* Reduced from 60px */
          background-color: var(--bg-color); /* Theme-aware background */
        }

          .hero-consulting-container {
            padding: 0 15px;
            gap: 30px;
          }

          .hero-consulting-header {
            font-size: 0.7rem; /* Keep thin, uppercase */
            color: var(--text-muted); /* Theme-aware muted color */
          }

          .hero-consulting-title {
            font-size: 2rem; /* Maintain bold, large */
            color: var(--heading-color); /* Theme-aware color */
            margin-bottom: 30px;
          }

          .hero-consulting-experience {
            flex-direction: column;
            align-items: flex-start;
            gap: 20px;
            margin-bottom: 30px;
          }

          .experience-left-section {
            margin-right: 0;
            align-items: flex-start;
          }

          .experience-counter {
            margin-bottom: 10px;
            flex-direction: row; /* Keep horizontal layout */
            align-items: baseline;
          }

          .experience-number {
            font-size: 6rem; /* Still extra-large */
            color: var(--heading-color); /* Theme-aware color */
          }

          .experience-plus {
            font-size: 3rem;
            color: var(--heading-color); /* Theme-aware color */
            margin-left: 12px; /* Maintain gap */
          }

          .experience-separator {
            width: 100%;
            height: 2px;
            margin: 10px 0;
          }

          .experience-label {
            margin-bottom: 25px;
            color: var(--text-muted); /* Theme-aware muted color */
          }

          .hero-consulting-description p {
            margin: 0; /* No margin on mobile */
          }

          .hero-consulting-button {
            margin-top: 15px; /* Smaller top margin on mobile */
            padding: 14px 28px; /* Slightly smaller on mobile */
            font-size: 1rem;
            width: fit-content; /* Maintain button width */
            align-self: flex-start; /* Keep left alignment */
          }

          .hero-consulting-image-container {
            max-width: 100%;
            height: 350px; /* Smaller height on mobile */
          }

          .hero-consulting-description p {
            font-size: 0.95rem; /* Medium size */
            color: var(--text-color); /* Theme-aware color for readability */
          }

          .hero-consulting-button {
            border-color: #dc2626; /* Keep accent red */
            color: #dc2626; /* Keep accent red */
          }
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
  white-space: nowrap;
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
  background-color: #ff6b6b;
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


{/* orbit */}


{/*service styles*/}

{/*Filter section*/}

:root {
  --bg-primary: #f5f7fa;
  --bg-card: #ffffff;
  --text-primary: #1a1a1a;
  --text-accent: #224DB7;
  --border-color: #d1d5db;
  --shadow-color: rgba(0, 0, 0, 0.08);
}

[data-theme="dark"] {
  --bg-primary: #0e1a34;
  --bg-card: #111827;
  --text-primary: #f5f5f5;
  --text-accent: #3b82f6;
  --border-color: #374151;
  --shadow-color: rgba(255, 255, 255, 0.08);
}

.upcoming-events-section {
  width: 100%;
  background: var(--primary-color);
  padding: 20px 0;
  color: var(--text-primary);
  transition: all 0.3s ease-in-out;
}

.upcoming-events-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  flex-wrap: wrap;
}

.upcoming-events-title {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  gap: 8px;
}

.events-main-title {
  font-size: 2rem;
  font-weight: 700;
  color: var(--text-primary);
}

.events-highlight-title {
  font-size: 2rem;
  font-weight: 700;
  color: #000;
}

.events-filters {
  display: flex;
  gap: 24px;
  align-items: center;
  flex-wrap: wrap;
}

.filter-card {
  background: var(--bg-card);
  border-radius: 8px;
  border: 1px solid var(--border-color);
  box-shadow: 0 2px 8px var(--shadow-color);
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 180px;
  padding: 4px 14px;
  transition: box-shadow 0.25s, border-color 0.3s;
}

.filter-card:hover {
  border-color: var(--border-color);
  box-shadow: 0 4px 12px var(--shadow-color);
}

.filter-select {
  width: 100%;
  background: transparent;
  border: none;
  color: var(--text-primary);
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  appearance: none;
  padding: 10px 36px 10px 12px;
  border-radius: 6px;
  background-image: url("data:image/svg+xml;charset=US-ASCII,%3csvg fill='%23aaa' height='14' viewBox='0 0 24 24' width='14' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M7 10l5 5 5-5z'/%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-position: right 12px center;
  background-size: 14px;
}

.filter-select option {
  background: var(--bg-primary);
  color: var(--text-primary);
}

@media (max-width: 990px) {
  .upcoming-events-container {
    flex-direction: column;
    align-items: flex-start;
  }
  .events-filters {
    margin-top: 18px;
    gap: 16px;
  }
   .filter-select:focus {
  outline: none;
  border: none;
  box-shadow: none;
}
  
  .filter-card {
    min-width: 100%;
  }
    
}/* === Theme Variables === */
:root {
  --bg: #111;
  --text: #f9f9f9;
}

body.light {
  --bg: #f9f9f9;
  --text: #111;
}

/* === Event Section === */
/* === Event Section === */
.event-section {
  padding: 60px 20px;
  background: var(--bg);
  transition: background 0.4s ease, color 0.4s ease;
}

/* === Grid Layout === */
.event-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}

/* === Card Layout === */
.event-card {
  background: var(--card-bg);
  color: var(--text-color);
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 8px 24px rgba(0,0,0,0.2);
  transition: transform 0.3s ease, background 0.4s ease, color 0.4s ease;
}

.event-card:hover {
  transform: translateY(-5px);
}

/* === Image === */
.event-img {
  width: 100%;
  height: 220px;
  object-fit: cover;
  display: block;
}

/* === Content === */
.event-content {
  padding: 16px;
}

.event-title {
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 8px;
}

.event-date {
  font-size: 14px;
  font-weight: 500;
  color: var(--accent-color);
  margin-bottom: 6px;
}

.event-location {
  font-size: 14px;
  color: var(--muted-text);
}

/* === Badges === */
.badge {
  display: inline-block;
  padding: 4px 10px;
  font-size: 12px;
  font-weight: 600;
  border-radius: 8px;
  margin-bottom: 10px;
}

.badge.free {
  background: #0072ff;
  color: #fff;
}

.badge.paid {
  background: #ff5722;
  color: #fff;
}

/* === Light & Dark Theme === */
body.light {
  --bg: #f9f9f9;
  --card-bg: #fff;
  --text-color: #111;
  --accent-color: #0072ff;
  --muted-text: #555;
}

body.dark {
  --bg: #121212;
  --card-bg: #1e1e1e;
  --text-color: #f1f1f1;
  --accent-color: #00c6ff;
  --muted-text: #aaa;
}

.load-more-btn {
  background: #007bff;           /* Primary blue */
  color: #fff;                   /* White text */
  padding: 12px 28px;
  border: none;
  border-radius: 30px;           /* Rounded pill look */
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  box-shadow: 0 6px 16px rgba(0, 123, 255, 0.3);
  transition: all 0.3s ease;
}

.load-more-btn:hover {
  background: #0056b3;           /* Darker blue */
  transform: translateY(-2px);   /* Lift on hover */
  box-shadow: 0 8px 20px rgba(0, 86, 179, 0.4);
}

.load-more-btn:active {
  transform: translateY(0);      /* Reset on click */
  box-shadow: 0 4px 12px rgba(0, 86, 179, 0.3);
}

@media (max-width: 600px) {
  /* Layout changes: stack items vertically */
  .event-grid {
    grid-template-columns: 1fr !important;  /* single column */
    gap: 12px;
  }
  
  /* Smaller card heights */
  .event-card {
    max-height: 350px;  /* shorter height for mobile */
  }
  
  /* Smaller images */
  .event-img {
    height: 180px;
  }
  
  /* Adjust text spacing */
  .event-content {
    padding: 12px;
  }
  
  .event-title {
    font-size: 1.1rem;
  }
  
  .event-date,
  .event-location {
    font-size: 0.9rem;
  }
  
  /* Buttons and badges resize */
  .badge {
    font-size: 10px;
    padding: 3px 8px;
  }
  
  /* Adjust load more button for smaller screens */
  .load-more-btn {
    width: 100%;
    padding: 14px 0;
    font-size: 1rem;
  }
}

@media (max-width: 990px) {
  /* 2 columns instead of 3 on tablets */
  .event-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;
  }
  
  /* Slightly smaller images */
  .event-img {
    height: 210px;
  }
  
  /* Text size tweaks */
  .event-title {
    font-size: 1.2rem;
  }
  
  .event-date,
  .event-location {
    font-size: 1rem;
  }
  
  /* Responsive adjustments to badge size */
  .badge {
    font-size: 11px;
    padding: 3px 9px;
  }
  
  /* Load more button size adjustment */
  .load-more-btn {
    padding: 12px 28px;
    font-size: 1rem;
    max-width: 250px;
    margin: 0 auto;
  }
  
  /* Flex direction for filters on smaller widths */
  .upcoming-events-container {
    flex-direction: column;
  }
  
  .events-filters {
    gap: 12px;
    margin-top: 20px;
  }
  
  .filter-card {
    width: 100%; /* full width filters on tablet */
  }
}




/* Icon style */
.feature-icon {
  width: 80px;
  height: 80px;
  background: rgba(255 255 255 / 0.25);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 24px;
  font-size: 2.4rem;
  color: white;
  box-shadow: 0 0 12px rgba(255, 255, 255, 0.4);
}

/* Headings & paragraphs */
.feature-card h3 {
  font-size: 1.7rem;
  font-weight: 700;
  margin-bottom: 16px;
  color: white;
}

.feature-card p {
  font-size: 1.1rem;
  line-height: 1.6;
  color: white;
  user-select: none;
}
  .features-section {
  position: relative;
  overflow: hidden; /* Important so bubbles don’t overflow */
  padding-bottom: 50px; /* Keep your existing padding */
  background: var(--card-bg);
}

.bubbles {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none; /* So bubbles don’t block clicks */
  overflow: hidden;
  z-index: 0; /* Behind content */
}

.bubble {
  position: absolute;
  bottom: -100px;
  background-color: rgba(34, 77, 183, 0.15); /* Soft blue bubble */
  border-radius: 50%;
  opacity: 0.7;
  animation-name: bubbleRise;
  animation-timing-function: ease-in-out;
  animation-iteration-count: infinite;
}

.bubble:nth-child(odd) {
  background-color: rgba(255, 255, 255, 0.08); /* subtle white bubbles */
}

/* Different bubble sizes and horizontal positions for randomness */
.bubble:nth-child(n) {
  width: 30px;
  height: 30px;
  left: 10%;
  animation-duration: 10s;
  animation-delay: 0s;
}
.bubble:nth-child(2n) {
  width: 45px;
  height: 45px;
  left: 30%;
  animation-duration: 12s;
  animation-delay: 1.5s;
}
.bubble:nth-child(3n) {
  width: 20px;
  height: 20px;
  left: 50%;
  animation-duration: 8s;
  animation-delay: 3s;
}
.bubble:nth-child(4n) {
  width: 35px;
  height: 35px;
  left: 65%;
  animation-duration: 11s;
  animation-delay: 2.5s;
}
.bubble:nth-child(5n) {
  width: 40px;
  height: 40px;
  left: 80%;
  animation-duration: 9s;
  animation-delay: 1s;
}

/* Animate bubbles rising */
@keyframes bubbleRise {
  0% {
    transform: translateY(0) scale(1);
    opacity: 0.7;
  }
  50% {
    opacity: 0.5;
  }
  100% {
    transform: translateY(-120vh) scale(1.2);
    opacity: 0;
  }
}

{/*pie chart*/}




          .cta-section {
  position: relative;
  background: url('/images/CTAH2.jpg') center/cover no-repeat fixed;
  padding: 60px 0;
  color: white;
  display: flex;
  align-items: center;
}

.cta-overlay {
  background-color: rgba(0, 0, 0, 0.6);
  width: 100%;
  display: flex;
  align-items: center;
}

.cta-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  width: 100%;
}

.cta-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 80px;
  align-items: center;
  color: #fff;
}

.cta-left {
  max-width: 600px;
}

        .cta-title {
          font-size: 2.5rem;
          font-weight: 900;
          line-height: 1.1;
          margin: 0 0 30px 0;
          color: #ffffff;
          font-family: 'Segoe UI', Arial, sans-serif;
        }

        .cta-description {
          font-size: 1.2rem;
          line-height: 1.6;
          margin: 0;
          color: #ffffff;
          opacity: 0.9;
          font-family: 'Segoe UI', Arial, sans-serif;
        }

.cta-right {
  display: flex;
  justify-content: center;
  align-items: center;
}

        .cta-box {
          background: #ffd700;
          border-radius: 16px;
          padding: 24px;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
          max-width: 400px;
          width: 100%;
          transition: box-shadow 0.3s ease;
        }

.cta-offer-text {
  margin-bottom: 20px;
}

        .cta-offer-text p {
          font-size: 1rem;
          line-height: 1.5;
          color: #000000;
          margin: 0;
          font-weight: 500;
          font-family: 'Segoe UI', Arial, sans-serif;
          transition: color 0.3s ease;
        }

.cta-offer-section {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  gap: 20px;
}

.cta-discount {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

        .discount-percentage {
          font-size: 3rem;
          font-weight: 900;
          color: #000000;
          line-height: 1;
          margin: 0;
          font-family: 'Segoe UI', Arial, sans-serif;
          transition: color 0.3s ease;
        }

.discount-text {
  font-size: 0.9rem;
  color: #000000;
  font-weight: 500;
  margin: 0;
  font-family: 'Segoe UI', Arial, sans-serif;
  transition: color 0.3s ease;
}

.cta-button {
  background: #000000;
  color: #ffffff;
  padding: 16px 24px;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 600;
  font-size: 1rem;
  transition: all 0.3s ease;
  white-space: nowrap;
  font-family: 'Segoe UI', Arial, sans-serif;
}

.cta-button:hover {
  background: #333333;
  transform: translateY(-2px);
}

/* Responsive Design for CTA */
@media (max-width: 1024px) {
  .cta-content {
    grid-template-columns: 1fr;
    gap: 60px;
    text-align: center;
  }

  .cta-title {
    font-size: 2.5rem;
  }

  .cta-box {
    max-width: 500px;
    margin: 0 auto;
  }
}

@media (max-width: 768px) {
  .cta-section {
    padding: 40px 0;
  }

  .cta-container {
    padding: 0 15px;
  }

  .cta-content {
    gap: 40px;
  }

  .cta-title {
    font-size: 2rem;
  }

  .cta-description {
    font-size: 1rem;
  }

  .cta-box {
    padding: 20px;
    max-width: 100%;
  }

  .cta-offer-section {
    flex-direction: column;
    align-items: center;
    gap: 20px;
  }

  .cta-discount {
    align-items: center;
  }

  .discount-percentage {
    font-size: 2.5rem;
  }

  .cta-button {
    width: 100%;
    text-align: center;
  }
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

      `}</style>
    </div>
  );
};

export default Home2;
