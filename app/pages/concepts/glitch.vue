<script setup lang="ts">
const hasEntered = ref(false)
const isGlitching = ref(false)
const isMajorGlitch = ref(false)

// Text fitting - adjust font-size to fill screen width (Safari-compatible)
const line1Ref = ref<HTMLElement>()
const line2Ref = ref<HTMLElement>()
const line3Ref = ref<HTMLElement>()
const containerRef = ref<HTMLElement>()

// Base font size in vw units - we'll calculate pixel values from this
const baseFontVW = 15
const line1FontSize = ref('15vw')
const line2FontSize = ref('15vw')
const line3FontSize = ref('15vw')

function fitText() {
  if (!containerRef.value) return

  const containerWidth = containerRef.value.offsetWidth
  const viewportWidth = window.innerWidth
  const baseFontPx = (baseFontVW / 100) * viewportWidth

  // Reset to base size first to measure natural width
  line1FontSize.value = `${baseFontPx}px`
  line2FontSize.value = `${baseFontPx}px`
  line3FontSize.value = `${baseFontPx}px`

  // Use requestAnimationFrame to ensure measurements are after reset
  requestAnimationFrame(() => {
    // Measure each line's natural width and calculate new font size
    if (line1Ref.value) {
      const textEl = line1Ref.value.querySelector('span') as HTMLElement
      if (textEl) {
        const textWidth = textEl.offsetWidth
        if (textWidth > 0) {
          const scale = containerWidth / textWidth
          line1FontSize.value = `${baseFontPx * scale}px`
        }
      }
    }
    if (line2Ref.value) {
      const textEl = line2Ref.value.querySelector('span') as HTMLElement
      if (textEl) {
        const textWidth = textEl.offsetWidth
        if (textWidth > 0) {
          const scale = containerWidth / textWidth
          line2FontSize.value = `${baseFontPx * scale}px`
        }
      }
    }
    if (line3Ref.value) {
      const textEl = line3Ref.value.querySelector('span') as HTMLElement
      if (textEl) {
        const textWidth = textEl.offsetWidth
        if (textWidth > 0) {
          const scale = containerWidth / textWidth
          line3FontSize.value = `${baseFontPx * scale}px`
        }
      }
    }
  })
}

