document.addEventListener("DOMContentLoaded", () => {
    // Gestione navigazione
    const navLinks = document.querySelectorAll("nav ul li a");
    const sections = document.querySelectorAll("section");

    navLinks.forEach(link => {
        link.addEventListener("click", (e) => {
            e.preventDefault();
            const sectionId = e.target.getAttribute("data-section");

            sections.forEach(section => {
                section.classList.remove("active");
                section.classList.add("hidden");
            });

            const targetSection = document.getElementById(sectionId);
            targetSection.classList.add("active");
            targetSection.classList.remove("hidden");
        });
    });

    document.addEventListener("DOMContentLoaded", () => {
        // Altri gestori di eventi...
    
        // Funzione per creare il testo animato
        const createMovingText = () => {
            const text = "Chase Your Dreams";
            const container = document.querySelector('.moving-text');
            if (container) {
                container.innerHTML = `<span>${text}</span>`;
                console.log('Testo animato creato'); // Per debug
            } else {
                console.log('Container non trovato'); // Per debug
            }
        };
    
        // Crea il testo animato
        createMovingText();
    });
    // Animazione testo
    const createTextAnimation = () => {
        const text = "Chase Your Dreams";
        const container = document.querySelector('.moving-text');
        
        container.innerHTML = '';
        
        const span = document.createElement('span');
        span.textContent = text;
        container.appendChild(span);
    };

    // Inizializza animazione testo
    createTextAnimation();

    // Gestione ridimensionamento finestra
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(createTextAnimation, 250);
    });

    // Intersection Observer per animazioni scroll
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('scroll-visible');
                entry.target.classList.remove('scroll-hidden');
            } else {
                entry.target.classList.add('scroll-hidden');
                entry.target.classList.remove('scroll-visible');
            }
        });
    }, { threshold: 0.2 });

    const scrollElements = document.querySelectorAll('.scroll-hidden');
    scrollElements.forEach(el => observer.observe(el));

    // Effetti hover sul testo
    const movingText = document.querySelector('.moving-text');
    movingText.addEventListener('mouseenter', () => {
        const spans = movingText.querySelectorAll('span');
        spans.forEach(span => {
            span.style.animationPlayState = 'paused';
        });
    });

    movingText.addEventListener('mouseleave', () => {
        const spans = movingText.querySelectorAll('span');
        spans.forEach(span => {
            span.style.animationPlayState = 'running';
        });
    });

    // Effetto particelle
    const createParticleEffect = () => {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Posizione casuale orizzontale
        const randomX = Math.random() * window.innerWidth;
        particle.style.left = `${randomX}px`;
        
        document.querySelector('.moving-text-container').appendChild(particle);
        
        setTimeout(() => {
            particle.remove();
        }, 1500);
    };

    // Genera particelle ogni 3 secondi
    setInterval(createParticleEffect, 3000);
});