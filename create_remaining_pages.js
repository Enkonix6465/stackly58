// This is a script to create all remaining pages
const fs = require('fs');
const path = require('path');

const pages = [
  'Signup',
  'ForgotPassword', 
  'AdminDashboard',
  'Service2',
  'Service3',
  'Service4',
  'Service5',
  'Service6',
  'BlogList',
  'Blog1',
  'Blog2',
  'Blog3'
];

const pageTemplates = {
  'Signup': `import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaUser, FaEnvelope, FaLock, FaBuilding } from 'react-icons/fa';

const Signup = () => {
  useEffect(() => {
    document.title = 'Sign Up - ForStackly Business Solutions';
  }, []);

  return (
    <div className="signup-page">
      <div className="signup-container">
        <motion.div
          className="signup-form"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1>Create Your Account</h1>
          <p>Join ForStackly and transform your business today</p>
          
          <form className="form">
            <div className="form-group">
              <label><FaUser /> Full Name</label>
              <input type="text" className="form-control" placeholder="Enter your name" />
            </div>
            <div className="form-group">
              <label><FaEnvelope /> Email</label>
              <input type="email" className="form-control" placeholder="Enter your email" />
            </div>
            <div className="form-group">
              <label><FaBuilding /> Company</label>
              <input type="text" className="form-control" placeholder="Company name" />
            </div>
            <div className="form-group">
              <label><FaLock /> Password</label>
              <input type="password" className="form-control" placeholder="Create password" />
            </div>
            <button type="submit" className="btn btn-primary btn-large btn-block">Create Account</button>
          </form>
          
          <p className="login-link">Already have an account? <Link to="/login">Sign In</Link></p>
        </motion.div>
      </div>

      <style jsx>{\`
        .signup-page {
          min-height: 100vh;
          background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
        }
        .signup-container {
          background: var(--card-bg);
          padding: 40px;
          border-radius: 15px;
          box-shadow: var(--shadow);
          max-width: 500px;
          width: 100%;
        }
        .signup-form h1 {
          color: var(--heading-color);
          margin-bottom: 10px;
          text-align: center;
        }
        .signup-form p {
          color: var(--text-muted);
          text-align: center;
          margin-bottom: 30px;
        }
        .form-group {
          margin-bottom: 20px;
        }
        .form-group label {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 8px;
          color: var(--text-color);
          font-weight: 600;
        }
        .login-link {
          text-align: center;
          margin-top: 20px;
        }
        .login-link a {
          color: var(--primary-color);
          text-decoration: none;
        }
      \`}</style>
    </div>
  );
};

export default Signup;`,

  'ForgotPassword': `import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaEnvelope, FaArrowLeft } from 'react-icons/fa';

const ForgotPassword = () => {
  useEffect(() => {
    document.title = 'Forgot Password - ForStackly Business Solutions';
  }, []);

  return (
    <div className="forgot-password-page">
      <div className="forgot-container">
        <motion.div
          className="forgot-form"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1>Reset Your Password</h1>
          <p>Enter your email address and we'll send you a link to reset your password.</p>
          
          <form className="form">
            <div className="form-group">
              <label><FaEnvelope /> Email Address</label>
              <input type="email" className="form-control" placeholder="Enter your email" />
            </div>
            <button type="submit" className="btn btn-primary btn-large btn-block">Send Reset Link</button>
          </form>
          
          <Link to="/login" className="back-link">
            <FaArrowLeft /> Back to Login
          </Link>
        </motion.div>
      </div>

      <style jsx>{\`
        .forgot-password-page {
          min-height: 100vh;
          background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
        }
        .forgot-container {
          background: var(--card-bg);
          padding: 40px;
          border-radius: 15px;
          box-shadow: var(--shadow);
          max-width: 450px;
          width: 100%;
        }
        .forgot-form h1 {
          color: var(--heading-color);
          margin-bottom: 10px;
          text-align: center;
        }
        .forgot-form p {
          color: var(--text-muted);
          text-align: center;
          margin-bottom: 30px;
          line-height: 1.5;
        }
        .form-group {
          margin-bottom: 20px;
        }
        .form-group label {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 8px;
          color: var(--text-color);
          font-weight: 600;
        }
        .back-link {
          display: flex;
          align-items: center;
          gap: 8px;
          color: var(--primary-color);
          text-decoration: none;
          margin-top: 20px;
          justify-content: center;
        }
      \`}</style>
    </div>
  );
};

export default ForgotPassword;`,

  'AdminDashboard': `import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaChartLine, FaUsers, FaProjectDiagram, FaCog } from 'react-icons/fa';

const AdminDashboard = () => {
  useEffect(() => {
    document.title = 'Admin Dashboard - ForStackly Business Solutions';
  }, []);

  return (
    <div className="dashboard-page">
      <div className="container">
        <motion.div
          className="dashboard-header"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1>Admin Dashboard</h1>
          <p>Welcome to your business control center</p>
        </motion.div>

        <div className="dashboard-grid">
          <motion.div
            className="dashboard-card"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <FaChartLine className="card-icon" />
            <h3>Analytics</h3>
            <p>Track your business performance</p>
          </motion.div>
          
          <motion.div
            className="dashboard-card"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <FaUsers className="card-icon" />
            <h3>Team Management</h3>
            <p>Manage your team and resources</p>
          </motion.div>
          
          <motion.div
            className="dashboard-card"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <FaProjectDiagram className="card-icon" />
            <h3>Projects</h3>
            <p>Monitor ongoing projects</p>
          </motion.div>
          
          <motion.div
            className="dashboard-card"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <FaCog className="card-icon" />
            <h3>Settings</h3>
            <p>Configure your preferences</p>
          </motion.div>
        </div>
      </div>

      <style jsx>{\`
        .dashboard-page {
          padding: 120px 0 80px;
          background: var(--bg-color);
        }
        .dashboard-header {
          text-align: center;
          margin-bottom: 50px;
        }
        .dashboard-header h1 {
          font-size: 3rem;
          color: var(--heading-color);
          margin-bottom: 10px;
        }
        .dashboard-header p {
          font-size: 1.2rem;
          color: var(--text-muted);
        }
        .dashboard-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 30px;
        }
        .dashboard-card {
          background: var(--card-bg);
          padding: 40px 30px;
          border-radius: 15px;
          text-align: center;
          box-shadow: var(--shadow);
          border: 1px solid var(--border-color);
          transition: all 0.3s ease;
        }
        .dashboard-card:hover {
          transform: translateY(-10px);
          box-shadow: var(--shadow-hover);
        }
        .card-icon {
          font-size: 3rem;
          color: var(--primary-color);
          margin-bottom: 20px;
        }
        .dashboard-card h3 {
          color: var(--heading-color);
          margin-bottom: 10px;
        }
        .dashboard-card p {
          color: var(--text-color);
        }
      \`}</style>
    </div>
  );
};

export default AdminDashboard;`,

  'BlogList': `import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaCalendar, FaUser, FaArrowRight } from 'react-icons/fa';

const BlogList = () => {
  useEffect(() => {
    document.title = 'All Blog Posts - ForStackly Business Solutions';
  }, []);

  const blogPosts = [
    { id: 1, title: 'Digital Transformation Strategies', author: 'John Doe', date: '2024-01-15' },
    { id: 2, title: 'Cloud Computing Best Practices', author: 'Jane Smith', date: '2024-01-12' },
    { id: 3, title: 'AI in Business Applications', author: 'Mike Johnson', date: '2024-01-10' },
  ];

  return (
    <div className="blog-list-page">
      <section className="blog-hero">
        <div className="container">
          <motion.div
            className="hero-content text-center"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1>All Blog Posts</h1>
            <p>Comprehensive collection of our insights and expertise</p>
          </motion.div>
        </div>
      </section>

      <div className="blog-content">
        <div className="container">
          <div className="posts-grid">
            {blogPosts.map((post, index) => (
              <motion.article
                key={post.id}
                className="post-card"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <h3>{post.title}</h3>
                <div className="post-meta">
                  <span><FaUser /> {post.author}</span>
                  <span><FaCalendar /> {post.date}</span>
                </div>
                <Link to={\`/blog\${post.id}\`} className="read-more">
                  Read More <FaArrowRight />
                </Link>
              </motion.article>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{\`
        .blog-list-page {
          padding-top: 80px;
        }
        .blog-hero {
          background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
          color: white;
          padding: 80px 0;
        }
        .hero-content h1 {
          font-size: 3rem;
          margin-bottom: 15px;
          color: white;
        }
        .blog-content {
          padding: 80px 0;
          background: var(--bg-color);
        }
        .posts-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 30px;
        }
        .post-card {
          background: var(--card-bg);
          padding: 30px;
          border-radius: 15px;
          box-shadow: var(--shadow);
          border: 1px solid var(--border-color);
        }
        .post-card h3 {
          color: var(--heading-color);
          margin-bottom: 15px;
        }
        .post-meta {
          display: flex;
          gap: 20px;
          margin-bottom: 20px;
          font-size: 0.9rem;
          color: var(--text-muted);
        }
        .post-meta span {
          display: flex;
          align-items: center;
          gap: 5px;
        }
        .read-more {
          color: var(--primary-color);
          text-decoration: none;
          display: flex;
          align-items: center;
          gap: 8px;
          font-weight: 600;
        }
      \`}</style>
    </div>
  );
};

export default BlogList;`,
};

