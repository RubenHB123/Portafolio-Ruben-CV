document.addEventListener('DOMContentLoaded', () => {

    const projectCards = document.querySelectorAll('.project-card');

    projectCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const xRotation = ((y / rect.height) - 0.5) * -15;
            const yRotation = ((x / rect.width) - 0.5) * 15;

            card.style.transform = `perspective(1000px) rotateX(${xRotation}deg) rotateY(${yRotation}deg) scale(1.03)`;
            card.style.boxShadow = `${(x - rect.width / 2) / 10}px ${(y - rect.height / 2) / 10}px 30px rgba(0, 0, 0, 0.4)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
            card.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.2)';
        });
    });

    
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
            if (currentScroll + viewportHeight > sectionTop + 50) {
                body.className = item.colorClass;
                foundColor = true;
            }
        });
        
        if (!foundColor) {
            body.className = ''; 
        }
    });

    
    const sectionsToAnimate = document.querySelectorAll('section');

    const observerOptions = {
        root: null, 
        rootMargin: '0px',
        threshold: 0.2
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


    const techIcons = document.querySelectorAll('.icon-box');

    techIcons.forEach(icon => {
        icon.addEventListener('mouseenter', () => {
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


