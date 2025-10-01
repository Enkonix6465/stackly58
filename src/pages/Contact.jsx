import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaClock,
  FaFacebook,
  FaTwitter,
  FaLinkedin,
  FaArrowRight,
  FaInstagram,
} from "react-icons/fa";
import { useLanguage } from "../context.jsx/LanguageContext";

// Animated icons as components
const AnimatedCall = () => <span className="detail-icon ring-anim"><FaPhone /></span>;
const AnimatedAddress = () => <span className="detail-icon float-anim"><FaMapMarkerAlt /></span>;
const AnimatedClock = () => <span className="detail-icon alarm-anim"><FaClock /></span>;
const AnimatedMail = () => <span className="detail-icon mail-anim"><FaEnvelope /></span>;

const translations = {
  en: {
    documentTitle: "Connect with Our Team",
    heroTitle: "Expert Consultancy Solutions",
    heroDescription: "Transform your business with our strategic consulting services.",
    contactTitle: "Get in Touch",
    formPlaceholders: {
      name: "Your Name",
      email: "Your Email",
      subject: "Subject",
      message: "Your Message"
    },
    sendButton: "Send Message",
    successMessage: "We received your message. We'll get back to you shortly.",
    contactDetailsTitle: "Contact Details",
    contactDetailsDescription: "We are here to help—reach out with any questions.",
    addressLabel: "Address",
    addressDetails: "221B Baker Street,\nLondon, NW1 6XE\nUnited Kingdom",
    mobileLabel: "Mobile",
    mobileNumber: "+44 20 7946 0958",
    availabilityLabel: "Availability",
    availabilityTime: "Mon-Fri: 9am - 6pm",
    emailLabel: "Email",
    emailAddress: "support@forstackly.com",
    socialMediaLabel: "Social Media:",
    socialLinks: {
      facebook: "https://www.facebook.com",
      twitter: "https://twitter.com",
      linkedin: "https://www.linkedin.com",
      instagram: "https://www.instagram.com"
    },
    faqTitle: "Frequently Asked Questions",
    faqData: [
      { q: "What services do you offer?", a: "We provide tailored event planning and management services to create unforgettable experiences." },
      { q: "How much does event planning cost?", a: "Cost varies by event type and scale. Contact us for a personalized quote." },
      { q: "When should I book?", a: "Booking at least 3 months in advance is recommended to ensure availability." },
      { q: "Can I customize my package?", a: "Absolutely! We are happy to create bespoke packages to fit your needs." }
    ],
    resourcesTitle: "Resources",
    resources: [
      { name: "Event Planning Guide", link: "#" },
      { name: "Client Portal", link: "#" },
      { name: "Knowledge Base", link: "#" },
      { name: "Support Center", link: "#" }
    ],
    ctaTitle: "Ready to Transform Your Business?",
    ctaDescription: "Get started today with a free consultation and discover how our expert consultancy can help you achieve your goals.",
    ctaStartButton: "Get Free Consultation",
    ctaLearnButton: "View Our Services",
    heroButton: "Get Started Today"
  },
  ar: {
    documentTitle: "تواصل مع فريقنا",
    heroTitle: "حلول استشارية متخصصة",
    heroDescription: "حول عملك بخدماتنا الاستشارية الاستراتيجية.",
    contactTitle: "ابقى على اتصال",
    formPlaceholders: {
      name: "اسمك",
      email: "بريدك الإلكتروني",
      subject: "الموضوع",
      message: "رسالتك"
    },
    sendButton: "إرسال الرسالة",
    successMessage: "تم استلام رسالتك وسنعاود الاتصال بك قريبًا.",
    contactDetailsTitle: "تفاصيل الاتصال",
    contactDetailsDescription: "نحن هنا للمساعدة — تواصل معنا لأي استفسار.",
    addressLabel: "العنوان",
    addressDetails: "221B شارع بيكر\nلندن، NW1 6XE\nالمملكة المتحدة",
    mobileLabel: "الجوال",
    mobileNumber: "+44 20 7946 0958",
    availabilityLabel: "التوافر",
    availabilityTime: "الإثنين - الجمعة: 9 صباحًا - 6 مساءً",
    emailLabel: "البريد الإلكتروني",
    emailAddress: "support@forstackly.com",
    socialMediaLabel: "وسائل التواصل الاجتماعي:",
    socialLinks: {
      facebook: "https://www.facebook.com",
      twitter: "https://twitter.com",
      linkedin: "https://www.linkedin.com",
      instagram: "https://www.instagram.com"
    },
    faqTitle: "الأسئلة المتكررة",
    faqData: [
      { q: "ما هي الخدمات التي تقدمونها؟", a: "نقدم خدمات تخطيط وإدارة الفعاليات المخصصة لخلق تجارب لا تُنسى." },
      { q: "كم تكلفة تخطيط الفعالية؟", a: "تختلف التكلفة حسب نوع الفعالية وحجمها. اتصل للحصول على عرض مخصص." },
      { q: "متى يجب أن أحجز؟", a: "يوصى بالحجز قبل 3 أشهر على الأقل لضمان التوفر." },
      { q: "هل يمكنني تخصيص الباقة؟", a: "بالتأكيد! نحن سعداء بإعداد باقات مخصصة لتلبية احتياجاتك." }
    ],
    resourcesTitle: "الموارد",
    resources: [
      { name: "دليل تخطيط الفعاليات", link: "#" },
      { name: "بوابة العملاء", link: "#" },
      { name: "قاعدة المعرفة", link: "#" },
      { name: "مركز الدعم", link: "#" }
    ],
    ctaTitle: "هل أنت مستعد لتحويل عملك؟",
    ctaDescription: "ابدأ اليوم باستشارة مجانية واكتشف كيف يمكن لاستشاراتنا المتخصصة مساعدتك في تحقيق أهدافك.",
    ctaStartButton: "احصل على استشارة مجانية",
    ctaLearnButton: "عرض خدماتنا",
    heroButton: "ابدأ اليوم"
  },
  he: {
    documentTitle: "צור קשר עם הצוות שלנו",
    heroTitle: "פתרונות ייעוץ מקצועיים",
    heroDescription: "שנה את העסק שלך עם שירותי הייעוץ האסטרטגיים שלנו.",
    contactTitle: "הישאר בקשר",
    formPlaceholders: {
      name: "שמך",
      email: "האימייל שלך",
      subject: "נושא",
      message: "הודעתך"
    },
    sendButton: "שלח הודעה",
    successMessage: "הודעתך התקבלה. נחזור אליך בהקדם.",
    contactDetailsTitle: "פרטי התקשרות",
    contactDetailsDescription: "אנחנו כאן כדי לעזור - צור קשר בכל שאלה.",
    addressLabel: "כתובת",
    addressDetails: "221B רחוב בייקר\nלונדון, NW1 6XE\nבריטניה",
    mobileLabel: "טלפון נייד",
    mobileNumber: "+44 20 7946 0958",
    availabilityLabel: "זמינות",
    availabilityTime: "שני-שישי: 9:00-18:00",
    emailLabel: "אימייל",
    emailAddress: "support@forstackly.com",
    socialMediaLabel: "מדיה חברתית:",
    socialLinks: {
      facebook: "https://www.facebook.com",
      twitter: "https://twitter.com",
      linkedin: "https://www.linkedin.com",
      instagram: "https://www.instagram.com"
    },
    faqTitle: "שאלות נפוצות",
    faqData: [
      { q: "אילו שירותים אתם מציעים?", a: "אנו מספקים שירותי תכנון וניהול אירועים בהתאמה אישית ליצירת חוויות בלתי נשכחות." },
      { q: "כמה עולה תכנון אירועים?", a: "העלות משתנה בהתאם לסוג והיקף האירוע. צרו קשר לקבלת הצעת מחיר מותאמת." },
      { q: "מתי כדאי להזמין?", a: "מומלץ להזמין לפחות שלוש חודשים מראש להבטחת זמינות." },
      { q: "האם אפשר להתאים את החבילה?", a: "בהחלט! נשמח ליצור חבילות מותאמות לצרכים שלך." }
    ],
    resourcesTitle: "משאבים",
    resources: [
      { name: "מדריך לתכנון אירועים", link: "#" },
      { name: "פורטל ללקוחות", link: "#" },
      { name: "מרכז ידע", link: "#" },
      { name: "מרכז תמיכה", link: "#" }
    ],
    ctaTitle: "מוכן לשנות את העסק שלך?",
    ctaDescription: "התחל היום עם ייעוץ חינם וגלה כיצד הייעוץ המקצועי שלנו יכול לעזור לך להשיג את יעדיך.",
    ctaStartButton: "קבל ייעוץ חינם",
    ctaLearnButton: "צפה בשירותים שלנו",
    heroButton: "התחל היום"
  },
  fr: {
    documentTitle: "Contactez notre équipe",
    heroTitle: "Solutions de conseil expertes",
    heroDescription: "Transformez votre entreprise avec nos services de conseil stratégique.",
    contactTitle: "Contactez-nous",
    formPlaceholders: {
      name: "Votre nom",
      email: "Votre email",
      subject: "Objet",
      message: "Votre message"
    },
    sendButton: "Envoyer le message",
    successMessage: "Nous avons bien reçu votre message. Nous vous répondrons sous peu.",
    contactDetailsTitle: "Coordonnées",
    contactDetailsDescription: "Nous sommes là pour vous aider — n'hésitez pas à nous contacter.",
    addressLabel: "Adresse",
    addressDetails: "221B Baker Street,\nLondres, NW1 6XE\nRoyaume-Uni",
    mobileLabel: "Mobile",
    mobileNumber: "+44 20 7946 0958",
    availabilityLabel: "Disponibilité",
    availabilityTime: "Lun-Ven: 9h - 18h",
    emailLabel: "Email",
    emailAddress: "support@forstackly.com",
    socialMediaLabel: "Réseaux sociaux:",
    socialLinks: {
      facebook: "https://www.facebook.com",
      twitter: "https://twitter.com",
      linkedin: "https://www.linkedin.com",
      instagram: "https://www.instagram.com"
    },
    faqTitle: "Questions fréquentes",
    faqData: [
      { q: "Quels sont vos services ?", a: "Nous proposons des services personnalisés de planification et de gestion d'événements pour créer des expériences inoubliables." },
      { q: "Combien coûte la planification d'événements ?", a: "Le coût varie selon le type et l'envergure de l'événement. Contactez-nous pour un devis personnalisé." },
      { q: "Quand dois-je réserver ?", a: "Il est recommandé de réserver au moins 3 mois à l'avance pour garantir la disponibilité." },
      { q: "Puis-je personnaliser mon forfait ?", a: "Absolument ! Nous sommes heureux de créer des forfaits sur mesure adaptés à vos besoins." }
    ],
    resourcesTitle: "Ressources",
    resources: [
      { name: "Guide de planification d'événements", link: "#" },
      { name: "Portail client", link: "#" },
      { name: "Base de connaissances", link: "#" },
      { name: "Centre de support", link: "#" }
    ],
    ctaTitle: "Prêt à transformer votre entreprise ?",
    ctaDescription: "Commencez dès aujourd'hui avec une consultation gratuite et découvrez comment notre conseil expert peut vous aider à atteindre vos objectifs.",
    ctaStartButton: "Obtenir une consultation gratuite",
    ctaLearnButton: "Voir nos services",
    heroButton: "Commencer aujourd'hui"
  }
};

