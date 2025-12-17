<script setup lang="ts">
// Direct route to canvas - also supports Konami code
const { toggle } = useConceptPicker()

useKonamiCode(() => {
  toggle()
  navigateTo('/')
})
</script>

<template>
  <ConceptsCanvasConcept />
</template>
