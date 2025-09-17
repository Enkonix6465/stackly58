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
  hero: { en: "Accelerate Your Business with Scalable Technology", ar: "[translate:تمكين أعمالك بالتقنيات القابلة للتوسع]", he: "[translate:האץ את העסק שלך עם טכנולוגיה ניתנת להרחבה]" },
  heroDesc: { en: "Delivering innovative solutions that streamline operations, strengthen security, and drive transformative growth. Let’s build the future of your business together.", ar: "[translate:نقدم حلولاً مبتكرة لتحسين العمليات، تعزيز الأمان، ودفع النمو التحويلي. لنصنع مستقبل أعمالك معاً.]", he: "[translate:אנו מספקים פתרונות חדשניים לייעול תהליכים, חיזוק אבטחה וצמיחה עסקית. בואו נבנה יחד את עתיד העסק שלכם.]" },
  heroBtn: { en: "Reach Out Today", ar: "[translate:تواصل معنا اليوم]", he: "[translate:צור קשר עוד היום]" },
  // Section 2: Image Grid and Overlay/Right
  gridCardText: [
    { en: "Innovative Collaboration", ar: "[translate:تعاون مبتكر]", he: "[translate:שיתוף פעולה חדשני]" },
    { en: "Solutions Hub", ar: "[translate:مركز الحلول]", he: "[translate:מרכז פתרונות]" },
    { en: "New Markets", ar: "[translate:أسواق جديدة]", he: "[translate:שווקים חדשים]" },
    { en: "Strategic Planning", ar: "[translate:تخطيط استراتيجي]", he: "[translate:תכנון אסטרטגי]" },
    { en: "Driving Business Excellence Forward.", ar: "[translate:دفع التميز في الأعمال للأمام.]", he: "[translate:דוחפים את מצוינות העסקים קדימה.]" }
  ],
  rightBlock: {
    h1: { en: "Unique Business Solutions For Your Vision", ar: "[translate:حلول أعمال فريدة لرؤيتك]", he: "[translate:פתרונות עסקיים ייחודיים עבור חזונך]" },
    p: { en: "Unlock new growth with strategic, AI-powered solutions crafted for today’s dynamic market. We empower organizations to adapt, thrive, and innovate with confidence.", ar: "[translate:افتح أبواب النمو مع حلول استراتيجية مدعومة بالذكاء الاصطناعي مصممة لسوق اليوم الديناميكي. نمكن المؤسسات من التكيف والازدهار والابتكار بثقة.]", he: "[translate:פתחו צמיחה חדשה עם פתרונות אסטרטגיים מונעי AI לשוק הדינמי של היום. אנו מעצימים ארגונים להסתגל, לפרוח ולחדש בביטחון.]" },
    sections: [
      { h3: { en: "Market Expansion Consulting", ar: "[translate:استشارات التوسع في السوق]", he: "[translate:ייעוץ להתרחבות בשוק]" }, p: { en: "Identify new opportunities and design scalable strategies to boost business reach and revenue.", ar: "[translate:حدد فرص جديدة وصمم استراتيجيات قابلة للتوسع لتعزيز نطاق العمل والإيرادات.]", he: "[translate:זהו הזדמנויות חדשות ועצבו אסטרטגיות ניתנות להרחבה להגדלת השוק וההכנסות.]" } },
      { h3: { en: "Process Automation", ar: "[translate:أتمتة العمليات]", he: "[translate:אוטומציה של תהליכים]" }, p: { en: "Implement intelligent workflows that free up resources and increase operational efficiency.", ar: "[translate:قم بتطبيق سير عمل ذكي لتحرير الموارد وزيادة الكفاءة التشغيلية.]", he: "[translate:יישום תהליכים חכמים לפינוי משאבים והגדלת יעילות תפעולית.]" } },
      { h3: { en: "Customer Insight Platforms", ar: "[translate:منصات فهم العملاء]", he: "[translate:פלטפורמות לתובנות לקוח]" }, p: { en: "Harness advanced analytics to deepen understanding of markets and personalize customer experiences.", ar: "[translate:استخدم التحليل المتقدم لتعميق فهمك للأسواق وتخصيص تجارب العملاء.]", he: "[translate:השתמשו בניתוח מתקדם להעמקת הבנה של השווקים ולהתאמה אישית של חווית הלקוח.]" } }
    ]
  },
  // Section 3: Unique Process
  process: {
    h2: { en: "Our Unique Process", ar: "[translate:عمليتنا الفريدة]", he: "[translate:התהליך הייחודי שלנו]" },
    h1: { en: "From Vision to Reality", ar: "[translate:من الرؤية إلى الواقع]", he: "[translate:מחלום למציאות]" },
    p: { en: "We follow a proven methodology that transforms complex challenges into actionable, successful strategies for growth.", ar: "[translate:نتبع منهجية مثبتة لتحويل التحديات إلى استراتيجيات ناجحة وقابلة للتنفيذ للنمو.]", he: "[translate:אנו פועלים בגישה שממירה אתגרים מורכבים לאסטרטגיות צמיחה מוצלחות.]" },
    steps: [
      { title: { en: "Discovery & Analysis", ar: "[translate:الاكتشاف والتحليل]", he: "[translate:גילוי וניתוח]" }, description: { en: "We start with a deep dive into your business, market, and competition. By asking the right questions, we gain a clear understanding of your goals and the obstacles in your way.", ar: "[translate:نبدأ بتحليل شامل لأعمالك والسوق والمنافسة لفهم أهدافك والعقبات.]", he: "[translate:אנחנו מתחילים עם חקירה מעמיקה של העסק, השוק והמתחרים להבנת המטרות והאתגרים.]" } },
      { title: { en: "Strategy & Planning", ar: "[translate:استراتيجية وتخطيط]", he: "[translate:אסטרטגיה ותכנון]" }, description: { en: "Our team of experts develops a customized strategy tailored to your needs. This blueprint outlines the project scope, key milestones, and a clear path to success.", ar: "[translate:نطور استراتيجية مخصصة تلبي احتياجاتك مع خارطة طريق واضحة للنجاح.]", he: "[translate:מפתחים אסטרטגיה מותאמת אישית הכוללת היקף, אבני דרך ונתיב ברור להצלחה.]" } },
      { title: { en: "Execution & Development", ar: "[translate:التنفيذ والتطوير]", he: "[translate:ביצוע ופיתוח]" }, description: { en: "With the plan in place, we get to work. We use agile methodologies to build and refine the solution, ensuring flexibility and efficiency throughout the development phase.", ar: "[translate:ننقل الخطة إلى العمل باستخدام منهجيات مرنة لضمان الكفاءة طوال مرحلة التطوير.]", he: "[translate:מביאים את התוכנית לפועל עם מתודולוגיות אג’יל לפיתוח גמיש ויעיל.]" } },
      { title: { en: "Launch & Deployment", ar: "[translate:الإطلاق والتنفيذ]", he: "[translate:השקה והפצה]" }, description: { en: "The final solution is deployed seamlessly. We handle all technical aspects to ensure a smooth transition and a successful launch, making sure everything is ready to go.", ar: "[translate:ننفذ الحل النهائي بسلاسة مع ضمان انتقال ناجح وتشغيل مثالي.]", he: "[translate:משיקים את הפתרון בצורה חלקה ומבטיחים מעבר חלק להפעלה מוצלחת.]" } },
      { title: { en: "Growth & Optimization", ar: "[translate:النمو والتحسين]", he: "[translate:צמיחה ואופטימיזציה]" }, description: { en: "Our partnership doesn't end at launch. We provide continuous support and data-driven optimization to ensure your solution performs at its peak, maximizing your long-term success.", ar: "[translate:نستمر في الدعم والتحسين المستمر لضمان الأداء الأمثل وتحقيق النجاح الطويل الأمد.]", he: "[translate:מספקים תמיכה רציפה ואופטימיזציה מבוססת נתונים להבטחת ביצועים מיטביים.]" } }
    ]
  },
  // Section 4: IT Services
  itServices: { en: "Our IT Services", ar: "[translate:خدمات تكنولوجيا المعلومات لدينا]", he: "[translate:שירותי IT שלנו]" },
  viewAll: { en: "View All Services", ar: "[translate:عرض جميع الخدمات]", he: "[translate:הצג את כל השירותים]" },
  itServiceItems: [
    { title: { en: "Digital Transformation", ar: "[translate:التحول الرقمي]", he: "[translate:טרנספורמציה דיגיטלית]" }, desc: { en: "Empowering your business with cutting-edge technologies to streamline operations and growth.", ar: "[translate:تمكين أعمالك بأحدث التقنيات لزيادة الكفاءة والنمو.]", he: "[translate:העצמת העסק שלך עם טכנולוגיות חדשניות לשיפור תהליכים וצמיחה.]" }, img: "images/bs8.jpg" },
    { title: { en: "Strategy & Consulting", ar: "[translate:استراتيجية واستشارات]", he: "[translate:אסטרטגיה וייעוץ]" }, desc: { en: "Expert advisory to align your business goals with scalable and sustainable strategies for long-term success.", ar: "[translate:استشارات احترافية لمواءمة أهداف عملك مع استراتيجيات مستدامة.]", he: "[translate:ייעוץ מקצועי להתאמת יעדי העסק שלך עם אסטרטגיות ברות-קיימא וגדילה.]" }, img: "images/bs9.jpg" },
    { title: { en: "Data Analytics & Insights", ar: "[translate:تحليلات البيانات والرؤى]", he: "[translate:אנליטיקת נתונים ותובנות]" }, desc: { en: "Unlock actionable insights by integrating advanced analytics that drive informed decision-making.", ar: "[translate:اكتشف رؤى قابلة للتنفيذ من خلال دمج تحليلات متقدمة تدعم اتخاذ قرارات ذكية.]", he: "[translate:קבל תובנות ישימות באמצעות ניתוחים מתקדמים שמקדמים קבלת החלטות חכמה.]" }, img: "images/bs10.jpg" },
    { title: { en: "Process Automation", ar: "[translate:أتمتة العمليات]", he: "[translate:אוטומציה של תהליכים]" }, desc: { en: "Automate repetitive workflows to reduce errors, improve efficiency, and enhance productivity.", ar: "[translate:أتمتة العمليات الروتينية لتقليل الأخطاء وزيادة الكفاءة والإنتاجية.]", he: "[translate:אוטומציה של משימות חוזרות להפחתת טעויות והגברת היעילות.]" }, img: "images/bs11.jpg" },
    { title: { en: "Customer Experience Management", ar: "[translate:إدارة تجربة العملاء]", he: "[translate:ניהול חווית לקוח]" }, desc: { en: "Design personalized customer journeys to increase engagement, loyalty, and satisfaction.", ar: "[translate:تصميم رحلات عملاء مخصصة لتعزيز التفاعل والولاء والرضا.]", he: "[translate:עיצוב מסעות לקוח אישיים להגדלת מעורבות ונאמנות.]" }, img: "images/bs12.jpg" },
    { title: { en: "Cloud & Infrastructure Services", ar: "[translate:خدمات السحابة والبنية التحتية]", he: "[translate:שירותי ענן ותשתית]" }, desc: { en: "Scalable cloud solutions and reliable infrastructure management to support business continuity and agility.", ar: "[translate:حلول سحابية قابلة للتوسع وإدارة بنية تحتية لدعم الاستمرارية.]", he: "[translate:פתרונות ענן גמישים וניהול תשתיות אמינות לתמיכה בעסק.]" }, img: "images/bs13.jpg" }
  ],
  // Section 5: Events
  eventsSection: { en: "Explore Our Services", ar: "[translate:استكشف خدماتنا]", he: "[translate:גלה את השירותים שלנו]" },
  filters: {
    serviceCategory: { en: "Select Service Category", ar: "[translate:اختر فئة الخدمة]", he: "[translate:בחר קטגוריית שירות]" },
    industry: { en: "Select Industry / Business Type", ar: "[translate:اختر الصناعة / نوع العمل]", he: "[translate:בחר ענף / סוג עסק]" },
    location: { en: "Select Location / Region", ar: "[translate:اختر الموقع / المنطقة]", he: "[translate:בחר מיקום / אזור]" }
  },
  noEvents: { en: "No matching services found. Try adjusting your filters.", ar: "[translate:لا توجد خدمات مطابقة. جرب تغيير الفلاتر.]", he: "[translate:לא נמצאו שירותים תואמים. נסה לשנות את המסננים.]" },
  loadMore: { en: "Load More", ar: "[translate:تحميل المزيد]", he: "[translate:טען עוד]" },
  eventItems: [
    {
      img: "images/bs14.jpg",
      title: { en: "Digital Transformation Roadmap", ar: "[translate:خريطة طريق التحول الرقمي]", he: "[translate:מפת דרכים לטרנספורמציה דיגיטלית]" },
      serviceType: "Consulting",
      industry: { en: "Finance", ar: "[translate:المالية]", he: "[translate:פיננסים]" },
      location: { en: "Global", ar: "[translate:العالمية]", he: "[translate:גלובלי]" },
      description: { en: "Comprehensive strategies to modernize business processes, optimize workflows, and adopt digital-first solutions.", ar: "[translate:استراتيجيات شاملة لتحديث الأعمال، تحسين العمليات، وتبني الحلول الرقمية.]", he: "[translate:אסטרטגיות מקיפות למודרניזציה של תהליכים ואימוץ פתרונות דיגיטליים.]" },
    },
    { img: "images/bs15.jpg", title: { en: "Market Expansion Strategy Workshop", ar: "[translate:ورشة استراتيجية توسع السوق]", he: "[translate:סדנת אסטרטגיית הרחבת שוק]" }, serviceType: "Strategy & Growth", industry: { en: "Retail & E-commerce", ar: "[translate:التجزئة والتجارة الإلكترونية]", he: "[translate:קמעונאות ומסחר אלקטרוני]" }, location: { en: "USA", ar: "[translate:الولايات المتحدة]", he: "[translate:ארה\"ב]" }, description: { en: "Actionable insights on entering new markets, understanding customer behavior, and scaling operations effectively.", ar: "[translate:رؤى قابلة للتنفيذ لدخول أسواق جديدة وفهم سلوك العملاء.]", he: "[translate:תובנות יישומיות לכניסה לשווקים חדשים ולהבנת התנהגות לקוחות.]" } },
    { img: "images/bs16.jpg", title: { en: "AI-Powered Business Intelligence Summit", ar: "[translate:قمة ذكاء الأعمال المدعوم بالذكاء الاصطناعي]", he: "[translate:כנס בינה עסקית מבוסס בינה מלאכותית]" }, serviceType: "Analytics & Insights", industry: { en: "Manufacturing", ar: "[translate:التصنيع]", he: "[translate:תעשייה]" }, location: { en: "Europe", ar: "[translate:أوروبا]", he: "[translate:אירופה]" }, description: { en: "Harness the power of AI-driven analytics to make smarter decisions, reduce costs, and increase business agility.", ar: "[translate:استغلال تحليلات الذكاء الاصطناعي لاتخاذ قرارات أذكى وتقليل التكاليف.]", he: "[translate:ניצול אנליטיקות מבוססות בינה מלאכותית להחלטות חכמות והפחתת עלויות.]" } },
    { img: "images/bs17.jpg", title: { en: "Operational Excellence Bootcamp", ar: "[translate:معسكر التميز التشغيلي]", he: "[translate:בוטקמפ למצוינות תפעולית]" }, serviceType: "Process Optimization", industry: { en: "Healthcare", ar: "[translate:الرعاية الصحية]", he: "[translate:בריאות]" }, location: { en: "Asia-Pacific", ar: "[translate:آسيا والمحيط الهادئ]", he: "[translate:אסיה והאוקיינוס השקט]" }, description: { en: "Learn proven methods to streamline operations, eliminate inefficiencies, and boost performance across business units.", ar: "[translate:تعلم طرق مثبتة لتحسين العمليات والقضاء على عدم الكفاءة.]", he: "[translate:למד שיטות מוכחות לשיפור תפעול, הסרת חוסר יעילות והגברת ביצועים.]" } },
    { img: "images/bs18.jpg", title: { en: "Customer Experience & Retention Workshop", ar: "[translate:ورشة تجربة واحتفاظ العملاء]", he: "[translate:סדנת חווית לקוח ושימור]" }, serviceType: "Customer Solutions", industry: { en: "Hospitality", ar: "[translate:الضيافة]", he: "[translate:אירוח]" }, location: { en: "Middle East", ar: "[translate:الشرق الأوسط]", he: "[translate:המזרח התיכון]" }, description: { en: "Design memorable customer journeys that drive loyalty, repeat business, and sustainable growth.", ar: "[translate:تصميم رحلات عملاء تترك انطباعات وتعزز الولاء والنمو المستدام.]", he: "[translate:עיצוב מסעות לקוח בלתי נשכחים להגדלת נאמנות וצמיחה.]" } },
    { img: "images/bs19.jpg", title: { en: "Risk & Compliance Management Forum", ar: "[translate:منتدى إدارة المخاطر والامتثال]", he: "[translate:פורום ניהול סיכונים וציות]" }, serviceType: "Governance & Compliance", industry: { en: "Finance", ar: "[translate:المالية]", he: "[translate:פיננסים]" }, location: { en: "Europe", ar: "[translate:أوروبا]", he: "[translate:אירופה]" }, description: { en: "Equip leadership teams with frameworks to navigate regulations, manage risks, and maintain business integrity.", ar: "[translate:تجهيز فرق القيادة بأطر عمل لإدارة اللوائح وتنظيم المخاطر.]", he: "[translate:הסמכת הנהלות במסגרת עבודה למסלולי רגולציה וניהול סיכונים.]" } }
  ],
  // Section 6: CTA
  ctaTitle: { en: "Ready to Transform Your Business?", ar: "[translate:هل أنت مستعد لتحويل عملك؟]", he: "[translate:מוכן לשדרג את העסק שלך?]" },
  ctaDesc: { en: "Get started today with a free consultation and discover how we can help you achieve your goals.", ar: "[translate:ابدأ اليوم مع استشارة مجانية واكتشف كيف يمكننا مساعدتك في تحقيق أهدافك.]", he: "[translate:התחל היום עם ייעוץ ללא עלות וגלה כיצד אנו יכולים לעזור לך להשיג את מטרותיך.]" },
  ctaStart: { en: "Start Your Journey", ar: "[translate:ابدأ رحلتك]", he: "[translate:התחל את המסע שלך]" },
  ctaLearn: { en: "Learn More About Us", ar: "[translate:تعرف علينا أكثر]", he: "[translate:למידע נוסף]" }
};

