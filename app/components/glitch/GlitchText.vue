<script setup lang="ts">
interface Props {
  lines: string[]
  fontSizes: string[]
  lineRefs: Ref<HTMLElement | undefined>[]
  hasEntered: boolean
  isGlitching: boolean
  isMajorGlitch: boolean
  isViewportShift: boolean
  viewportOffset: { x: number; y: number }
}

const props = defineProps<Props>()

const emit = defineEmits<{
  click: []
}>()
</script>

<template>
  <div
    class="relative select-none name-container"
    :class="{
      'entered': hasEntered,
      'glitch-active': isGlitching,
      'major-glitch': isMajorGlitch,
      'viewport-shift': isViewportShift
    }"
    :style="{
      transform: `translate(${viewportOffset.x}px, ${viewportOffset.y}px)`
    }"
    @click="emit('click')"
  >
    <!-- Main text -->
    <h1 class="font-black leading-[0.85] tracking-tighter uppercase">
      <span
        v-for="(line, index) in lines"
        :key="line"
        :ref="el => { if (el) lineRefs[index].value = el as HTMLElement }"
        class="block"
      >
        <span
          class="inline-block name-line whitespace-nowrap"
          :class="`line-${index + 1}`"
          :style="{ fontSize: fontSizes[index] }"
        >{{ line }}</span>
      </span>
    </h1>

    <!-- Chromatic aberration layers -->
    <div
      v-for="color in ['r', 'g', 'b']"
      :key="color"
      class="absolute inset-0 pointer-events-none"
      :class="`chroma-${color}`"
      aria-hidden="true"
    >
      <span class="block font-black leading-[0.85] tracking-tighter uppercase">
        <span v-for="(line, index) in lines" :key="line" class="block">
          <span
            class="inline-block whitespace-nowrap"
            :style="{ fontSize: fontSizes[index] }"
          >{{ line }}</span>
        </span>
      </span>
    </div>

    <!-- Slice/tear layers -->
    <div
      v-for="n in 3"
      :key="`slice-${n}`"
      class="absolute inset-0 slice-layer pointer-events-none"
      :class="`slice-${n}`"
      aria-hidden="true"
    >
      <span class="block font-black leading-[0.85] tracking-tighter uppercase">
        <span v-for="(line, index) in lines" :key="line" class="block">
          <span
            class="inline-block whitespace-nowrap"
            :style="{ fontSize: fontSizes[index] }"
          >{{ line }}</span>
        </span>
      </span>
    </div>
  </div>
</template>

<style scoped>
/* Name container */
.name-container {
  position: relative;
  transition: transform 0.05s ease-out;
}

/* Entrance animation */
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
  45% { transform: translateX(-2%); }
  60% { transform: translateX(1%); }
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

.slice-1 { clip-path: polygon(0 20%, 100% 20%, 100% 28%, 0 28%); }
.slice-2 { clip-path: polygon(0 50%, 100% 50%, 100% 58%, 0 58%); }
.slice-3 { clip-path: polygon(0 75%, 100% 75%, 100% 85%, 0 85%); }

/* GLITCH ACTIVE STATE */
.glitch-active .chroma-r { animation: chroma-r-glitch 0.1s steps(3) infinite; }
.glitch-active .chroma-g { animation: chroma-g-glitch 0.1s steps(2) infinite; }
.glitch-active .chroma-b { animation: chroma-b-glitch 0.1s steps(3) infinite; }
.glitch-active .slice-layer { animation: slice-glitch 0.08s steps(2) infinite; }
.glitch-active h1 { animation: text-jitter 0.1s steps(2) infinite; }

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
.major-glitch h1 { animation: major-shake 0.05s steps(3) infinite !important; }
.major-glitch .chroma-r { animation: chroma-r-major 0.04s steps(1) infinite !important; opacity: 1 !important; }
.major-glitch .chroma-g { animation: chroma-g-major 0.04s steps(1) infinite !important; opacity: 0.9 !important; }
.major-glitch .chroma-b { animation: chroma-b-major 0.04s steps(1) infinite !important; opacity: 1 !important; }
.major-glitch .slice-1 { animation: slice-major-1 0.03s steps(1) infinite !important; opacity: 1 !important; }
.major-glitch .slice-2 { animation: slice-major-2 0.04s steps(1) infinite !important; opacity: 1 !important; }
.major-glitch .slice-3 { animation: slice-major-3 0.035s steps(1) infinite !important; opacity: 1 !important; }

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

/* Invert flashes */
.major-glitch { animation: invert-flash 0.15s steps(1) infinite; }

@keyframes invert-flash {
  0% { filter: none; }
  15% { filter: invert(1); }
  20% { filter: none; }
  45% { filter: invert(1); }
  50% { filter: none; }
  75% { filter: invert(1); }
  80% { filter: none; }
}

/* Viewport shift */
.viewport-shift { transition: transform 0.02s steps(2); }
</style>
