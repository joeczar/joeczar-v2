<script setup lang="ts">
// Direct route to glitch - also supports Konami code
const { toggle } = useConceptPicker()

useKonamiCode(() => {
  toggle()
  navigateTo('/')
})
</script>

<template>
  <ConceptsGlitchConcept />
</template>
