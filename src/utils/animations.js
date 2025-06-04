// src/utils/animations.js
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const isElementInViewport = (el) => {
  const rect = el.getBoundingClientRect();
  return (
    rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.8
  );
};

// Legacy animation function for backward compatibility
export const animateOnScroll = (element, index = 0, delay = 0) => {
  if (element && isElementInViewport(element)) {
    setTimeout(() => {
      element.style.opacity = '1';
      element.style.transform = 'translateY(0)';
      element.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    }, index * delay);
    return true;
  }
  return false;
};

// GSAP Animation utilities
export const fadeInUp = (element, delay = 0) => {
  gsap.fromTo(element, 
    { opacity: 0, y: 100 },
    { 
      opacity: 1, 
      y: 0, 
      duration: 1,
      delay,
      ease: "power3.out",
      scrollTrigger: {
        trigger: element,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reverse"
      }
    }
  );
};

export const fadeInLeft = (element, delay = 0) => {
  gsap.fromTo(element,
    { opacity: 0, x: -100 },
    {
      opacity: 1,
      x: 0,
      duration: 1,
      delay,
      ease: "power3.out",
      scrollTrigger: {
        trigger: element,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reverse"
      }
    }
  );
};

export const fadeInRight = (element, delay = 0) => {
  gsap.fromTo(element,
    { opacity: 0, x: 100 },
    {
      opacity: 1,
      x: 0,
      duration: 1,
      delay,
      ease: "power3.out",
      scrollTrigger: {
        trigger: element,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reverse"
      }
    }
  );
};

export const staggerAnimation = (elements, delay = 0.1) => {
  gsap.fromTo(elements,
    { opacity: 0, y: 50 },
    {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power3.out",
      stagger: delay,
      scrollTrigger: {
        trigger: elements[0],
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reverse"
      }
    }
  );
};

export const scaleIn = (element, delay = 0) => {
  gsap.fromTo(element,
    { opacity: 0, scale: 0.8 },
    {
      opacity: 1,
      scale: 1,
      duration: 1,
      delay,
      ease: "back.out(1.7)",
      scrollTrigger: {
        trigger: element,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reverse"
      }
    }
  );
};

export const typewriter = (element, text, speed = 50) => {
  element.textContent = '';
  const chars = text.split('');
  
  gsap.to({}, {
    duration: chars.length * speed / 1000,
    ease: "none",
    onUpdate: function() {
      const progress = this.progress();
      const currentIndex = Math.floor(progress * chars.length);
      element.textContent = chars.slice(0, currentIndex).join('');
    },
    scrollTrigger: {
      trigger: element,
      start: "top 80%",
      toggleActions: "play none none none"
    }
  });
};