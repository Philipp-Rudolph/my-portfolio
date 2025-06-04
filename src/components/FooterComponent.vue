<template>
  <footer>
    <div class="container">
      <div class="social-links">
        <a href="https://github.com/Philipp-Rudolph" class="social-link">G</a>
        <a href="https://www.linkedin.com/in/philipp-f-rudolph/" class="social-link">L</a>
      </div>
      <div class="copyright">
        © {{ currentYear }} Philipp Rudolph. Alle Rechte vorbehalten.
      </div>
    </div>
  </footer>
</template>

<script setup>
// Der Footer benötigt hauptsächlich das aktuelle Jahr für das Copyright
const currentYear = new Date().getFullYear();
</script>

<style scoped>
footer {
  padding: var(--spacing-xl) 0;
  text-align: center;
  background-color: rgba(24, 24, 27, 0.8);
}
.social-links {
  display: flex;
  justify-content: center;
  gap: var(--spacing-md);
  margin-bottom: var(--spacing-lg);
}
.social-link {
  width: 40px;
  height: 40px;
  background-color: var(--primary-light);
  border-radius: var(--border-radius-full);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--primary);
  text-decoration: none;
  transition: transform var(--transition-fast), background-color var(--transition-fast);
}
.social-link:hover {
  transform: var(--transform-up);
  background-color: var(--primary);
  color: var(--dark);
}
.copyright {
  color: var(--gray);
  font-size: var(--font-xs);
}
</style>