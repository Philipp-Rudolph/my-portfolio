<template>
  <section id="home" class="hero">
    <div class="container">
      <div class="hero-content">
        <div class="hero-greeting">Hallo, ich bin Philipp</div>
        <h1>Junior Web <br>>  <span class="typing-container"><span ref="typingElement" class="typing-effect"></span></span></h1>
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

// Hero-Bereich animieren
const animateHero = () => {
  const greeting = document.querySelector('.hero-greeting');
  const heading = document.querySelector('.hero h1');
  const description = document.querySelector('.hero-description');
  const cta = document.querySelector('.hero-cta');
  
  if (!greeting || !heading || !description || !cta) return;
  
  setTimeout(() => {
    greeting.style.opacity = '1';
    greeting.style.transform = 'translateY(0)';
    greeting.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
  }, 300);
  
  setTimeout(() => {
    heading.style.opacity = '1';
    heading.style.transform = 'translateY(0)';
    heading.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
  }, 500);
  
  setTimeout(() => {
    description.style.opacity = '1';
    description.style.transform = 'translateY(0)';
    description.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
  }, 700);
  
  setTimeout(() => {
    cta.style.opacity = '1';
    cta.style.transform = 'translateY(0)';
    cta.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
  }, 900);
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
    min-height: 100vh;
    display: flex;
    align-items: center;
    position: relative;
    overflow: hidden;
    padding-top: 80px;
    width: 100%;
}

.hero-content {
    position: relative;
    z-index: 1;
    width: 100%;
    max-width: 800px;
}

.hero-greeting {
    color: var(--primary);
    font-size: 1.2rem;
    font-weight: 500;
    margin-bottom: 1rem;
    opacity: 0;
    transform: translateY(20px);
}

.hero h1 {
    font-size: 4rem;
    margin-bottom: 1.5rem;
    line-height: 1.1;
    opacity: 0;
    transform: translateY(20px);
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
    font-size: 1.2rem;
    max-width: 600px;
    color: var(--gray);
    margin-bottom: 2rem;
    opacity: 0;
    transform: translateY(20px);
}

.hero-cta {
    display: inline-block;
    padding: 0.8rem 2rem;
    background-color: var(--primary);
    color: var(--dark);
    text-decoration: none;
    font-weight: 600;
    border-radius: 4px;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    opacity: 0;
    transform: translateY(20px);
}

.hero-cta:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(45, 212, 191, 0.3);
}

.hero-bg {
    position: absolute;
    top: 0;
    right: 0;
    width: 60%;
    height: 100%;
    z-index: 0;
    opacity: 0.1;
}

.hero-particles {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}

.particle {
    position: absolute;
    background-color: var(--primary);
    border-radius: 50%;
    z-index: 0;
}

/* Responsive Styles */
@media (max-width: 768px) {
    .hero h1 {
        font-size: 2.5rem;
    }
    
    .hero-description {
        font-size: 1rem;
    }
}
</style>