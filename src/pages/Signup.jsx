import React, { useEffect } from 'react';
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

      <style jsx>{`
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
      `}</style>
    </div>
  );
};

export default Signup;
