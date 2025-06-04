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
import { ref, onMounted } from 'vue';
import { gsap } from 'gsap';
import { scaleIn } from '@/utils/animations';
import projectsData from '@/assets/data/projects.json';

const projects = ref(projectsData);

// Fallback für Bilder, die nicht geladen werden können
const handleImageError = (event) => {
  event.target.src = '/placeholder.jpg'; // Platzhalter-Bild (erstelle dieses in deinem public-Ordner)
};

// GSAP Projektkartenanimation
const setupProjectAnimations = () => {
  const sectionTitle = document.querySelector('.projects .section-title');
  const projectCards = document.querySelectorAll('.project-card');
  
  if (sectionTitle) {
    scaleIn(sectionTitle);
  }
  
  if (projectCards.length > 0) {
    // Staggered card animation with enhanced effects
    gsap.fromTo(projectCards,
      { 
        opacity: 0, 
        y: 80,
        scale: 0.8,
        rotationY: 15
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        rotationY: 0,
        duration: 1,
        ease: "back.out(1.7)",
        stagger: {
          amount: 0.8,
          from: "start"
        },
        scrollTrigger: {
          trigger: projectCards[0],
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse"
        }
      }
    );
    
    // Add hover animations for each card
    projectCards.forEach(card => {
      const image = card.querySelector('.project-image img');
      const overlay = card.querySelector('.project-hover-overlay');
      
      // Enhanced hover effect
      card.addEventListener('mouseenter', () => {
        gsap.to(card, {
          y: -10,
          scale: 1.02,
          duration: 0.3,
          ease: "power2.out"
        });
        
        if (image) {
          gsap.to(image, {
            scale: 1.1,
            duration: 0.5,
            ease: "power2.out"
          });
        }
        
        if (overlay) {
          gsap.to(overlay, {
            opacity: 1,
            duration: 0.3,
            ease: "power2.out"
          });
        }
      });
      
      card.addEventListener('mouseleave', () => {
        gsap.to(card, {
          y: 0,
          scale: 1,
          duration: 0.3,
          ease: "power2.out"
        });
        
        if (image) {
          gsap.to(image, {
            scale: 1,
            duration: 0.5,
            ease: "power2.out"
          });
        }
        
        if (overlay) {
          gsap.to(overlay, {
            opacity: 0,
            duration: 0.3,
            ease: "power2.out"
          });
        }
      });
    });
  }
};

onMounted(() => {
  setupProjectAnimations();
});
</script>

<style scoped>
.projects {
  padding: var(--spacing-4xl) 0;
  background-color: var(--primary-light);
}

.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: var(--spacing-lg);
}

.project-card {
  background-color: var(--dark);
  border-radius: var(--border-radius-md);
  overflow: hidden;
  box-shadow: var(--shadow-md);
  transition: transform var(--transition-fast), box-shadow var(--transition-fast);
  opacity: 0;
  transform: var(--transform-down);
}

.project-card:hover {
  transform: var(--transform-up);
  box-shadow: var(--shadow-sm);
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
  transition: transform var(--transition-normal);
}

.project-card:hover .project-image img {
  transform: var(--transform-scale-up);
}

/* Hover-Overlay für bessere mobile Erfahrung */
.project-hover-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: var(--primary-muted);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity var(--transition-fast);
}

.project-card:hover .project-hover-overlay {
  opacity: 1;
}

.overlay-links {
  flex-direction: column;
}

.project-content {
  padding: var(--spacing-md);
}

.project-title {
  font-size: var(--font-lg);
  margin-bottom: var(--spacing-sm);
}

.project-description {
  color: var(--gray);
  margin-bottom: var(--spacing-md);
  font-size: var(--font-xs);
  line-height: 1.6;
}

.project-tech {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-xs);
  margin-bottom: var(--spacing-md);
}

.project-tech span {
  font-size: var(--font-xs);
  color: var(--primary);
}

.project-links {
  display: flex;
  gap: var(--spacing-sm);
}

.project-links a {
  padding: var(--spacing-xs) var(--spacing-sm);
  border-radius: var(--border-radius-sm);
  font-size: var(--font-xs);
  font-weight: var(--font-medium);
  text-decoration: none;
  transition: background-color var(--transition-fast);
}

.project-demo {
  background-color: var(--primary);
  color: var(--dark);
}

.project-demo:hover {
  background-color: var(--primary-shadow);
}

.project-code {
  background-color: var(--primary-light);
  color: var(--primary);
}

.project-code:hover {
  background-color: var(--primary-hover);
}

/* Responsive Anpassungen */
@media (max-width: var(--breakpoint-tablet)) {
  .projects-grid {
    grid-template-columns: 1fr;
  }
  
  .overlay-links a {
    margin-bottom: var(--spacing-xs);
  }
}
</style>