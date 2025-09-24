document.addEventListener('DOMContentLoaded', () => {

    /* --- EFECTO DE CARTA 3D EN PROYECTOS --- */
    // Este efecto hace que las tarjetas de proyectos se "levanten" y sigan el movimiento del cursor.

    const projectCards = document.querySelectorAll('.project-card');

    projectCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const xRotation = ((y / rect.height) - 0.5) * -15; // Rota -15 a 15 grados en Y
            const yRotation = ((x / rect.width) - 0.5) * 15;   // Rota -15 a 15 grados en X

            card.style.transform = `perspective(1000px) rotateX(${xRotation}deg) rotateY(${yRotation}deg) scale(1.03)`;
            card.style.boxShadow = `${(x - rect.width / 2) / 10}px ${(y - rect.height / 2) / 10}px 30px rgba(0, 0, 0, 0.4)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
            card.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.2)';
        });
    });

    /* --- CAMBIO DE COLOR DE FONDO AL HACER SCROLL --- */
    // Esto cambia el color de fondo del body cuando el usuario llega a ciertas secciones.
    
    const body = document.body;
    const studiesSection = document.getElementById('estudios');
    const technologiesSection = document.getElementById('tecnologias');

    const sections = [
        { section: studiesSection, colorClass: 'bg-dark-blue' },
        { section: technologiesSection, colorClass: 'bg-dark-purple' }
    ];

    window.addEventListener('scroll', () => {
        const viewportHeight = window.innerHeight;
        const currentScroll = window.scrollY;

        let foundColor = false;

        sections.forEach(item => {
            const sectionTop = item.section.offsetTop;
            // Se cambia el color 50px antes de que la sección esté completamente visible.
            if (currentScroll + viewportHeight > sectionTop + 50) {
                body.className = item.colorClass;
                foundColor = true;
            }
        });
        
        // Vuelve al color por defecto si no estamos en ninguna de las secciones con color.
        if (!foundColor) {
            body.className = ''; // Quita la clase de color, volviendo al color por defecto del CSS.
        }
    });

    /* --- ANIMACIÓN DE APARICIÓN AL HACER SCROLL (On-Scroll Animation) --- */
    // Las secciones "aparecen" con una animación sutil cuando son visibles en la pantalla.
    
    const sectionsToAnimate = document.querySelectorAll('section');

    const observerOptions = {
        root: null, // El viewport
        rootMargin: '0px',
        threshold: 0.2 // El 20% de la sección debe estar visible
    };

    const sectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    sectionsToAnimate.forEach(section => {
        section.style.opacity = 0;
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
        sectionObserver.observe(section);
    });

    /* --- ANIMACIÓN EN LOS ICONOS DE TECNOLOGÍAS --- */
    // Añade un efecto sutil al pasar el ratón sobre los íconos de tecnología.

    const techIcons = document.querySelectorAll('.icon-box');

    techIcons.forEach(icon => {
        icon.addEventListener('mouseenter', () => {
            // Animación de rotación y sombra
            icon.style.transform = 'rotateY(10deg) scale(1.1)';
            icon.style.boxShadow = '0 0 15px #06a9fd';
            icon.style.transition = 'transform 0.3s ease, box-shadow 0.3s ease';
        });

        icon.addEventListener('mouseleave', () => {
            icon.style.transform = 'rotateY(0) scale(1)';
            icon.style.boxShadow = 'none';
        });
    });

});


