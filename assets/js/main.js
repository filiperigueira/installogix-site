// ============ MENU MOBILE ============
const mobileToggle = document.querySelector('.mobile-toggle');
const navMenu = document.getElementById('nav-menu');

if (mobileToggle && navMenu) {
  mobileToggle.addEventListener('click', () => {
    const isOpen = navMenu.classList.toggle('active');
    mobileToggle.setAttribute('aria-expanded', String(isOpen));
    mobileToggle.setAttribute('aria-label', isOpen ? 'Fechar menu' : 'Abrir menu');
  });

  navMenu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('active');
      mobileToggle.setAttribute('aria-expanded', 'false');
      mobileToggle.setAttribute('aria-label', 'Abrir menu');
    });
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 900 && navMenu.classList.contains('active')) {
      navMenu.classList.remove('active');
      mobileToggle.setAttribute('aria-expanded', 'false');
      mobileToggle.setAttribute('aria-label', 'Abrir menu');
    }
  });
}

// ============ ANIMAÇÃO DE SCROLL ============
const animatedEls = document.querySelectorAll('.card, .stat');
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (prefersReducedMotion || !('IntersectionObserver' in window)) {
  animatedEls.forEach((el) => {
    el.style.opacity = '1';
    el.style.transform = 'none';
  });
} else {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  animatedEls.forEach((el) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.6s ease';
    observer.observe(el);
  });
}

// ============ FORM SUBMISSION ============
const form = document.querySelector('form');
if (form) {
  form.addEventListener('submit', () => {
    const btn = form.querySelector('.btn');
    if (btn) {
      btn.textContent = 'Enviando...';
      btn.disabled = true;
    }
  });
}
