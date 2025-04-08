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
import { onMounted, onUnmounted } from 'vue';
import { isElementInViewport, animateOnScroll } from '../utils/animations';

// Fallback für Bilder, die nicht geladen werden können
const handleImageError = (event) => {
  event.target.src = new URL('/placeholder-image.jpg', import.meta.url).href; // Stelle sicher, dass du dieses Bild hast
};

const profileImage = new URL('/philipp-profile.jpg', import.meta.url).href;

// Abschnittsanimation
const animateAboutSection = () => {
  const aboutImage = document.querySelector('.about-image');
  const aboutText = document.querySelector('.about-text');
  
  if (aboutImage) animateOnScroll(aboutImage);
  if (aboutText) animateOnScroll(aboutText);
};

onMounted(() => {
  window.addEventListener('scroll', animateAboutSection);
  // Initial-Check
  setTimeout(animateAboutSection, 1000);
});

onUnmounted(() => {
  window.removeEventListener('scroll', animateAboutSection);
});
</script>

<style scoped>
.about {
  padding: 8rem 0;
  position: relative;
}

.about-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
}

.about-image {
  overflow: hidden;
  border-radius: 10px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
  transform: translateY(50px);
  opacity: 0;
  height: 400px;
  background-color: rgba(45, 212, 191, 0.05); 
}

.about-image img {
  width: 100%;
  height: 100%;
  display: block;
  transition: all 0.5s ease;
  object-fit: cover;
  filter: grayscale(1) brightness(0.8);
}

.about-image:hover img {
  transform: scale(1.05);
  filter: grayscale(0);
}

.about-text {
  transform: translateY(50px);
  opacity: 0;
}

.about-text p {
  margin-bottom: 1.5rem;
  line-height: 1.7;
  color: var(--gray);
}

.skills {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-top: 2rem;
}

.skill {
  padding: 0.5rem 1.2rem;
  background-color: rgba(45, 212, 191, 0.1);
  border-radius: 20px;
  color: var(--primary);
  font-size: 0.9rem;
  font-weight: 500;
  transition: transform 0.3s ease, background-color 0.3s ease;
}

.skill:hover {
  transform: translateY(-5px);
  background-color: rgba(45, 212, 191, 0.2);
}

/* Responsive Anpassungen */
@media (max-width: 992px) {
  .about-content {
    grid-template-columns: 1fr;
    gap: 3rem;
  }
  
  .about-image {
    max-width: 500px;
    margin: 0 auto;
  }
}
</style>