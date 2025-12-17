<script setup lang="ts">
const { currentConcept, prefersReducedMotion, setConcept } = useConceptPicker()

const concepts = [
  {
    key: 'canvas' as const,
    name: 'Canvas',
    description: 'Floating particles + 3D objects + parallax',
    vibe: 'calm'
  },
  {
    key: 'glitch' as const,
    name: 'Glitch',
    description: 'Brutalist type + aggressive distortion',
    vibe: 'chaos'
  },
  {
    key: 'plasma' as const,
    name: 'Plasma',
    description: 'LED matrix with animated plasma waves',
    vibe: 'warm'
  }
]

function selectAndGo(key: 'canvas' | 'glitch' | 'plasma') {
  setConcept(key)
  navigateTo(`/concepts/${key}`)
}
</script>

<template>
  <div class="min-h-screen flex flex-col items-center justify-center p-8 bg-void">
    <h1 class="text-4xl md:text-5xl font-light mb-2">concepts</h1>
    <p class="text-silver mb-4">Landing page experiments</p>

    <!-- Status info -->
    <div class="text-xs font-mono text-silver/40 mb-8 space-y-1 text-center">
      <p>
        current: <span class="text-signal">{{ currentConcept }}</span>
      </p>
      <p v-if="prefersReducedMotion" class="text-pulse">
        reduced motion detected → defaults to canvas
      </p>
      <p class="text-silver/30">
        tip: Konami code switches concepts ↑↑↓↓←→←→BA
      </p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl w-full">
      <button
        v-for="concept in concepts"
        :key="concept.key"
        class="group p-6 border rounded-lg transition-all duration-300 text-left"
        :class="[
          currentConcept === concept.key
            ? 'border-signal bg-signal/5'
            : 'border-ash hover:border-silver'
        ]"
        @click="selectAndGo(concept.key)"
      >
        <div class="flex items-center justify-between mb-2">
          <h2 class="text-xl font-medium group-hover:text-signal transition-colors">
            {{ concept.name }}
          </h2>
          <span class="text-xs font-mono text-silver/40">{{ concept.vibe }}</span>
        </div>
        <p class="text-silver text-sm">{{ concept.description }}</p>
        <p v-if="currentConcept === concept.key" class="text-signal text-xs mt-2 font-mono">
          ← active
        </p>
      </button>
    </div>

    <NuxtLink
      to="/"
      class="mt-8 text-sm text-silver/40 hover:text-silver transition-colors font-mono"
    >
      ← back to auto-pick
    </NuxtLink>
  </div>
</template>
