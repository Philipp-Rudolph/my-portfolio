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
const handleCursorTrail = () => {
  const trails = document.querySelectorAll('.cursor-trail');
  let mouseX = 0, mouseY = 0;
  
  for (let i = 0; i < trails.length; i++) {
    cursorTrails.push({
      x: 0,
      y: 0,
      element: trails[i],
      delay: i * 3, // Größerer Abstand zwischen den Punkten
      size: Math.random() * 0.4 + 0.6 // Zufällige Größenvarianz
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
      
      // Weichere Bewegung mit variierender Geschwindigkeit
      const speed = 8 + trail.delay;
      trail.x += (mouseX - trail.x) / speed;
      trail.y += (mouseY - trail.y) / speed;
      
      // Element-Position aktualisieren
      trail.element.style.transform = `translate(${trail.x}px, ${trail.y}px)`;
      
      // Opacity basierend auf der Entfernung zur Maus
      const distance = Math.sqrt(
        Math.pow(mouseX - trail.x, 2) + 
        Math.pow(mouseY - trail.y, 2)
      );
      
      const maxDistance = 150; // Maximale Entfernung, bei der Punkte noch sichtbar sind
      const opacity = Math.max(0, 1 - (distance / maxDistance));
      trail.element.style.opacity = opacity * 0.7; // Reduzierte Maximalopazität für subtileren Effekt
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
    
    <!-- Cursor Trail Effect -->
    <!-- <div v-for="i in 20" :key="`cursor-${i}`" class="cursor-trail"></div> -->
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

/* Cursor Trail Styles */
.cursor-trail {
  position: fixed;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: var(--primary);
  box-shadow: 0 0 10px 2px var(--primary);
  pointer-events: none;
  opacity: 0;
  z-index: 9999;
  filter: blur(2px);
  transition: transform 0.1s linear, opacity 0.3s ease, width 0.2s ease, height 0.2s ease;
}

/* Variieren der Größe für besseren visuellen Effekt */
.cursor-trail:nth-child(3n) {
  width: 6px;
  height: 6px;
}

.cursor-trail:nth-child(3n+1) {
  width: 10px;
  height: 10px;
}

/* Variieren der Farbe für interessantere Erscheinung */
.cursor-trail:nth-child(2n) {
  background-color: rgba(45, 212, 191, 0.1);
  box-shadow: 0 0 8px 1px var(--primary);
}

.cursor-trail:nth-child(3n) {
  background-color: rgba(45, 212, 191, 0.05);
  box-shadow: 0 0 12px 2px var(--primary);
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