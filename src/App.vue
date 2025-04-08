<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import HeaderComponent from './components/HeaderComponent.vue';
import HeroSection from '@/sections/HeroSection.vue';
import AboutSection from '@/sections/AboutSection.vue';
import ProjectsSection from '@/sections/ProjectsSection.vue';
import ExperienceSection from '@/sections/ExperienceSection.vue';
import ContactSection from '@/sections/ContactSection.vue';
import FooterComponent from '@/components/FooterComponent.vue';

// Gemeinsame Zustandsvariablen
const scrolled = ref(false);
const showBackToTop = ref(false);
let animationFrameId = null; // Für Cleanup von requestAnimationFrame
let scrollListener = null;
let mouseMoveListener = null;

// Event Handler für Scroll-Ereignisse
const handleScroll = () => {
  const scrollPosition = window.scrollY;
  
  // Header-Style beim Scrollen aktualisieren
  scrolled.value = scrollPosition > 50;
  
  // Back-to-Top-Button anzeigen/ausblenden
  showBackToTop.value = scrollPosition > 500;
};

// Scroll nach oben
const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
};

// Loader ausblenden, wenn die Seite geladen ist
const hideLoader = () => {
  const loader = document.querySelector('.loader');
  if (loader) {
    loader.classList.add('hidden');
  }
};

const cursorTrails = []; // Diese Zeile fehlt in deinem Code!

// handleCursorTrail-Funktion für einen großen Hintergrundblob
const handleCursorTrail = () => {
  const trails = document.querySelectorAll('.cursor-trail');
  let mouseX = window.innerWidth / 2; // Starte in der Mitte
  let mouseY = window.innerHeight / 2;
  
  // Weniger Punkte für einen großen Hintergrundblob
  for (let i = 0; i < trails.length; i++) {
    cursorTrails.push({
      x: mouseX,
      y: mouseY,
      element: trails[i],
      delay: i, // Längerer Delay für langsamere, sanftere Bewegung
      scale: 1.0 + (i * 0.4) // Größere Skalierung für Blob-Effekt
    });
  }
  
  mouseMoveListener = (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  };
  
  window.addEventListener('mousemove', mouseMoveListener);
  
  const animateTrails = () => {
    for (let i = 0; i < cursorTrails.length; i++) {
      const trail = cursorTrails[i];
      
      // Sehr weiche, langsame Bewegung für einen Blob-Effekt
      const speed = 15 + trail.delay;
      trail.x += (mouseX - trail.x) / speed;
      trail.y += (mouseY - trail.y) / speed;
      
      // Element-Position aktualisieren mit Skalierung
      trail.element.style.transform = `translate(${trail.x}px, ${trail.y}px) scale(${trail.scale})`;
      
      // Konstante, aber niedrige Opazität für Hintergrundeffekt
      trail.element.style.opacity = 0.15 - (i * 0.03);
    }
    
    animationFrameId = requestAnimationFrame(animateTrails);
  };
  
  animateTrails();
};

onMounted(() => {
  // Loader nach dem Laden der Seite ausblenden
  window.addEventListener('load', hideLoader);
  setTimeout(hideLoader, 1500); // Fallback, falls das load-Event nicht ausgelöst wird
  
  // Event Listener und Animationen einrichten
  scrollListener = handleScroll;
  window.addEventListener('scroll', scrollListener);
  
  // Initial call to set correct state on page load
  handleScroll();
  
  handleCursorTrail();
});

onUnmounted(() => {
  // Event Listener Cleanup
  window.removeEventListener('scroll', scrollListener);
  if (mouseMoveListener) {
    window.removeEventListener('mousemove', mouseMoveListener);
  }
  
  // Animation Frame Cleanup
  if (animationFrameId) {
    cancelAnimationFrame(animationFrameId);
  }
});
</script>

<template>
  <!-- Page Loader -->
  <div class="loader">
    <div class="loader-circle"></div>
  </div>

  <!-- Cursor Trail Effect (jetzt vor dem App-Container für z-index) -->
  <div v-for="i in 2" :key="`cursor-${i}`" class="cursor-trail"></div>

  <div class="app-container">
    <HeaderComponent :scrolled="scrolled" />
    <main>
      <HeroSection />
      <AboutSection />
      <ProjectsSection />
      <ExperienceSection />
      <ContactSection />
    </main>
    <FooterComponent />
    
    <!-- Back to Top Button -->
    <a href="#" class="back-to-top" :class="{ 'visible': showBackToTop }" @click.prevent="scrollToTop">↑</a>
  </div>
</template>

<style>
/* Loader Animation */
.loader {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: var(--dark);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  transition: opacity 0.5s ease, visibility 0.5s ease;
}

.loader.hidden {
  opacity: 0;
  visibility: hidden;
}

.loader-circle {
  width: 50px;
  height: 50px;
  border: 3px solid rgba(45, 212, 191, 0.3);
  border-top: 3px solid var(--primary);
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* Cursor Trail Styles als Hintergrundblob */
.cursor-trail {
  position: fixed;
  width: 400px;
  height: 400px;
  border-radius: 50%;
  background-color: var(--primary);
  box-shadow: 0 0 80px 20px rgba(45, 212, 191, 0.2);
  pointer-events: none;
  opacity: 0.15;
  z-index: -1; /* Hinter dem Content */
  filter: blur(80px);
  transition: transform 0.8s ease-out, opacity 1s ease;
}

/* Variieren der Größe und Farbe für Tiefeneffekt */
.cursor-trail:nth-child(2) {
  width: 600px;
  height: 600px;
  background-color: rgba(45, 212, 191, 0.07);
  box-shadow: 0 0 100px 30px rgba(45, 212, 191, 0.08);
  filter: blur(120px);
}

</style>

<style scoped>
.app-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

main {
  flex: 1;
}

.back-to-top {
  position: fixed;
  bottom: 30px;
  right: 30px;
  width: 50px;
  height: 50px;
  background-color: var(--primary);
  color: var(--dark);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  font-size: 1.2rem;
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.3s ease, transform 0.3s ease;
  z-index: 99;
}

.back-to-top.visible {
  opacity: 1;
  transform: translateY(0);
}
</style>