document.addEventListener("DOMContentLoaded", () => {
    // Fade-in tra le sezioni
    const navLinks = document.querySelectorAll("nav ul li a");
    const sections = document.querySelectorAll("section");

    navLinks.forEach(link => {
        link.addEventListener("click", (e) => {
            e.preventDefault();
            const sectionId = e.target.getAttribute("data-section");

            // Nascondi tutte le sezioni
            sections.forEach(section => {
                section.classList.remove("active");
            });

            // Mostra la sezione selezionata
            const targetSection = document.getElementById(sectionId);
            targetSection.classList.add("active");
        });
    });



    // Svanire e apparire durante lo scorrimento
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
    }, { threshold: 0.2 }); // Trigger quando il 20% dell'elemento è visibile

    const scrollElements = document.querySelectorAll('.scroll-hidden');
    scrollElements.forEach(el => observer.observe(el));
});
