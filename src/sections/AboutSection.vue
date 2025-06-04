<template>
  <section id="about" class="about">
    <div class="container">
      <h2 class="section-title">Über mich</h2>
      <div class="about-content">
        <div class="about-image">
          <img :src="profileImage" alt="Profilbild" @error="handleImageError">
        </div>
        <div class="about-text">
          <p>
            Ich bin ein leidenschaftlicher Junior Web Entwickler mit {{ new Date().getFullYear() - 2022 }} Jahren Erfahrung im Bereich der Webentwicklung.
            Während meinem Studium habe ich bei Klickmeister meine Karriere begonnen und dort an verschiedenen
            spannenden Projekten gearbeitet.
          </p>
          <p>
            Mein Fokus liegt auf der Entwicklung von modernen, responsiven und benutzerfreundlichen Websites und
            Webanwendungen. Dabei lege ich großen Wert auf sauberen, wartbaren Code und eine optimale Performance.
          </p>
          <p>
            Neben meiner Tätigkeit bei Klickmeister habe ich auch als Freelancer verschiedene Projekte umgesetzt und
            konnte so meine Fähigkeiten weiter ausbauen und vielseitige Erfahrungen sammeln.
          </p>
          <div class="skills">
            <div class="skill">HTML5</div>
            <div class="skill">CSS3</div>
            <div class="skill">JavaScript</div>
            <div class="skill">PHP</div>
            <div class="skill">Kirby CMS</div>
            <div class="skill">Vue.js</div>
            <div class="skill">Nuxt.js</div>
            <div class="skill">SCSS</div>
            <div class="skill">Node.js</div>
            <div class="skill">Bun.sh</div>
            <div class="skill">Express</div>
            <div class="skill">Docker</div>
            <div class="skill">k8s</div>
            <div class="skill">SQL</div>
            <div class="skill">Git</div>
            <div class="skill">CI / CD</div>
            <div class="skill">Responsive Design</div>
            <div class="skill">Figma</div>
            <div class="skill">DSGVO</div>
            <div class="skill">TTDSG</div>
            <div class="skill">Consent Management</div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { onMounted } from 'vue';
import { fadeInLeft, fadeInRight, staggerAnimation, scaleIn } from '@/utils/animations';

// Fallback für Bilder, die nicht geladen werden können
const handleImageError = (event) => {
  event.target.src = new URL('/placeholder-image.jpg', import.meta.url).href; // Stelle sicher, dass du dieses Bild hast
};

const profileImage = new URL('/philipp-profile.jpg', import.meta.url).href;

// GSAP Abschnittsanimation
const setupAboutAnimations = () => {
  const sectionTitle = document.querySelector('.about .section-title');
  const aboutImage = document.querySelector('.about-image');
  const aboutText = document.querySelector('.about-text');
  const skills = document.querySelectorAll('.skill');
  const paragraphs = document.querySelectorAll('.about-text p');
  
  if (sectionTitle) {
    scaleIn(sectionTitle);
  }
  
  if (aboutImage) {
    fadeInLeft(aboutImage, 0.2);
  }
  
  if (aboutText) {
    fadeInRight(aboutText, 0.4);
  }
  
  if (paragraphs.length > 0) {
    staggerAnimation(paragraphs, 0.1);
  }
  
  if (skills.length > 0) {
    staggerAnimation(skills, 0.05);
  }
};

onMounted(() => {
  setupAboutAnimations();
});
</script>

<style scoped>
.about {
  padding: var(--spacing-4xl) 0;
  position: relative;
}

.about-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--spacing-2xl);
  align-items: center;
}

.about-image {
  overflow: hidden;
  border-radius: var(--border-radius-md);
  box-shadow: var(--shadow-md);
  transform: translateY(50px);
  opacity: 0;
  height: 100%;
  background-color: var(--primary-light);
}

.about-image img {
  width: 100%;
  height: 100%;
  display: block;
  transition: all var(--transition-normal);
  object-fit: cover;
  filter: grayscale(1) brightness(0.8);
}

.about-image:hover img {
  transform: var(--transform-scale-up);
  filter: grayscale(0);
}

.about-text {
  transform: translateY(50px);
  opacity: 0;
}

.about-text p {
  margin-bottom: var(--spacing-md);
  line-height: 1.7;
  color: var(--gray);
}

.skills {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-sm);
  margin-top: var(--spacing-lg);
}

.skill {
  padding: var(--spacing-xs) var(--font-base);
  background-color: var(--primary-light);
  border-radius: var(--border-radius-lg);
  color: var(--primary);
  font-size: var(--font-xs);
  font-weight: var(--font-medium);
  transition: transform var(--transition-fast), background-color var(--transition-fast);
}

.skill:hover {
  transform: var(--transform-up);
  background-color: var(--primary-hover);
}

/* Responsive Anpassungen */
@media (max-width: var(--breakpoint-desktop)) {
  .about-content {
    grid-template-columns: 1fr;
    gap: var(--spacing-xl);
  }
  
  .about-image {
    max-width: 500px;
    margin: 0 auto;
  }
}
</style>