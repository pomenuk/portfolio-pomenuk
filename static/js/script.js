document.addEventListener('DOMContentLoaded', function() {
    // ===== Sistema de cambio de fondo cada minuto =====
    const backgroundElement = document.getElementById('dynamicBg');
    
    if (backgroundElement) {
        const darkColorPalettes = [
            // Paleta 1: Azules oscuros
            'linear-gradient(45deg, #1a1a2e 0%, #16213e 25%, #0f3460 50%, #533a71 75%, #1a1a2e 100%)',
            // Paleta 2: Grises oscuros
            'linear-gradient(45deg, #2d3748 0%, #1a202c 25%, #2d3748 50%, #4a5568 75%, #2d3748 100%)',
            // Paleta 3: Púrpuras oscuros
            'linear-gradient(45deg, #1a202c 0%, #2d3748 25%, #4a5568 50%, #6b46c1 75%, #553c9a 100%)',
            // Paleta 4: Verdes oscuros
            'linear-gradient(45deg, #064e3b 0%, #065f46 25%, #047857 50%, #059669 75%, #064e3b 100%)',
            // Paleta 5: Azul marino profundo
            'linear-gradient(45deg, #0c4a6e 0%, #075985 25%, #0369a1 50%, #0284c7 75%, #0c4a6e 100%)',
            // Paleta 6: Negro carbón
            'linear-gradient(45deg, #0f172a 0%, #1e293b 25%, #334155 50%, #475569 75%, #0f172a 100%)',
            // Paleta 7: Azul-verde oscuro
            'linear-gradient(45deg, #134e4a 0%, #115e59 25%, #0f766e 50%, #0d9488 75%, #134e4a 100%)',
            // Paleta 8: Índigo profundo
            'linear-gradient(45deg, #1e1b4b 0%, #312e81 25%, #3730a3 50%, #4338ca 75%, #1e1b4b 100%)',
            // Paleta 9: Verde esmeralda
            'linear-gradient(45deg, #022c22 0%, #064e3b 25%, #065f46 50%, #047857 75%, #022c22 100%)',
            // Paleta 10: Violeta oscuro
            'linear-gradient(45deg, #581c87 0%, #6b21a8 25%, #7c2d92 50%, #8b5cf6 75%, #581c87 100%)'
        ];
        
        let currentPaletteIndex = 0;
        
        function changeBackground() {
            backgroundElement.style.background = darkColorPalettes[currentPaletteIndex];
            currentPaletteIndex = (currentPaletteIndex + 1) % darkColorPalettes.length;
        }
        
        // Establecer el fondo inicial y cambiar fondo cada minuto
        changeBackground();
        setInterval(changeBackground, 60000); // 60000ms = 1 minuto
    }
    
    // ===== Efecto máquina de escribir =====
    const typewriterElement = document.getElementById('typewriter');
    
    if (typewriterElement) {
        const texts = [
            'Implemento arquitecturas de seguridad avanzada que protegen datos críticos sin comprometer la experiencia del usuario.',

            'Diseño flujos de trabajo automatizados que reducen tiempos operativos y maximizan la productividad empresarial.',

            'Convierto requisitos complejos en soluciones técnicas escalables adaptadas a las necesidades específicas de cada cliente.',

            'Optimizo la interacción entre sistemas para crear ecosistemas digitales que comunican información de manera eficiente.',

            'Desarrollo interfaces minimalistas pero potentes que equilibran perfectamente funcionalidad y simplicidad visual.',

            'Creo estructuras de datos inteligentes que transforman la información en conocimiento accionable para las organizaciones.',

            'Integro tecnologías emergentes en sistemas existentes para potenciar capacidades sin interrumpir operaciones.',

            'Construyo puentes entre departamentos técnicos y no técnicos mediante soluciones que todos pueden entender y utilizar.',

            'Transformo visiones abstractas en arquitecturas tangibles que resuelven desafíos empresariales reales.',

            'Diseño experiencias digitales centradas en el usuario que generan engagement y convierten visitantes en clientes.'
        ];
        
        const fontClasses = [
            'font-1', 'font-2', 'font-3', 'font-4', 'font-5', 'font-6', 'font-7', 'font-8', 'font-9', 'font-10',
            'font-11', 'font-12', 'font-13', 'font-14', 'font-15', 'font-16', 'font-17', 'font-18', 'font-19', 'font-20',
            'font-21', 'font-22', 'font-23', 'font-24', 'font-25', 'font-26', 'font-27', 'font-28', 'font-29', 'font-30'
        ];
        
        let textIndex = 0;
        let fontIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let isPaused = false;
        
        function typeWriter() {
            const currentText = texts[textIndex];
            const currentFont = fontClasses[fontIndex];
            
            // Cambiar fuente
            typewriterElement.className = `typewriter-text ${currentFont}`;
            
            if (isPaused) {
                setTimeout(typeWriter, 2000);
                isPaused = false;
                return;
            }
            
            if (isDeleting) {
                typewriterElement.textContent = currentText.substring(0, charIndex - 1);
                charIndex--;
            } else {
                typewriterElement.textContent = currentText.substring(0, charIndex + 1);
                charIndex++;
            }
            
            let typeSpeed = isDeleting ? 30 : 50;
            
            if (!isDeleting && charIndex === currentText.length) {
                isPaused = true;
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                textIndex = (textIndex + 1) % texts.length;
                fontIndex = (fontIndex + 1) % fontClasses.length;
                typeSpeed = 500;
            }
            
            setTimeout(typeWriter, typeSpeed);
        }
        
        // Iniciar el efecto después de un pequeño delay
        setTimeout(typeWriter, 1000);
    }
    
    // ===== Navegación móvil =====
    const burger = document.querySelector('.burger');
    const navLinks = document.querySelector('.nav-links');
    const links = document.querySelectorAll('.nav-links li');

    if (burger) {
        burger.addEventListener('click', () => {
            // Alternar navegación
            navLinks.classList.toggle('active');
            
            // Animar enlaces
            links.forEach((link, index) => {
                if (link.style.animation) {
                    link.style.animation = '';
                } else {
                    link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
                }
            });
            
            // Animación del burger
            burger.classList.toggle('toggle');
        });
    }

    // ===== Navbar fija con glassmorphism dinámico =====
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        const navLinks = document.querySelectorAll('.nav-links a');
        const logo = document.querySelector('.logo a');
        
        if (window.scrollY > 100) {
            // Navbar con fondo oscuro
            navbar.style.background = 'rgba(26, 26, 46, 0.95)';
            navbar.style.borderRadius = '0 0 20px 20px';
            navbar.style.backdropFilter = 'blur(20px)';
            navbar.style.padding = '15px 5%';
            navbar.style.boxShadow = '0 8px 32px 0 rgba(31, 38, 135, 0.37)';
            
            // Enlaces con colores claros
            navLinks.forEach(link => {
                link.style.color = 'rgba(255, 255, 255, 0.9)';
            });
            
            // Logo con color claro
            if (logo) {
                logo.style.color = 'rgba(255, 255, 255, 0.9)';
            }
            
        } else {
            // Navbar con fondo claro (original)
            navbar.style.background = 'rgba(255, 255, 255, 0.1)';
            navbar.style.borderRadius = '0';
            navbar.style.padding = '20px 5%';
            navbar.style.boxShadow = '0 8px 32px 0 rgba(31, 38, 135, 0.37)';
            
            // Enlaces con colores originales
            navLinks.forEach(link => {
                link.style.color = 'rgba(255, 255, 255, 0.8)';
            });
            
            // Logo con color original
            if (logo) {
                logo.style.color = 'rgba(255, 255, 255, 0.9)';
            }
        }
    });

    // ===== Cursor personalizado =====
    const cursor = document.querySelector('.cursor');
    const cursorFollower = document.querySelector('.cursor-follower');

    if (cursor && cursorFollower) {
        document.addEventListener('mousemove', (e) => {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
            
            setTimeout(() => {
                cursorFollower.style.left = e.clientX + 'px';
                cursorFollower.style.top = e.clientY + 'px';
            }, 100);
        });
    }

    // ===== Desplazamiento suave para enlaces de anclaje =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70,
                    behavior: 'smooth'
                });
                
                // Actualizar enlace activo
                document.querySelectorAll('.nav-links a').forEach(link => {
                    link.classList.remove('active');
                });
                this.classList.add('active');
            }
        });
    });

    // ===== Manejador de envío de formulario =====
    const contactForm = document.querySelector('.contact-form');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            
            // Aquí normalmente enviarías los datos del formulario a un servidor
            console.log('Formulario enviado:', { name, email, message });
            
            // Mostrar mensaje de éxito (en una aplicación real, haz esto después del envío exitoso)
            alert('¡Gracias! Tu mensaje ha sido enviado.');
            contactForm.reset();
        });
    }

    // ===== Actualizar navegación activa en scroll =====
    window.addEventListener('scroll', () => {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-links a');
        
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            if (window.scrollY >= sectionTop) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === current) {
                link.classList.add('active');
            }
        });
    });

    // ===== Animaciones cuando los elementos entran en la vista =====
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observar elementos para animaciones
    document.querySelectorAll('.project-card, .stat, .skill-tag').forEach(el => {
        observer.observe(el);
    });

    // ===== Agregar estilos CSS para animaciones =====
    const style = document.createElement('style');
    style.textContent = `
        @keyframes navLinkFade {
            from {
                opacity: 0;
                transform: translateX(50px);
            }
            to {
                opacity: 1;
                transform: translateX(0px);
            }
        }

        .burger.toggle .line1 {
            transform: rotate(-45deg) translate(-5px, 6px);
        }

        .burger.toggle .line2 {
            opacity: 0;
        }

        .burger.toggle .line3 {
            transform: rotate(45deg) translate(-5px, -6px);
        }

        .animate {
            animation: slideInUp 0.6s ease-out;
        }

        @keyframes slideInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
    `;

    document.head.appendChild(style);
});