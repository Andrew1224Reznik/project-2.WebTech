import AOS from 'aos';
import 'aos/dist/aos.css';

document.addEventListener('DOMContentLoaded', () => {
  AOS.init({
    duration: 1200,
    once: true,
  });
});

import './js/testimonials.js';
