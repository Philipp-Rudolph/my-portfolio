<template>
  <header :class="{ 'header-scrolled': scrolled }">
    <div class="container">
      <nav>
        <div class="logo">Portfolio.</div>
        <div class="nav-links" :class="{ 'active': mobileMenuOpen }">
          <a
            href="#home"
            @click.prevent="scrollToSection('home')"
            :class="{ 'active-link': activeSection === 'home' }"
          >Home</a>
          <a
            href="#about"
            @click.prevent="scrollToSection('about')"
            :class="{ 'active-link': activeSection === 'about' }"
          >Über mich</a>
          <a
            href="#projects"
            @click.prevent="scrollToSection('projects')"
            :class="{ 'active-link': activeSection === 'projects' }"
          >Projekte</a>
          <a
            href="#experience"
            @click.prevent="scrollToSection('experience')"
            :class="{ 'active-link': activeSection === 'experience' }"
          >Erfahrung</a>
          <a
            href="#contact"
            @click.prevent="scrollToSection('contact')"
            :class="{ 'active-link': activeSection === 'contact' }"
          >Kontakt</a>
        </div>
        <button class="mobile-menu-btn" @click.stop="toggleMobileMenu" aria-label="Menü öffnen">☰</button>
      </nav>
    </div>
  </header>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

defineProps({
  scrolled: Boolean
});

const mobileMenuOpen = ref(false);
const activeSection = ref('home'); // Default aktive Sektion
const sections = ['home', 'about', 'projects', 'experience', 'contact'];
let scrollListener = null;

// Mobile-Menü umschalten
const toggleMobileMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value;
};

// Zu einem Abschnitt scrollen
const scrollToSection = (sectionId) => {
  const element = document.getElementById(sectionId);
  if (element) {
    window.scrollTo({
      top: element.offsetTop - 80,
      behavior: 'smooth',
    });
    activeSection.value = sectionId; // Setze aktive Sektion beim Klicken
  }
  mobileMenuOpen.value = false;
};

// Bestimme die aktive Sektion basierend auf dem Viewport
const determineActiveSection = () => {
  // Offset für die Header-Höhe und einen kleinen Puffer
  const offset = 100;
  
  // Spezieller Check für das Ende der Seite
  const scrollPosition = window.scrollY + window.innerHeight;
  const bodyHeight = document.body.offsetHeight;
  
  // Wenn wir nahe am Ende der Seite sind (innerhalb von 50px), aktiviere die Kontaktsektion
  if (scrollPosition >= bodyHeight - 50) {
    activeSection.value = 'contact';
    return;
  }
  
  // Prüfe jede Sektion von unten nach oben
  for (let i = sections.length - 1; i >= 0; i--) {
    const section = document.getElementById(sections[i]);
    
    if (section) {
      const rect = section.getBoundingClientRect();
      
      // Wenn der obere Teil der Sektion im oder über dem Viewport ist
      if (rect.top <= offset) {
        activeSection.value = sections[i];
        return;
      }
    }
  }
  
  // Fallback: Erste Sektion ist aktiv, wenn keine andere gefunden wurde
  activeSection.value = sections[0];
};

onMounted(() => {
  // Event-Listener für das Scrollen
  scrollListener = () => {
    determineActiveSection();
  };
  window.addEventListener('scroll', scrollListener);
  
  // Initial aktive Sektion bestimmen
  determineActiveSection();
});

onUnmounted(() => {
  // Event-Listener entfernen
  if (scrollListener) {
    window.removeEventListener('scroll', scrollListener);
  }
});
</script>

<style scoped>
header {
  padding: 2rem 0;
  position: fixed;
  width: 100%;
  top: 0;
  z-index: 100;
  transition: background-color 0.3s ease;
  background-color: rgba(24, 24, 27, 0.8);
  backdrop-filter: blur(10px);
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
}

.header-scrolled {
  background-color: rgba(24, 24, 27, 0.9);
  backdrop-filter: blur(10px);
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
}

nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  font-size: 1.8rem;
  font-weight: 700;
  color: var(--primary);
}

.nav-links {
  display: flex;
  gap: 2rem;
}

.nav-links a {
  color: var(--light);
  text-decoration: none;
  font-weight: 500;
  transition: color 0.3s ease;
  position: relative;
}

.nav-links a:hover {
  color: var(--primary);
}

.nav-links a::after {
  content: '';
  position: absolute;
  width: 0;
  height: 2px;
  bottom: -5px;
  left: 0;
  background-color: var(--primary);
  transition: width 0.3s ease;
}

.nav-links a:hover::after,
.nav-links a.active-link::after {
  width: 100%;
}

.nav-links a.active-link {
  color: var(--primary);
}

.mobile-menu-btn {
  display: none;
  background: none;
  border: none;
  color: var(--light);
  font-size: 1.5rem;
  cursor: pointer;
}

/* Mobile Styles */
@media (max-width: 768px) {
  .nav-links {
    position: fixed;
    top: 0;
    right: -300px;
    width: 300px;
    height: 100vh;
    background-color: var(--dark);
    flex-direction: column;
    padding: 2rem;
    transition: right 0.3s ease;
    z-index: 101;
  }
  
  .nav-links.active {
    right: 0;
    box-shadow: -5px 0 30px rgba(0, 0, 0, 0.2);
  }
  
  .mobile-menu-btn {
    display: block;
    z-index: 102;
  }
  
  .nav-links a {
    padding: 1rem 0;
    display: block;
  }
  
  .nav-links a::after {
    bottom: 0;
  }
}
</style>