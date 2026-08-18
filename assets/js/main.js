// ============ MENU MOBILE ============
const mobileToggle = document.querySelector('.mobile-toggle');
const navMenu = document.getElementById('nav-menu');

if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
    });

    // Fechar menu ao clicar em um link
    navMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
        });
    });
}

// ============ SMOOTH SCROLL ============
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ============ ANIMAÇÃO DE SCROLL ============
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, {
    threshold: 0.1
});

document.querySelectorAll('.card, .stat').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.6s ease';
    observer.observe(el);
});

// ============ FORM SUBMISSION ============
const form = document.querySelector('form');
if (form) {
    form.addEventListener('submit', function(e) {
        const btn = form.querySelector('.btn');
        if (btn) {
            btn.textContent = 'Enviando...';
            btn.disabled = true;
            setTimeout(() => {
                btn.textContent = 'Enviar Mensagem';
                btn.disabled = false;
            }, 5000);
        }
    });
}

console.log('Installogix site carregado com sucesso!');