const Home2 = () => {
  const { language } = useLanguage();
  const [selectedServiceCategory, setSelectedServiceCategory] = useState('');
  const [selectedIndustry, setSelectedIndustry] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [visibleCount, setVisibleCount] = useState(6);

  useEffect(() => {
    document.documentElement.dir = language === "ar" || language === "he" ? "rtl" : "ltr";
    document.title = clean(t.hero[language]);
  }, [language]);

  // Events filters
  const filteredEvents = t.eventItems.filter(evt => {
    const matchesServiceCategory = selectedServiceCategory ? evt.serviceType === selectedServiceCategory : false;
    const matchesIndustry = selectedIndustry ? evt.industry[language] === selectedIndustry : false;
    const matchesLocation = selectedLocation ? evt.location[language] === selectedLocation : false;
    if (!selectedServiceCategory && !selectedIndustry && !selectedLocation) return true;
    return matchesServiceCategory || matchesIndustry || matchesLocation;
  });
  const visibleEvents = filteredEvents.slice(0, visibleCount);

  const handleLoadMore = () => {
    if (visibleCount >= filteredEvents.length) {
      alert(clean(t.noEvents[language]));
      return;
    }
    setVisibleCount(prev => Math.min(prev + 3, filteredEvents.length));
  };

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

      {/* Section 2: Image Grid and Right Content */}
      <section className="flex items-center justify-center min-h-screen p-4 sm:p-8" style={{ backgroundColor: "var(--bg-color)" }}>
        <div className="bg-[var(--card-bg)] max-w-7xl mx-auto rounded-xl shadow-lg flex flex-col lg:flex-row overflow-hidden w-full">
          <div className="relative w-full lg:w-1/2 p-4 sm:p-8 md:p-10 flex items-center justify-center bg-[var(--sidebar-bg)]">
            <div className="relative w-full h-80 sm:h-[350px] md:h-[400px] lg:h-[500px] grid grid-cols-2 grid-rows-2 gap-3 sm:gap-4 rounded-xl overflow-hidden shadow-md">
              {t.gridCardText.slice(0, 4).map((card, i) => (
                <div className={`relative animate-float ${i === 1 ? "animation-delay-2000" : i === 2 ? "animation-delay-4000" : i === 3 ? "animation-delay-6000" : ""}`} key={i}>
                  <img src={`images/bs${4 + i}.jpg`} alt={clean(card[language])} className="w-full h-full object-cover rounded-md shadow" />
                  <span className={`absolute ${i % 2 === 0 ? "left-2" : "right-2"} ${i < 2 ? "top-2" : "bottom-2"} text-xs sm:text-sm font-medium text-white drop-shadow`}>
                    {clean(card[language])}
                  </span>
                </div>
              ))}
              <div className="absolute left-1/2 top-1/2 z-30 flex justify-center items-center pointer-events-none" style={{ transform: "translate(-50%, -50%)", width: "100%" }}>
                <div className="bg-[var(--primary-color)] font-bold rounded-xl shadow-xl text-center drop-shadow-xl pointer-events-auto" style={{ boxShadow: "var(--shadow-hover)", color: "white", width: "max-content", maxWidth: "90vw", minWidth: "210px", padding: "1rem 1.5rem", fontSize: "1.15rem" }}>
                  {clean(t.gridCardText[4][language])}
                </div>
              </div>
            </div>
          </div>
          <div className="w-full lg:w-1/2 flex items-stretch">
            <div className="flex-1 p-4 sm:p-10 md:p-16 flex flex-col justify-center">
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6" style={{ color: "var(--heading-color)" }}>
                {clean(t.rightBlock.h1[language])}
              </h1>
              <p className="text-[var(--text-muted)] mb-8 leading-relaxed">
                {clean(t.rightBlock.p[language])}
              </p>
              <div className="space-y-5">
                {t.rightBlock.sections.map((sec, idx) => (
                  <div key={idx}>
                    <h3 className="text-lg font-semibold mb-1" style={{ color: "var(--primary-color)" }}>
                      {clean(sec.h3[language])}
                    </h3>
                    <p className="text-[var(--text-color)]">{clean(sec.p[language])}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <style>{`
          @keyframes float { 0% { transform: translateY(0); } 50% { transform: translateY(-12px); } 100% { transform: translateY(0); } }
          .animate-float { animation: float 5s ease-in-out infinite; }
          .animation-delay-2000 { animation-delay: 2s; }
          .animation-delay-4000 { animation-delay: 4s; }
          .animation-delay-6000 { animation-delay: 6s; }
        `}</style>
      </section>

      {/* Section 3: Unique Process */}
      <div className="lg:grid lg:grid-cols-2 min-h-screen bg-[var(--sidebar-bg)]">
        <div className="hidden lg:flex flex-col justify-center sticky top-0 bg-[var(--sidebar-bg)] pl-24 pr-16 py-24 h-screen overflow-hidden">
          <h2 className="text-blue-500 uppercase font-semibold mb-4 tracking-wide">{clean(t.process.h2[language])}</h2>
          <h1 className="text-5xl font-extrabold mb-6 text-[var(--text-color)] leading-tight">{clean(t.process.h1[language])}</h1>
          <p className="text-xl text-[var(--text-muted)] max-w-lg">{clean(t.process.p[language])}</p>
        </div>
        <div className="py-10 px-6 sm:px-12 max-w-3xl mx-auto lg:h-screen lg:overflow-y-auto no-scrollbar" style={{ scrollSnapType: "y mandatory", scrollPaddingTop: "2rem" }}>
          <div className="lg:hidden mb-8">
            <h2 className="text-blue-500 uppercase font-semibold mb-2 tracking-wide">{clean(t.process.h2[language])}</h2>
            <h1 className="text-4xl font-extrabold mb-4 text-[var(--text-color)] leading-tight">{clean(t.process.h1[language])}</h1>
            <p className="text-lg text-[var(--text-muted)] max-w-md">{clean(t.process.p[language])}</p>
          </div>
          {t.process.steps.map((step, idx) => (
            <section key={idx} className="step-card normal-bg bg-[var(--card-bg)] rounded-2xl shadow-xl px-8 py-8 mb-10 flex space-x-6 transition-all" style={{ scrollSnapAlign: "start", scrollSnapStop: "always" }}>
              <div className="flex-shrink-0 flex justify-center items-center rounded-full text-white font-bold" style={{ backgroundColor: "var(--primary-color)", width: "3.5rem", height: "3.5rem", fontSize: "1.6rem" }}>
                {idx + 1}
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-2 text-[var(--heading-color)]">{clean(step.title[language])}</h3>
                <p className="text-base text-[var(--text-muted)] leading-relaxed">{clean(step.description[language])}</p>
              </div>
            </section>
          ))}
          <style>{`
            .no-scrollbar::-webkit-scrollbar { display: none; }
            .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
            .highlight-bg { border: 2px solid var(--primary-color); box-shadow: 0 8px 16px rgba(0,0,0,0.25); }
            .normal-bg { border: 2px solid transparent; box-shadow: 0 1px 4px rgba(0,0,0,0.1); }
          `}</style>
        </div>
      </div>

      {/* Section 4: IT Services */}
      <section className="py-16 px-6 min-h-screen" style={{ backgroundColor: "var(--bg-color)", color: "var(--text-color)" }}>
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-3xl font-bold" style={{ color: "var(--heading-color)" }}>{clean(t.itServices[language])}</h2>
            <Link to="/services" className="text-sm px-6 py-2 rounded-full font-medium transition-colors duration-200" style={{ backgroundColor: "var(--input-bg)", color: "var(--text-color)", border: "1px solid var(--border-color)", boxShadow: "var(--shadow-light)" }}>
              {clean(t.viewAll[language])}
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {t.itServiceItems.map((service, i) => (
              <div key={i} className="relative rounded-3xl overflow-hidden shadow-lg group transition" style={{ boxShadow: "var(--shadow)", backgroundColor: "var(--card-bg)" }}>
                <img src={service.img} alt={clean(service.title[language])} className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110" />
                <div className="absolute inset-0" style={{ background: "rgba(0,0,0,0.5)" }} aria-hidden="true" />
                <div className="absolute bottom-6 left-6 right-6 z-10">
                  <h3 className="text-xl font-semibold mb-2" style={{ color: "white" }}>{clean(service.title[language])}</h3>
                  <p className="text-sm" style={{ color: "white" }}>{clean(service.desc[language])}</p>
                </div>
                <div className="absolute top-4 right-4 z-10">
                  <Link to="/services" aria-label={`Explore ${clean(service.title[language])}`} className="bg-black p-2 rounded-full flex items-center justify-center hover:bg-black focus:bg-black transition" style={{ boxShadow: '0 2px 6px rgba(0,0,0,0.25)' }}>
                    <ArrowUpRight className="h-5 w-5" style={{ color: "white" }} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 5: Event Filters + Cards */}
      <section className="upcoming-events-section" style={{ width: '100%', background: 'var(--primary-color)', padding: '36px 0', color: 'var(--text-primary)' }}>
        <div className="upcoming-events-container" style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 20px', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: '36px', flexWrap: 'wrap' }}>
          <div className="upcoming-events-title" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '8px', whiteSpace: 'nowrap' }}>
            <span className="events-main-title" style={{ fontSize: '2.2rem', fontWeight: 700, color: '#fff', letterSpacing: '0.5px' }}>{clean(t.eventsSection[language])}</span>
          </div>
          <div className="filter-card" style={{ position: 'relative', minWidth: 240, background: '#1e293b', borderRadius: 16, border: 'none', boxShadow: '0 4px 16px rgba(0,0,0,0.18)', padding: 12 }}>
            <select className="filter-select" aria-label={clean(t.filters.serviceCategory[language])} value={selectedServiceCategory} onChange={e => setSelectedServiceCategory(e.target.value)} style={{ width: '100%', background: 'transparent', border: 'none', color: '#fff', fontWeight: 600, fontSize: '1.15rem', textAlign: 'center', cursor: 'pointer', paddingRight: '32px' }}>
              <option value="">{clean(t.filters.serviceCategory[language])}</option>
              <option value="Consulting">Consulting</option>
              <option value="Strategy & Growth">Strategy & Growth</option>
              <option value="Analytics & Insights">Analytics & Insights</option>
              <option value="Process Optimization">Process Optimization</option>
              <option value="Customer Solutions">Customer Solutions</option>
              <option value="Governance & Compliance">Governance & Compliance</option>
            </select>
            <span style={{ position: 'absolute', right: 18, top: '50%', transform: 'translateY(-50%)', fontSize: '1.5rem', color: '#fff', pointerEvents: 'none' }}>▼</span>
          </div>
          <div className="filter-card" style={{ position: 'relative', minWidth: 240, background: '#1e293b', borderRadius: 16, border: 'none', boxShadow: '0 4px 16px rgba(0,0,0,0.18)', padding: 12 }}>
            <select className="filter-select" aria-label={clean(t.filters.industry[language])} value={selectedIndustry} onChange={e => setSelectedIndustry(e.target.value)} style={{ width: '100%', background: 'transparent', border: 'none', color: '#fff', fontWeight: 600, fontSize: '1.15rem', textAlign: 'center', cursor: 'pointer', paddingRight: '32px' }}>
              <option value="">{clean(t.filters.industry[language])}</option>
              {t.eventItems.map((evt, i) => <option value={evt.industry[language]} key={i}>{clean(evt.industry[language])}</option>)}
            </select>
            <span style={{ position: 'absolute', right: 18, top: '50%', transform: 'translateY(-50%)', fontSize: '1.5rem', color: '#fff', pointerEvents: 'none' }}>▼</span>
          </div>
          <div className="filter-card" style={{ position: 'relative', minWidth: 240, background: '#1e293b', borderRadius: 16, border: 'none', boxShadow: '0 4px 16px rgba(0,0,0,0.18)', padding: 12 }}>
            <select className="filter-select" aria-label={clean(t.filters.location[language])} value={selectedLocation} onChange={e => setSelectedLocation(e.target.value)} style={{ width: '100%', background: 'transparent', border: 'none', color: '#fff', fontWeight: 600, fontSize: '1.15rem', textAlign: 'center', cursor: 'pointer', paddingRight: '32px' }}>
              <option value="">{clean(t.filters.location[language])}</option>
              {t.eventItems.map((evt, i) => <option value={evt.location[language]} key={i}>{clean(evt.location[language])}</option>)}
            </select>
            <span style={{ position: 'absolute', right: 18, top: '50%', transform: 'translateY(-50%)', fontSize: '1.5rem', color: '#fff', pointerEvents: 'none' }}>▼</span>
          </div>
        </div>
      </section>
      <section className="event-section">
        <div className="event-grid">
          {visibleEvents.length > 0 ? (
            visibleEvents.map((event, idx) => (
              <div className="event-card" key={idx}>
                <img src={event.img} alt={clean(event.title[language])} className="event-img" />
                <div className="event-content">
                  <h3 className="event-title">{clean(event.title[language])}</h3>
                  <p className="event-description">{clean(event.description[language])}</p>
                </div>
              </div>
            ))
          ) : (
            <div className="no-events">
              <img src="images/no-results.jpg" alt="No Results" className="no-results-img" />
              <p>{clean(t.noEvents[language])}</p>
            </div>
          )}
        </div>
        <div style={{ textAlign: "center", marginTop: "24px" }}>
          <button onClick={handleLoadMore} className="load-more-btn">
            {clean(t.loadMore[language])}
          </button>
        </div>
      </section>

      {/* Section 6: CTA */}
      <section className="cta-section">
        <div className="cta-overlay">
          <div className="container">
            <motion.div className="cta-content text-center" initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }}>
              <h2>{clean(t.ctaTitle[language])}</h2>
              <p>{clean(t.ctaDesc[language])}</p>
              <div className="cta-buttons">
                <Link to="/contact" className="btn btn-primary btn-large">
                  {clean(t.ctaStart[language])} <FaArrowRight />
                </Link>
                <Link to="/about" className="btn btn-outline btn-large">
                  {clean(t.ctaLearn[language])}
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
