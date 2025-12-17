<script setup lang="ts">
const hasEntered = ref(false)
const isGlitching = ref(false)
const isMajorGlitch = ref(false)

// Text fitting - scale text to fill screen width
const line1Ref = ref<HTMLElement>()
const line2Ref = ref<HTMLElement>()
const line3Ref = ref<HTMLElement>()
const containerRef = ref<HTMLElement>()

const line1Scale = ref(1)
const line2Scale = ref(1)
const line3Scale = ref(1)

function fitText() {
  if (!containerRef.value) return

  const containerWidth = containerRef.value.offsetWidth - 32 // padding

  if (line1Ref.value) {
    const textWidth = line1Ref.value.scrollWidth
    line1Scale.value = containerWidth / textWidth
  }
  if (line2Ref.value) {
    const textWidth = line2Ref.value.scrollWidth
    line2Scale.value = containerWidth / textWidth
  }
  if (line3Ref.value) {
    const textWidth = line3Ref.value.scrollWidth
    line3Scale.value = containerWidth / textWidth
  }
}

// Entrance animation
onMounted(() => {
  // Fit text after fonts load
  nextTick(() => {
    fitText()
    // Refit after a moment for font loading
    setTimeout(fitText, 100)
  })

  // Refit on resize
  window.addEventListener('resize', fitText)

  // Start entrance after text is fitted
  setTimeout(() => {
    hasEntered.value = true
  }, 200)

  // Random glitch triggers - more frequent
  setInterval(() => {
    if (Math.random() > 0.5) {
      triggerGlitch()
    }
  }, 600)

  // Occasional MAJOR glitch
  setInterval(() => {
    if (Math.random() > 0.8) {
      triggerMajorGlitch()
    }
  }, 1500)
})

onUnmounted(() => {
  window.removeEventListener('resize', fitText)
})

function triggerGlitch() {
  isGlitching.value = true
  setTimeout(() => {
    isGlitching.value = false
  }, 100 + Math.random() * 150)
}

function triggerMajorGlitch() {
  isMajorGlitch.value = true
  isGlitching.value = true
  setTimeout(() => {
    isMajorGlitch.value = false
    isGlitching.value = false
  }, 200 + Math.random() * 300)
}
</script>

