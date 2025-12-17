<script setup lang="ts">
const { smoothMouse } = useMouse3D()
const activePoint = ref<string | null>(null)
</script>

<template>
  <div class="fixed inset-0 bg-void">
    <!-- Three.js Canvas -->
    <ClientOnly>
      <TresCanvas alpha :dpr="[1, 2]">
        <TresPerspectiveCamera :position="[0, 0, 5]" :fov="75" />

        <!-- Particle Field -->
        <CanvasParticles :mouse="smoothMouse" :active-point="activePoint" />

        <!-- Subtle ambient light -->
        <TresAmbientLight :intensity="0.5" />
      </TresCanvas>
    </ClientOnly>

    <!-- HTML Overlay -->
    <div class="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
      <!-- Name with parallax -->
      <h1
        class="text-6xl md:text-8xl font-light tracking-tight mb-2 transition-transform duration-100 ease-out"
        :style="{
          transform: `translate(${smoothMouse.x * 20}px, ${smoothMouse.y * -10}px)`
        }"
      >
        Joe Czarnecki
      </h1>

      <!-- Subtitle -->
      <p
        class="text-silver text-lg md:text-xl font-light mb-16 transition-transform duration-150 ease-out"
        :style="{
          transform: `translate(${smoothMouse.x * 10}px, ${smoothMouse.y * -5}px)`
        }"
      >
        musician · maker · developer
      </p>

      <!-- Entry points -->
      <div class="pointer-events-auto">
        <EntryPoints @hover="activePoint = $event" />
      </div>

      <!-- Social links -->
      <div class="absolute bottom-8 pointer-events-auto">
        <SocialLinks size="sm" />
      </div>
    </div>
  </div>
</template>