// Service pages template
const createServicePage = (serviceNumber, serviceName, serviceDesc) => `import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaArrowRight, FaCheck } from 'react-icons/fa';

const Service${serviceNumber} = () => {
  useEffect(() => {
    document.title = '${serviceName} - ForStackly Business Solutions';
  }, []);

  return (
    <div className="service-page">
      <section className="service-hero">
        <div className="container">
          <motion.div
            className="hero-content text-center"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1>${serviceName}</h1>
            <p>${serviceDesc}</p>
            <div className="hero-buttons">
              <Link to="/contact" className="btn btn-primary btn-large">
                Get Started <FaArrowRight />
              </Link>
              <Link to="/services" className="btn btn-outline btn-large">
                All Services
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="service-content">
        <div className="container">
          <div className="grid-2">
            <motion.div
              className="content-text"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2>Professional ${serviceName} Solutions</h2>
              <p>Our comprehensive ${serviceName.toLowerCase()} services help businesses achieve their goals through innovative technology and strategic implementation.</p>
              
              <div className="benefits-list">
                <div className="benefit-item">
                  <FaCheck className="check-icon" />
                  <span>Expert consultation and planning</span>
                </div>
                <div className="benefit-item">
                  <FaCheck className="check-icon" />
                  <span>Customized solutions for your needs</span>
                </div>
                <div className="benefit-item">
                  <FaCheck className="check-icon" />
                  <span>24/7 support and maintenance</span>
                </div>
                <div className="benefit-item">
                  <FaCheck className="check-icon" />
                  <span>Proven track record of success</span>
                </div>
              </div>
              
              <Link to="/contact" className="btn btn-primary">
                Get Quote <FaArrowRight />
              </Link>
            </motion.div>
            
            <motion.div
              className="content-visual"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="service-image">
                <img src="https://images.unsplash.com/photo-1551434678-e076c223a692?w=500&h=400&fit=crop" alt="${serviceName}" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <style jsx>{\`
        .service-page {
          padding-top: 80px;
        }
        .service-hero {
          background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
          color: white;
          padding: 100px 0;
        }
        .hero-content h1 {
          font-size: 3.5rem;
          margin-bottom: 20px;
          color: white;
        }
        .hero-content p {
          font-size: 1.2rem;
          margin-bottom: 30px;
          opacity: 0.9;
        }
        .hero-buttons {
          display: flex;
          gap: 20px;
          justify-content: center;
          flex-wrap: wrap;
        }
        .service-content {
          padding: 80px 0;
          background: var(--bg-color);
        }
        .content-text h2 {
          font-size: 2.5rem;
          color: var(--heading-color);
          margin-bottom: 20px;
        }
        .content-text p {
          font-size: 1.1rem;
          color: var(--text-color);
          line-height: 1.6;
          margin-bottom: 30px;
        }
        .benefits-list {
          margin-bottom: 30px;
        }
        .benefit-item {
          display: flex;
          align-items: center;
          gap: 15px;
          margin-bottom: 15px;
          color: var(--text-color);
        }
        .check-icon {
          color: var(--accent-color);
          background: rgba(40, 167, 69, 0.1);
          padding: 8px;
          border-radius: 50%;
        }
        .service-image {
          border-radius: 15px;
          overflow: hidden;
          box-shadow: var(--shadow);
        }
        .service-image img {
          width: 100%;
          height: 400px;
          object-fit: cover;
        }
      \`}</style>
    </div>
  );
};

export default Service${serviceNumber};`;

