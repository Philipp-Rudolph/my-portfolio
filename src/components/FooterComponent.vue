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
  padding: 3rem 0;
  text-align: center;
  background-color: rgba(24, 24, 27, 0.8);
}
.social-links {
  display: flex;
  justify-content: center;
  gap: 1.5rem;
  margin-bottom: 2rem;
}
.social-link {
  width: 40px;
  height: 40px;
  background-color: rgba(45, 212, 191, 0.1);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--primary);
  text-decoration: none;
  transition: transform 0.3s ease, background-color 0.3s ease;
}
.social-link:hover {
  transform: translateY(-5px);
  background-color: var(--primary);
  color: var(--dark);
}
.copyright {
  color: var(--gray);
  font-size: 0.9rem;
}
</style>