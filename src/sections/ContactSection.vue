<template>
  <section id="contact" class="contact">
    <div class="container">
      <h2 class="section-title">Kontakt</h2>
      <div class="contact-content">
        <div class="contact-info">
          <p>
            Haben Sie ein Projekt im Sinn oder suchen Sie nach einem Web Entwickler, der Ihr Team verstärkt? Ich freue
            mich darauf, von Ihnen zu hören. Lassen Sie uns gemeinsam Ihre Ideen zum Leben erwecken!
          </p>
          <div class="contact-method">
            <div class="contact-icon">✉</div>
            <a href="mailto:deine.email@beispiel.de">me@philipp-rudolph.dev</a>
          </div>
          <!-- <div class="contact-method">
            <div class="contact-icon">☎</div>
            <a href="tel:+491234567890">+49 1234 567890</a>
          </div> -->
          <div class="contact-method">
            <div class="contact-icon">📍</div>
            <span>Köln, Deutschland</span>
          </div>
        </div>
        <div class="contact-form">
          <form @submit.prevent="submitForm">
            <div class="form-group">
              <input type="text" class="form-control" placeholder="Name" v-model="formData.name" required>
            </div>
            <div class="form-group">
              <input type="email" class="form-control" placeholder="E-Mail" v-model="formData.email" required>
            </div>
            <div class="form-group">
              <input type="text" class="form-control" placeholder="Betreff" v-model="formData.subject" required>
            </div>
            <div class="form-group">
              <textarea class="form-control" placeholder="Nachricht" v-model="formData.message" required></textarea>
            </div>
            <button type="submit" class="submit-btn">Nachricht senden</button>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { reactive, onMounted, onUnmounted } from 'vue';
import { isElementInViewport, animateOnScroll } from '@/utils/animations';

const formData = reactive({
  name: '',
  email: '',
  subject: '',
  message: '',
});

// Formular absenden
const submitForm = () => {
  // Hier würde normalerweise der Code für das Senden des Formulars stehen
  // Zum Beispiel mit Axios oder Fetch API
  // axios.post('/api/contact', formData)
  //   .then(response => {
  //     alert('Vielen Dank! Deine Nachricht wurde gesendet.');
  //     formData.name = '';
  //     formData.email = '';
  //     formData.subject = '';
  //     formData.message = '';
  //   })
  //   .catch(error => {
  //     console.error('Fehler beim Senden der Nachricht:', error);
  //     alert('Es gab ein Problem beim Senden deiner Nachricht. Bitte versuche es später erneut.');
  //   });

  alert(`Vielen Dank, ${formData.name}! Deine Nachricht wurde gesendet.`);
  formData.name = '';
  formData.email = '';
  formData.subject = '';
  formData.message = '';
};

// Kontaktbereichsanimation
const animateContactSection = () => {
  const contactInfo = document.querySelector('.contact-info');
  const contactForm = document.querySelector('.contact-form');
  
  if (contactInfo) animateOnScroll(contactInfo);
  if (contactForm) animateOnScroll(contactForm);
};

onMounted(() => {
  window.addEventListener('scroll', animateContactSection);
  // Initial-Check
  setTimeout(animateContactSection, 1000);
});

onUnmounted(() => {
  window.removeEventListener('scroll', animateContactSection);
});
</script>

<style scoped>
.contact {
    padding: 8rem 0;
    background-color: rgba(45, 212, 191, 0.03);
}

.contact-content {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 4rem;
}

.contact-info {
    transform: translateY(50px);
    opacity: 0;
}

.contact-info p {
    color: var(--gray);
    margin-bottom: 2rem;
    line-height: 1.7;
}

.contact-method {
    display: flex;
    align-items: center;
    margin-bottom: 1.5rem;
}

.contact-icon {
    width: 40px;
    height: 40px;
    background-color: rgba(45, 212, 191, 0.1);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 1rem;
    color: var(--primary);
    font-size: 1.2rem;
}

.contact-method a {
    color: var(--light);
    text-decoration: none;
    transition: color 0.3s ease;
}

.contact-method a:hover {
    color: var(--primary);
}

.contact-form {
    transform: translateY(50px);
    opacity: 0;
}

.form-group {
    margin-bottom: 1.5rem;
}

.form-control {
    width: 100%;
    padding: 1rem;
    background-color: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 4px;
    color: var(--light);
    font-size: 1rem;
    transition: border-color 0.3s ease, box-shadow 0.3s ease;
}

.form-control:focus {
    outline: none;
    border-color: var(--primary);
    box-shadow: 0 0 0 3px rgba(45, 212, 191, 0.2);
}

textarea.form-control {
    min-height: 150px;
    resize: vertical;
}

.submit-btn {
    padding: 0.8rem 2rem;
    background-color: var(--primary);
    color: var(--dark);
    border: none;
    border-radius: 4px;
    font-weight: 600;
    font-size: 1rem;
    cursor: pointer;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.submit-btn:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(45, 212, 191, 0.3);
}

@media (max-width: 768px) {
    .contact-content {
        grid-template-columns: 1fr;
        gap: 2rem;
    }
}
</style>