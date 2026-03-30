// ===== Variables Globales =====
let currentStep = 1;
const totalSteps = 3;
let selectedDistance = '';
let selectedTalla = '';

// ===== DOM Elements =====
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
const navbar = document.getElementById('navbar');
const backToTop = document.getElementById('backToTop');
const registrationForm = document.getElementById('registration-form');
const formSummary = document.getElementById('form-summary');
const formSuccess = document.getElementById('form-success');
const contactForm = document.getElementById('contact-form');
const modal = document.getElementById('modal');
const particles = document.getElementById('particles');

// ===== Inicialización =====
document.addEventListener('DOMContentLoaded', () => {
    initParticles();
    initScrollEffects();
    initFAQ();
    initFormValidation();
    animateStats();
});

// ===== Partículas =====
function initParticles() {
    const particleCount = 50;
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 15 + 's';
        particle.style.animationDuration = (15 + Math.random() * 10) + 's';
        particles.appendChild(particle);
    }
}

// ===== Scroll Effects =====
function initScrollEffects() {
    window.addEventListener('scroll', () => {
        // Navbar effect
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Back to top button
        if (window.scrollY > 500) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });

    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// ===== Navegación Móvil =====
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// ===== Scroll Suave =====
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        const offset = 80;
        const sectionPosition = section.offsetTop - offset;
        window.scrollTo({
            top: sectionPosition,
            behavior: 'smooth'
        });
    }
}

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        scrollToSection(targetId);
    });
});

// ===== Animación de Estadísticas =====
function animateStats() {
    const stats = document.querySelectorAll('.stat-number');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const targetNumber = parseInt(target.getAttribute('data-target'));
                animateNumber(target, targetNumber);
                observer.unobserve(target);
            }
        });
    }, { threshold: 0.5 });

    stats.forEach(stat => observer.observe(stat));
}

function animateNumber(element, target) {
    let current = 0;
    const increment = target / 50;
    const duration = 2000;
    const stepTime = duration / 50;

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, stepTime);
}

