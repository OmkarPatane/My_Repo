document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('.section');
    let currentSection = 0;
    let autoScroll = true;

    // Trigger animations when a section scrolls into view
    const triggerAnimations = (section) => {
        const content = section.querySelector('.content');
        if (content) {
            content.style.opacity = '1'; // Show content
        }
    };

    // Function for automatic scrolling
    const scrollNext = () => {
        if (currentSection < sections.length && autoScroll) {
            const section = sections[currentSection];
            section.scrollIntoView({ behavior: 'smooth' });
            triggerAnimations(section); // Trigger animations
            currentSection++;
            setTimeout(scrollNext, 4000); // Delay between scrolls
        } else {
            enableManualScrolling();
        }
    };

    // Enable manual scrolling
    const enableManualScrolling = () => {
        document.body.style.overflow = 'auto'; // Allow scrolling
        autoScroll = false; // Stop automatic scrolling
    };

    // About button logic
    const aboutButton = document.getElementById('aboutButton');
    aboutButton.addEventListener('click', () => {
        document.getElementById('section3').scrollIntoView({ behavior: 'smooth' });
    });

    // Login button logic
    const loginButton = document.getElementById('loginButton');
    loginButton.addEventListener('click', () => {
        alert('Redirecting to Login page...'); // Replace with actual redirection logic
    });

    // Start automatic scrolling
    setTimeout(scrollNext, 2000);
});
