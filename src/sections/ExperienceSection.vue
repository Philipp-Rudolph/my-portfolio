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
import { ref, onMounted, onUnmounted } from 'vue';
import { isElementInViewport, animateOnScroll } from '../utils/animations';
import experienceData from '@/assets/data/experience.json';

const experience = ref(experienceData);

// Timeline-Einträge animieren
const animateTimelineItems = () => {
  const timelineItems = document.querySelectorAll('.timeline-item');
  timelineItems.forEach((item, index) => {
    animateOnScroll(item, index, 150);
  });
};

onMounted(() => {
  window.addEventListener('scroll', animateTimelineItems);
  // Initial-Check
  setTimeout(animateTimelineItems, 1000);
});

onUnmounted(() => {
  window.removeEventListener('scroll', animateTimelineItems);
});
</script>

<style scoped>
.experience {
  padding: 8rem 0;
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
  background-color: rgba(45, 212, 191, 0.2);
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
  transform: translateY(50px);
}

.timeline-item::after {
  content: '';
  position: absolute;
  width: 20px;
  height: 20px;
  background-color: var(--primary);
  border-radius: 50%;
  top: 15px;
  z-index: 1;
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
  padding: 1.5rem;
  background-color: rgba(45, 212, 191, 0.05);
  border-radius: 8px;
  position: relative;
}

.timeline-date {
  font-size: 0.9rem;
  color: var(--primary);
  margin-bottom: 0.5rem;
  font-weight: 500;
}

.timeline-title {
  font-size: 1.2rem;
  margin-bottom: 1rem;
}

.timeline-description {
  color: var(--gray);
  font-size: 0.95rem;
  line-height: 1.6;
}

/* Responsive Layout für mobile Geräte */
@media (max-width: 768px) {
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