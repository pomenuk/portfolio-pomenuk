// ====================================
// PORTFOLIO JAVASCRIPT - VERSIÓN COMPLETA ACTUALIZADA
// ====================================

class PortfolioApp {
    constructor() {
        this.initWaterDropLoader();
        this.init();
        this.setupEventListeners();
        this.startAnimations();
    }

    // ====================================
    // ANIMACIÓN DE ENTRADA TIPO GOTA DE AGUA
    // ====================================
    initWaterDropLoader() {
        // Crear el loader con animación de gota de agua
        const loader = document.createElement('div');
        loader.className = 'water-drop-loader';
        loader.innerHTML = `
            <div class="water-drop"></div>
        `;
        
        // Agregar estilos dinámicos para el loader
        const loaderStyles = document.createElement('style');
        loaderStyles.textContent = `
            .water-drop-loader {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: linear-gradient(135deg, #4c63d2 0%, #6366f1 25%, #8b5cf6 50%, #a855f7 75%, #c084fc 100%);
                z-index: 10000;
                display: flex;
                justify-content: center;
                align-items: center;
                overflow: hidden;
            }

            .water-drop {
                width: 60px;
                height: 60px;
                background: rgba(255, 255, 255, 0.9);
                border-radius: 50%;
                position: relative;
                animation: waterDrop 3s ease-out forwards;
            }

            .water-drop::before {
                content: '';
                position: absolute;
                top: -20px;
                left: 50%;
                transform: translateX(-50%);
                width: 20px;
                height: 30px;
                background: rgba(255, 255, 255, 0.9);
                border-radius: 50% 50% 50% 50% / 60% 60% 40% 40%;
                animation: dropForm 1.5s ease-out;
            }

            @keyframes waterDrop {
                0% {
                    transform: scale(0);
                    border-radius: 50%;
                }
                50% {
                    transform: scale(0.5);
                    border-radius: 50%;
                }
                80% {
                    transform: scale(20);
                    border-radius: 20%;
                    opacity: 0.8;
                }
                100% {
                    transform: scale(100);
                    border-radius: 0%;
                    opacity: 0;
                }
            }

            @keyframes dropForm {
                0% {
                    opacity: 1;
                    transform: translateX(-50%) translateY(0);
                }
                50% {
                    opacity: 1;
                    transform: translateX(-50%) translateY(10px);
                }
                100% {
                    opacity: 0;
                    transform: translateX(-50%) translateY(20px);
                }
            }

            .page-content {
                opacity: 0;
                animation: pageReveal 1s ease-out 2.8s forwards;
            }

            @keyframes pageReveal {
                0% {
                    opacity: 0;
                    transform: scale(1.1);
                }
                100% {
                    opacity: 1;
                    transform: scale(1);
                }
            }
        `;
        
        document.head.appendChild(loaderStyles);
        document.body.appendChild(loader);
        
        // Agregar clase al contenido principal
        document.body.classList.add('page-content');
        
        // Remover loader después de la animación
        setTimeout(() => {
            loader.style.opacity = '0';
            setTimeout(() => {
                if (loader.parentNode) {
                    loader.parentNode.removeChild(loader);
                }
                document.head.removeChild(loaderStyles);
            }, 500);
        }, 3000);
    }

    // ====================================
    // INICIALIZACIÓN
    // ====================================
    init() {
        this.isScrolling = false;
        this.currentTypewriterIndex = 0;
        this.typewriterTexts = [
            "Desarrollador Full-Stack especializado en crear experiencias digitales excepcionales.",
            "Transformo ideas complejas en soluciones simples y elegantes.",
            "Apasionado por la innovación tecnológica y el diseño centrado en el usuario.",
            "Creando el futuro digital, una línea de código a la vez.",
            "Especialista en sistemas de seguridad y automatización empresarial.",
            "Diseñando interfaces que conectan personas con tecnología."
        ];
        
        this.setupScrollProgress();
        this.setupIntersectionObserver();
        this.setupPerformanceOptimizations();
        
        // Crear versión fija del nombre después de la carga
        setTimeout(() => {
            this.createFixedNameVersion();
        }, 100);
    }

    // ====================================
    // CREAR VERSIÓN FIJA DEL NOMBRE
    // ====================================
    createFixedNameVersion() {
        const nameContainer = document.getElementById('nameContainer');
        if (!nameContainer) return;

        // Si ya existe contenido, no hacer nada
        if (nameContainer.innerHTML.trim() !== '') return;
        
        // Crear versión fija
        const fixedVersion = document.createElement('div');
        fixedVersion.className = 'name-fixed-version';
        fixedVersion.innerHTML = `
            <div class="name-wrapper">
                <div class="first-name-fixed">Omeñuk</div>
                <div class="last-name-fixed">Pablo</div>
                <div class="tech-tag">FULL-STACK DEV</div>
            </div>
        `;
        
        nameContainer.appendChild(fixedVersion);
    }

