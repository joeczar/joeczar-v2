<script setup lang="ts">
import { generateLeds, getGridDimensions } from '~/composables/usePlasma'

const config = {
  cols: 60,
  rows: 30,
  ledSize: 8,
  ledGap: 20,
  scale: 0.30
}

const leds = generateLeds(config, 0.5)
const { width: gridWidth, height: gridHeight } = getGridDimensions(config)
</script>

<template>
  <div class="w-full h-full flex flex-col items-center justify-center relative overflow-hidden bg-[#050505] font-sans">
    <PlasmaGrid
      :leds="leds"
      :led-size="config.ledSize"
      :grid-width="gridWidth"
      :grid-height="gridHeight"
    />

    <!-- Dark overlay for text readability -->
    <div class="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.7)_0%,rgba(0,0,0,0.3)_100%)]" />

    <!-- Main text -->
    <div class="relative z-10 text-center">
      <div class="text-[11rem] font-bold tracking-tighter leading-none text-bone [text-shadow:0_2px_20px_rgba(0,0,0,0.8)]">
        <div>JOE</div>
        <div>CZARNECKI</div>
      </div>

      <!-- Subtitle -->
      <div class="mt-8 text-5xl tracking-widest text-bone">
        musician · maker · developer
      </div>
    </div>
  </div>
</template>
