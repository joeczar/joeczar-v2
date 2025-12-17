<script setup lang="ts">
// Direct route to plasma - also supports Konami code
const { toggle } = useConceptPicker()

useKonamiCode(() => {
  toggle()
  navigateTo('/')
})
</script>

<template>
  <ConceptsPlasmaConcept />
</template>
