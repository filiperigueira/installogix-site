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
const form = document.getElementById('contact-form') || document.querySelector('form');
const formStatus = document.getElementById('form-status');
const formAlert = document.getElementById('form-alert');

if (form) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = form.querySelector('.btn');
    const originalText = btn ? btn.textContent : 'Enviar mensagem';
    if (btn) {
      btn.textContent = 'Enviando...';
      btn.disabled = true;
    }
    if (formStatus) {
      formStatus.textContent = '';
      formStatus.className = 'form-status';
    }

    try {
      const res = await fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' }
      });
      const data = await res.json().catch(() => ({}));

      if (res.ok && data.success !== false) {
        form.reset();
        if (formStatus) {
          formStatus.textContent = 'Mensagem enviada com sucesso!';
          formStatus.className = 'form-status success';
        }
        if (formAlert) {
          formAlert.textContent = 'Mensagem enviada com sucesso!';
          formAlert.classList.add('show');
          setTimeout(() => formAlert.classList.remove('show'), 5000);
        }
        window.scrollTo({ top: 0, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
      } else {
        throw new Error(data.message || 'Erro no envio');
      }
    } catch (err) {
      if (formStatus) {
        const msg = err && err.message && err.message !== 'Erro no envio' ? err.message : '';
        formStatus.textContent = msg
          ? `Não foi possível enviar: ${msg}`
          : 'Não foi possível enviar. Tente novamente ou use o e-mail/telefone abaixo.';
        formStatus.className = 'form-status error';
      }
    } finally {
      if (btn) {
        btn.textContent = originalText || 'Enviar mensagem';
        btn.disabled = false;
      }
    }
  });
}
