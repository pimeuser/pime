// Navigation scroll effect
const nav = document.querySelector('.nav');
const navLinks = document.querySelector('.nav-links');
const hamburger = document.querySelector('.hamburger');

window.addEventListener('scroll', () => {
  if (window.scrollY > 30) {
    nav?.classList.add('scrolled');
  } else {
    nav?.classList.remove('scrolled');
  }
});

// Mobile menu
hamburger?.addEventListener('click', () => {
  navLinks?.classList.toggle('open');
});

// Close menu on link click
navLinks?.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

// Active nav link
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-links a').forEach(link => {
  const href = link.getAttribute('href');
  if (href === currentPage || (currentPage === '' && href === 'index.html')) {
    link.classList.add('active');
  }
});

// Intersection Observer for fade-up animations
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));

// Contact form handler
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const name = document.getElementById('name')?.value;
    const email = document.getElementById('email')?.value;
    const company = document.getElementById('company')?.value || '';
    const product = document.getElementById('product')?.value || '';
    const message = document.getElementById('message')?.value;
    
    const subject = encodeURIComponent(`Enquiry from ${name}${company ? ' - ' + company : ''}`);
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}${company ? '\nCompany: ' + company : ''}${product ? '\nProduct Interest: ' + product : ''}\n\nMessage:\n${message}`
    );
    
    window.location.href = `mailto:info@pime.com.au?subject=${subject}&body=${body}`;
    
    const successMsg = document.getElementById('successMsg');
    if (successMsg) {
      successMsg.style.display = 'block';
      setTimeout(() => successMsg.style.display = 'none', 5000);
    }
    contactForm.reset();
  });
}

// Counter animation for stats
function animateCounter(el, target, duration = 2000) {
  let start = 0;
  const step = target / (duration / 16);
  const timer = setInterval(() => {
    start += step;
    if (start >= target) {
      el.textContent = el.dataset.suffix ? target + el.dataset.suffix : target + '+';
      clearInterval(timer);
    } else {
      el.textContent = Math.floor(start) + (el.dataset.suffix || '+');
    }
  }, 16);
}

const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.stat-num').forEach(el => {
        const target = parseInt(el.dataset.target);
        if (target) animateCounter(el, target);
      });
      statsObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('.hero-stats').forEach(el => statsObserver.observe(el));