export default function ContactPage() {
  const { language } = useLanguage();
  const t = translations[language] || translations.en;

  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState("");
  const [showForm, setShowForm] = useState(true);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    const old = JSON.parse(localStorage.getItem("contactMessages") || "[]");
    const withTimestamp = {
      ...form,
      timestamp: new Date().toLocaleString(),
    };
    localStorage.setItem("contactMessages", JSON.stringify([...old, withTimestamp]));
    setStatus(t.successMessage);
    setShowForm(false);
    setForm({ name: "", email: "", subject: "", message: "" });
    setTimeout(() => {
      setStatus("");
      setShowForm(true);
    }, 5000);
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="hero-section">
        <video autoPlay muted loop playsInline className="hero-bg-video">
          <source src="/images/contact.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="hero-overlay">
          <div className="hero-content">
            <h1 className="hero-title">{t.heroTitle}</h1>
            <p className="hero-paragraph">{t.heroDescription}</p>
            <button className="hero-button" onClick={() => document.querySelector('.contact-main-section').scrollIntoView({ behavior: 'smooth' })}>
              {t.heroButton}
            </button>
          </div>
        </div>
      </section>

      {/* Contact Main Section */}
      <section className="contact-main-section" style={{ background: "var(--background-main)" }}>
        <div className="contact-container">
          <div className="contact-row">
            {/* Left: Contact Form */}
            <div className="contact-card" style={{ background: "var(--card-bg)", color: "var(--text-color)", border: "1.5px solid var(--border-color)" }}>
              <h2 className="contact-title" style={{ color: "var(--heading-color)" }}>{t.contactTitle}</h2>
              {showForm ? (
                <form className="contact-form" onSubmit={handleSubmit}>
                  <div className="contact-form-row">
                    <input name="name" value={form.name} onChange={handleChange} type="text" placeholder={t.formPlaceholders.name} required />
                    <input name="email" value={form.email} onChange={handleChange} type="email" placeholder={t.formPlaceholders.email} required />
                  </div>
                  <input name="subject" value={form.subject} onChange={handleChange} type="text" placeholder={t.formPlaceholders.subject} required />
                  <textarea name="message" value={form.message} onChange={handleChange} placeholder={t.formPlaceholders.message} rows="4" required />
                  <button type="submit" className="send-btn">{t.sendButton}</button>
                </form>
              ) : (
                <div className="form-success">{status}</div>
              )}
            </div>

            {/* Right: Contact Details */}
            <div className="contact-card" style={{ background: "var(--card-bg)", color: "var(--text-color)", border: "1.5px solid var(--border-color)" }}>
              <h2 className="contact-title" style={{ color: "var(--heading-color)" }}>{t.contactDetailsTitle}</h2>
              <p style={{ color: "var(--text-muted)", marginBottom: "14px" }}>{t.contactDetailsDescription}</p>

              <div className="contact-details-grid">
                <div className="detail-card">
                  <AnimatedAddress />
                  <div>
                    <strong>{t.addressLabel}</strong>
                    <div style={{whiteSpace: 'pre-wrap'}}>{t.addressDetails}</div>
                  </div>
                </div>
                <div className="detail-card">
                  <AnimatedCall />
                  <div>
                    <strong>{t.mobileLabel}</strong>
                    <div>{t.mobileNumber}</div>
                  </div>
                </div>
                <div className="detail-card">
                  <AnimatedClock />
                  <div>
                    <strong>{t.availabilityLabel}</strong>
                    <div>{t.availabilityTime}</div>
                  </div>
                </div>
                <div className="detail-card">
                  <AnimatedMail />
                  <div>
                    <strong>{t.emailLabel}</strong>
                    <div>{t.emailAddress}</div>
                  </div>
                </div>
              </div>

              <div className="contact-social">
                <span>{t.socialMediaLabel}</span>
                <a href={t.socialLinks.facebook} target="_blank" rel="noreferrer"><FaFacebook /></a>
                <a href={t.socialLinks.twitter} target="_blank" rel="noreferrer"><FaTwitter /></a>
                <a href={t.socialLinks.linkedin} target="_blank" rel="noreferrer"><FaLinkedin /></a>
                <a href={t.socialLinks.instagram} target="_blank" rel="noreferrer"><FaInstagram /></a>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* FAQ Section */}
      <section className="faq-section container">
        <h3>{t.faqTitle}</h3>
        <div className="faq-list">
          {t.faqData.map((faq, idx) => (
            <details className="faq-item" key={idx}>
              <summary>{faq.q}</summary>
              <p>{faq.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* Google Map Section */}
      <section className="map-section">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3021.6816935957!2d-73.98835178517922!3d40.75854307932519!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25854a3353317%3A0x7d52aa292d5a1fe8!2sTimes%20Square!5e0!3m2!1sen!2sus!4v1665000000000!5m2!1sen!2sus"
          width="100%"
          height="420"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          title="Company Location"
        />
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-wrapper">
          <div className="cta-content-left">
            <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity:1, x:0 }} transition={{ duration: 0.8 }} viewport={{ once: true }}>
              <h2 className="cta-title">{t.ctaTitle}</h2>
              <p className="cta-description">{t.ctaDescription}</p>
            </motion.div>
          </div>
          <div className="cta-content-right">
            <motion.div className="cta-actions" initial={{ opacity: 0, x: 50 }} whileInView={{ opacity:1, x:0 }} transition={{ duration: 0.8, delay: 0.2 }} viewport={{ once: true }}>
              <Link to="/contact" className="cta-btn-primary">
                <span>{t.ctaStartButton}</span>
                <FaArrowRight />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Styles */}
      <style>{`
        :root {
          --background-main: #f5f6fa;
          --card-bg: #ededed;
          --input-bg: #fff;
          --border-color: #d2d2d2;
          --heading-color: #222;
          --text-color: #222;
          --text-muted: #555;
          --primary-color: #ffd700;
          --primary-hover: #e6c200;
        }
        [data-theme="dark"] {
          --background-main: #181a1f;
          --card-bg: #23242a;
          --input-bg: #2c2e35;
          --border-color: #444857;
          --heading-color: #f0f0f5;
          --text-color: #e5e7eb;
          --text-muted: #a3a6ae;
          --primary-color: #ffd700;
          --primary-hover: #e6c200;
        }

        body {
          margin: 0;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          background-color: var(--background-main);
          color: var(--text-color);
        }
        .container {
          max-width: 1140px;
          margin-left: auto;
          margin-right: auto;
          padding-left: 16px;
          padding-right: 16px;
        }
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
  color: #333;
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
          background: linear-gradient(45deg, #ffd700, #e6c200);
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

        /* Contact Section */
        .contact-main-section {
          background-color: var(--background-main);
          padding: 60px 0 80px;
        }
        .contact-row {
          display: flex;
          gap: 48px;
          flex-wrap: wrap;
          justify-content: center;
        }
        .contact-card {
          background-color: var(--card-bg);
          border: 1.5px solid var(--border-color);
          border-radius: 20px;
          box-shadow: 0 8px 24px rgba(0,0,0,0.1);
          padding: 32px 40px;
          flex: 1 1 480px;
          display: flex;
          flex-direction: column;
        }
        .contact-title {
          font-size: 2.25rem;
          font-weight: 700;
          margin-bottom: 28px;
          color: var(--heading-color);
        }
        .contact-form-row {
          display: flex;
          gap: 20px;
          margin-bottom: 20px;
        }
        input[type="text"],
        input[type="email"],
        textarea {
          font-size: 1rem;
          font-family: inherit;
          color: var(--text-color);
          background-color: var(--input-bg);
          border: 1.5px solid var(--border-color);
          border-radius: 12px;
          padding: 14px 16px;
          width: 100%;
          box-sizing: border-box;
          transition: border-color 0.3s ease;
        }
        textarea {
          resize: vertical;
          min-height: 100px;
        }
        input:focus,
        textarea:focus {
          outline: none;
          border-color: var(--primary-color);
          box-shadow: 0 0 5px var(--primary-color);
        }
        .send-btn {
          font-size: 1.125rem;
          font-weight: 700;
          background-color: var(--primary-color);
          color: #333;
          border: none;
          border-radius: 48px;
          padding: 16px;
          width: 100%;
          cursor: pointer;
          box-shadow: 0 6px 18px rgba(255, 215, 0, 0.4);
          transition: background-color 0.3s ease;
          margin-top: auto;
        }
        .send-btn:hover {
          background-color: var(--primary-hover);
        }
        .form-success {
          font-size: 1.3rem;
          font-weight: 700;
          color: var(--primary-color);
          text-align: center;
          min-height: 140px;
          margin-top: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

/* Contact Details Grid - Desktop Default */
.contact-details-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr); /* Always 2 columns on desktop */
  gap: 20px;
  margin-bottom: 30px;
}

.detail-card {
  display: flex;
  align-items: center;
  background-color: var(--input-bg);
  padding: 20px 18px;
  border-radius: 16px;
  box-shadow: 0 6px 16px rgba(0,0,0,0.08);
  gap: 15px;
}

.detail-card .detail-icon {
  width: 46px;
  height: 46px;
  background-color: var(--primary-color);
  color: #333;
  border-radius: 18px;
  font-size: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 0 12px rgba(255,215,0,0.6);
}

.contact-social {
  display: flex;
  gap: 20px;
  align-items: center;
  font-size: 1rem;
  color: var(--text-muted);
}

.contact-social span {
  font-weight: 600;
  margin-right: 12px;
}

.contact-social a {
  display: flex;
  width: 38px;
  height: 38px;
  border-radius: 14px;
  background-color: var(--input-bg);
  color: var(--primary-color);
  font-size: 1.6rem;
  justify-content: center;
  align-items: center;
  transition: background-color 0.3s ease, color 0.3s ease;
}

.contact-social a:hover {
  background-color: var(--primary-color);
  color: #333;
}

/* Tablet Responsive */
@media (max-width: 900px) {
  .contact-details-grid {
    grid-template-columns: 1fr; /* Stack cards vertically */
    gap: 16px;
  }
  .detail-card {
    padding: 18px 14px;
    border-radius: 14px;
    font-size: 0.98rem;
  }
  .detail-card .detail-icon {
    width: 42px;
    height: 42px;
    font-size: 1.3rem;
    border-radius: 16px;
  }
  .contact-social {
    gap: 16px;
    font-size: 0.96rem;
  }
  .contact-social a {
    width: 34px;
    height: 34px;
    font-size: 1.4rem;
    border-radius: 12px;
  }
}

/* Mobile Responsive */
@media (max-width: 600px) {
  .contact-details-grid {
    grid-template-columns: 1fr; /* Single column */
    gap: 13px;
  }
  .detail-card {
    padding: 14px 10px;
    border-radius: 11px;
    font-size: 0.92rem;
    flex-direction: column;
    align-items: flex-start;
    gap: 11px;
  }
  .detail-card .detail-icon {
    width: 36px;
    height: 36px;
    font-size: 1.1rem;
    border-radius: 10px;
  }
  .contact-social {
    gap: 12px;
    font-size: 0.88rem;
  }
  .contact-social span {
    margin-right: 7px;
    font-size: 0.93rem;
  }
  .contact-social a {
    width: 29px;
    height: 29px;
    font-size: 1.1rem;
    border-radius: 9px;
  }
}

        /* FAQ */
        .faq-list details {
          background-color: var(--input-bg);
          border-radius: 14px;
          padding: 20px;
          margin-bottom: 16px;
          box-shadow: 0 5px 14px rgba(0,0,0,0.07);
          cursor: pointer;
        }
        .faq-list summary {
          font-weight: 700;
          font-size: 1.1rem;
          outline: none;
        }
        .faq-list p {
          margin-top: 10px;
          font-size: 1rem;
          color: var(--text-muted);
          line-height: 1.5;
        }

        /* Resources */
        .resources-list {
          list-style: none;
          margin: 0;
          padding: 0;
        }
        .resources-list li {
          margin-bottom: 14px;
        }
        .resources-list li a {
          color: var(--primary-color);
          font-weight: 600;
          font-size: 1rem;
          text-decoration: none;
          transition: color 0.3s ease;
        }
        .resources-list li a:hover {
          text-decoration: underline;
          color: var(--primary-hover);
        }


        /* Map */
        .map-section iframe {
          width: 100vw !important;
          height: 420px;
          border: none;
          display: block;
          border-radius: 16px 16px 0 0;
        }

        /* CTA */
        .cta-section {
          background: url('/images/CTACONtact.jpg') center/cover no-repeat;
          padding: 100px 0;
          position: relative;
          overflow: hidden;
        }

        .cta-section::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.7);
          z-index: 1;
        }

        .cta-wrapper {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 20px;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 80px;
          align-items: center;
          position: relative;
          z-index: 3;
        }

        .cta-content-left {
          color: white;
        }

        .cta-title {
          font-size: 3rem;
          font-weight: 800;
          color: white;
          margin-bottom: 24px;
          line-height: 1.1;
        }

        .cta-description {
          font-size: 1.2rem;
          color: #ccc;
          line-height: 1.6;
          margin-bottom: 0;
        }

        .cta-content-right {
          display: flex;
          justify-content: center;
        }

        .cta-actions {
          display: flex;
          flex-direction: column;
          gap: 20px;
          align-items: center;
        }

        .cta-btn-primary {
          background: #ffd700;
          color: #333;
          padding: 20px 40px;
          border-radius: 12px;
          text-decoration: none;
          font-weight: 700;
          font-size: 1.2rem;
          transition: all 0.3s ease;
          box-shadow: 0 10px 30px rgba(255, 215, 0, 0.3);
          border: none;
          display: flex;
          align-items: center;
          gap: 12px;
          min-width: 280px;
          justify-content: center;
        }

        .cta-btn-primary:hover {
          transform: translateY(-3px);
          box-shadow: 0 15px 40px rgba(255, 215, 0, 0.4);
          background: #e6c200;
        }

        .cta-btn-primary svg {
          transition: transform 0.3s ease;
        }

        .cta-btn-primary:hover svg {
          transform: translateX(5px);
        }

        .cta-btn-secondary {
          background: transparent;
          color: white;
          padding: 16px 32px;
          border-radius: 12px;
          text-decoration: none;
          font-weight: 600;
          font-size: 1.1rem;
          border: 2px solid white;
          transition: all 0.3s ease;
          min-width: 280px;
          text-align: center;
        }

        .cta-btn-secondary:hover {
          background: white;
          color: #333;
          transform: translateY(-2px);
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
  background: #ffd700;
  color: #333;
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
        /* Mobile Responsive for CTA */
        @media (max-width: 768px) {
          .cta-section {
            padding: 80px 0;
          }
          
          .cta-wrapper {
            grid-template-columns: 1fr;
            gap: 60px;
            text-align: center;
          }
          
          .cta-title {
            font-size: 2.2rem;
          }
          
          .cta-description {
            font-size: 1.1rem;
          }
          
          .cta-btn-primary {
            min-width: 250px;
          }
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
}
