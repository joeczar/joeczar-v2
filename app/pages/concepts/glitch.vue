<script setup lang="ts">
const nameRef = ref<HTMLElement>()
const isGlitching = ref(false)
const activePoint = ref<string | null>(null)

// Random glitch trigger
let glitchInterval: NodeJS.Timeout
onMounted(() => {
  glitchInterval = setInterval(() => {
    if (Math.random() > 0.7) {
      triggerGlitch()
    }
  }, 3000)
})

onUnmounted(() => {
  clearInterval(glitchInterval)
})

function triggerGlitch() {
  isGlitching.value = true
  setTimeout(() => {
    isGlitching.value = false
  }, 150)
}
</script>

<template>
  <div class="fixed inset-0 bg-void overflow-hidden">
    <!-- Scan lines overlay -->
    <div class="absolute inset-0 pointer-events-none scanlines" />

    <!-- Main content -->
    <div class="min-h-screen flex flex-col justify-center px-4 md:px-12">
      <!-- The name - brutalist style -->
      <div
        ref="nameRef"
        class="relative select-none"
        :class="{ 'glitch-active': isGlitching }"
        @mouseenter="triggerGlitch"
      >
        <h1 class="text-[15vw] md:text-[12vw] font-bold leading-[0.85] tracking-tighter">
          <span class="block glitch-text" data-text="JOE">JOE</span>
          <span class="block glitch-text text-right" data-text="CZAR">CZAR</span>
          <span class="block glitch-text" data-text="NECKI">NECKI</span>
        </h1>

        <!-- Glitch layers -->
        <div class="absolute inset-0 glitch-layer glitch-r" aria-hidden="true">
          <span class="block text-[15vw] md:text-[12vw] font-bold leading-[0.85] tracking-tighter">
            <span class="block">JOE</span>
            <span class="block text-right">CZAR</span>
            <span class="block">NECKI</span>
          </span>
        </div>
        <div class="absolute inset-0 glitch-layer glitch-b" aria-hidden="true">
          <span class="block text-[15vw] md:text-[12vw] font-bold leading-[0.85] tracking-tighter">
            <span class="block">JOE</span>
            <span class="block text-right">CZAR</span>
            <span class="block">NECKI</span>
          </span>
        </div>
      </div>

      <!-- Entry points - stacked, raw -->
      <div class="mt-12 md:mt-16 flex flex-col gap-2 font-mono text-sm md:text-base">
        <button
          v-for="point in ['music', 'work', 'code']"
          :key="point"
          class="text-left text-silver hover:text-bone transition-all duration-100 glitch-hover"
          :class="{
            'text-ember': point === 'music',
            'text-signal': point === 'work',
            'text-pulse': point === 'code'
          }"
          @mouseenter="activePoint = point; triggerGlitch()"
          @mouseleave="activePoint = null"
        >
          [{{ point }}]
        </button>
      </div>

      <!-- Social - minimal -->
      <div class="absolute bottom-8 left-4 md:left-12">
        <SocialLinks size="sm" class="font-mono" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.scanlines {
  background: repeating-linear-gradient(
    0deg,
    rgba(0, 0, 0, 0.15),
    rgba(0, 0, 0, 0.15) 1px,
    transparent 1px,
    transparent 2px
  );
}

.glitch-layer {
  opacity: 0;
  mix-blend-mode: screen;
}

.glitch-r {
  color: #ef4136;
}

.glitch-b {
  color: #50d2cb;
}

.glitch-active .glitch-layer {
  animation: glitch-anim 150ms steps(2) forwards;
}

.glitch-active .glitch-r {
  animation: glitch-anim-r 150ms steps(2) forwards;
}

.glitch-active .glitch-b {
  animation: glitch-anim-b 150ms steps(2) forwards;
}

@keyframes glitch-anim {
  0% { opacity: 0; }
  20% { opacity: 0.8; }
  40% { opacity: 0; }
  60% { opacity: 0.6; }
  80% { opacity: 0; }
  100% { opacity: 0; }
}

@keyframes glitch-anim-r {
  0% { transform: translate(0); opacity: 0; }
  20% { transform: translate(-5px, 2px); opacity: 0.8; }
  40% { transform: translate(3px, -1px); opacity: 0; }
  60% { transform: translate(-2px, 1px); opacity: 0.6; }
  80% { transform: translate(4px, -2px); opacity: 0; }
  100% { transform: translate(0); opacity: 0; }
}

@keyframes glitch-anim-b {
  0% { transform: translate(0); opacity: 0; }
  20% { transform: translate(5px, -2px); opacity: 0.8; }
  40% { transform: translate(-3px, 1px); opacity: 0; }
  60% { transform: translate(2px, -1px); opacity: 0.6; }
  80% { transform: translate(-4px, 2px); opacity: 0; }
  100% { transform: translate(0); opacity: 0; }
}

.glitch-hover:hover {
  animation: glitch-text 100ms steps(2) infinite;
}

@keyframes glitch-text {
  0% { transform: translate(0); }
  25% { transform: translate(-2px, 1px); }
  50% { transform: translate(2px, -1px); }
  75% { transform: translate(-1px, -1px); }
  100% { transform: translate(0); }
}
</style>
