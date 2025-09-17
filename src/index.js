import React from 'react';
import ReactDOM from 'react-dom/client';
import './App.css';
import './theme.css';
import App from './App';
import 'aos/dist/aos.css';
import AOS from 'aos';

AOS.init({
  duration: 1000,
  easing: 'ease-in-out',
  once: true,
  mirror: false
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
