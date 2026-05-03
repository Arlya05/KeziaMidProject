// Vanilla JS for Portfolio Enhancements

// Mobile Navigation Toggle
function initMobileNav() {
  const hamburger = document.querySelector('.hamburger');
  const navLinksEl = document.querySelector('.nav-links');
  const navItems = document.querySelectorAll('.nav-links a');
  
  if (!hamburger || !navLinksEl) return;
  
  let isMobileMenuOpen = false;
  
  const toggleMenu = () => {
    isMobileMenuOpen = !isMobileMenuOpen;
    navLinksEl.classList.toggle('active');
    hamburger.classList.toggle('active');
  };
  
  hamburger.addEventListener('click', toggleMenu);
  
  // Close on link click
  navItems.forEach(link => {
    link.addEventListener('click', () => {
      if (isMobileMenuOpen) {
        navLinksEl.classList.remove('active');
        hamburger.classList.remove('active');
        isMobileMenuOpen = false;
      }
    });
  });
}

// Initialize on DOM ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    initMobileNav();
    setActiveNav();
    setTimeout(typewriterEffect, 800);
  });
} else {
  initMobileNav();
  setActiveNav();
  setTimeout(typewriterEffect, 800);
}

// Simple typewriter effect
function typewriterEffect() {
  const el = document.querySelector('.typewriter');
  if (!el) return;
  
  const text = el.dataset.text || el.textContent;
  el.textContent = '';
  el.style.borderRight = '3px solid var(--teal-primary)';
  
  let i = 0;
  function type() {
    if (i < text.length) {
      el.textContent += text[i];
      i++;
      setTimeout(type, 100);
    } else {
      el.style.borderRight = 'none';
    }
  }
  type();
}



// Active Navigation Highlight
function setActiveNav() {
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  const navItems = document.querySelectorAll('.nav-links a');
  navItems.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === currentPath) {
      link.classList.add('active');
    }
  });
}

setActiveNav();
window.addEventListener('popstate', setActiveNav);

// Scroll Animations (Fade-in)
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, observerOptions);

// Observe all fade-in elements
document.querySelectorAll('.fade-in').forEach(el => {
  observer.observe(el);
});

// Gallery Lightbox Modal
const galleryItems = document.querySelectorAll('.gallery-item');
const modal = document.createElement('div');
modal.className = 'modal';
modal.innerHTML = `
  <span class="close">&times;</span>
  <img class="modal-content" id="modal-img">
  <video class="modal-content" id="modal-video" style="display:none;" controls></video>
`;
document.body.appendChild(modal);

const closeBtn = modal.querySelector('.close');
const modalImg = modal.querySelector('#modal-img');
const modalVideo = modal.querySelector('#modal-video');

// REMOVED video thumbnail enlarge - only manual fullscreen (native browser)
// galleryItems.forEach(...) code removed per request - videos now only fullscreen manually

closeBtn.addEventListener('click', () => {
  modal.style.display = 'none';
  if (!modalVideo.paused) {
    modalVideo.pause();
    modalVideo.currentTime = 0;
  }
});

modal.addEventListener('click', (e) => {
  if (e.target === modal) {
    modal.style.display = 'none';
    if (!modalVideo.paused) {
      modalVideo.pause();
      modalVideo.currentTime = 0;
    }
  }
});

// Smooth Scroll for Anchor Links (if any)
document.querySelectorAll('a[href^=\"#"]').forEach(anchor => {
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

// Preload critical images for performance
window.addEventListener('load', () => {
  console.log('Portfolio loaded successfully! 🎵');
});

// Back to Top Button (optional enhancement)
function createBackToTop() {
  const btn = document.createElement('button');
  btn.innerHTML = '↑';
  btn.className = 'btn back-to-top';
  btn.style.cssText = 'position:fixed;bottom:20px;right:20px;display:none;z-index:99;font-size:1.5rem;width:50px;height:50px;border-radius:50%;transition:all 0.3s ease;';
  document.body.appendChild(btn);
  
  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      btn.style.display = 'block';
    } else {
      btn.style.display = 'none';
    }
  });
  
  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
  
  btn.addEventListener('mouseenter', () => {
    btn.style.transform = 'scale(1.2) rotate(180deg)';
  });
  
  btn.addEventListener('mouseleave', () => {
    btn.style.transform = 'scale(1) rotate(0)';
  });
}

createBackToTop();

/* ==================== ADVANCED INTERACTIVE EFFECTS ==================== */

// 1. Mouse Parallax Effect pada Hero Section
function initParallaxEffect() {
  const hero = document.querySelector('.hero');
  if (!hero) return;
  
  document.addEventListener('mousemove', (e) => {
    const x = (e.clientX / window.innerWidth) * 20 - 10;
    const y = (e.clientY / window.innerHeight) * 20 - 10;
    
    hero.style.backgroundPosition = `${x}% ${y}%`;
  });
}

// 2. Ripple Effect pada Click
function createRippleEffect() {
  document.addEventListener('click', (e) => {
    const ripple = document.createElement('span');
    ripple.className = 'ripple';
    
    const rect = e.target.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;
    
    ripple.style.cssText = `
      position: absolute;
      width: ${size}px;
      height: ${size}px;
      left: ${x}px;
      top: ${y}px;
      background: radial-gradient(circle, rgba(255,255,255,0.6) 0%, transparent 70%);
      border-radius: 50%;
      pointer-events: none;
      animation: rippleAnimation 0.6s ease-out;
    `;
    
    e.target.style.position = 'relative';
    e.target.style.overflow = 'hidden';
    e.target.appendChild(ripple);
    
    setTimeout(() => ripple.remove(), 600);
  });
}

