const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");

hamburger.addEventListener("click", mobileMenu);

function mobileMenu() {
  hamburger.classList.toggle("active");
  navMenu.classList.toggle("active");
}

// Close navbar when link is clicked
const navLink = document.querySelectorAll(".nav-link");

navLink.forEach((n) => n.addEventListener("click", closeMenu));

function closeMenu() {
  hamburger.classList.remove("active");
  navMenu.classList.remove("active");
}

// Event Listeners: Handling toggle event
const toggleSwitch = document.querySelector(
  '.theme-switch input[type="checkbox"]'
);

function switchTheme(e) {
  if (e.target.checked) {
    document.documentElement.setAttribute("data-theme", "dark");
    localStorage.setItem("theme", "dark");
  } else {
    document.documentElement.setAttribute("data-theme", "light");
    localStorage.setItem("theme", "light");
  }
}

// Save user preference on load
const currentTheme = localStorage.getItem("theme")
  ? localStorage.getItem("theme")
  : null;

if (currentTheme) {
  document.documentElement.setAttribute("data-theme", currentTheme);

  if (currentTheme === "dark") {
    toggleSwitch.checked = true;
  }
}

// Add event listener after ensuring the element exists
if (toggleSwitch) {
  toggleSwitch.addEventListener("change", switchTheme, false);
}

// Sophisticated Scroll-triggered Animations
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

// Remove no-js class when JavaScript is enabled
document.documentElement.classList.remove('no-js');
document.body.classList.remove('no-js');

// Fallback: Ensure all fade-in elements are visible after a delay
setTimeout(() => {
  const fadeElements = document.querySelectorAll('.fade-in');
  fadeElements.forEach(el => {
    if (!el.classList.contains('visible')) {
      el.classList.add('visible');
    }
  });
}, 2000);

// Observe all elements with animation classes
document.addEventListener('DOMContentLoaded', () => {
  const animatedElements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right');
  animatedElements.forEach(el => observer.observe(el));
  
  // Add staggered animation delay to cards
  const cards = document.querySelectorAll('.enhanced-card');
  cards.forEach((card, index) => {
    card.style.animationDelay = `${index * 0.1}s`;
  });
});

// Particle System for Background Effect
class ParticleSystem {
  constructor() {
    this.canvas = document.createElement('canvas');
    this.ctx = this.canvas.getContext('2d');
    this.particles = [];
    this.mouse = { x: 0, y: 0 };
    
    this.init();
  }
  
  init() {
    this.canvas.style.position = 'fixed';
    this.canvas.style.top = '0';
    this.canvas.style.left = '0';
    this.canvas.style.width = '100%';
    this.canvas.style.height = '100%';
    this.canvas.style.pointerEvents = 'none';
    this.canvas.style.zIndex = '-1';
    this.canvas.style.opacity = '0.7';
    
    document.body.appendChild(this.canvas);
    this.resize();
    this.createParticles();
    this.animate();
    
    window.addEventListener('resize', () => this.resize());
    document.addEventListener('mousemove', (e) => {
      this.mouse.x = e.clientX;
      this.mouse.y = e.clientY;
    });
  }
  
  resize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }
  
  createParticles() {
    for (let i = 0; i < 50; i++) {
      this.particles.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 3 + 2,
        opacity: Math.random() * 0.5 + 0.5
      });
    }
  }
  
  animate() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    
    this.particles.forEach(particle => {
      particle.x += particle.vx;
      particle.y += particle.vy;
      
      if (particle.x < 0 || particle.x > this.canvas.width) particle.vx *= -1;
      if (particle.y < 0 || particle.y > this.canvas.height) particle.vy *= -1;
      
      this.ctx.beginPath();
      this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      this.ctx.fillStyle = `rgba(255, 205, 66, ${particle.opacity})`;
      this.ctx.fill();
    });
    
    requestAnimationFrame(() => this.animate());
  }
}

// Initialize particle system
document.addEventListener('DOMContentLoaded', () => {
  new ParticleSystem();
});

// Sophisticated typing effect with multiple texts
class TypeWriter {
  constructor(element, texts, speed = 100) {
    this.element = element;
    this.texts = texts;
    this.speed = speed;
    this.currentTextIndex = 0;
    this.currentCharIndex = 0;
    this.isDeleting = false;
    
    this.type();
  }
  
  type() {
    const currentText = this.texts[this.currentTextIndex];
    
    if (this.isDeleting) {
      this.element.textContent = currentText.substring(0, this.currentCharIndex - 1);
      this.currentCharIndex--;
    } else {
      this.element.textContent = currentText.substring(0, this.currentCharIndex + 1);
      this.currentCharIndex++;
    }
    
    let typeSpeed = this.speed;
    
    if (this.isDeleting) {
      typeSpeed = this.speed * 0.6; // Slower deletion for better readability
    }
    
    if (!this.isDeleting && this.currentCharIndex === currentText.length) {
      typeSpeed = 2000; // Longer pause at end to read the text
      this.isDeleting = true;
    } else if (this.isDeleting && this.currentCharIndex === 0) {
      this.isDeleting = false;
      this.currentTextIndex = (this.currentTextIndex + 1) % this.texts.length;
      typeSpeed = 500; // Longer pause before starting new text
    }
    
    setTimeout(() => this.type(), typeSpeed);
  }
}

// Initialize typewriter effect and theme
document.addEventListener('DOMContentLoaded', () => {
  const typingElement = document.querySelector('.typing-text');
  if (typingElement) {
    // Start typing immediately
    setTimeout(() => {
      new TypeWriter(typingElement, [
        'AI Engineer',
        'Data Scientist',
        'Machine Learning Engineer',
        'Full Stack Developer',
        'Data Analyst'
      ], 80); // Slower, more readable speed
    }, 100); // Small delay to ensure DOM is ready
  }
  
  // Ensure theme is properly initialized
  const currentTheme = localStorage.getItem("theme") || "light";
  document.documentElement.setAttribute("data-theme", currentTheme);
  
  const toggleSwitch = document.querySelector('.theme-switch input[type="checkbox"]');
  if (toggleSwitch) {
    toggleSwitch.checked = currentTheme === "dark";
  }
});

// Smooth scrolling with easing
function smoothScrollTo(target) {
  const targetElement = document.querySelector(target);
  if (targetElement) {
    targetElement.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  }
}

// Add smooth scrolling to all navigation links
document.addEventListener('DOMContentLoaded', () => {
  const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      smoothScrollTo(link.getAttribute('href'));
    });
  });
});

// Parallax effect for profile image
window.addEventListener('scroll', () => {
  const scrolled = window.pageYOffset;
  const profileImage = document.querySelector('.profile-image');
  if (profileImage) {
    const rate = scrolled * -0.5;
    profileImage.style.transform = `translateY(${rate}px)`;
  }
});

// Console easter egg
console.log('%c🚀 Welcome to Jayraj\'s Portfolio!', 'color: #ffcd42; font-size: 20px; font-weight: bold;');
console.log('%c💡 Built with HTML, CSS, and JavaScript', 'color: #4a90e2; font-size: 14px;');
console.log('%c🎯 Check out the source code on GitHub!', 'color: #333; font-size: 12px;');
