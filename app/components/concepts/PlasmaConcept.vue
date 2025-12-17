<script setup lang="ts">
import { generateLeds, getGridDimensions, type PlasmaConfig } from '~/composables/usePlasma'

// Reactive config for controls
const config = reactive<PlasmaConfig>({
  cols: 60,
  rows: 30,
  ledSize: 8,
  ledGap: 20,
  scale: 0.30
})
const speed = ref(0.02)

// Secret controls - Triple-click to toggle
const showControls = ref(false)
const clickCount = ref(0)
let clickTimer: ReturnType<typeof setTimeout> | null = null

function handleClick() {
  clickCount.value++
  if (clickTimer) clearTimeout(clickTimer)
  clickTimer = setTimeout(() => {
    if (clickCount.value >= 3) {
      showControls.value = !showControls.value
    }
    clickCount.value = 0
  }, 400)
}

// Animation
const time = ref(0)
let animationId: number | null = null

function animate() {
  time.value += speed.value
  animationId = requestAnimationFrame(animate)
}

onMounted(() => animate())
onUnmounted(() => {
  if (animationId) cancelAnimationFrame(animationId)
  if (clickTimer) clearTimeout(clickTimer)
})

// Computed LED grid
const leds = computed(() => generateLeds(config, time.value))
const gridDimensions = computed(() => getGridDimensions(config))

// Navigation links
const { activeNavLinks, socialLinks } = useSiteLinks()
</script>

<template>
  <div class="fixed inset-0 bg-black overflow-hidden" @click="handleClick">
    <!-- Secret Controls Panel - Triple-click to toggle -->
    <Transition name="slide">
      <div
        v-if="showControls"
        class="absolute top-4 left-4 z-30 bg-black/90 p-4 rounded-lg font-mono text-xs space-y-3 min-w-64 border border-amber-500/30"
        @click.stop
      >
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-amber-500 font-bold text-sm">Plasma Controls</h2>
          <button class="text-silver hover:text-white" @click="showControls = false">&times;</button>
        </div>

        <div class="space-y-2">
          <label class="text-silver flex justify-between">
            <span>Columns: {{ config.cols }}</span>
          </label>
          <Slider
            :model-value="[config.cols]"
            :min="10"
            :max="120"
            :step="1"
            class="plasma-slider"
            @update:model-value="(v) => v?.[0] !== undefined && (config.cols = v[0])"
          />
        </div>

        <div class="space-y-2">
          <label class="text-silver flex justify-between">
            <span>Rows: {{ config.rows }}</span>
          </label>
          <Slider
            :model-value="[config.rows]"
            :min="5"
            :max="60"
            :step="1"
            class="plasma-slider"
            @update:model-value="(v) => v?.[0] !== undefined && (config.rows = v[0])"
          />
        </div>

        <div class="space-y-2">
          <label class="text-silver flex justify-between">
            <span>LED Size: {{ config.ledSize }}px</span>
          </label>
          <Slider
            :model-value="[config.ledSize]"
            :min="4"
            :max="40"
            :step="1"
            class="plasma-slider"
            @update:model-value="(v) => v?.[0] !== undefined && (config.ledSize = v[0])"
          />
        </div>

        <div class="space-y-2">
          <label class="text-silver flex justify-between">
            <span>Gap: {{ config.ledGap }}px</span>
          </label>
          <Slider
            :model-value="[config.ledGap]"
            :min="0"
            :max="40"
            :step="1"
            class="plasma-slider"
            @update:model-value="(v) => v?.[0] !== undefined && (config.ledGap = v[0])"
          />
        </div>

        <div class="space-y-2">
          <label class="text-silver flex justify-between">
            <span>Scale: {{ config.scale.toFixed(2) }}</span>
          </label>
          <Slider
            :model-value="[config.scale]"
            :min="0.02"
            :max="0.5"
            :step="0.01"
            class="plasma-slider"
            @update:model-value="(v) => v?.[0] !== undefined && (config.scale = v[0])"
          />
        </div>

        <div class="space-y-2">
          <label class="text-silver flex justify-between">
            <span>Speed: {{ speed.toFixed(3) }}</span>
          </label>
          <Slider
            :model-value="[speed]"
            :min="0.005"
            :max="0.1"
            :step="0.005"
            class="plasma-slider"
            @update:model-value="(v) => v?.[0] !== undefined && (speed = v[0])"
          />
        </div>
      </div>
    </Transition>

    <!-- LED Grid -->
    <PlasmaGrid
      :leds="leds"
      :led-size="config.ledSize"
      :grid-width="gridDimensions.width"
      :grid-height="gridDimensions.height"
    />

    <!-- Dark overlay for text readability -->
    <div class="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.6)_0%,rgba(0,0,0,0.2)_100%)]" />

    <!-- Text Overlay -->
    <div class="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-10">
      <div class="relative text-center">
        <h1 class="text-6xl md:text-8xl font-bold tracking-tighter text-bone [text-shadow:0_2px_30px_rgba(0,0,0,0.9)]">
          Joe Czarnecki
        </h1>
        <p class="mt-4 text-lg md:text-xl tracking-widest text-silver">
          musician · maker · developer
        </p>
      </div>

      <!-- Navigation -->
      <div
        v-if="activeNavLinks.length"
        class="mt-16 flex gap-8 pointer-events-auto px-5 py-2.5 rounded-full bg-black/30 backdrop-blur-sm border border-white/5"
      >
        <NuxtLink
          v-for="link in activeNavLinks"
          :key="link.key"
          :to="link.href"
          class="text-silver/80 hover:text-amber-400 transition-colors font-mono text-sm"
        >
          {{ link.label }}
        </NuxtLink>
      </div>

      <!-- Social links -->
      <div class="absolute bottom-8 pointer-events-auto">
        <nav class="flex items-center gap-6 px-4 py-2 rounded-full bg-black/30 backdrop-blur-sm border border-white/5">
          <a
            v-for="link in socialLinks"
            :key="link.key"
            :href="link.href"
            :target="link.external ? '_blank' : undefined"
            :rel="link.external ? 'noopener noreferrer' : undefined"
            class="text-silver/70 hover:text-amber-400 transition-colors text-sm"
          >
            {{ link.label }}
          </a>
        </nav>
      </div>
    </div>
  </div>
</template>

<style scoped>
@reference "tailwindcss";

.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s ease;
}

.slide-enter-from,
.slide-leave-to {
  opacity: 0;
  transform: translateX(-20px);
}

/* Amber-themed sliders for plasma controls */
.plasma-slider :deep([data-slot="slider-track"]) {
  background-color: rgb(69 26 3 / 0.5);
}

.plasma-slider :deep([data-slot="slider-range"]) {
  background: linear-gradient(to right, #d97706, #fbbf24);
}

.plasma-slider :deep([data-slot="slider-thumb"]) {
  background-color: #fbbf24;
  border-color: #f59e0b;
  box-shadow: 0 0 8px rgb(245 158 11 / 0.5);
}

.plasma-slider :deep([data-slot="slider-thumb"]:hover) {
  box-shadow: 0 0 0 4px rgb(245 158 11 / 0.3);
}
</style>
