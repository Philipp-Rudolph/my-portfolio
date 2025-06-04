<template>
  <section id="home" class="hero">
    <div class="container">
      <div class="hero-content">
        <div class="hero-greeting">Hallo, ich bin Philipp</div>
        <h1>Junior Web <br><span class="typing-container"><span ref="typingElement" class="typing-effect"></span></span></h1>
        <div class="hero-description">
          Mit 3 Jahren Erfahrung in der Webentwicklung kreiere ich moderne, responsive und benutzerfreundliche
          Websites und Webanwendungen.
        </div>
        <a href="#contact" class="hero-cta" @click.prevent="scrollToSection('contact')">Kontakt aufnehmen</a>
      </div>
    </div>
    <div class="hero-particles">
      <div v-for="(particle, index) in particles" :key="index" class="particle" :style="{
        width: particle.size + 'px',
        height: particle.size + 'px',
        left: particle.x + 'px',
        top: particle.y + 'px',
        opacity: particle.opacity
      }">
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { gsap } from 'gsap';
import { fadeInUp, fadeInLeft, scaleIn } from '@/utils/animations';

const typingElement = ref(null);
const particles = ref([]);
let animationFrameId = null; // Für das Cleanup von requestAnimationFrame

// Partikel erstellen
const createParticles = () => {
  const numParticles = 100;
  const heroSection = document.querySelector('.hero');
  if (!heroSection) return;
  
  const width = heroSection.offsetWidth;
  const height = heroSection.offsetHeight;
  
  for (let i = 0; i < numParticles; i++) {
    particles.value.push({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 3 + 1,
      opacity: Math.random() * 0.5 + 0.2,
    });
  }
};

// Partikel animieren
const animateParticles = () => {
  particles.value.forEach((particle) => {
    particle.y -= 0.2;
    if (particle.y < 0) {
      const heroSection = document.querySelector('.hero');
      if (heroSection) {
        particle.y = heroSection.offsetHeight;
        particle.x = Math.random() * heroSection.offsetWidth;
      }
    }
  });
  
  animationFrameId = requestAnimationFrame(animateParticles);
};

// Schreibmaschineneffekt
const typeWriter = () => {
  if (!typingElement.value) return;
  
  const words = [
    'Entwickler', 
    'Designer', 
    'Creator', 
    'Problem-Solver',
    'Frontend-Spezialist',
    'Code-Enthusiast',
    'UI-Gestalter',
    'Web-Architekt',
    'Full-Stack-Talent',
    'Digitalhandwerker',
    'Innovator',
    'Tech-Künstler',
    'JavaScript-Fan',
    'Vue-Virtuose',
    'CSS-Magier'
  ];
  
  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 100;
  
  const type = () => {
    if (!typingElement.value) return;
    
    const currentWord = words[wordIndex];
    
    if (isDeleting) {
      // Text löschen
      typingElement.value.textContent = currentWord.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 50;
    } else {
      // Text schreiben
      typingElement.value.textContent = currentWord.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 150;
    }
    
    // Wenn das Wort vollständig ist
    if (!isDeleting && charIndex === currentWord.length) {
      // Pause am Ende des Wortes
      isDeleting = true;
      typingSpeed = 1500;
    } else if (isDeleting && charIndex === 0) {
      // Zum nächsten Wort wechseln
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length;
      typingSpeed = 500;
    }
    
    setTimeout(type, typingSpeed);
  };
  
  setTimeout(type, 1000);
};

