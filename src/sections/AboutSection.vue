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
        </div>
      </div>
      
      <!-- New Skills Layout -->
      <h3 class="skills-heading">Meine Fähigkeiten</h3>
      <div class="skills-container">
        <div v-for="(skillType, index) in uniqueSkillTypes" :key="index" class="skills-category">
          <div class="category-header">
            <h4>{{ skillType.charAt(0).toUpperCase() + skillType.slice(1) }}</h4>
          </div>
          <div class="skills-grid">
            <div 
              v-for="skill in skills.filter(s => s.type === skillType)" 
              :key="skill.name"
              class="skill-card"
              :class="{ 'featured': skill.featured }"
            >
              <div class="skill-icon-wrapper">
                <div class="skill-icon-bg"></div>
                <div class="skill-level" :style="{ width: `${skill.level || 70}%` }"></div>
              </div>
              <span class="skill-name">{{ skill.name }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from 'vue';
import { isElementInViewport, animateOnScroll } from '../utils/animations';

import skills from '@/assets/data/skills.json';
console.log(skills);

// Add a 'featured' property to some skills if not already present
// This is just for demo purposes - you can remove this and manually set in your JSON instead
const enhancedSkills = skills.map((skill, index) => ({
  ...skill,
  featured: skill.featured || index % 5 === 0, // Every 5th skill is featured
  level: skill.level || Math.floor(Math.random() * 30) + 70 // Random level between 70-100% if not set
}));

const skillTypes = enhancedSkills.map(skill => skill.type);
const uniqueSkillTypes = [...new Set(skillTypes)];

console.log(uniqueSkillTypes);

// Fallback für Bilder, die nicht geladen werden können
const handleImageError = (event) => {
  event.target.src = new URL('/placeholder-image.jpg', import.meta.url).href;
};

const profileImage = new URL('/philipp-profile.jpg', import.meta.url).href;

// Animation functions
const animateAboutSection = () => {
  const aboutImage = document.querySelector('.about-image');
  const aboutText = document.querySelector('.about-text');
  const skillsCategories = document.querySelectorAll('.skills-category');
  
  if (aboutImage) animateOnScroll(aboutImage);
  if (aboutText) animateOnScroll(aboutText);
  
  skillsCategories.forEach((category, index) => {
    if (isElementInViewport(category)) {
      setTimeout(() => {
        category.classList.add('animate-in');
        
        // Animate individual skill cards with staggered delay
        const cards = category.querySelectorAll('.skill-card');
        cards.forEach((card, cardIndex) => {
          setTimeout(() => {
            card.classList.add('animate-in');
          }, 100 * cardIndex);
        });
      }, 200 * index);
    }
  });
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
  height: 100%;
  overflow: hidden;
  border-radius: 10px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
  transform: translateY(50px);
  opacity: 0;
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
  background-color: rgba(255, 255, 255, 0.02);
  padding: 2rem;
  border-radius: 1rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
}

.about-text p {
  margin-bottom: 1.5rem;
  line-height: 1.7;
  color: var(--gray);
}

/* New Skills Styling */
.skills-heading {
  margin: 5rem 0 2rem;
  font-size: 1.8rem;
  text-align: center;
  background: linear-gradient(90deg, var(--primary), var(--primary-light));
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  position: relative;
}

.skills-heading:after {
  content: '';
  position: absolute;
  bottom: -10px;
  left: 50%;
  transform: translateX(-50%);
  width: 80px;
  height: 3px;
  background: var(--primary);
  border-radius: 3px;
}

.skills-container {
  margin-top: 3rem;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2.5rem;
}

.skills-category {
  background-color: rgba(255, 255, 255, 0.02);
  border-radius: 1rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
  transform: translateY(30px);
  opacity: 0;
  transition: transform 0.6s ease, opacity 0.6s ease;
}

.skills-category.animate-in {
  transform: translateY(0);
  opacity: 1;
}

.category-header {
  margin-bottom: 1.5rem;
  position: relative;
}

.category-header h4 {
  font-size: 1.3rem;
  margin: 0;
  padding-bottom: 0.5rem;
  position: relative;
  display: inline-block;
}

.category-header h4:after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 40px;
  height: 2px;
  background: var(--primary);
  border-radius: 2px;
}

.skills-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(130px, 1fr));
  gap: 1rem;
}

.skill-card {
  background-color: rgba(45, 212, 191, 0.04);
  border-radius: 12px;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: all 0.3s ease;
  transform: translateY(20px);
  opacity: 0;
  position: relative;
  overflow: hidden;
}

.skill-card.animate-in {
  transform: translateY(0);
  opacity: 1;
}

.skill-card:hover {
  transform: translateY(-5px);
  background-color: rgba(45, 212, 191, 0.08);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
}

.skill-card.featured {
  background-color: rgba(45, 212, 191, 0.1);
  box-shadow: 0 5px 15px rgba(45, 212, 191, 0.15);
}

.skill-card.featured:hover {
  background-color: rgba(45, 212, 191, 0.15);
  box-shadow: 0 10px 25px rgba(45, 212, 191, 0.2);
}

.skill-icon-wrapper {
  width: 60px;
  height: 60px;
  margin-bottom: 0.8rem;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.skill-icon-bg {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.05);
  position: absolute;
}

.skill-level {
  position: absolute;
  bottom: 0;
  left: 0;
  height: 3px;
  background: linear-gradient(90deg, var(--primary), var(--primary-light));
  border-radius: 3px;
  transition: width 1s ease-in-out;
}

.skill-name {
  font-size: 0.85rem;
  font-weight: 500;
  color: var(--gray);
  text-align: center;
  transition: color 0.3s ease;
}

.skill-card:hover .skill-name {
  color: var(--primary);
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
  
  .skills-container {
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  }
}

@media (max-width: 768px) {
  .skills-grid {
    grid-template-columns: repeat(auto-fill, minmax(110px, 1fr));
  }
}

@media (max-width: 480px) {
  .skills-grid {
    grid-template-columns: repeat(auto-fill, minmax(90px, 1fr));
  }
  
  .skill-card {
    padding: 0.8rem;
  }
  
  .skill-icon-wrapper {
    width: 50px;
    height: 50px;
  }
}
</style>