<template>
  <div class="fixed inset-0 bg-void overflow-hidden">
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

    <!-- Main content -->
    <div
      ref="containerRef"
      class="min-h-screen flex flex-col justify-center px-4 overflow-hidden"
    >
      <!-- The name - MASSIVE, FLOODING THE SCREEN -->
      <div
        class="relative select-none name-container"
        :class="{
          'entered': hasEntered,
          'glitch-active': isGlitching,
          'major-glitch': isMajorGlitch
        }"
        @click="triggerMajorGlitch"
      >
        <!-- Main text - each line scales to fill width -->
        <h1 class="font-black leading-[0.75] tracking-tighter uppercase">
          <span
            ref="line1Ref"
            class="block name-line line-1 origin-left whitespace-nowrap"
            :style="{ transform: `scaleX(${line1Scale})` }"
            data-text="JOE"
          >JOE</span>
          <span
            ref="line2Ref"
            class="block name-line line-2 origin-left whitespace-nowrap"
            :style="{ transform: `scaleX(${line2Scale})` }"
            data-text="CZAR"
          >CZAR</span>
          <span
            ref="line3Ref"
            class="block name-line line-3 origin-left whitespace-nowrap"
            :style="{ transform: `scaleX(${line3Scale})` }"
            data-text="NECKI"
          >NECKI</span>
        </h1>

        <!-- Chromatic aberration layers -->
        <div class="absolute inset-0 chroma-r" aria-hidden="true">
          <span class="block font-black leading-[0.75] tracking-tighter uppercase">
            <span class="block origin-left whitespace-nowrap" :style="{ transform: `scaleX(${line1Scale})` }">JOE</span>
            <span class="block origin-left whitespace-nowrap" :style="{ transform: `scaleX(${line2Scale})` }">CZAR</span>
            <span class="block origin-left whitespace-nowrap" :style="{ transform: `scaleX(${line3Scale})` }">NECKI</span>
          </span>
        </div>
        <div class="absolute inset-0 chroma-g" aria-hidden="true">
          <span class="block font-black leading-[0.75] tracking-tighter uppercase">
            <span class="block origin-left whitespace-nowrap" :style="{ transform: `scaleX(${line1Scale})` }">JOE</span>
            <span class="block origin-left whitespace-nowrap" :style="{ transform: `scaleX(${line2Scale})` }">CZAR</span>
            <span class="block origin-left whitespace-nowrap" :style="{ transform: `scaleX(${line3Scale})` }">NECKI</span>
          </span>
        </div>
        <div class="absolute inset-0 chroma-b" aria-hidden="true">
          <span class="block font-black leading-[0.75] tracking-tighter uppercase">
            <span class="block origin-left whitespace-nowrap" :style="{ transform: `scaleX(${line1Scale})` }">JOE</span>
            <span class="block origin-left whitespace-nowrap" :style="{ transform: `scaleX(${line2Scale})` }">CZAR</span>
            <span class="block origin-left whitespace-nowrap" :style="{ transform: `scaleX(${line3Scale})` }">NECKI</span>
          </span>
        </div>

        <!-- Slice/tear layers -->
        <div class="absolute inset-0 slice-layer slice-1" aria-hidden="true">
          <span class="block font-black leading-[0.75] tracking-tighter uppercase">
            <span class="block origin-left whitespace-nowrap" :style="{ transform: `scaleX(${line1Scale})` }">JOE</span>
            <span class="block origin-left whitespace-nowrap" :style="{ transform: `scaleX(${line2Scale})` }">CZAR</span>
            <span class="block origin-left whitespace-nowrap" :style="{ transform: `scaleX(${line3Scale})` }">NECKI</span>
          </span>
        </div>
        <div class="absolute inset-0 slice-layer slice-2" aria-hidden="true">
          <span class="block font-black leading-[0.75] tracking-tighter uppercase">
            <span class="block origin-left whitespace-nowrap" :style="{ transform: `scaleX(${line1Scale})` }">JOE</span>
            <span class="block origin-left whitespace-nowrap" :style="{ transform: `scaleX(${line2Scale})` }">CZAR</span>
            <span class="block origin-left whitespace-nowrap" :style="{ transform: `scaleX(${line3Scale})` }">NECKI</span>
          </span>
        </div>
        <div class="absolute inset-0 slice-layer slice-3" aria-hidden="true">
          <span class="block font-black leading-[0.75] tracking-tighter uppercase">
            <span class="block origin-left whitespace-nowrap" :style="{ transform: `scaleX(${line1Scale})` }">JOE</span>
            <span class="block origin-left whitespace-nowrap" :style="{ transform: `scaleX(${line2Scale})` }">CZAR</span>
            <span class="block origin-left whitespace-nowrap" :style="{ transform: `scaleX(${line3Scale})` }">NECKI</span>
          </span>
        </div>
      </div>

      <!-- Entry points - subtle, bottom corner -->
      <div class="absolute bottom-20 left-4 md:left-8 flex flex-col gap-2 font-mono text-xs z-10">
        <a
          v-for="point in [
            { key: 'music', color: 'hover:text-ember' },
            { key: 'work', color: 'hover:text-signal' },
            { key: 'code', color: 'hover:text-pulse' }
          ]"
          :key="point.key"
          href="#"
          class="text-silver/40 transition-colors duration-300"
          :class="point.color"
        >
          {{ point.key }}
        </a>
      </div>

      <!-- Social -->
      <div class="absolute bottom-8 left-4 md:left-8 z-10">
        <SocialLinks size="sm" class="font-mono opacity-30 hover:opacity-100 transition-opacity" />
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Base font size for text fitting - will be scaled */
h1 {
  font-size: 25vw;
}

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

/* Name container */
.name-container {
  position: relative;
}

/* Entrance animation */
.name-line {
  opacity: 0;
  transform-origin: left center;
}

