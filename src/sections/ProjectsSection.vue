<template>
  <section id="projects" class="projects">
    <div class="container">
      <h2 class="section-title">Meine Projekte</h2>
      <div class="projects-grid">
        <div v-for="(project, index) in projects" :key="index" class="project-card">
          <div class="project-image">
            <img :src="project.image" :alt="project.title" @error="handleImageError">
            <div class="project-hover-overlay">
              <div class="project-links overlay-links">
                <a :href="project.demoLink" target="_blank" class="project-demo">Live Demo</a>
              </div>
            </div>
          </div>
          <div class="project-content">
            <h3 class="project-title">{{ project.title }}</h3>
            <p class="project-description">{{ project.description }}</p>
            <div class="project-tech">
              <span v-for="(tech, i) in project.technologies" :key="i">
                {{ tech }}{{ i < project.technologies.length - 1 ? ' • ' : '' }}
              </span>
            </div>
            <!-- <div class="project-links">
              <a :href="project.demoLink" class="project-demo">Live Demo</a>
              <a :href="project.codeLink" class="project-code">Code</a>
            </div> -->
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { isElementInViewport, animateOnScroll } from '../utils/animations';
import projectsData from '@/assets/data/projects.json';

const projects = ref(projectsData);

// Fallback für Bilder, die nicht geladen werden können
const handleImageError = (event) => {
  event.target.src = '/placeholder.webp'; // Platzhalter-Bild (erstelle dieses in deinem public-Ordner)
};

// Projektkartenanimation
const animateProjectCards = () => {
  const projectCards = document.querySelectorAll('.project-card');
  projectCards.forEach((card, index) => {
    animateOnScroll(card, index, 100);
  });
};

onMounted(() => {
  window.addEventListener('scroll', animateProjectCards);
  // Initial-Check
  setTimeout(animateProjectCards, 1000);
});

onUnmounted(() => {
  window.removeEventListener('scroll', animateProjectCards);
});
</script>

<style scoped>
.projects {
  padding: 8rem 0;
  background-color: rgba(45, 212, 191, 0.03);
}

.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 2rem;
}

.project-card {
  background-color: var(--dark);
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  opacity: 0;
  transform: translateY(50px);
}

.project-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 20px 40px rgba(45, 212, 191, 0.1);
}

.project-image {
  height: 200px;
  overflow: hidden;
  position: relative;
}

.project-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.project-card:hover .project-image img {
  transform: scale(1.05);
}

/* Hover-Overlay für bessere mobile Erfahrung */
.project-hover-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(45, 212, 190, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.project-card:hover .project-hover-overlay {
  opacity: 1;
}

.overlay-links {
  flex-direction: column;
}

.project-content {
  padding: 1.5rem;
}

.project-title {
  font-size: 1.4rem;
  margin-bottom: 1rem;
}

.project-description {
  color: var(--gray);
  margin-bottom: 1.5rem;
  font-size: 0.95rem;
  line-height: 1.6;
}

.project-tech {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
}

.project-tech span {
  font-size: 0.8rem;
  color: var(--primary);
}

.project-links {
  display: flex;
  gap: 1rem;
}

.project-links a {
  padding: 0.5rem 1rem;
  border-radius: 4px;
  font-size: 0.9rem;
  font-weight: 500;
  text-decoration: none;
  transition: background-color 0.3s ease;
}

.project-demo {
  background-color: var(--primary);
  color: var(--dark);
}

.project-demo:hover {
  background-color: rgba(45, 212, 191, 0.8);
}

.project-code {
  background-color: rgba(45, 212, 191, 0.1);
  color: var(--primary);
}

.project-code:hover {
  background-color: rgba(45, 212, 191, 0.2);
}

/* Responsive Anpassungen */
@media (max-width: 768px) {
  .projects-grid {
    grid-template-columns: 1fr;
  }
  
  .overlay-links a {
    margin-bottom: 0.5rem;
  }
}
</style>