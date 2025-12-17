<script setup lang="ts">
// Dynamic OG image that evolves with each view
defineOgImage({
  component: 'OgImageTemplate'
})

const { currentConcept, init, toggle } = useConceptPicker()
const isTransitioning = ref(false)

// Initialize concept on mount
onMounted(() => {
  init()
})

// Konami code triggers transition and swap
useKonamiCode(() => {
  // Start transition effect
  isTransitioning.value = true

  // Swap after brief glitch
  setTimeout(() => {
    toggle()
  }, 150)

  // End transition
  setTimeout(() => {
    isTransitioning.value = false
  }, 400)
})
</script>

<template>
  <div class="relative">
    <!-- Transition overlay -->
    <div
      v-if="isTransitioning"
      class="fixed inset-0 z-50 pointer-events-none transition-glitch"
    />

    <!-- Canvas Concept -->
    <ConceptsCanvasConcept v-if="currentConcept === 'canvas'" />

    <!-- Glitch Concept -->
    <ConceptsGlitchConcept v-else-if="currentConcept === 'glitch'" />

    <!-- Plasma Concept -->
    <ConceptsPlasmaConcept v-else-if="currentConcept === 'plasma'" />
  </div>
</template>

<style scoped>
.transition-glitch {
  background: white;
  animation: glitch-flash 0.4s steps(4) forwards;
}

@keyframes glitch-flash {
  0% { opacity: 0; }
  10% { opacity: 1; background: white; }
  20% { opacity: 0; }
  30% { opacity: 1; background: #ef4136; }
  40% { opacity: 0; }
  50% { opacity: 1; background: #50d2cb; mix-blend-mode: difference; }
  60% { opacity: 0; }
  70% { opacity: 1; background: black; }
  80% { opacity: 0.5; background: white; mix-blend-mode: overlay; }
  90% { opacity: 0.2; }
  100% { opacity: 0; }
}
</style>