.entered .name-line {
  animation: glitch-enter 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

.entered .line-1 { animation-delay: 0s; }
.entered .line-2 { animation-delay: 0.08s; }
.entered .line-3 { animation-delay: 0.16s; }

@keyframes glitch-enter {
  0% {
    opacity: 0;
    transform: translateX(-120%) skewX(-30deg) scaleX(var(--scale, 1));
    filter: blur(20px);
  }
  15% {
    opacity: 1;
    transform: translateX(5%) skewX(15deg) scaleX(var(--scale, 1));
    filter: blur(0);
  }
  25% {
    transform: translateX(-3%) skewX(-8deg) scaleX(var(--scale, 1));
  }
  35% {
    transform: translateX(2%) skewX(4deg) scaleX(var(--scale, 1));
  }
  45% {
    transform: translateX(-1%) skewX(-2deg) scaleX(var(--scale, 1));
  }
  100% {
    opacity: 1;
    transform: translateX(0) skewX(0) scaleX(var(--scale, 1));
    filter: blur(0);
  }
}

/* Chromatic aberration layers */
.chroma-r, .chroma-g, .chroma-b {
  opacity: 0;
  mix-blend-mode: screen;
  pointer-events: none;
  font-size: 25vw;
}

.chroma-r { color: #ff0000; }
.chroma-g { color: #00ff00; }
.chroma-b { color: #0000ff; }

/* Slice layers */
.slice-layer {
  opacity: 0;
  color: white;
  pointer-events: none;
  font-size: 25vw;
}

.slice-1 {
  clip-path: polygon(0 20%, 100% 20%, 100% 28%, 0 28%);
}

.slice-2 {
  clip-path: polygon(0 50%, 100% 50%, 100% 58%, 0 58%);
}

.slice-3 {
  clip-path: polygon(0 75%, 100% 75%, 100% 85%, 0 85%);
}

/* GLITCH ACTIVE STATE */
.glitch-active .chroma-r {
  animation: chroma-r-glitch 0.1s steps(3) infinite;
}

.glitch-active .chroma-g {
  animation: chroma-g-glitch 0.1s steps(2) infinite;
}

.glitch-active .chroma-b {
  animation: chroma-b-glitch 0.1s steps(3) infinite;
}

.glitch-active .slice-layer {
  animation: slice-glitch 0.08s steps(2) infinite;
}

.glitch-active h1 {
  animation: text-jitter 0.1s steps(2) infinite;
}

@keyframes text-jitter {
  0% { transform: translate(0, 0); }
  25% { transform: translate(-2px, 1px); }
  50% { transform: translate(1px, -1px); }
  75% { transform: translate(-1px, -1px); }
  100% { transform: translate(2px, 1px); }
}

@keyframes chroma-r-glitch {
  0% { opacity: 0; transform: translate(0); }
  20% { opacity: 0.9; transform: translate(-12px, 4px); }
  40% { opacity: 0; transform: translate(8px, -3px); }
  60% { opacity: 0.7; transform: translate(-5px, 2px); }
  80% { opacity: 0; transform: translate(10px, -4px); }
  100% { opacity: 0; transform: translate(0); }
}

@keyframes chroma-g-glitch {
  0% { opacity: 0; transform: translate(0); }
  25% { opacity: 0.6; transform: translate(6px, -3px); }
  50% { opacity: 0; transform: translate(-8px, 4px); }
  75% { opacity: 0.5; transform: translate(4px, -2px); }
  100% { opacity: 0; transform: translate(0); }
}

@keyframes chroma-b-glitch {
  0% { opacity: 0; transform: translate(0); }
  20% { opacity: 0.8; transform: translate(10px, -3px); }
  40% { opacity: 0; transform: translate(-6px, 2px); }
  60% { opacity: 0.6; transform: translate(5px, -3px); }
  80% { opacity: 0; transform: translate(-8px, 3px); }
  100% { opacity: 0; transform: translate(0); }
}

@keyframes slice-glitch {
  0% { opacity: 0; transform: translateX(0); }
  25% { opacity: 1; transform: translateX(30px); }
  50% { opacity: 1; transform: translateX(-25px); }
  75% { opacity: 1; transform: translateX(15px); }
  100% { opacity: 0; transform: translateX(0); }
}

/* MAJOR GLITCH - CHAOS */
.major-glitch h1 {
  animation: major-shake 0.05s steps(3) infinite !important;
}

.major-glitch .chroma-r {
  animation: chroma-r-major 0.04s steps(1) infinite !important;
  opacity: 1 !important;
}

.major-glitch .chroma-g {
  animation: chroma-g-major 0.04s steps(1) infinite !important;
  opacity: 0.9 !important;
}

.major-glitch .chroma-b {
  animation: chroma-b-major 0.04s steps(1) infinite !important;
  opacity: 1 !important;
}

.major-glitch .slice-1 {
  animation: slice-major-1 0.03s steps(1) infinite !important;
  opacity: 1 !important;
}

.major-glitch .slice-2 {
  animation: slice-major-2 0.04s steps(1) infinite !important;
  opacity: 1 !important;
}

.major-glitch .slice-3 {
  animation: slice-major-3 0.035s steps(1) infinite !important;
  opacity: 1 !important;
}

@keyframes major-shake {
  0% { transform: translate(0) skewX(0) skewY(0); }
  20% { transform: translate(-8px, 5px) skewX(-4deg) skewY(1deg); }
  40% { transform: translate(10px, -4px) skewX(3deg) skewY(-1deg); }
  60% { transform: translate(-6px, -6px) skewX(-2deg) skewY(2deg); }
  80% { transform: translate(8px, 4px) skewX(4deg) skewY(-2deg); }
  100% { transform: translate(-4px, 3px) skewX(-3deg) skewY(1deg); }
}

@keyframes chroma-r-major {
  0% { transform: translate(-25px, 8px); }
  25% { transform: translate(30px, -12px); }
  50% { transform: translate(-18px, 6px); }
  75% { transform: translate(22px, -10px); }
  100% { transform: translate(-20px, 8px); }
}

@keyframes chroma-g-major {
  0% { transform: translate(15px, -5px); }
  25% { transform: translate(-22px, 10px); }
  50% { transform: translate(12px, -8px); }
  75% { transform: translate(-18px, 7px); }
  100% { transform: translate(16px, -6px); }
}

@keyframes chroma-b-major {
  0% { transform: translate(20px, 6px); }
  25% { transform: translate(-28px, -10px); }
  50% { transform: translate(22px, 5px); }
  75% { transform: translate(-15px, -8px); }
  100% { transform: translate(18px, 7px); }
}

@keyframes slice-major-1 {
  0% { transform: translateX(50px); }
  33% { transform: translateX(-60px); }
  66% { transform: translateX(40px); }
  100% { transform: translateX(-45px); }
}

@keyframes slice-major-2 {
  0% { transform: translateX(-55px); }
  33% { transform: translateX(65px); }
  66% { transform: translateX(-50px); }
  100% { transform: translateX(55px); }
}

@keyframes slice-major-3 {
  0% { transform: translateX(45px); }
  33% { transform: translateX(-55px); }
  66% { transform: translateX(60px); }
  100% { transform: translateX(-40px); }
}

/* Flicker effect on major glitch */
.major-glitch::after {
  content: '';
  position: absolute;
  inset: 0;
  background: white;
  animation: flicker 0.03s steps(1) infinite;
  pointer-events: none;
  mix-blend-mode: overlay;
}

@keyframes flicker {
  0% { opacity: 0; }
  10% { opacity: 0.15; }
  20% { opacity: 0; }
  30% { opacity: 0.08; }
  40% { opacity: 0; }
  50% { opacity: 0.2; }
  60% { opacity: 0; }
  70% { opacity: 0.1; }
  80% { opacity: 0; }
  90% { opacity: 0.18; }
  100% { opacity: 0; }
}

/* Invert flashes during major glitch */
.major-glitch {
  animation: invert-flash 0.15s steps(1) infinite;
}

@keyframes invert-flash {
  0% { filter: none; }
  15% { filter: invert(1); }
  20% { filter: none; }
  45% { filter: invert(1); }
  50% { filter: none; }
  75% { filter: invert(1); }
  80% { filter: none; }
}
</style>
