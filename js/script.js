function createStars() {
    const starsContainer = document.createElement('div');
    starsContainer.className = 'stars';
    
    const numberOfStars = 100;
    const browserHeight = window.innerHeight;
    
    for (let i = 0; i < numberOfStars; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        
        const x = Math.random() * 100;
        const y = Math.random() * 100; 
        
        star.style.left = `${x}%`;
        star.style.top = `${y}%`;
        
        const opacity = 1 - (y / 50);
        star.style.opacity = opacity;
        
        const size = Math.random() * 2 + 1;
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        
        // Random twinkle animation duration
        const duration = Math.random() * 3 + 2;
        star.style.animationDuration = `${duration}s`;
        
        starsContainer.appendChild(star);
    }
    
    document.querySelector('.ocean-background').prepend(starsContainer);
  }
  
  
  window.addEventListener('load', createStars);
  
  function createComet() {
    const comet = document.createElement('div');
    comet.className = 'comet';
    document.body.appendChild(comet);
  
    const startX = Math.random() * window.innerWidth;
    const startY = Math.random() * (window.innerHeight / 2);
    const endX = startX + (Math.random() - 0.5) * 400;
    const endY = startY + Math.random() * 200;
  
    const angle = Math.atan2(endY - startY, endX - startX);
    const distance = Math.sqrt(Math.pow(endX - startX, 2) + Math.pow(endY - startY, 2));
    const duration = distance / 200;
  
    const tailLength = Math.min(150, Math.max(50, duration * 50));
    comet.style.width = `${tailLength}px`;
  
    comet.style.transformOrigin = 'right center';
    comet.style.left = `${startX}px`;
    comet.style.top = `${startY}px`;
    comet.style.transform = `rotate(${angle}rad)`;
  
    const animation = comet.animate([
        { transform: `rotate(${angle}rad) translateX(0px)` },
        { transform: `rotate(${angle}rad) translateX(${distance}px)` }
    ], {
        duration: duration * 1000,
        easing: 'linear'
    });
  
    comet.animate([
        { opacity: 0 },
        { opacity: 1, offset: 0.1 },
        { opacity: 1, offset: 0.9 },
        { opacity: 0 }
    ], {
        duration: duration * 1000,
        easing: 'ease-in-out'
    });
  
    animation.onfinish = () => {
        document.body.removeChild(comet);
    };
  }
  
  function startCometAnimation() {
    createComet();
    setTimeout(startCometAnimation, Math.random() * 3000 + 2000);
  }
  
  window.addEventListener('load', startCometAnimation);
  
  document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('.right-section section');
    const navItems = document.querySelectorAll('.left-section nav ul li a');
  
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.5
    };
  
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navItems.forEach(item => {
                    item.classList.remove('active');
                    if (item.getAttribute('href') === `#${id}`) {
                        item.classList.add('active');
                    }
                });
            }
        });
    }, observerOptions);
  
    sections.forEach(section => {
        observer.observe(section);
    });
  
    const cursor = document.createElement('div');
    cursor.classList.add('custom-cursor');
    document.body.appendChild(cursor);
  
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });
  });