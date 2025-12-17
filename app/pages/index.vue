<script setup lang="ts">
const concepts = [
  { path: '/concepts/canvas', name: 'Canvas', description: 'Particle field + 3D parallax' },
  { path: '/concepts/glitch', name: 'Glitch', description: 'Brutalist type + distortion' },
  { path: '/concepts/organism', name: 'Organism', description: 'Connected nodes + bioluminescence' },
  { path: '/concepts/portal', name: 'Portal', description: 'Calm surface + peek-inside worlds' }
]
</script>

<template>
  <div class="min-h-screen flex flex-col items-center justify-center p-8">
    <h1 class="text-4xl md:text-5xl font-light mb-4">joeczar-v2</h1>
    <p class="text-silver mb-12">Landing page concepts</p>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl w-full">
      <NuxtLink
        v-for="concept in concepts"
        :key="concept.path"
        :to="concept.path"
        class="group p-6 border border-ash rounded-lg hover:border-silver transition-colors duration-300"
      >
        <h2 class="text-xl font-medium mb-2 group-hover:text-signal transition-colors">
          {{ concept.name }}
        </h2>
        <p class="text-silver text-sm">{{ concept.description }}</p>
      </NuxtLink>
    </div>
  </div>
</template>
