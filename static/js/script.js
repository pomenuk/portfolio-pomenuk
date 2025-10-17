// ====================================
// PORTFOLIO JAVASCRIPT - VERSIÓN MEJORADA
// ====================================

class PortfolioApp {
    constructor() {
        this.init();
        this.setupEventListeners();
        this.startAnimations();
    }

    // ====================================
    // INICIALIZACIÓN
    // ====================================
    init() {
        this.isScrolling = false;
        this.currentTypewriterIndex = 0;
        this.currentFontIndex = 1;
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
        
        // Efectos de mouse para el nombre 3D
        this.setup3DNameEffect();
        
        // Teclado para accesibilidad
        document.addEventListener('keydown', this.handleKeyboard.bind(this));
        
        // Visibilidad de página para optimizar animaciones
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
        const navLinksItems = document.querySelectorAll('.nav-links a');

        if (!burger) {
            this.createMobileMenu();
            return;
        }

        burger.addEventListener('click', () => {
            this.toggleMobileMenu();
        });

        // Cerrar menú al hacer click en un enlace
        navLinksItems.forEach(link => {
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

    createMobileMenu() {
        const navbar = document.querySelector('.navbar');
        const burger = document.createElement('div');
        burger.className = 'burger';
        burger.innerHTML = '<div></div><div></div><div></div>';
        navbar.appendChild(burger);
        this.setupMobileMenu();
    }

    toggleMobileMenu() {
        const burger = document.querySelector('.burger');
        const navLinks = document.querySelector('.nav-links');
        
        burger.classList.toggle('active');
        navLinks.classList.toggle('active');
        
        // Prevenir scroll del body cuando el menú está abierto
        if (navLinks.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    }

    closeMobileMenu() {
        const burger = document.querySelector('.burger');
        const navLinks = document.querySelector('.nav-links');
        
        burger.classList.remove('active');
        navLinks.classList.remove('active');
        document.body.style.overflow = '';
    }

    // ====================================
    // EFECTOS VISUALES
    // ====================================
    startAnimations() {
        this.startTypewriterEffect();
        this.startNameStyleToggle();
        this.createDataParticles();
        this.startDynamicBackground();
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
            
            // Cambiar fuente aleatoriamente
            this.currentFontIndex = (this.currentFontIndex % 30) + 1;
            typewriterElement.className = `typewriter-text font-${this.currentFontIndex}`;
            
            typeText(currentText, nextText);
        };

        nextText();
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

    startNameStyleToggle() {
        const toggleNameStyle = () => {
            const glitchVersion = document.querySelector('.name-glitch-version');
            const elegantVersion = document.querySelector('.name-elegant-version');
            
            if (!glitchVersion || !elegantVersion) return;

            if (glitchVersion.style.opacity === '0') {
                glitchVersion.style.opacity = '1';
                elegantVersion.style.opacity = '0';
            } else {
                glitchVersion.style.opacity = '0';
                elegantVersion.style.opacity = '1';
            }
        };

        // Cambiar cada 30 segundos
        setInterval(toggleNameStyle, 30000);
        
        // También permitir cambio manual al hacer hover
        const nameContainer = document.getElementById('nameContainer');
        if (nameContainer) {
            nameContainer.addEventListener('mouseenter', toggleNameStyle);
        }
    }

    setup3DNameEffect() {
        const nameWrapper = document.querySelector('.name-3d-wrapper');
        if (!nameWrapper) return;

        let mouseX = 0, mouseY = 0;
        let targetX = 0, targetY = 0;

        document.addEventListener('mousemove', (e) => {
            mouseX = (window.innerWidth / 2 - e.pageX) / 25;
            mouseY = (window.innerHeight / 2 - e.pageY) / 25;
        });

        const animate3D = () => {
            targetX += (mouseX - targetX) * 0.05;
            targetY += (mouseY - targetY) * 0.05;
            
            nameWrapper.style.transform = `perspective(800px) rotateY(${targetX}deg) rotateX(${-targetY}deg) translateY(-5px)`;
            requestAnimationFrame(animate3D);
        };

        animate3D();
    }

    createDataParticles() {
        const container = document.querySelector('.data-particles');
        if (!container) return;

        const containerRect = container.getBoundingClientRect();
        const particleCount = Math.min(Math.floor((containerRect.width * containerRect.height) / 10000), 50);

        for (let i = 0; i < particleCount; i++) {
            setTimeout(() => {
                this.createParticle(container, containerRect.width, containerRect.height);
            }, i * 100);
        }

        // Recrear partículas periódicamente
        setInterval(() => {
            if (document.visibilityState === 'visible') {
                container.innerHTML = '';
                const newRect = container.getBoundingClientRect();
                const newCount = Math.min(Math.floor((newRect.width * newRect.height) / 10000), 50);
                
                for (let i = 0; i < newCount; i++) {
                    setTimeout(() => {
                        this.createParticle(container, newRect.width, newRect.height);
                    }, i * 50);
                }
            }
        }, 15000);
    }

    createParticle(container, width, height) {
        const particle = document.createElement('div');
        const size = Math.random() * 3 + 1;
        const opacity = Math.random() * 0.6 + 0.2;
        const duration = Math.random() * 8 + 6;
        
        particle.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background-color: rgba(16, 185, 129, ${opacity});
            border-radius: 50%;
            top: ${Math.random() * height}px;
            left: ${Math.random() * width}px;
            box-shadow: 0 0 ${size * 2}px rgba(16, 185, 129, ${opacity * 0.8});
            animation: particleFloat ${duration}s ease-in-out infinite;
            pointer-events: none;
        `;
        
        container.appendChild(particle);

        // Remover partícula después de la animación
        setTimeout(() => {
            if (particle && particle.parentNode) {
                particle.parentNode.removeChild(particle);
            }
        }, duration * 1000);
    }

    startDynamicBackground() {
        const background = document.querySelector('.dynamic-background');
        if (!background) return;

        const colors = [
            'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
            'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
            'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
            'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
            'linear-gradient(135deg, #30cfd0 0%, #91a7ff 100%)'
        ];

        let currentColorIndex = 0;

        const changeBackground = () => {
            if (document.visibilityState === 'visible') {
                background.style.background = colors[currentColorIndex];
                currentColorIndex = (currentColorIndex + 1) % colors.length;
            }
        };

        // Cambiar fondo cada 45 segundos
        setInterval(changeBackground, 45000);
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
                    
                    // Animar elementos hijo con delay
                    const children = entry.target.querySelectorAll('.animate-child');
                    children.forEach((child, index) => {
                        setTimeout(() => {
                            child.classList.add('animate-in');
                        }, index * 100);
                    });
                }
            });
        }, observerOptions);

        // Observar elementos que deben animarse
        const animateElements = document.querySelectorAll('.project-card, .stat, .skill-tag, .contact-item');
        animateElements.forEach(el => {
            el.classList.add('animate-element');
            this.observer.observe(el);
        });
    }

    initializeScrollAnimations() {
        // CSS para las animaciones
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
            
            @keyframes particleFloat {
                0%, 100% {
                    transform: translate(0, 0) rotate(0deg);
                    opacity: 0.2;
                }
                25% {
                    transform: translate(10px, -10px) rotate(90deg);
                    opacity: 0.8;
                }
                50% {
                    transform: translate(-5px, -20px) rotate(180deg);
                    opacity: 0.5;
                }
                75% {
                    transform: translate(-15px, -10px) rotate(270deg);
                    opacity: 0.9;
                }
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

        // Validación en tiempo real
        const inputs = contactForm.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', () => this.validateField(input));
            input.addEventListener('input', () => this.clearFieldError(input));
        });
    }

    async handleFormSubmission(form) {
        const submitButton = form.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        
        // Estado de carga
        submitButton.textContent = 'Enviando...';
        submitButton.disabled = true;
        submitButton.classList.add('loading');

        try {
            // Simular envío (aquí integrarías con tu backend)
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
                // Simular éxito o error aleatorio para demo
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
        // Remover notificación existente
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

        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 0.5rem;
            box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
            z-index: 10000;
            transform: translateX(100%);
            transition: transform 0.3s ease;
            max-width: 300px;
        `;

        document.body.appendChild(notification);

        // Animar entrada
        requestAnimationFrame(() => {
            notification.style.transform = 'translateX(0)';
        });

        // Configurar cierre
        const closeBtn = notification.querySelector('.notification-close');
        closeBtn.addEventListener('click', () => this.hideNotification(notification));

        // Auto-cierre
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
        // Cerrar menú móvil en resize
        if (window.innerWidth > 768) {
            this.closeMobileMenu();
        }

        // Recalcular partículas si es necesario
        const container = document.querySelector('.data-particles');
        if (container && document.visibilityState === 'visible') {
            container.innerHTML = '';
            const rect = container.getBoundingClientRect();
            const count = Math.min(Math.floor((rect.width * rect.height) / 10000), 50);
            
            for (let i = 0; i < count; i++) {
                setTimeout(() => {
                    this.createParticle(container, rect.width, rect.height);
                }, i * 20);
            }
        }
    }

    handleKeyboard(e) {
        // Escape para cerrar menú móvil
        if (e.key === 'Escape') {
            this.closeMobileMenu();
        }

        // Navegación con teclado
        if (e.ctrlKey || e.metaKey) {
            switch (e.key) {
                case '1':
                    e.preventDefault();
                    document.querySelector('#home').scrollIntoView();
                    break;
                case '2':
                    e.preventDefault();
                    document.querySelector('#about').scrollIntoView();
                    break;
                case '3':
                    e.preventDefault();
                    document.querySelector('#projects').scrollIntoView();
                    break;
                case '4':
                    e.preventDefault();
                    document.querySelector('#contact').scrollIntoView();
                    break;
            }
        }
    }

    handleVisibilityChange() {
        // Pausar animaciones cuando la página no es visible
        const particles = document.querySelectorAll('.data-particles div');
        particles.forEach(particle => {
            if (document.visibilityState === 'hidden') {
                particle.style.animationPlayState = 'paused';
            } else {
                particle.style.animationPlayState = 'running';
            }
        });
    }

    setupPerformanceOptimizations() {
        // Preload de fuentes críticas
        const fonts = [
            'Inter:wght@300;400;500;600;700',
            'Playfair+Display:wght@400;500;700'
        ];

        fonts.forEach(font => {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.as = 'font';
            link.href = `https://fonts.googleapis.com/css2?family=${font}&display=swap`;
            link.crossOrigin = 'anonymous';
            document.head.appendChild(link);
        });

        // Lazy loading para imágenes
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src;
                        img.classList.remove('lazy');
                        imageObserver.unobserve(img);
                    }
                });
            });

