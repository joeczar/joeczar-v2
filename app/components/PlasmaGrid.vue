<script setup lang="ts">
import type { LED } from '~/composables/usePlasma'

defineProps<{
  leds: LED[]
  ledSize: number
  gridWidth: number
  gridHeight: number
}>()
</script>

<template>
  <div
    class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
    :style="{ width: `${gridWidth}px`, height: `${gridHeight}px` }"
  >
    <div
      v-for="(led, i) in leds"
      :key="i"
      class="absolute rounded-sm"
      :style="{
        left: `${led.x}px`,
        top: `${led.y}px`,
        width: `${ledSize}px`,
        height: `${ledSize}px`,
        backgroundColor: led.color,
        boxShadow: led.brightness > 0.5 ? `0 0 ${Math.floor(led.brightness * 12)}px ${led.color}` : 'none'
      }"
    />
  </div>
</template>