    // ====================================
    // EVENT LISTENERS
    // ====================================
    setupEventListeners() {
        // Scroll optimizado con throttling
        window.addEventListener('scroll', this.throttle(this.handleScroll.bind(this), 16));
        
        // Resize optimizado con debouncing
        window.addEventListener('resize', this.debounce(this.handleResize.bind(this), 250));
        
        // Navegación suave
        this.setupSmoothNavigation();
        
        // Menú móvil
        this.setupMobileMenu();
        
        // Formulario de contacto
        this.setupContactForm();
        
        // Teclado para accesibilidad
        document.addEventListener('keydown', this.handleKeyboard.bind(this));
        
        // Visibilidad de página
        document.addEventListener('visibilitychange', this.handleVisibilityChange.bind(this));
    }

    // ====================================
    // SCROLL Y NAVEGACIÓN
    // ====================================
    handleScroll() {
        if (this.isScrolling) return;
        this.isScrolling = true;
        
        requestAnimationFrame(() => {
            this.updateScrollProgress();
            this.updateNavbarOnScroll();
            this.updateActiveNavLink();
            this.isScrolling = false;
        });
    }

    updateScrollProgress() {
        const scrollTop = window.pageYOffset;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        
        let progressBar = document.querySelector('.scroll-progress');
        if (!progressBar) {
            progressBar = document.createElement('div');
            progressBar.className = 'scroll-progress';
            progressBar.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 0%;
                height: 3px;
                background: linear-gradient(90deg, #6366f1, #8b5cf6);
                z-index: 9999;
                transition: width 0.3s ease;
            `;
            document.body.appendChild(progressBar);
        }
        
        progressBar.style.width = `${Math.min(scrollPercent, 100)}%`;
    }

    updateNavbarOnScroll() {
        const navbar = document.querySelector('.navbar');
        const scrollY = window.scrollY;
        
        if (scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }

    updateActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-links a');
        
        let currentSection = '';
        const scrollPosition = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    }

    setupSmoothNavigation() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                
                if (target) {
                    const headerHeight = document.querySelector('.navbar').offsetHeight;
                    const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                    
                    this.smoothScrollTo(targetPosition, 1000);
                }
            });
        });
    }

    smoothScrollTo(targetPosition, duration) {
        const startPosition = window.pageYOffset;
        const distance = targetPosition - startPosition;
        let startTime = null;

        const animation = (currentTime) => {
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const run = this.easeInOutQuad(timeElapsed, startPosition, distance, duration);
            
            window.scrollTo(0, run);
            
            if (timeElapsed < duration) {
                requestAnimationFrame(animation);
            }
        };

        requestAnimationFrame(animation);
    }

    easeInOutQuad(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t + b;
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
    }

    // ====================================
    // MENÚ MÓVIL
    // ====================================
    setupMobileMenu() {
        const burger = document.querySelector('.burger');
        const navLinks = document.querySelector('.nav-links');

        if (!burger || !navLinks) return;

        burger.addEventListener('click', () => {
            this.toggleMobileMenu();
        });

        // Cerrar menú al hacer click en un enlace
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                if (window.innerWidth <= 768) {
                    this.closeMobileMenu();
                }
            });
        });

        // Cerrar menú al hacer click fuera
        document.addEventListener('click', (e) => {
            if (window.innerWidth <= 768 && 
                !burger.contains(e.target) && 
                !navLinks.contains(e.target)) {
                this.closeMobileMenu();
            }
        });
    }

    toggleMobileMenu() {
        const burger = document.querySelector('.burger');
        const navLinks = document.querySelector('.nav-links');
        
        burger.classList.toggle('active');
        navLinks.classList.toggle('active');
        
        if (navLinks.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    }

    closeMobileMenu() {
        const burger = document.querySelector('.burger');
        const navLinks = document.querySelector('.nav-links');
        
        if (burger && navLinks) {
            burger.classList.remove('active');
            navLinks.classList.remove('active');
            document.body.style.overflow = '';
        }
    }

    // ====================================
    // EFECTOS VISUALES
    // ====================================
    startAnimations() {
        this.startTypewriterEffect();
        this.initializeScrollAnimations();
    }

    startTypewriterEffect() {
        const typewriterElement = document.getElementById('typewriter');
        if (!typewriterElement) return;

        const typeText = (text, callback) => {
            let i = 0;
            typewriterElement.textContent = '';
            
            const typing = () => {
                if (i < text.length) {
                    typewriterElement.textContent += text.charAt(i);
                    i++;
                    setTimeout(typing, 50 + Math.random() * 50);
                } else {
                    setTimeout(() => {
                        this.eraseText(callback);
                    }, 3000);
                }
            };
            
            typing();
        };

        const nextText = () => {
            if (this.currentTypewriterIndex >= this.typewriterTexts.length) {
                this.currentTypewriterIndex = 0;
            }
            
            const currentText = this.typewriterTexts[this.currentTypewriterIndex];
            this.currentTypewriterIndex++;
            
            typeText(currentText, nextText);
        };

        // Iniciar después de la animación de carga
        setTimeout(nextText, 3500);
    }

    eraseText(callback) {
        const typewriterElement = document.getElementById('typewriter');
        const text = typewriterElement.textContent;
        let i = text.length;

        const erasing = () => {
            if (i > 0) {
                typewriterElement.textContent = text.substring(0, i - 1);
                i--;
                setTimeout(erasing, 30);
            } else {
                setTimeout(callback, 500);
            }
        };

        erasing();
    }

    // ====================================
    // INTERSECTION OBSERVER PARA ANIMACIONES
    // ====================================
    setupIntersectionObserver() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                    
                    const children = entry.target.querySelectorAll('.animate-child');
                    children.forEach((child, index) => {
                        setTimeout(() => {
                            child.classList.add('animate-in');
                        }, index * 100);
                    });
                }
            });
        }, observerOptions);

        // Observar elementos después de la carga
        setTimeout(() => {
            const animateElements = document.querySelectorAll('.animate-element');
            animateElements.forEach(el => {
                this.observer.observe(el);
            });
        }, 3000);
    }

    initializeScrollAnimations() {
        const style = document.createElement('style');
        style.textContent = `
            .animate-element {
                opacity: 0;
                transform: translateY(30px);
                transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
            }
            
            .animate-element.animate-in {
                opacity: 1;
                transform: translateY(0);
            }
            
            .animate-child {
                opacity: 0;
                transform: translateY(20px);
                transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
            }
            
            .animate-child.animate-in {
                opacity: 1;
                transform: translateY(0);
            }
        `;
        document.head.appendChild(style);
    }

    // ====================================
    // FORMULARIO DE CONTACTO
    // ====================================
    setupContactForm() {
        const contactForm = document.querySelector('.contact-form');
        if (!contactForm) return;

        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleFormSubmission(contactForm);
        });

        const inputs = contactForm.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', () => this.validateField(input));
            input.addEventListener('input', () => this.clearFieldError(input));
        });
    }

    async handleFormSubmission(form) {
        const submitButton = form.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        
        submitButton.textContent = 'Enviando...';
        submitButton.disabled = true;
        submitButton.classList.add('loading');

        try {
            await this.simulateFormSubmission(new FormData(form));
            this.showFormSuccess();
            form.reset();
        } catch (error) {
            this.showFormError('Hubo un error al enviar el mensaje. Por favor, inténtalo de nuevo.');
            console.error('Error en formulario:', error);
        } finally {
            submitButton.textContent = originalText;
            submitButton.disabled = false;
            submitButton.classList.remove('loading');
        }
    }

    simulateFormSubmission(formData) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                Math.random() > 0.1 ? resolve() : reject(new Error('Simulated error'));
            }, 2000);
        });
    }

    validateField(field) {
        const value = field.value.trim();
        let isValid = true;
        let message = '';

        switch (field.type) {
            case 'email':
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                isValid = emailRegex.test(value);
                message = isValid ? '' : 'Por favor, ingresa un email válido';
                break;
            
            case 'text':
                isValid = value.length >= 2;
                message = isValid ? '' : 'Este campo debe tener al menos 2 caracteres';
                break;
            
            default:
                if (field.tagName === 'TEXTAREA') {
                    isValid = value.length >= 10;
                    message = isValid ? '' : 'El mensaje debe tener al menos 10 caracteres';
                }
        }

        this.showFieldValidation(field, isValid, message);
        return isValid;
    }

    showFieldValidation(field, isValid, message) {
        const existingError = field.parentNode.querySelector('.field-error');
        
        if (existingError) {
            existingError.remove();
        }

        if (!isValid && message) {
            const errorElement = document.createElement('span');
            errorElement.className = 'field-error';
            errorElement.textContent = message;
            errorElement.style.cssText = 'color: #ef4444; font-size: 0.875rem; margin-top: 0.25rem; display: block;';
            field.parentNode.appendChild(errorElement);
            field.style.borderColor = '#ef4444';
        } else {
            field.style.borderColor = isValid ? '#10b981' : '';
        }
    }

    clearFieldError(field) {
        const existingError = field.parentNode.querySelector('.field-error');
        if (existingError) {
            existingError.remove();
        }
        field.style.borderColor = '';
    }

    showFormSuccess() {
        this.showNotification('¡Mensaje enviado con éxito! Te contactaré pronto.', 'success');
    }

    showFormError(message) {
        this.showNotification(message, 'error');
    }

    showNotification(message, type = 'info') {
        const existing = document.querySelector('.notification');
        if (existing) existing.remove();

        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <span>${message}</span>
                <button class="notification-close">&times;</button>
            </div>
        `;

        const colors = {
            success: '#10b981',
            error: '#ef4444',
            info: '#3b82f6'
        };

        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${colors[type]};
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 0.5rem;
            box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
            z-index: 10000;
            transform: translateX(100%);
            transition: transform 0.3s ease;
            max-width: 300px;
            font-family: 'Inter', sans-serif;
        `;

        document.body.appendChild(notification);

        requestAnimationFrame(() => {
            notification.style.transform = 'translateX(0)';
        });

        const closeBtn = notification.querySelector('.notification-close');
        closeBtn.addEventListener('click', () => this.hideNotification(notification));

        setTimeout(() => this.hideNotification(notification), 5000);
    }

    hideNotification(notification) {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }

    // ====================================
    // UTILIDADES Y OPTIMIZACIONES
    // ====================================
    handleResize() {
        if (window.innerWidth > 768) {
            this.closeMobileMenu();
        }
    }

    handleKeyboard(e) {
        if (e.key === 'Escape') {
            this.closeMobileMenu();
        }

        if (e.ctrlKey || e.metaKey) {
            switch (e.key) {
                case '1':
                    e.preventDefault();
                    document.querySelector('#home')?.scrollIntoView();
                    break;
                case '2':
                    e.preventDefault();
                    document.querySelector('#about')?.scrollIntoView();
                    break;
                case '3':
                    e.preventDefault();
                    document.querySelector('#projects')?.scrollIntoView();
                    break;
                case '4':
                    e.preventDefault();
                    document.querySelector('#contact')?.scrollIntoView();
                    break;
            }
        }
    }

    handleVisibilityChange() {
        // Pausar/reanudar animaciones según visibilidad
        if (document.visibilityState === 'hidden') {
            // Pausar animaciones costosas
        } else {
            // Reanudar animaciones
        }
    }

    setupPerformanceOptimizations() {
        // Lazy loading para imágenes
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        if (img.dataset.src) {
                            img.src = img.dataset.src;
                            img.classList.remove('lazy');
                            imageObserver.unobserve(img);
                        }
                    }
                });
            });

            document.querySelectorAll('img[data-src]').forEach(img => {
                imageObserver.observe(img);
            });
        }

        // Preload de recursos críticos
        const criticalResources = [
            'static/css/style.css',
            'static/js/script.js'
        ];

        criticalResources.forEach(resource => {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.href = resource;
            link.as = resource.endsWith('.css') ? 'style' : 'script';
            document.head.appendChild(link);
        });
    }

    setupScrollProgress() {
        // El progreso de scroll se crea dinámicamente en updateScrollProgress
    }

    // Utilidades para throttle y debounce
    throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }

    debounce(func, wait, immediate) {
        let timeout;
        return function() {
            const context = this;
            const args = arguments;
            const later = function() {
                timeout = null;
                if (!immediate) func.apply(context, args);
            };
            const callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func.apply(context, args);
        };
    }
}

// ====================================
// INICIALIZACIÓN DE LA APLICACIÓN
// ====================================
document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 Portfolio de Omeñuk Pablo - Inicializando...');
    
    // Verificar soporte de características modernas
    const supportsModernFeatures = {
        intersectionObserver: 'IntersectionObserver' in window,
        backdropFilter: CSS.supports('backdrop-filter', 'blur(10px)'),
        customProperties: CSS.supports('color', 'var(--test)')
    };
    
    console.log('Características soportadas:', supportsModernFeatures);
    
    // Inicializar aplicación principal
    const portfolioApp = new PortfolioApp();
    
    // Manejo de errores globales
    window.addEventListener('error', (e) => {
        console.error('Error en Portfolio App:', e.error);
    });
    
    // Log de bienvenida
    console.log(`
    🌟 Portfolio de Omeñuk Pablo
    📅 Inicializado: ${new Date().toLocaleString()}
    💻 Versión: 2.1.0
    🎨 Diseño: Minimalista y Profesional
    ⚡ Optimizado para rendimiento
    🚀 ¡Gracias por visitar mi portfolio!
    `);
});

// Exportar para uso en módulos si es necesario
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { PortfolioApp };
}