<script setup lang="ts">
const activePortal = ref<string | null>(null)
</script>

<template>
  <div class="fixed inset-0 bg-void">
    <div class="min-h-screen flex flex-col items-center justify-center">
      <!-- Name - stark, still -->
      <h1 class="text-5xl md:text-7xl font-extralight tracking-widest mb-2">
        Joe Czarnecki
      </h1>
      <p class="text-silver/40 text-sm font-light tracking-[0.3em] uppercase mb-24">
        musician · maker · developer
      </p>

      <!-- Portal entry points -->
      <div class="flex items-center gap-16 md:gap-24">
        <PortalWindow
          v-for="portal in [
            { key: 'music', label: 'music', color: '#ef4136' },
            { key: 'work', label: 'work', color: '#50d2cb' },
            { key: 'code', label: 'code', color: '#7ec245' }
          ]"
          :key="portal.key"
          :portal-key="portal.key"
          :label="portal.label"
          :color="portal.color"
          :is-active="activePortal === portal.key"
          @mouseenter="activePortal = portal.key"
          @mouseleave="activePortal = null"
        />
      </div>

      <!-- Social -->
      <div class="absolute bottom-8">
        <SocialLinks size="sm" class="opacity-30 hover:opacity-100 transition-opacity duration-500" />
      </div>
    </div>
  </div>
</template>