            document.querySelectorAll('img[data-src]').forEach(img => {
                imageObserver.observe(img);
            });
        }
    }

    setupScrollProgress() {
        const progressBar = document.createElement('div');
        progressBar.className = 'scroll-progress';
        progressBar.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 0%;
            height: 3px;
            background: linear-gradient(90deg, #10b981, #059669);
            z-index: 9999;
            transition: width 0.3s ease;
        `;
        document.body.appendChild(progressBar);
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
// FUNCIONES ADICIONALES
// ====================================

// Crear partículas mejorado (función standalone para compatibilidad)
function createDataParticle(container, width, height) {
    const particle = document.createElement('div');
    const size = Math.random() * 4 + 2;
    const opacity = Math.random() * 0.5 + 0.3;
    const duration = Math.random() * 6 + 4;
    
    particle.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        background-color: rgba(16, 185, 129, ${opacity});
        border-radius: 50%;
        top: ${Math.random() * height}px;
        left: ${Math.random() * width}px;
        opacity: ${opacity};
        box-shadow: 0 0 ${size + 2}px rgba(16, 185, 129, 0.7);
        animation: particleFloat ${duration}s linear infinite;
        pointer-events: none;
    `;
    
    container.appendChild(particle);
    
    // Limpiar después de la animación
    setTimeout(() => {
        if (particle && particle.parentNode) {
            particle.parentNode.removeChild(particle);
        }
    }, duration * 1000);
}

// Detección de soporte para efectos avanzados
function supportsAdvancedFeatures() {
    return {
        backdropFilter: CSS.supports('backdrop-filter', 'blur(10px)'),
        customProperties: CSS.supports('color', 'var(--test)'),
        intersectionObserver: 'IntersectionObserver' in window,
        webGL: !!window.WebGLRenderingContext
    };
}

// Configuración de tema oscuro/claro (para futuras mejoras)
function setupThemeToggle() {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleThemeChange = (e) => {
        document.documentElement.setAttribute('data-theme', e.matches ? 'dark' : 'light');
    };
    
    prefersDark.addEventListener('change', handleThemeChange);
    handleThemeChange(prefersDark);
}

// ====================================
// INICIALIZACIÓN DE LA APLICACIÓN
// ====================================

// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', () => {
    // Verificar soporte de características
    const features = supportsAdvancedFeatures();
    console.log('Características soportadas:', features);
    
    // Inicializar aplicación principal
    const portfolioApp = new PortfolioApp();
    
    // Configurar tema
    setupThemeToggle();
    
    // Manejar errores globales
    window.addEventListener('error', (e) => {
        console.error('Error en Portfolio App:', e.error);
    });
    
    // Mensaje de bienvenida en consola
    console.log(`
    🚀 Portfolio de Omeñuk Pablo
    📅 Inicializado: ${new Date().toLocaleString()}
    💻 Versión: 2.0.0
    🌟 ¡Gracias por visitar mi portfolio!
    `);
});

// Exportar para uso en módulos si es necesario
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { PortfolioApp, createDataParticle, supportsAdvancedFeatures };
}