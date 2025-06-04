<template>
  <section id="experience" class="experience">
    <div class="container">
      <h2 class="section-title">Meine Erfahrung</h2>
      <div class="timeline">
        <div 
          v-for="(item, index) in experience" 
          :key="index" 
          class="timeline-item"
          :class="index % 2 === 0 ? 'left' : 'right'"
        >
          <div class="timeline-content">
            <div class="timeline-date">{{ item.date }}</div>
            <h3 class="timeline-title">{{ item.title }} - {{ item.company }}</h3>
            <p class="timeline-description">{{ item.description }}</p>
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
import experienceData from '@/assets/data/experience.json';

const experience = ref(experienceData);

// GSAP Timeline Animationen
const setupExperienceAnimations = () => {
  const sectionTitle = document.querySelector('.experience .section-title');
  const timelineItems = document.querySelectorAll('.timeline-item');
  
  if (sectionTitle) {
    scaleIn(sectionTitle);
  }
  
  // Animate the timeline line drawing
  if (timelineItems.length > 0) {
    gsap.fromTo('.timeline::after', 
      { scaleY: 0, transformOrigin: "top" },
      {
        scaleY: 1,
        duration: 1.5,
        ease: "power2.out",
        scrollTrigger: {
          trigger: '.timeline',
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse"
        }
      }
    );
  }
  
  // Animate timeline items
  timelineItems.forEach((item) => {
    const isLeft = item.classList.contains('left');
    const content = item.querySelector('.timeline-content');
    
    // Initial setup for the entire item
    gsap.set(item, { opacity: 0 });
    gsap.set(content, { x: isLeft ? -80 : 80, y: 30 });
    
    // Create animation for the entire timeline item
    gsap.fromTo(item,
      { opacity: 0 },
      {
        opacity: 1,
        duration: 0.6,
        ease: "power2.out",
        scrollTrigger: {
          trigger: item,
          start: "top 85%",
          end: "bottom 20%",
          toggleActions: "play none none reverse"
        }
      }
    );
    
    // Animate content sliding in
    gsap.fromTo(content,
      { x: isLeft ? -80 : 80, y: 30 },
      {
        x: 0,
        y: 0,
        duration: 0.8,
        delay: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: item,
          start: "top 85%",
          end: "bottom 20%",
          toggleActions: "play none none reverse"
        }
      }
    );
    
    // Add a subtle hover effect
    item.addEventListener('mouseenter', () => {
      gsap.to(content, {
        scale: 1.02,
        y: -5,
        duration: 0.3,
        ease: "power2.out"
      });
    });
    
    item.addEventListener('mouseleave', () => {
      gsap.to(content, {
        scale: 1,
        y: 0,
        duration: 0.3,
        ease: "power2.out"
      });
    });
  });
};

onMounted(() => {
  setupExperienceAnimations();
});
</script>

<style scoped>
.experience {
  padding: var(--spacing-4xl) 0;
}

.timeline {
  position: relative;
  max-width: 800px;
  margin: 0 auto;
}

.timeline::after {
  content: '';
  position: absolute;
  width: 2px;
  background-color: var(--primary-hover);
  top: 0;
  bottom: 0;
  left: 50%;
  margin-left: -1px;
}

.timeline-item {
  padding: 10px 40px;
  position: relative;
  width: 50%;
  opacity: 0;
  transform: var(--transform-down);
}

.timeline-item::after {
  content: '';
  position: absolute;
  width: 20px;
  height: 20px;
  background-color: var(--primary);
  border-radius: var(--border-radius-full);
  top: 15px;
  z-index: var(--z-content);
}

.left {
  left: 0;
}

.right {
  left: 50%;
}

.left::after {
  right: -10px;
}

.right::after {
  left: -10px;
}

.timeline-content {
  padding: var(--spacing-md);
  background-color: var(--primary-light);
  border-radius: var(--border-radius-md);
  position: relative;
}

.timeline-date {
  font-size: var(--font-xs);
  color: var(--primary);
  margin-bottom: var(--spacing-xs);
  font-weight: var(--font-medium);
}

.timeline-title {
  font-size: var(--font-base);
  margin-bottom: var(--spacing-sm);
}

.timeline-description {
  color: var(--gray);
  font-size: var(--font-xs);
  line-height: 1.6;
}

/* Responsive Layout für mobile Geräte */
@media (max-width: var(--breakpoint-tablet)) {
  .timeline::after {
    left: 31px;
  }
  
  .timeline-item {
    width: 100%;
    padding-left: 70px;
    padding-right: 25px;
  }
  
  .timeline-item::after {
    left: 21px;
  }
  
  .right {
    left: 0;
  }
}
</style>