<template>
  <HeroSection />
  <AboutSection />
  <ProjectsSection />
  <ExperienceSection />
  <ContactSection />
</template>

<script>
import HeroSection from '@/sections/HeroSection.vue'
import AboutSection from '@/sections/AboutSection.vue'
import ProjectsSection from '@/sections/ProjectsSection.vue'
import ExperienceSection from '@/sections/ExperienceSection.vue'
import ContactSection from '@/sections/ContactSection.vue'

export default {
  name: 'App',
  components: {
    HeroSection,
    AboutSection,
    ProjectsSection,
    ExperienceSection,
    ContactSection,
  }
}
</script>

<style></style>