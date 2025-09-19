document.addEventListener('DOMContentLoaded', function() {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
                
                if (entry.target.classList.contains('card')) {
                    setTimeout(() => {
                        entry.target.style.transform = 'translateY(0) rotate(0)';
                        entry.target.style.opacity = '1';
                    }, 200);
                }
            }
        });
    }, observerOptions);

    document.querySelectorAll('.section').forEach(section => {
        observer.observe(section);
    });

    document.querySelectorAll('.card').forEach(card => {
        const randomRotate = (Math.random() * 10) - 5;
        card.style.transform = `translateY(30px) rotate(${randomRotate}deg)`;
        observer.observe(card);
    });

    createFloatingElements();
});

function createFloatingElements() {
    const container = document.querySelector('.hearts-container');
    if (!container) return;
    
    for (let i = 0; i < 12; i++) {
        const element = document.createElement('div');
        element.className = 'floating-element';
        
        if (i % 2 === 0) {
            element.innerHTML = '✝';
            element.style.color = '#d4af87';
        } else {
            element.innerHTML = '🕊️';
            element.style.color = '#b3872d';
        }
        
        const posX = Math.random() * 100;
        const delay = Math.random() * 5;
        const duration = 3 + Math.random() * 4;
        const size = 20 + Math.random() * 15;
        
        element.style.left = `${posX}%`;
        element.style.top = `${Math.random() * 100}%`;
        element.style.fontSize = `${size}px`;
        element.style.animation = `float ${duration}s ease-in-out ${delay}s infinite`;
        element.style.opacity = '0';
        element.style.position = 'absolute';
        element.style.pointerEvents = 'none';
        element.style.zIndex = '1';
        
        setTimeout(() => {
            element.style.opacity = '0.7';
        }, delay * 1000);
        
        container.appendChild(element);
    }
}