// Entrance animation
onMounted(() => {
  // Wait for fonts to load
  document.fonts.ready.then(() => {
    fitText()
    // Start entrance after text is fitted
    setTimeout(() => {
      hasEntered.value = true
    }, 100)
  })

  // Fallback if fonts.ready doesn't work
  setTimeout(() => {
    fitText()
    if (!hasEntered.value) {
      hasEntered.value = true
    }
  }, 500)

  // Refit on resize
  window.addEventListener('resize', fitText)

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
      class="min-h-screen flex flex-col justify-center px-2 overflow-hidden"
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
        <!-- Main text - font-size based scaling (Safari-compatible) -->
        <h1 class="font-black leading-[0.85] tracking-tighter uppercase">
          <span ref="line1Ref" class="block">
            <span
              class="inline-block name-line line-1 whitespace-nowrap"
              :style="{ fontSize: line1FontSize }"
            >JOE</span>
          </span>
          <span ref="line2Ref" class="block">
            <span
              class="inline-block name-line line-2 whitespace-nowrap"
              :style="{ fontSize: line2FontSize }"
            >CZAR</span>
          </span>
          <span ref="line3Ref" class="block">
            <span
              class="inline-block name-line line-3 whitespace-nowrap"
              :style="{ fontSize: line3FontSize }"
            >NECKI</span>
          </span>
        </h1>

        <!-- Chromatic aberration layers -->
        <div class="absolute inset-0 chroma-r pointer-events-none" aria-hidden="true">
          <span class="block font-black leading-[0.85] tracking-tighter uppercase">
            <span class="block"><span class="inline-block whitespace-nowrap" :style="{ fontSize: line1FontSize }">JOE</span></span>
            <span class="block"><span class="inline-block whitespace-nowrap" :style="{ fontSize: line2FontSize }">CZAR</span></span>
            <span class="block"><span class="inline-block whitespace-nowrap" :style="{ fontSize: line3FontSize }">NECKI</span></span>
          </span>
        </div>
        <div class="absolute inset-0 chroma-g pointer-events-none" aria-hidden="true">
          <span class="block font-black leading-[0.85] tracking-tighter uppercase">
            <span class="block"><span class="inline-block whitespace-nowrap" :style="{ fontSize: line1FontSize }">JOE</span></span>
            <span class="block"><span class="inline-block whitespace-nowrap" :style="{ fontSize: line2FontSize }">CZAR</span></span>
            <span class="block"><span class="inline-block whitespace-nowrap" :style="{ fontSize: line3FontSize }">NECKI</span></span>
          </span>
        </div>
        <div class="absolute inset-0 chroma-b pointer-events-none" aria-hidden="true">
          <span class="block font-black leading-[0.85] tracking-tighter uppercase">
            <span class="block"><span class="inline-block whitespace-nowrap" :style="{ fontSize: line1FontSize }">JOE</span></span>
            <span class="block"><span class="inline-block whitespace-nowrap" :style="{ fontSize: line2FontSize }">CZAR</span></span>
            <span class="block"><span class="inline-block whitespace-nowrap" :style="{ fontSize: line3FontSize }">NECKI</span></span>
          </span>
        </div>

        <!-- Slice/tear layers -->
        <div class="absolute inset-0 slice-layer slice-1 pointer-events-none" aria-hidden="true">
          <span class="block font-black leading-[0.85] tracking-tighter uppercase">
            <span class="block"><span class="inline-block whitespace-nowrap" :style="{ fontSize: line1FontSize }">JOE</span></span>
            <span class="block"><span class="inline-block whitespace-nowrap" :style="{ fontSize: line2FontSize }">CZAR</span></span>
            <span class="block"><span class="inline-block whitespace-nowrap" :style="{ fontSize: line3FontSize }">NECKI</span></span>
          </span>
        </div>
        <div class="absolute inset-0 slice-layer slice-2 pointer-events-none" aria-hidden="true">
          <span class="block font-black leading-[0.85] tracking-tighter uppercase">
            <span class="block"><span class="inline-block whitespace-nowrap" :style="{ fontSize: line1FontSize }">JOE</span></span>
            <span class="block"><span class="inline-block whitespace-nowrap" :style="{ fontSize: line2FontSize }">CZAR</span></span>
            <span class="block"><span class="inline-block whitespace-nowrap" :style="{ fontSize: line3FontSize }">NECKI</span></span>
          </span>
        </div>
        <div class="absolute inset-0 slice-layer slice-3 pointer-events-none" aria-hidden="true">
          <span class="block font-black leading-[0.85] tracking-tighter uppercase">
            <span class="block"><span class="inline-block whitespace-nowrap" :style="{ fontSize: line1FontSize }">JOE</span></span>
            <span class="block"><span class="inline-block whitespace-nowrap" :style="{ fontSize: line2FontSize }">CZAR</span></span>
            <span class="block"><span class="inline-block whitespace-nowrap" :style="{ fontSize: line3FontSize }">NECKI</span></span>
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

/* Entrance animation - slides in from left */
.name-line {
  opacity: 0;
  transform-origin: left center;
  transform: translateX(-110%);
}

.entered .name-line {
  animation: glitch-enter 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

.entered .line-1 { animation-delay: 0s; }
.entered .line-2 { animation-delay: 0.06s; }
.entered .line-3 { animation-delay: 0.12s; }

@keyframes glitch-enter {
  0% {
    opacity: 0;
    transform: translateX(-110%);
    filter: blur(15px);
  }
  30% {
    opacity: 1;
    transform: translateX(3%);
    filter: blur(0);
  }
  45% {
    transform: translateX(-2%);
  }
  60% {
    transform: translateX(1%);
  }
  100% {
    opacity: 1;
    transform: translateX(0);
    filter: blur(0);
  }
}

/* Chromatic aberration layers */
.chroma-r, .chroma-g, .chroma-b {
  opacity: 0;
  mix-blend-mode: screen;
}

.chroma-r { color: #ff0000; }
.chroma-g { color: #00ff00; }
.chroma-b { color: #0000ff; }

/* Slice layers */
.slice-layer {
  opacity: 0;
  color: white;
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
  25% { transform: translate(-3px, 2px); }
  50% { transform: translate(2px, -1px); }
  75% { transform: translate(-2px, -2px); }
  100% { transform: translate(3px, 1px); }
}

@keyframes chroma-r-glitch {
  0% { opacity: 0; transform: translate(0); }
  20% { opacity: 0.9; transform: translate(-15px, 5px); }
  40% { opacity: 0; transform: translate(10px, -4px); }
  60% { opacity: 0.7; transform: translate(-8px, 3px); }
  80% { opacity: 0; transform: translate(12px, -5px); }
  100% { opacity: 0; transform: translate(0); }
}

@keyframes chroma-g-glitch {
  0% { opacity: 0; transform: translate(0); }
  25% { opacity: 0.6; transform: translate(8px, -4px); }
  50% { opacity: 0; transform: translate(-10px, 5px); }
  75% { opacity: 0.5; transform: translate(6px, -3px); }
  100% { opacity: 0; transform: translate(0); }
}

@keyframes chroma-b-glitch {
  0% { opacity: 0; transform: translate(0); }
  20% { opacity: 0.8; transform: translate(12px, -4px); }
  40% { opacity: 0; transform: translate(-8px, 3px); }
  60% { opacity: 0.6; transform: translate(7px, -4px); }
  80% { opacity: 0; transform: translate(-10px, 4px); }
  100% { opacity: 0; transform: translate(0); }
}

@keyframes slice-glitch {
  0% { opacity: 0; transform: translateX(0); }
  25% { opacity: 1; transform: translateX(40px); }
  50% { opacity: 1; transform: translateX(-35px); }
  75% { opacity: 1; transform: translateX(20px); }
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
  20% { transform: translate(-10px, 6px) skewX(-5deg) skewY(2deg); }
  40% { transform: translate(12px, -5px) skewX(4deg) skewY(-2deg); }
  60% { transform: translate(-8px, -8px) skewX(-3deg) skewY(3deg); }
  80% { transform: translate(10px, 5px) skewX(5deg) skewY(-3deg); }
  100% { transform: translate(-6px, 4px) skewX(-4deg) skewY(2deg); }
}

@keyframes chroma-r-major {
  0% { transform: translate(-30px, 10px); }
  25% { transform: translate(35px, -15px); }
  50% { transform: translate(-22px, 8px); }
  75% { transform: translate(28px, -12px); }
  100% { transform: translate(-25px, 10px); }
}

@keyframes chroma-g-major {
  0% { transform: translate(18px, -6px); }
  25% { transform: translate(-28px, 12px); }
  50% { transform: translate(15px, -10px); }
  75% { transform: translate(-22px, 9px); }
  100% { transform: translate(20px, -8px); }
}

@keyframes chroma-b-major {
  0% { transform: translate(25px, 8px); }
  25% { transform: translate(-35px, -12px); }
  50% { transform: translate(28px, 6px); }
  75% { transform: translate(-20px, -10px); }
  100% { transform: translate(22px, 9px); }
}

@keyframes slice-major-1 {
  0% { transform: translateX(60px); }
  33% { transform: translateX(-70px); }
  66% { transform: translateX(50px); }
  100% { transform: translateX(-55px); }
}

@keyframes slice-major-2 {
  0% { transform: translateX(-65px); }
  33% { transform: translateX(75px); }
  66% { transform: translateX(-60px); }
  100% { transform: translateX(65px); }
}

@keyframes slice-major-3 {
  0% { transform: translateX(55px); }
  33% { transform: translateX(-65px); }
  66% { transform: translateX(70px); }
  100% { transform: translateX(-50px); }
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
