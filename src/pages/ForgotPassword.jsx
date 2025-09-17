import React, { useEffect } from 'react';
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

      <style jsx>{`
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
      `}</style>
    </div>
  );
};

export default ForgotPassword;
