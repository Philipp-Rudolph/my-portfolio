<template>
  <header :class="{ 'header-scrolled': scrolled }">
    <div class="container">
      <nav>
        <div class="logo">Portfolio.</div>
        <div class="nav-links" :class="{ 'active': mobileMenuOpen }">
          <a href="#home" @click.prevent="scrollToSection('home')">Home</a>
          <a href="#about" @click.prevent="scrollToSection('about')">Über mich</a>
          <a href="#projects" @click.prevent="scrollToSection('projects')">Projekte</a>
          <a href="#experience" @click.prevent="scrollToSection('experience')">Erfahrung</a>
          <a href="#contact" @click.prevent="scrollToSection('contact')">Kontakt</a>
        </div>
        <button class="mobile-menu-btn" @click.stop="toggleMobileMenu" aria-label="Menü öffnen">☰</button>
      </nav>
    </div>
  </header>
</template>

<script setup>
import { ref, defineProps } from 'vue';

defineProps({
  scrolled: Boolean
});

const mobileMenuOpen = ref(false);

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
  }
  mobileMenuOpen.value = false;
};
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

.nav-links a:hover::after {
  width: 100%;
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