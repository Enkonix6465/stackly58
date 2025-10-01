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
  FaArrowRight,
} from 'react-icons/fa';
import { useLanguage } from '../context.jsx/LanguageContext'; // Adjust path as needed

const translations = {
  en: {
    documentTitle: 'Digital Transformation Consulting - ForStackly Business Solutions',
    heroTitle: 'Digital Transformation Consulting',
    heroParagraph:
      'Guiding your organization through strategic digital initiatives that foster innovation, enhance customer experience, and create measurable business value.',
    heroButton: 'Contact Us',

    benefitsTitle: 'Why Choose Our Digital Transformation Consulting?',
    benefitsCards: [
      {
        title: 'Strategic Roadmap Development',
        brief: 'Creating clear, actionable plans tailored to your organization\'s unique vision.',
        detail: 'Aligning technology initiatives with business goals to drive meaningful impact.',
        gradientFrom: 'from-indigo-500',
        gradientTo: 'to-blue-600',
        iconPath:
          'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2z',
      },
      {
        title: 'Process Automation',
        brief: 'Streamlining operations to boost efficiency and reduce cost.',
        detail: 'Leveraging AI and machine learning to automate repetitive tasks.',
        gradientFrom: 'from-green-500',
        gradientTo: 'to-teal-600',
        iconPath:
          'M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-1 15h2v2h-2zm0-8h2v6',
      },
      {
        title: 'Data-Driven Insights',
        brief: 'Turning complex data into strategic opportunities.',
        detail: 'Custom dashboards and analytics to empower decision making.',
        gradientFrom: 'from-red-500',
        gradientTo: 'to-pink-600',
        iconPath:
          'M12 2c5.52 0 10 4.48 10 10s-4.48 10-10 10S2 17.52 2 12 6.48 2 12 2zm0 14l5-5h-4V7h-2v4h-3z',
      },
      {
        title: 'Change Management',
        brief: 'Guiding your team through effective adoption practices.',
        detail: 'Strategies to minimize disruption and maximize acceptance.',
        gradientFrom: 'from-purple-500',
        gradientTo: 'to-indigo-600',
        iconPath:
          'M19.4 14.8c-.8.8-2.2.8-3 0l-3.5-3.5c-.8-.8-.8-2.2 0-3l3.5-3.5c.8-.8 2.2-.8 3 0l3.5 3.5c.8.8.8 2.2 0 3l-3.5 3.5zm-5.7-5.7L12 12l2.7 2.7 2.7-2.7-2.7-2.7zM11 2a9 9 0 100 18A9 9 0 0011 2zm0 16a7 7 0 110-14A7 7 0 0111 18zm-.5-5.5a1.5 1.5 0 100-3 1.5 1.5 0 000 3z',
      },
      {
        title: 'Legacy System Modernization',
        brief: 'Updating and integrating outdated IT infrastructure.',
        detail: 'Future-proof your operations while minimizing risks.',
        gradientFrom: 'from-yellow-400',
        gradientTo: 'to-orange-500',
        iconPath:
          'M19.35 10.04C18.67 6.59 15.64 4 12 4c-3.72 0-6.85 2.14-7.48 6.27C2.45 11.08 1 12 1 15c0 3.31 2.69 6 6 6h12c3.31 0 6-2.69 6-6 0-2.22-1.45-3.92-3.65-4.96zM12 18l-4-4h3v-4h2v4h3z',
      },
      {
        title: 'Continuous Improvement',
        brief: 'Ongoing enhancements to keep your business agile and competitive.',
        detail: 'Leveraging the latest technologies for sustained success.',
        gradientFrom: 'from-cyan-500',
        gradientTo: 'to-sky-600',
        iconPath:
          'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2z',
      },
    ],

    benefitsSectionTitle: 'Digital Transformation Consulting',
    benefitsSectionDescription:
      'We deliver customized strategies and expert guidance to help your business leverage digital technologies for sustained success.',

    galleryTitle: 'Digital Transformation Portfolio',
    gallerySubtitle:
      'Showcase of projects demonstrating transformative digital solutions across industries.',

    costEstimatorTitle: 'Estimate Your Digital Transformation Costs',
    costEstimatorDescription:
      'Use our interactive tool to get a transparent and immediate estimate for your project.',
    sliderLabels: {
      vcpu: 'Strategic Consulting Hours',
      ram: 'Automation & Tools Hours',
      storage: 'Integration Complexity Level',
    },
    totalCostLabel: 'Your Estimated Project Cost',
    contactButton: 'Contact Us for a Custom Quote',

    ctaTitle: 'Ready to Transform Your Business?',
    ctaParagraph: 'Contact us today to start your digital transformation journey and innovate with confidence.',
    ctaStartButton: 'Start Your Transformation',
    ctaLearnMoreButton: 'Learn More About Us',
  },
  ar: {
    documentTitle: '[translate:استشارات التحول الرقمي - حلول الأعمال فورستاكلي]',
    heroTitle: '[translate:استشارات التحول الرقمي]',
    heroParagraph:
      '[translate:نرشد مؤسستك عبر مبادرات رقمية استراتيجية تعزز الابتكار، وتحسّن تجربة العملاء، وتخلق قيمة تجارية ملموسة.]',
    heroButton: '[translate:اتصل بنا]', 

    benefitsTitle: '[translate:لماذا تختار استشارات التحول الرقمي الخاصة بنا؟]',
    benefitsCards: [
      {
        title: '[translate:تطوير خارطة طريق استراتيجية]',
        brief: '[translate:إنشاء خطط واضحة وقابلة للتنفيذ مصممة خصيصاً لرؤية مؤسستك الفريدة.]',
        detail: '[translate:مواءمة المبادرات التقنية مع أهداف العمل لتحقيق تأثير ملموس.]',
        gradientFrom: 'from-indigo-500',
        gradientTo: 'to-blue-600',
        iconPath:
          'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2z',
      },
      {
        title: '[translate:أتمتة العمليات]',
        brief: '[translate:تبسيط العمليات لزيادة الكفاءة وتقليل التكاليف.]',
        detail: '[translate:الاستفادة من الذكاء الاصطناعي وتعلم الآلة لأتمتة المهام المتكررة.]',
        gradientFrom: 'from-green-500',
        gradientTo: 'to-teal-600',
        iconPath:
          'M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-1 15h2v2h-2zm0-8h2v6',
      },
      {
        title: '[translate:رؤى معتمدة على البيانات]',
        brief: '[translate:تحويل البيانات المعقدة إلى فرص استراتيجية.]',
        detail: '[translate:لوحات تحكم وتحليلات مخصصة لدعم اتخاذ القرار.]',
        gradientFrom: 'from-red-500',
        gradientTo: 'to-pink-600',
        iconPath:
          'M12 2c5.52 0 10 4.48 10 10s-4.48 10-10 10S2 17.52 2 12 6.48 2 12 2zm0 14l5-5h-4V7h-2v4h-3z',
      },
      {
        title: '[translate:إدارة التغيير]',
        brief: '[translate:توجيه فريقك خلال ممارسات التبني الفعالة.]',
        detail: '[translate:استراتيجيات لتقليل الانقطاعات وتعظيم القبول.]',
        gradientFrom: 'from-purple-500',
        gradientTo: 'to-indigo-600',
        iconPath:
          'M19.4 14.8c-.8.8-2.2.8-3 0l-3.5-3.5c-.8-.8-.8-2.2 0-3l3.5-3.5c.8-.8 2.2-.8 3 0l3.5 3.5c.8.8.8 2.2 0 3l-3.5 3.5zm-5.7-5.7L12 12l2.7 2.7 2.7-2.7-2.7-2.7zM11 2a9 9 0 100 18A9 9 0 0011 2zm0 16a7 7 0 110-14A7 7 0 0111 18zm-.5-5.5a1.5 1.5 0 100-3 1.5 1.5 0 000 3z',
      },
      {
        title: '[translate:تحديث الأنظمة القديمة]',
        brief: '[translate:تحديث ودمج البنية التحتية التقنية القديمة.]',
        detail: '[translate:تأمين استمرارية العمليات مع تقليل المخاطر.]',
        gradientFrom: 'from-yellow-400',
        gradientTo: 'to-orange-500',
        iconPath:
          'M19.35 10.04C18.67 6.59 15.64 4 12 4c-3.72 0-6.85 2.14-7.48 6.27C2.45 11.08 1 12 1 15c0 3.31 2.69 6 6 6h12c3.31 0 6-2.69 6-6 0-2.22-1.45-3.92-3.65-4.96zM12 18l-4-4h3v-4h2v4h3z',
      },
      {
        title: '[translate:التحسين المستمر]',
        brief: '[translate:تحسينات مستمرة للحفاظ على مرونة وتنافسية عملك.]',
        detail: '[translate:الاستفادة من أحدث التقنيات للنجاح الدائم.]',
        gradientFrom: 'from-cyan-500',
        gradientTo: 'to-sky-600',
        iconPath:
          'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2z',
      },
    ],

    benefitsSectionTitle: '[translate:استشارات التحول الرقمي]',
    benefitsSectionDescription:
      '[translate:نقدم استراتيجيات مخصصة وتوجيهًا خبيرًا لمساعدتك على الاستفادة من التقنيات الرقمية للنجاح المستدام.]',

    galleryTitle: '[translate:محفظة التحول الرقمي]',
    gallerySubtitle:
      '[translate:عرض لمشاريع تقدم حلول رقمية تحويلية عبر الصناعات.]',

    costEstimatorTitle: '[translate:قدّر تكاليف تحولك الرقمي]',
    costEstimatorDescription:
      '[translate:استخدم أداتنا التفاعلية للحصول على تقدير شفاف وفوري لمشروعك.]',
    sliderLabels: {
      vcpu: '[translate:ساعات الاستشارات الاستراتيجية]',
      ram: '[translate:ساعات الأتمتة والأدوات]',
      storage: '[translate:مستوى تعقيد التكامل]',
    },
    totalCostLabel: '[translate:التكلفة المقدرة لمشروعك]',
    contactButton: '[translate:اتصل بنا لطلب عرض مخصص]',

    ctaTitle: '[translate:هل أنت مستعد لتحويل عملك؟]',
    ctaParagraph:
      '[translate:اتصل بنا اليوم لبدء رحلة التحول الرقمي والابتكار بثقة.]',
    ctaStartButton: '[translate:ابدأ تحولك]',
    ctaLearnMoreButton: '[translate:تعرف علينا أكثر]',
  },

  he: {
    documentTitle: '[translate:ייעוץ טרנספורמציה דיגיטלית - פתרונות עסקיים פורסטאקלי]',
    heroTitle: '[translate:ייעוץ טרנספורמציה דיגיטלית]',
    heroParagraph:
      '[translate:מנחים את הארגון שלך ביוזמות דיגיטליות אסטרטגיות שמקדמות חדשנות, משפרות את חווית הלקוח ויוצרות ערך עסקי מדיד.]',
    heroButton: '[translate:צור קשר]',

    benefitsTitle: '[translate:למה לבחור בייעוץ הטרנספורמציה הדיגיטלית שלנו?]',
    benefitsCards: [
      {
        title: '[translate:פיתוח מפת דרכים אסטרטגית]',
        brief: '[translate:יצירת תוכניות ברורות וברות ביצוע המותאמות לחזון הייחודי של הארגון שלך.]',
        detail: '[translate:התאמת יוזמות טכנולוגיות למטרות העסק להשגת השפעה משמעותית.]',
        gradientFrom: 'from-indigo-500',
        gradientTo: 'to-blue-600',
        iconPath:
          'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2z',
      },
      {
        title: '[translate:אוטומציית תהליכים]',
        brief: '[translate:פישוט תהליכים להגברת יעילות והפחתת עלויות.]',
        detail: '[translate:ניצול בינה מלאכותית ולמידת מכונה לאוטומציה של משימות חוזרות.]',
        gradientFrom: 'from-green-500',
        gradientTo: 'to-teal-600',
        iconPath:
          'M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-1 15h2v2h-2zm0-8h2v6',
      },
      {
        title: '[translate:תובנות מבוססות נתונים]',
        brief: '[translate:הפיכת נתונים מורכבים להזדמנויות אסטרטגיות.]',
        detail: '[translate:לוחות מחוונים וניתוחים מותאמים לקבלת החלטות.]',
        gradientFrom: 'from-red-500',
        gradientTo: 'to-pink-600',
        iconPath:
          'M12 2c5.52 0 10 4.48 10 10s-4.48 10-10 10S2 17.52 2 12 6.48 2 12 2zm0 14l5-5h-4V7h-2v4h-3z',
      },
      {
        title: '[translate:ניהול שינוי]',
        brief: '[translate:הנחיית הצוות שלך באמצעות אימוץ יעיל.]',
        detail: '[translate:אסטרטגיות לצמצום הפרעות ומקסום הקבלה.]',
        gradientFrom: 'from-purple-500',
        gradientTo: 'to-indigo-600',
        iconPath:
          'M19.4 14.8c-.8.8-2.2.8-3 0l-3.5-3.5c-.8-.8-.8-2.2 0-3l3.5-3.5c.8-.8 2.2-.8 3 0l3.5 3.5c.8.8.8 2.2 0 3l-3.5 3.5zm-5.7-5.7L12 12l2.7 2.7 2.7-2.7-2.7-2.7zM11 2a9 9 0 100 18A9 9 0 0011 2zm0 16a7 7 0 110-14A7 7 0 0111 18zm-.5-5.5a1.5 1.5 0 100-3 1.5 1.5 0 000 3z',
      },
      {
        title: '[translate:מודרניזציה של מערכות ישנות]',
        brief: '[translate:עדכון ואינטגרציה של תשתיות IT מיושנות.]',
        detail: '[translate:הבטחת המשכיות הפעילות תוך הפחתת סיכונים.]',
        gradientFrom: 'from-yellow-400',
        gradientTo: 'to-orange-500',
        iconPath:
          'M19.35 10.04C18.67 6.59 15.64 4 12 4c-3.72 0-6.85 2.14-7.48 6.27C2.45 11.08 1 12 1 15c0 3.31 2.69 6 6 6h12c3.31 0 6-2.69 6-6 0-2.22-1.45-3.92-3.65-4.96zM12 18l-4-4h3v-4h2v4h3z',
      },
      {
        title: '[translate:שיפור מתמיד]',
        brief: '[translate:שיפורים שוטפים לשמירה על גמישות ותחרותיות העסק שלך.]',
        detail: '[translate:שימוש בטכנולוגיות העדכניות להצלחה מתמשכת.]',
        gradientFrom: 'from-cyan-500',
        gradientTo: 'to-sky-600',
        iconPath:
          'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2z',
      },
    ],

    benefitsSectionTitle: '[translate:ייעוץ טרנספורמציה דיגיטלית]',
    benefitsSectionDescription:
      '[translate:אנו מספקים אסטרטגיות מותאמות והכוונה מקצועית כדי לעזור לעסק שלך להשתמש בטכנולוגיות דיגיטליות להצלחה מתמשכת.]',

    galleryTitle: '[translate:פורטפוליו טרנספורמציה דיגיטלית]',
    gallerySubtitle:
      '[translate:תצוגת פרויקטים המדגימים פתרונות דיגיטליים משני תעשיות שונות.]',

    costEstimatorTitle: '[translate:הערך את עלויות הטרנספורמציה הדיגיטלית שלך]',
    costEstimatorDescription:
      '[translate:השתמש בכלי האינטראקטיבי שלנו לקבלת הערכה שקופה ומיידית עבור הפרויקט שלך.]',
    sliderLabels: {
      vcpu: '[translate:שעות ייעוץ אסטרטגי]',
      ram: '[translate:שעות אוטומציה וכלים]',
      storage: '[translate:רמת מורכבות אינטגרציה]',
    },
    totalCostLabel: '[translate:העלות המשוערת של הפרויקט שלך]',
    contactButton: '[translate:צור קשר לקבלת הצעת מחיר מותאמת]',

    ctaTitle: '[translate:מוכן לשנות את העסק שלך?]',
    ctaParagraph:
      '[translate:צור קשר עוד היום כדי להתחיל את מסע הטרנספורמציה הדיגיטלית ולחדש בביטחון.]',
    ctaStartButton: '[translate:התחל את הטרנספורמציה]',
    ctaLearnMoreButton: '[translate:למידע נוסף עלינו]',
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
  const [storage, setStorage] = useState(5);
  const [totalCost, setTotalCost] = useState(0);

  const VCPU_COST = 0.05;
  const RAM_COST = 0.02;
  const STORAGE_COST = 0.0001;

  useEffect(() => {
    const cost = vcpu * VCPU_COST + ram * RAM_COST + storage * STORAGE_COST;
    setTotalCost(cost);
  }, [vcpu, ram, storage]);

  const handleGetQuote = () => navigate('/contact');

  return (
    <div className="service-page">
      <div className="home-page">
        {/* Hero Section */}
        <section className="hero-section">
          <video autoPlay muted loop playsInline className="hero-bg-video">
            <source src="images/service1.mp4" type="video/mp4" />
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
          style={{ backgroundColor: "var(--bg-color)" }}
        >
          <h2 className="text-center text-3xl md:text-4xl font-bold mb-12">{t.benefitsTitle}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4">
            {t.benefitsCards.map(({ title, brief, detail, gradientFrom, gradientTo, iconPath }, i) => (
              <div
                key={i}
                className={`group p-8 rounded-2xl shadow-lg transition-transform duration-300 transform cursor-pointer bg-gradient-to-br ${gradientFrom} ${gradientTo}`}
              >
                <div className="flex items-center justify-center w-16 h-16 rounded-full bg-white/20 text-white mb-6 transform group-hover:scale-110 transition-transform">
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                    <path d={iconPath} />
                  </svg>
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
                  {[...Array(6)].map((_, idx) => (
                    <motion.div
                      key={idx}
                      className="benefit-item"
                      initial={{ opacity: 0, x: -30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: idx * 0.1 }}
                      viewport={{ once: true }}
                    >
                      <FaCheck className="check-icon" />
                      <span>
                        {[
                          language === 'ar'
                            ? [
                                'استراتيجيات رقمية مخصصة لصناعتك',
                                'أتمتة لزيادة الكفاءة وتقليل التكاليف',
                                'تكامل قوي للأنظمة والتقنيات',
                                'رؤى بيانات تمكن من قرارات أذكى',
                                'منهجيات رشيقة مصممة لفريقك',
                                'دعم مستمر لنجاح التحول',
                              ]
                            : language === 'he'
                            ? [
                                'אסטרטגיות טרנספורמציה דיגיטלית מותאמות לתעשייה שלך',
                                'אוטומציה להגברת היעילות והפחתת עלויות',
                                'אינטגרציה חזקה של מערכות וטכנולוגיות',
                                'תובנות נתונים להחלטות חכמות יותר',
                                'מתודולוגיות אג’יל מותאמות לצוות שלך',
                                'תמיכה מתמשכת להצלחת הטרנספורמציה',
                              ]
                            : [
                                'Custom digital transformation strategies for your industry',
                                'Automation to boost efficiency and reduce costs',
                                'Robust integration of systems and technologies',
                                'Data insights that empower smarter business decisions',
                                'Agile methodologies tailored to your team',
                                'Ongoing support for sustained transformation success',
                              ],
                        ][0][idx]}
                      </span>
                    </motion.div>
                  ))}
                </div>

                <Link to="/contact" className="btn btn-primary">
                  {t.contactButton || 'Get Started'} <FaArrowRight />
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
                  <img src="images/bs45.jpg" alt="Digital Transformation Visual" />
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
                {/* vCPU slider */}
                <div className="group bg-[var(--card-bg)] dark:bg-[#2d3748] p-6 rounded-xl shadow-lg hover:shadow-[var(--shadow-hover)] transition-all duration-300 border-2 border-yellow-400">
                  <label htmlFor="vcpu-slider" className="block text-xl font-semibold mb-2 text-gray-800 dark:text-white">
                    {t.sliderLabels.vcpu}
                  </label>
                  <div className="flex items-center space-x-4">
                    <input
                      type="range"
                      id="vcpu-slider"
                      min="1"
                      max="64"
                      value={vcpu}
                      onChange={(e) => setVcpu(Number(e.target.value))}
                      className="w-full h-2 bg-[var(--input-bg)] rounded-lg appearance-none cursor-pointer"
                      style={{ boxShadow: 'var(--shadow)', transition: 'all 0.2s ease-in-out' }}
                    />
                    <span className="w-16 text-center text-xl font-bold text-gray-800 dark:text-white">
                      {vcpu}
                    </span>
                  </div>
                </div>

                {/* RAM slider */}
                <div className="group bg-[var(--card-bg)] dark:bg-[#2d3748] p-6 rounded-xl shadow-lg hover:shadow-[var(--shadow-hover)] transition-all duration-300 border-2 border-yellow-400">
                  <label htmlFor="ram-slider" className="block text-xl font-semibold mb-2 text-gray-800 dark:text-white">
                    {t.sliderLabels.ram}
                  </label>
                  <div className="flex items-center space-x-4">
                    <input
                      type="range"
                      id="ram-slider"
                      min="1"
                      max="128"
                      value={ram}
                      onChange={(e) => setRam(Number(e.target.value))}
                      className="w-full h-2 bg-[var(--input-bg)] rounded-lg appearance-none cursor-pointer"
                      style={{ boxShadow: 'var(--shadow)', transition: 'all 0.2s ease-in-out' }}
                    />
                    <span className="w-16 text-center text-xl font-bold text-gray-800 dark:text-white">
                      {ram}
                    </span>
                  </div>
                </div>

                {/* Storage slider */}
                <div className="group bg-[var(--card-bg)] dark:bg-[#2d3748] p-6 rounded-xl shadow-lg hover:shadow-[var(--shadow-hover)] transition-all duration-300 border-2 border-yellow-400">
                  <label htmlFor="storage-slider" className="block text-xl font-semibold mb-2 text-gray-800 dark:text-white">
                    {t.sliderLabels.storage}
                  </label>
                  <div className="flex items-center space-x-4">
                    <input
                      type="range"
                      id="storage-slider"
                      min="1"
                      max="10"
                      value={storage}
                      onChange={(e) => setStorage(Number(e.target.value))}
                      className="w-full h-2 bg-[var(--input-bg)] rounded-lg appearance-none cursor-pointer"
                      style={{ boxShadow: 'var(--shadow)', transition: 'all 0.2s ease-in-out' }}
                    />
                    <span className="w-16 text-center text-xl font-bold text-gray-800 dark:text-white">
                      {storage}
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
            background: #f5f5f5;
          }

          [data-theme="dark"] .benefits-section {
            background: #2d2d2d;
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
