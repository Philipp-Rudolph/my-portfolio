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
import { reactive, ref, onMounted } from 'vue';
import { gsap } from 'gsap';
import { scaleIn, fadeInLeft, fadeInRight } from '@/utils/animations';

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

// GSAP Kontaktbereichsanimation
const setupContactAnimations = () => {
  const sectionTitle = document.querySelector('.contact .section-title');
  const contactInfo = document.querySelector('.contact-info');
  const contactForm = document.querySelector('.contact-form');
  const contactMethods = document.querySelectorAll('.contact-method');
  const formGroups = document.querySelectorAll('.form-group');
  const submitBtn = document.querySelector('.submit-btn');
  
  if (sectionTitle) {
    scaleIn(sectionTitle);
  }
  
  if (contactInfo) {
    fadeInLeft(contactInfo, 0.2);
  }
  
  if (contactForm) {
    fadeInRight(contactForm, 0.4);
  }
  
  if (contactMethods.length > 0) {
    gsap.fromTo(contactMethods,
      { opacity: 0, x: -50, scale: 0.9 },
      {
        opacity: 1,
        x: 0,
        scale: 1,
        duration: 0.8,
        ease: "back.out(1.7)",
        stagger: 0.1,
        scrollTrigger: {
          trigger: contactMethods[0],
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse"
        }
      }
    );
  }
  
  if (formGroups.length > 0) {
    gsap.fromTo(formGroups,
      { opacity: 0, y: 30, scale: 0.95 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.6,
        ease: "power3.out",
        stagger: 0.08,
        scrollTrigger: {
          trigger: formGroups[0],
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse"
        }
      }
    );
  }
  
  if (submitBtn) {
    gsap.fromTo(submitBtn,
      { opacity: 0, y: 20, scale: 0.9 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        ease: "back.out(2)",
        scrollTrigger: {
          trigger: submitBtn,
          start: "top 90%",
          end: "bottom 20%",
          toggleActions: "play none none reverse"
        }
      }
    );
    
    // Enhanced button hover animation
    submitBtn.addEventListener('mouseenter', () => {
      gsap.to(submitBtn, {
        scale: 1.05,
        y: -3,
        duration: 0.3,
        ease: "power2.out"
      });
    });
    
    submitBtn.addEventListener('mouseleave', () => {
      gsap.to(submitBtn, {
        scale: 1,
        y: 0,
        duration: 0.3,
        ease: "power2.out"
      });
    });
  }
};

onMounted(() => {
  setupContactAnimations();
});
</script>


<style scoped>
.contact {
  padding: var(--spacing-4xl) 0;
  background-color: var(--primary-light);
}

.contact-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--spacing-2xl);
}

.contact-info {
  transform: var(--transform-down);
  opacity: 0;
}

.contact-info p {
  color: var(--gray);
  margin-bottom: var(--spacing-lg);
  line-height: 1.7;
}

.contact-method {
  display: flex;
  align-items: center;
  margin-bottom: var(--spacing-md);
}

.contact-icon {
  width: 40px;
  height: 40px;
  background-color: var(--primary-light);
  border-radius: var(--border-radius-full);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: var(--spacing-sm);
  color: var(--primary);
  font-size: var(--font-base);
}

.contact-method a {
  color: var(--light);
  text-decoration: none;
  transition: color var(--transition-fast);
}

.contact-method a:hover {
  color: var(--primary);
}

.contact-form {
  transform: var(--transform-down);
  opacity: 0;
}

.form-group {
  margin-bottom: var(--spacing-md);
}

.form-control {
  width: 100%;
  padding: var(--spacing-sm);
  background-color: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: var(--border-radius-sm);
  color: var(--light);
  font-size: var(--font-sm);
  transition: border-color var(--transition-fast), box-shadow var(--transition-fast);
}

.form-control:focus {
  outline: none;
  border-color: var(--primary);
  box-shadow: 0 0 0 3px var(--primary-hover);
}

textarea.form-control {
  min-height: 150px;
  resize: vertical;
}

.submit-btn {
  padding: 0.8rem var(--spacing-lg);
  background-color: var(--primary);
  color: var(--dark);
  border: none;
  border-radius: var(--border-radius-sm);
  font-weight: var(--font-semibold);
  font-size: var(--font-sm);
  cursor: pointer;
  transition: transform var(--transition-fast), box-shadow var(--transition-fast);
}

.submit-btn:hover {
  transform: var(--transform-up);
  box-shadow: var(--shadow-sm);
}

.form-status {
  margin-bottom: var(--spacing-sm);
  padding: var(--spacing-sm);
  border-radius: var(--border-radius-sm);
  font-size: var(--font-xs);
  text-align: center;
  transition: opacity var(--transition-fast);
  opacity: var(--opacity-visible);
}

.form-status.success {
  background-color: var(--primary-light);
  color: var(--primary);
}

.form-status.error {
  background-color: rgba(255, 0, 0, 0.1);
  color: var(--red);
}

.form-status.hidden {
  opacity: var(--opacity-disabled);
}

@media (max-width: var(--breakpoint-tablet)) {
  .contact-content {
    grid-template-columns: 1fr;
    gap: var(--spacing-lg);
  }
}
</style>