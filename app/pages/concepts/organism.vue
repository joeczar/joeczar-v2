<script setup lang="ts">
const { smoothMouse } = useMouse3D()
const activePoint = ref<string | null>(null)
</script>

<template>
  <div class="fixed inset-0 bg-void">
    <!-- Three.js Canvas -->
    <ClientOnly>
      <TresCanvas alpha :dpr="[1, 2]">
        <TresPerspectiveCamera :position="[0, 0, 6]" :fov="60" />
        <OrganismNetwork :mouse="smoothMouse" :active-point="activePoint" />
      </TresCanvas>
    </ClientOnly>

    <!-- HTML Overlay -->
    <div class="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
      <h1 class="text-5xl md:text-7xl font-light tracking-wide mb-4 mix-blend-difference">
        Joe Czarnecki
      </h1>

      <p class="text-silver/60 text-lg font-light mb-20">
        musician · maker · developer
      </p>

      <!-- Entry points as glowing nodes -->
      <div class="flex items-center gap-20 pointer-events-auto">
        <button
          v-for="(point, index) in [
            { key: 'music', label: 'music', color: '#ef4136' },
            { key: 'work', label: 'work', color: '#50d2cb' },
            { key: 'code', label: 'code', color: '#7ec245' }
          ]"
          :key="point.key"
          class="relative group"
          @mouseenter="activePoint = point.key"
          @mouseleave="activePoint = null"
        >
          <!-- Glow effect -->
          <div
            class="absolute inset-0 rounded-full blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-500"
            :style="{ backgroundColor: point.color }"
          />

          <!-- Node -->
          <div
            class="relative w-4 h-4 rounded-full transition-all duration-500 group-hover:scale-150"
            :class="activePoint === point.key ? 'scale-150' : ''"
            :style="{
              backgroundColor: activePoint === point.key ? point.color : '#a0a0a3',
              boxShadow: activePoint === point.key ? `0 0 30px ${point.color}` : 'none'
            }"
          />

          <!-- Label -->
          <span
            class="absolute -bottom-8 left-1/2 -translate-x-1/2 text-xs font-mono text-silver/50 group-hover:text-silver transition-colors whitespace-nowrap"
          >
            {{ point.label }}
          </span>
        </button>
      </div>

      <!-- Social -->
      <div class="absolute bottom-8 pointer-events-auto">
        <SocialLinks size="sm" class="opacity-50 hover:opacity-100 transition-opacity" />
      </div>
    </div>
  </div>
</template>
