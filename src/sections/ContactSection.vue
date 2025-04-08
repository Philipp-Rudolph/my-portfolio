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
            <a href="mailto:me@philipp-rudolph.dev">me@philipp-rudolph.dev</a>
          </div>
          <div class="contact-method">
            <div class="contact-icon">📍</div>
            <span>Köln, Deutschland</span>
          </div>
        </div>
        <div class="contact-form">
          <!-- Status-Meldung -->
          <div v-if="formStatus.visible" class="form-status" :class="{ 'success': formStatus.success, 'error': !formStatus.success }">
            {{ formStatus.message }}
          </div>
          
          <!-- Formular ohne action-Attribut, da wir es über JavaScript abschicken -->
          <form id="contactForm" @submit.prevent="submitForm">
            <div class="form-group">
              <input type="text" name="name" class="form-control" placeholder="Name" v-model="formData.name" required>
            </div>
            <div class="form-group">
              <input type="email" name="email" class="form-control" placeholder="E-Mail" v-model="formData.email" required>
            </div>
            <div class="form-group">
              <input type="text" name="subject" class="form-control" placeholder="Betreff" v-model="formData.subject" required>
            </div>
            <div class="form-group">
              <textarea name="message" class="form-control" placeholder="Nachricht" v-model="formData.message" required></textarea>
            </div>
            
            <!-- Spam-Falle (Honeypot) -->
            <input type="text" name="_gotcha" style="display: none">
            
            <button type="submit" class="submit-btn" :disabled="isSubmitting">
              {{ isSubmitting ? 'Wird gesendet...' : 'Nachricht senden' }}
            </button>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { reactive, ref, onMounted, onUnmounted } from 'vue';
import { isElementInViewport, animateOnScroll } from '@/utils/animations';

// Formspree-URL (ersetze mit deiner ID)
const FORMSPREE_URL = 'https://formspree.io/f/mjkypnky';

const formData = reactive({
  name: '',
  email: '',
  subject: '',
  message: '',
});

const isSubmitting = ref(false);
const formStatus = ref({ 
  success: false, 
  message: '',
  visible: false 
});

// Vereinfachte Formular-Absende-Funktion
const submitForm = async () => {
  try {
    isSubmitting.value = true;
    
    // Einfache Formular-Daten erstellen
    const formDataToSend = new FormData();
    formDataToSend.append('name', formData.name);
    formDataToSend.append('email', formData.email);
    formDataToSend.append('subject', formData.subject);
    formDataToSend.append('message', formData.message);
    
    // Wichtig: Accept-Header auf application/json setzen
    const response = await fetch(FORMSPREE_URL, {
      method: 'POST',
      body: formDataToSend,
      headers: {
        'Accept': 'application/json'
      }
    });
    
    const result = await response.json();
    
    if (result.ok) {
      // Erfolgsmeldung
      formStatus.value = {
        success: true,
        message: `Vielen Dank, ${formData.name}! Deine Nachricht wurde gesendet.`,
        visible: true
      };
      
      // Formular zurücksetzen
      formData.name = '';
      formData.email = '';
      formData.subject = '';
      formData.message = '';
    } else {
      throw new Error(result.error || 'Formular konnte nicht gesendet werden');
    }
  } catch (error) {
    console.error('Fehler beim Senden:', error);
    
    // Fehlermeldung
    formStatus.value = {
      success: false,
      message: 'Es gab ein Problem beim Senden deiner Nachricht. Bitte versuche es später erneut.',
      visible: true
    };
  } finally {
    isSubmitting.value = false;
    
    // Statusmeldung nach 5 Sekunden ausblenden
    setTimeout(() => {
      formStatus.value.visible = false;
    }, 5000);
  }
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

.form-status {
  margin-bottom: 1rem;
  padding: 1rem;
  border-radius: 4px;
  font-size: 0.9rem;
  text-align: center;
  transition: opacity 0.3s ease;
  opacity: 1;
}

.form-status.success {
  background-color: rgba(45, 212, 191, 0.1);
  color: var(--primary);
}

.form-status.error {
  background-color: rgba(255, 0, 0, 0.1);
  color: var(--red);
}

.form-status.hidden {
  opacity: 0;
}

@media (max-width: 768px) {
  .contact-content {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
}
</style>