// Hero-Bereich animieren mit GSAP
const animateHero = () => {
  const greeting = document.querySelector('.hero-greeting');
  const heading = document.querySelector('.hero h1');
  const description = document.querySelector('.hero-description');
  const cta = document.querySelector('.hero-cta');
  const particles = document.querySelectorAll('.particle');
  
  if (!greeting || !heading || !description || !cta) return;
  
  // Timeline für koordinierte Animationen
  const tl = gsap.timeline();
  
  // Partikel animieren
  gsap.fromTo(particles, 
    { opacity: 0, scale: 0 },
    { 
      opacity: 0.3, 
      scale: 1, 
      duration: 2, 
      stagger: 0.02, 
      ease: "power2.out" 
    }
  );
  
  // Hero Content staggered animation
  tl.fromTo(greeting, 
    { opacity: 0, y: 50, x: -30 },
    { opacity: 1, y: 0, x: 0, duration: 1, ease: "power3.out" }
  )
  .fromTo(heading, 
    { opacity: 0, y: 60, scale: 0.9 },
    { opacity: 1, y: 0, scale: 1, duration: 1.2, ease: "back.out(1.7)" }, 
    "-=0.7"
  )
  .fromTo(description, 
    { opacity: 0, y: 40 },
    { opacity: 1, y: 0, duration: 1, ease: "power3.out" }, 
    "-=0.8"
  )
  .fromTo(cta, 
    { opacity: 0, y: 30, scale: 0.8 },
    { 
      opacity: 1, 
      y: 0, 
      scale: 1, 
      duration: 0.8, 
      ease: "back.out(2.5)",
      onComplete: () => {
        // Hover animation setup
        gsap.set(cta, { 
          transformOrigin: "center" 
        });
      }
    }, 
    "-=0.6"
  );
  
  // Continuous particle floating animation
  gsap.to(particles, {
    y: "random(-20, 20)",
    x: "random(-10, 10)",
    duration: "random(3, 6)",
    ease: "sine.inOut",
    repeat: -1,
    yoyo: true,
    stagger: {
      amount: 2,
      from: "random"
    }
  });
};

// Funktion zum Scrollen zu einer Sektion
const scrollToSection = (sectionId) => {
  const element = document.getElementById(sectionId);
  if (element) {
    window.scrollTo({
      top: element.offsetTop - 80,
      behavior: 'smooth',
    });
  }
};

onMounted(() => {
  createParticles();
  animateParticles();
  animateHero();
  if (typingElement.value) {
    typeWriter();
  }
});

onUnmounted(() => {
  // Animation-Cleanup
  if (animationFrameId) {
    cancelAnimationFrame(animationFrameId);
  }
});
</script>

<style scoped>
.hero {
    min-height: var(--viewport-height);
    display: flex;
    align-items: center;
    position: relative;
    overflow: hidden;
    padding-top: var(--header-height);
    width: var(--viewport-width);
}

.hero-content {
    position: relative;
    z-index: var(--z-content);
    width: var(--viewport-width);
    max-width: 800px;
}

.hero-greeting {
    color: var(--primary);
    font-size: var(--font-base);
    font-weight: var(--font-medium);
    margin-bottom: var(--spacing-sm);
    opacity: 0;
    transform: var(--transform-down);
}

.hero h1 {
    font-size: var(--font-3xl);
    margin-bottom: var(--spacing-md);
    line-height: 1.1;
    opacity: 0;
    transform: var(--transform-down);
}

.hero h1 span {
    color: var(--primary);
    position: relative;
    font-family: 'Array-Wide', sans-serif;
}

.typing-effect::after {
    content: "|";
    animation: blink 1s infinite;
}

@keyframes blink {
    0%, 100% { opacity: 1; }
    50% { opacity: 0; }
}

.hero-description {
    font-size: var(--font-base);
    max-width: 600px;
    color: var(--gray);
    margin-bottom: var(--spacing-lg);
    opacity: 0;
    transform: var(--transform-down);
}

.hero-cta {
    display: inline-block;
    padding: var(--spacing-xs) var(--spacing-lg);
    background-color: var(--primary);
    color: var(--dark);
    text-decoration: none;
    font-weight: var(--font-semibold);
    border-radius: var(--border-radius-sm);
    transition: transform var(--transition-fast), box-shadow var(--transition-fast);
    opacity: 0;
    transform: var(--transform-down);
}

.hero-cta:hover {
    transform: var(--transform-up);
    box-shadow: var(--shadow-sm);
}

.hero-bg {
    position: absolute;
    top: 0;
    right: 0;
    width: 60%;
    height: var(--viewport-width);
    z-index: var(--z-background);
    opacity: var(--opacity-disabled);
}

.hero-particles {
    position: absolute;
    top: 0;
    left: 0;
    width: var(--viewport-width);
    height: var(--viewport-width);
}

.particle {
    position: absolute;
    background-color: var(--primary);
    border-radius: var(--border-radius-full);
    z-index: var(--z-background);
}

/* Responsive Styles */
@media (max-width: var(--breakpoint-tablet)) {
    .hero h1 {
        font-size: var(--font-2xl);
    }
    
    .hero-description {
        font-size: var(--font-sm);
    }
}
</style>