// Add ripple animation to stylesheet
const style = document.createElement('style');
style.textContent = `
  @keyframes rippleAnimation {
    0% {
      transform: scale(0);
      opacity: 1;
    }
    100% {
      transform: scale(1);
      opacity: 0;
    }
  }
  

`;
document.head.appendChild(style);

// 3. Floating Particles - DISABLED for cleaner interface
// This function was removed to keep the interface clean and focus on text animations

// 4. Enhanced Card Animations on Hover
function enhanceCardInteractions() {
  const cards = document.querySelectorAll('.card');
  
  cards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      card.style.transform = 'translateY(-15px) scale(1.02) rotate(1deg)';
    });
    
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'translateY(0) scale(1) rotate(0)';
    });
    
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const rotateX = (y - rect.height / 2) / 10;
      const rotateY = (rect.width / 2 - x) / 10;
      
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
    });
  });
}

// 5. Text Animation on Scroll
function animateTextOnScroll() {
  const textElements = document.querySelectorAll('p, h1, h2, h3');
  
  textElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
      el.style.color = 'var(--teal-primary)';
      el.style.textShadow = '0 0 20px rgba(0,121,107,0.3)';
      el.style.transform = 'scale(1.02)';
    });
    
    el.addEventListener('mouseleave', () => {
      el.style.color = 'inherit';
      el.style.textShadow = 'none';
      el.style.transform = 'scale(1)';
    });
  });
}

// 6. Smooth Number Counter for Stats
function createCounter(element, target, duration = 2000) {
  let start = 0;
  const increment = target / (duration / 16);
  
  const counter = setInterval(() => {
    start += increment;
    if (start >= target) {
      element.textContent = target;
      clearInterval(counter);
    } else {
      element.textContent = Math.floor(start);
    }
  }, 16);
}

// 7. Button Click Effects
function enhanceButtonEffects() {
  const buttons = document.querySelectorAll('.btn');
  
  buttons.forEach(btn => {
    btn.addEventListener('click', function(e) {
      // Create multiple ripples
      for (let i = 0; i < 3; i++) {
        setTimeout(() => {
          const ripple = document.createElement('span');
          ripple.style.cssText = `
            position: absolute;
            width: 50px;
            height: 50px;
            background: rgba(255,255,255,0.5);
            border-radius: 50%;
            left: ${e.offsetX}px;
            top: ${e.offsetY}px;
            pointer-events: none;
            animation: rippleAnimation ${0.6 + i * 0.2}s ease-out;
          `;
          
          this.style.position = 'relative';
          this.style.overflow = 'hidden';
          this.appendChild(ripple);
          
          setTimeout(() => ripple.remove(), 1000 + i * 200);
        }, i * 100);
      }
    });
  });
}

// 8. Scroll Progress Bar
function createScrollProgressBar() {
  const progressBar = document.createElement('div');
  progressBar.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    height: 3px;
    background: linear-gradient(90deg, var(--teal-primary), var(--teal-secondary));
    z-index: 999;
    box-shadow: 0 2px 10px rgba(0,121,107,0.3);
  `;
  document.body.appendChild(progressBar);
  
  window.addEventListener('scroll', () => {
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrolled = window.scrollY;
    const scrollPercent = (scrolled / scrollHeight) * 100;
    
    progressBar.style.width = scrollPercent + '%';
  });
}

// 9. Letter Spacing Animation on Hover - DISABLED
// This function was removed to keep text animations cleaner

// 10. Gallery Items 3D Tilt Effect
function gallery3DTilt() {
  const galleryItems = document.querySelectorAll('.gallery-item');
  
  galleryItems.forEach(item => {
    item.addEventListener('mousemove', (e) => {
      const rect = item.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = (y - centerY) / 20;  // Reduced intensity
      const rotateY = (centerX - x) / 20;  // Reduced intensity
      
      item.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;  // Reduced scale
      item.style.cursor = 'pointer';
    });
    
    item.addEventListener('mouseleave', () => {
      item.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
    });
  });
}

// Initialize all effects when DOM is ready
function initAllEffects() {
  // Wait for page load
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      setTimeout(() => {
        initParallaxEffect();
        createRippleEffect();
        // createFloatingParticles(); // DISABLED - removed for cleaner interface
        enhanceCardInteractions();
        animateTextOnScroll();
        enhanceButtonEffects();
        createScrollProgressBar();
        // letterSpacingAnimation(); // DISABLED
        gallery3DTilt();
      }, 500);
    });
  } else {
    setTimeout(() => {
      initParallaxEffect();
      createRippleEffect();
      // createFloatingParticles(); // DISABLED - removed for cleaner interface
      enhanceCardInteractions();
      animateTextOnScroll();
      enhanceButtonEffects();
      createScrollProgressBar();
      // letterSpacingAnimation(); // DISABLED
      gallery3DTilt();
    }, 500);
  }
}

// Run initialization
initAllEffects();

console.log('🎉 Portfolio animations loaded! Enjoy the interactive experience! 🎵');