// ===== FAQ Accordion =====
function initFAQ() {
    document.querySelectorAll('.faq-question').forEach(btn => {
        btn.addEventListener('click', () => {
            const item = btn.parentElement;
            const isActive = item.classList.contains('active');

            // Cerrar todos
            document.querySelectorAll('.faq-item').forEach(faq => {
                faq.classList.remove('active');
            });

            // Abrir el clickeado si no lo estaba
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });
}

// ===== Form Wizard =====
function nextStep(step) {
    // Validación
    if (step === 2 && !validateStep1()) return;
    if (step === 3 && !validateStep2()) return;

    // Ocultar paso actual
    document.querySelector(`.form-step.active`).classList.remove('active');
    currentStep = step;

    // Mostrar nuevo paso
    document.getElementById(`step-${step}`).classList.add('active');

    // Scroll al formulario
    const formContainer = document.querySelector('.form-container');
    formContainer.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

function validateStep1() {
    const form = document.getElementById('step-1');
    const inputs = form.querySelectorAll('input[required], select[required]');
    let valid = true;

    inputs.forEach(input => {
        if (!input.value.trim()) {
            valid = false;
            showError(input, 'Este campo es requerido');
        } else {
            removeError(input);
        }
    });

    // Validar email
    const email = document.getElementById('email');
    if (email.value && !isValidEmail(email.value)) {
        showError(email, 'Ingresa un email válido');
        valid = false;
    }

    return valid;
}

function validateStep2() {
    const form = document.getElementById('step-2');
    const distancia = form.querySelector('input[name="distancia"]:checked');
    const talla = document.getElementById('talla');

    if (!distancia) {
        alert('Por favor selecciona una distancia');
        return false;
    }

    if (!talla.value) {
        showError(talla, 'Selecciona una talla');
        return false;
    }

    removeError(talla);
    return true;
}

function showError(input, message) {
    input.style.borderColor = '#ff2e63';
    let error = input.parentElement.querySelector('.error-message');
    if (!error) {
        error = document.createElement('span');
        error.className = 'error-message';
        error.style.cssText = 'color: #ff2e63; font-size: 0.85rem; margin-top: 5px; display: block;';
        input.parentElement.appendChild(error);
    }
    error.textContent = message;
}

function removeError(input) {
    input.style.borderColor = '';
    const error = input.parentElement.querySelector('.error-message');
    if (error) error.remove();
}

function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// ===== Form Submission =====
registrationForm.addEventListener('submit', (e) => {
    e.preventDefault();

    if (!validateStep3()) return;

    // Recopilar datos
    const formData = new FormData(registrationForm);
    const data = {};
    formData.forEach((value, key) => { data[key] = value; });

    // Generar código de confirmación
    const confirmationCode = generateConfirmationCode();
    document.getElementById('confirmation-code').textContent = confirmationCode;

    // Mostrar resumen
    showSummary(data);

    // Enviar datos al servidor (simulado)
    console.log('Datos de inscripción:', data);
});

function validateStep3() {
    const condiciones = document.querySelector('input[name="condiciones_medicas"]:checked');
    if (!condiciones) {
        alert('Por favor responde sobre condiciones médicas');
        return false;
    }

    if (condiciones.value === 'si' && !document.getElementById('condiciones-detalle').value.trim()) {
        showError(document.getElementById('condiciones-detalle'), 'Por favor especifica');
        return false;
    }

    const emergenciaNombre = document.getElementById('emergencia-nombre');
    const emergenciaTelefono = document.getElementById('emergencia-telefono');
    const emergenciaParentesco = document.getElementById('emergencia-parentesco');
    const terminos = document.getElementById('terminos');

    if (!emergenciaNombre.value.trim()) {
        showError(emergenciaNombre, 'Requerido');
        return false;
    }

    if (!emergenciaTelefono.value.trim()) {
        showError(emergenciaTelefono, 'Requerido');
        return false;
    }

    if (!emergenciaParentesco.value.trim()) {
        showError(emergenciaParentesco, 'Requerido');
        return false;
    }

    if (!terminos.checked) {
        alert('Debes aceptar los términos y condiciones');
        return false;
    }

    return true;
}

function generateConfirmationCode() {
    return 'FNR-' + Math.random().toString(36).substr(2, 6).toUpperCase() + '-' +
           Math.random().toString(36).substr(2, 4).toUpperCase();
}

function showSummary(data) {
    // Preparar resumen
    const summaryHtml = `
        <div class="summary-item">
            <span class="summary-label">Nombre</span>
            <span class="summary-value">${data.nombre}</span>
        </div>
        <div class="summary-item">
            <span class="summary-label">Email</span>
            <span class="summary-value">${data.email}</span>
        </div>
        <div class="summary-item">
            <span class="summary-label">Teléfono</span>
            <span class="summary-value">${data.telefono}</span>
        </div>
        <div class="summary-item">
            <span class="summary-label">Distancia</span>
            <span class="summary-value">${data.distancia.toUpperCase()} - ${getDistanciaPrecio(data.distancia)} USD</span>
        </div>
        <div class="summary-item">
            <span class="summary-label">Talla</span>
            <span class="summary-value">${data.talla.toUpperCase()}</span>
        </div>
        <div class="summary-item">
            <span class="summary-label">Tipo</span>
            <span class="summary-value">${data.tipo_corredor.charAt(0).toUpperCase() + data.tipo_corredor.slice(1)}</span>
        </div>
        <div class="summary-item">
            <span class="summary-label">Contacto Emergencia</span>
            <span class="summary-value">${data.emergencia_nombre} (${data.emergencia_parentesco}) - ${data.emergencia_telefono}</span>
        </div>
        <div class="summary-item">
            <span class="summary-label">Total</span>
            <span class="summary-value" style="color: var(--accent); font-size: 1.2rem;">${getDistanciaPrecio(data.distancia)} USD</span>
        </div>
    `;

    document.querySelector('.summary-content').innerHTML = summaryHtml;

    // Ocultar formulario, mostrar resumen
    document.getElementById('step-3').style.display = 'none';
    document.querySelector('.form-step').style.display = 'none';
    formSummary.style.display = 'block';

    // Scroll al resumen
    formSummary.scrollIntoView({ behavior: 'smooth' });
}

function getDistanciaPrecio(distancia) {
    const precios = {
        '5k': 25,
        '10k': 35,
        '21k': 45
    };
    return precios[distancia] || 0;
}

function showSuccess(confirmationCode) {
    formSummary.style.display = 'none';
    formSuccess.style.display = 'block';
}

function resetForm() {
    registrationForm.reset();
    currentStep = 1;
    document.querySelectorAll('.form-step').forEach(step => {
        step.classList.remove('active');
    });
    document.getElementById('step-1').classList.add('active');
    formSummary.style.display = 'none';
    formSuccess.style.display = 'none';
    scrollToSection('inscripcion');
}

// Seleccionar distancia automáticamente
function selectDistance(distancia) {
    selectedDistance = distancia;
    const radio = document.querySelector(`input[name="distancia"][value="${distancia}"]`);
    if (radio) radio.checked = true;
    scrollToSection('inscripcion');
    nextStep(2);
}

// ===== Selector de talla =====
document.getElementById('talla')?.addEventListener('change', function() {
    if (this.value) {
        this.style.borderColor = '';
        removeError(this);
    }
});

// ===== Condiciones médicas toggle =====
const condicionesRadios = document.querySelectorAll('input[name="condiciones_medicas"]');
condicionesRadios.forEach(radio => {
    radio.addEventListener('change', (e) => {
        const descField = document.getElementById('condiciones-desc');
        descField.style.display = e.target.value === 'si' ? 'block' : 'none';
        if (e.target.value === 'no') {
            document.getElementById('condiciones-detalle').value = '';
        }
    });
});

// ===== Contact Form =====
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const formData = new FormData(contactForm);
    const data = {};
    formData.forEach((value, key) => { data[key] = value; });

    console.log('Mensaje de contacto:', data);

    alert('¡Gracias por tu mensaje! Te responderemos pronto.');
    contactForm.reset();
});

// ===== Newsletter =====
function subscribeNewsletter(e) {
    e.preventDefault();
    const email = e.target.querySelector('input').value;

    console.log('Newsletter suscripción:', email);

    alert('¡Gracias por suscribirte! Recibirás noticias de FlashNightRun 2.0.');
    e.target.reset();
}

// ===== Modal =====
function showModal(content) {
    document.querySelector('.modal-body').innerHTML = content;
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
}

document.querySelector('.modal-overlay').addEventListener('click', closeModal);

// ===== Smooth scroll para botones =====
document.querySelectorAll('.btn-categoria').forEach(btn => {
    btn.addEventListener('click', () => {
        setTimeout(() => {
            scrollToSection('inscripcion');
        }, 100);
    });
});

// ===== Prevenir envío doble =====
let submitting = false;
document.querySelector('button[type="submit"]').addEventListener('click', function(e) {
    if (submitting) {
        e.preventDefault();
        return false;
    }
    submitting = true;
    this.disabled = true;
    this.innerHTML = 'Procesando...';
});

// ===== Keyboard navigation =====
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
        closeModal();
    }
});

