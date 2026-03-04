// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
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

// Navbar background change on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'var(--shadow)';
    }
});

// Form submission handling
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);
        
        // Here you would normally send the data to a server
        // For now, just show a success message
        alert('Thank you for your message! I will get back to you soon.');
        contactForm.reset();
    });
}

// Add animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all sections and cards
document.querySelectorAll('section, .skill-card, .project-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Typing effect for hero subtitle (optional)
const heroSubtitle = document.querySelector('.hero-subtitle');
if (heroSubtitle) {
    const text = heroSubtitle.textContent;
    heroSubtitle.textContent = '';
    let i = 0;
    
    function typeWriter() {
        if (i < text.length) {
            heroSubtitle.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
        }
    }
    
    // Start typing effect after page loads
    window.addEventListener('load', typeWriter);
}

// Mobile menu toggle (if you want to add a hamburger menu later)
// This is a placeholder for future enhancement
console.log('Portfolio loaded successfully! 🦆');

// Theme switcher
const themes = {
    sunset: {
        primary: '#ff6b6b',
        gradient: 'linear-gradient(135deg, #ff9a9e 0%, #fad0c4 100%)',
        cardGradient: 'linear-gradient(135deg, #ff6b6b 0%, #ff9a9e 100%)'
    },
    ocean: {
        primary: '#2c7da0',
        gradient: 'linear-gradient(135deg, #89f7fe 0%, #66a6ff 100%)',
        cardGradient: 'linear-gradient(135deg, #2c7da0 0%, #61a5c2 100%)'
    },
    galaxy: {
        primary: '#7209b7',
        gradient: 'linear-gradient(135deg, #0b0c10 0%, #1a1a2e 50%, #16213e 100%)',
        cardGradient: 'linear-gradient(135deg, #7209b7 0%, #b5179e 100%)'
    },
    mint: {
        primary: '#2ecc71',
        gradient: 'linear-gradient(135deg, #a8e6cf 0%, #d4edda 100%)',
        cardGradient: 'linear-gradient(135deg, #2ecc71 0%, #3498db 100%)'
    }
};

document.querySelectorAll('.theme-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const theme = btn.getAttribute('data-theme');
        document.body.style.background = themes[theme].gradient;
        document.documentElement.style.setProperty('--primary', themes[theme].primary);
        // Add more color changes as needed
    });
});