// Blog post template
const createBlogPost = (blogNumber, title) => `import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaCalendar, FaUser, FaArrowLeft, FaShare } from 'react-icons/fa';

const Blog${blogNumber} = () => {
  useEffect(() => {
    document.title = '${title} - ForStackly Business Solutions Blog';
  }, []);

  return (
    <div className="blog-post-page">
      <section className="post-header">
        <div className="container">
          <motion.div
            className="header-content"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Link to="/blog" className="back-link">
              <FaArrowLeft /> Back to Blog
            </Link>
            <h1>${title}</h1>
            <div className="post-meta">
              <span><FaUser /> John Doe</span>
              <span><FaCalendar /> January 15, 2024</span>
              <button className="share-btn">
                <FaShare /> Share
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="post-content">
        <div className="container">
          <motion.article
            className="article-content"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="featured-image">
              <img src="https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&h=400&fit=crop" alt="${title}" />
            </div>
            
            <div className="article-body">
              <p>This is a comprehensive article about ${title.toLowerCase()}. Our expert insights provide valuable information for businesses looking to stay ahead in today's competitive landscape.</p>
              
              <h2>Key Insights</h2>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.</p>
              
              <h2>Best Practices</h2>
              <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
              
              <h2>Conclusion</h2>
              <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis.</p>
            </div>
          </motion.article>
        </div>
      </section>

      <style jsx>{\`
        .blog-post-page {
          padding-top: 80px;
        }
        .post-header {
          background: var(--sidebar-bg);
          padding: 60px 0;
        }
        .back-link {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          color: var(--primary-color);
          text-decoration: none;
          margin-bottom: 20px;
        }
        .header-content h1 {
          font-size: 3rem;
          color: var(--heading-color);
          margin-bottom: 20px;
          line-height: 1.2;
        }
        .post-meta {
          display: flex;
          gap: 30px;
          align-items: center;
          color: var(--text-muted);
        }
        .post-meta span {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .share-btn {
          background: var(--primary-color);
          color: white;
          border: none;
          padding: 8px 16px;
          border-radius: 20px;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .post-content {
          padding: 80px 0;
          background: var(--bg-color);
        }
        .article-content {
          max-width: 800px;
          margin: 0 auto;
        }
        .featured-image {
          margin-bottom: 40px;
          border-radius: 15px;
          overflow: hidden;
        }
        .featured-image img {
          width: 100%;
          height: 400px;
          object-fit: cover;
        }
        .article-body {
          background: var(--card-bg);
          padding: 40px;
          border-radius: 15px;
          box-shadow: var(--shadow);
          border: 1px solid var(--border-color);
        }
        .article-body h2 {
          color: var(--heading-color);
          margin: 30px 0 15px 0;
          font-size: 1.8rem;
        }
        .article-body p {
          color: var(--text-color);
          line-height: 1.6;
          margin-bottom: 20px;
          font-size: 1.1rem;
        }
      \`}</style>
    </div>
  );
};

export default Blog${blogNumber};`;

