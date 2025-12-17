<script setup lang="ts">
interface Props {
  isMajorGlitch?: boolean
}

defineProps<Props>()
</script>

<template>
  <!-- Noise overlay -->
  <div class="absolute inset-0 pointer-events-none noise-overlay" />

  <!-- Heavy scanlines -->
  <div class="absolute inset-0 pointer-events-none scanlines" />

  <!-- CRT flicker -->
  <div class="absolute inset-0 pointer-events-none crt-flicker" />

  <!-- Screen tear effect -->
  <div
    v-if="isMajorGlitch"
    class="absolute inset-0 pointer-events-none screen-tear"
  />
</template>

<style scoped>
/* Noise overlay */
.noise-overlay {
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
  opacity: 0.04;
  mix-blend-mode: overlay;
}

/* Heavy scanlines */
.scanlines {
  background: repeating-linear-gradient(
    0deg,
    rgba(0, 0, 0, 0.3),
    rgba(0, 0, 0, 0.3) 1px,
    transparent 1px,
    transparent 3px
  );
  animation: scanline-scroll 6s linear infinite;
}

@keyframes scanline-scroll {
  0% { background-position: 0 0; }
  100% { background-position: 0 100vh; }
}

/* CRT flicker */
.crt-flicker {
  animation: crt-flicker 0.1s infinite;
  background: transparent;
}

@keyframes crt-flicker {
  0% { opacity: 0.97; }
  50% { opacity: 1; }
  100% { opacity: 0.98; }
}

/* Screen tear */
.screen-tear {
  background: linear-gradient(
    0deg,
    transparent 0%,
    transparent 40%,
    rgba(255, 255, 255, 0.15) 40%,
    rgba(255, 255, 255, 0.15) 42%,
    transparent 42%,
    transparent 55%,
    rgba(255, 255, 255, 0.1) 55%,
    rgba(255, 255, 255, 0.1) 56%,
    transparent 56%,
    transparent 100%
  );
  animation: tear-move 0.08s steps(4) infinite;
}

@keyframes tear-move {
  0% { transform: translateY(-30vh); }
  100% { transform: translateY(130vh); }
}
</style>