// ===== Focus management en formulario =====
document.querySelectorAll('.form-step input, .form-step select, .form-step textarea').forEach((input, index) => {
    input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && e.target.tagName !== 'TEXTAREA') {
            e.preventDefault();
            const nextInput = Array.from(input.parentElement.querySelectorAll('input, select, textarea')).find(i => i !== input && !i.disabled);
            if (nextInput) {
                nextInput.focus();
            }
        }
    });
});

// ===== Tooltips y ayudas =====
document.querySelectorAll('input[type="tel"]').forEach(input => {
    input.addEventListener('input', (e) => {
        // Formatear teléfono
        let value = e.target.value.replace(/\D/g, '');
        if (value.length > 0) {
            if (value.length <= 3) {
                value = `+${value}`;
            } else if (value.length <= 6) {
                value = `+${value.slice(0, 1)} ${value.slice(1, 4)} ${value.slice(4)}`;
            } else {
                value = `+${value.slice(0, 1)} ${value.slice(1, 4)} ${value.slice(4, 7)} ${value.slice(7, 11)}`;
            }
        }
        e.target.value = value;
    });
});

// ===== Efectos parallax en hero (opcional) =====
window.addEventListener('scroll', () => {
    const hero = document.querySelector('.hero');
    const scrolled = window.scrollY;
    if (scrolled < hero.offsetHeight) {
        hero.style.backgroundPositionY = scrolled * 0.5 + 'px';
    }
});

// ===== Easter egg =====
let konamiCode = [];
const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.key);
    konamiCode = konamiCode.slice(-10);

    if (konamiCode.join(',') === konamiSequence.join(',')) {
        document.body.style.animation = 'rainbow 3s infinite';
        showModal('<h3>🎮 ¡Easter Egg Encontrado!</h3><p>Has activado el modo arcade. ¡Disfruta de la carrera!</p><p><small>Tip: Comparte este código secreto con tus amigos para un premio especial.</small></p>');
        konamiCode = [];
    }
});

// Agregar CSS dinámicamente
const style = document.createElement('style');
style.textContent = `
    @keyframes rainbow {
        0% { filter: hue-rotate(0deg); }
        100% { filter: hue-rotate(360deg); }
    }
`;
document.head.appendChild(style);

console.log('FlashNightRun 2.0 - Landing page cargada correctamente 🏃‍♂️✨');
