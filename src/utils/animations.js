// src/utils/animations.js
export const isElementInViewport = (el) => {
  const rect = el.getBoundingClientRect();
  return (
    rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.8
  );
};

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