// Service configurations
const services = {
  'Service2': { name: 'Cloud Solutions', desc: 'Comprehensive cloud infrastructure and migration services for modern businesses.' },
  'Service3': { name: 'Data Analytics', desc: 'Transform your data into actionable insights with advanced analytics solutions.' },
  'Service4': { name: 'Cybersecurity', desc: 'Protect your business with enterprise-grade security solutions.' },
  'Service5': { name: 'AI & Automation', desc: 'Leverage artificial intelligence and automation to streamline operations.' },
  'Service6': { name: 'Custom Development', desc: 'Tailored software solutions designed for your specific business needs.' }
};

// Blog configurations
const blogs = {
  'Blog1': 'Digital Transformation Strategies for Modern Enterprises',
  'Blog2': 'Cloud Security Best Practices and Implementation Guide', 
  'Blog3': 'The Future of AI in Business Operations and Decision Making'
};

// Create all pages
const basePath = 'C:\\Users\\Manoj\\forstackly-frontend\\src\\pages';

pages.forEach(pageName => {
  let content = '';
  
  if (pageTemplates[pageName]) {
    content = pageTemplates[pageName];
  } else if (pageName.startsWith('Service')) {
    const serviceNumber = pageName.replace('Service', '');
    const serviceInfo = services[pageName];
    content = createServicePage(serviceNumber, serviceInfo.name, serviceInfo.desc);
  } else if (pageName.startsWith('Blog') && pageName !== 'BlogList') {
    const blogNumber = pageName.replace('Blog', '');
    const blogTitle = blogs[pageName];
    content = createBlogPost(blogNumber, blogTitle);
  }
  
  if (content) {
    const filePath = path.join(basePath, \`\${pageName}.jsx\`);
    fs.writeFileSync(filePath, content);
    console.log(\`Created \${pageName}.jsx\`);
  }
});

console.log('All remaining pages created successfully!');
