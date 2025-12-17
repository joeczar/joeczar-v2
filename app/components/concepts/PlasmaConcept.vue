<script setup lang="ts">
// =============================================================================
// PLASMA PARAMETERS (your locked values from the lamp!)
// =============================================================================
const GRID_COLS = ref(60)
const GRID_ROWS = ref(30)
const LED_SIZE = ref(8)
const LED_GAP = ref(20)
const PLASMA_SCALE = ref(0.30)
const PLASMA_SPEED = ref(0.02)

// =============================================================================
// SECRET CONTROLS - Triple-click to toggle
// =============================================================================
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

// =============================================================================
// ANIMATION
// =============================================================================
const time = ref(0)
let animationId: number | null = null

function animate() {
  time.value += PLASMA_SPEED.value
  animationId = requestAnimationFrame(animate)
}

onMounted(() => {
  animate()
})

onUnmounted(() => {
  if (animationId) cancelAnimationFrame(animationId)
  if (clickTimer) clearTimeout(clickTimer)
})

// =============================================================================
// PLASMA CALCULATION
// =============================================================================
function plasma(x: number, y: number, t: number): number {
  const scale = PLASMA_SCALE.value
  const v1 = Math.sin(x * scale + t)
  const v2 = Math.sin(y * scale + t * 1.3)
  const v3 = Math.sin((x + y) * scale * 0.5 + t * 0.7)
  const v4 = Math.sin(Math.sqrt(x * x + y * y) * scale * 0.5 + t * 1.1)
  return (v1 + v2 + v3 + v4 + 4) / 8
}

// =============================================================================
// WARM COLOR PALETTE
// =============================================================================
function getWarmColor(value: number): string {
  if (value < 0.2) {
    const v = value / 0.2
    return `rgb(${Math.floor(v * 30)}, ${Math.floor(v * 10)}, 0)`
  } else if (value < 0.4) {
    const v = (value - 0.2) / 0.2
    return `rgb(${Math.floor(30 + v * 100)}, ${Math.floor(10 + v * 30)}, 0)`
  } else if (value < 0.6) {
    const v = (value - 0.4) / 0.2
    return `rgb(${Math.floor(130 + v * 70)}, ${Math.floor(40 + v * 50)}, ${Math.floor(v * 10)})`
  } else if (value < 0.8) {
    const v = (value - 0.6) / 0.2
    return `rgb(${Math.floor(200 + v * 40)}, ${Math.floor(90 + v * 80)}, ${Math.floor(10 + v * 30)})`
  } else {
    const v = (value - 0.8) / 0.2
    return `rgb(${Math.floor(240 + v * 15)}, ${Math.floor(170 + v * 70)}, ${Math.floor(40 + v * 150)})`
  }
}

// =============================================================================
// COMPUTED LED GRID
// =============================================================================
const leds = computed(() => {
  const result: { x: number; y: number; color: string; brightness: number }[] = []
  const size = LED_SIZE.value
  const gap = LED_GAP.value
  const t = time.value

  for (let row = 0; row < GRID_ROWS.value; row++) {
    for (let col = 0; col < GRID_COLS.value; col++) {
      const brightness = plasma(col, row, t)
      result.push({
        x: col * (size + gap),
        y: row * (size + gap),
        color: getWarmColor(brightness),
        brightness
      })
    }
  }
  return result
})

const gridWidth = computed(() => GRID_COLS.value * (LED_SIZE.value + LED_GAP.value) - LED_GAP.value)
const gridHeight = computed(() => GRID_ROWS.value * (LED_SIZE.value + LED_GAP.value) - LED_GAP.value)

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
          <button @click="showControls = false" class="text-silver hover:text-white">&times;</button>
        </div>

        <div class="space-y-1">
          <label class="text-silver flex justify-between">
            <span>Columns: {{ GRID_COLS }}</span>
          </label>
          <input v-model.number="GRID_COLS" type="range" min="10" max="120" class="w-full" />
        </div>

        <div class="space-y-1">
          <label class="text-silver flex justify-between">
            <span>Rows: {{ GRID_ROWS }}</span>
          </label>
          <input v-model.number="GRID_ROWS" type="range" min="5" max="60" class="w-full" />
        </div>

        <div class="space-y-1">
          <label class="text-silver flex justify-between">
            <span>LED Size: {{ LED_SIZE }}px</span>
          </label>
          <input v-model.number="LED_SIZE" type="range" min="4" max="40" class="w-full" />
        </div>

        <div class="space-y-1">
          <label class="text-silver flex justify-between">
            <span>Gap: {{ LED_GAP }}px</span>
          </label>
          <input v-model.number="LED_GAP" type="range" min="0" max="40" class="w-full" />
        </div>

        <div class="space-y-1">
          <label class="text-silver flex justify-between">
            <span>Scale: {{ PLASMA_SCALE.toFixed(2) }}</span>
          </label>
          <input v-model.number="PLASMA_SCALE" type="range" min="0.02" max="0.5" step="0.01" class="w-full" />
        </div>

        <div class="space-y-1">
          <label class="text-silver flex justify-between">
            <span>Speed: {{ PLASMA_SPEED.toFixed(3) }}</span>
          </label>
          <input v-model.number="PLASMA_SPEED" type="range" min="0.005" max="0.1" step="0.005" class="w-full" />
        </div>
      </div>
    </Transition>

    <!-- LED Grid -->
    <div
      class="absolute"
      :style="{
        width: `${gridWidth}px`,
        height: `${gridHeight}px`,
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%)'
      }"
    >
      <div
        v-for="(led, i) in leds"
        :key="i"
        :style="{
          position: 'absolute',
          left: `${led.x}px`,
          top: `${led.y}px`,
          width: `${LED_SIZE}px`,
          height: `${LED_SIZE}px`,
          backgroundColor: led.color,
          borderRadius: '2px',
          boxShadow: led.brightness > 0.5
            ? `0 0 ${Math.floor(led.brightness * 12)}px ${led.color}`
            : 'none'
        }"
      />
    </div>

    <!-- Dark overlay for text readability -->
    <div
      class="absolute inset-0 pointer-events-none"
      :style="{
        background: 'radial-gradient(ellipse at center, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.2) 100%)'
      }"
    />

    <!-- Text Overlay -->
    <div class="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-10">
      <div class="relative text-center">
        <h1 class="text-6xl md:text-8xl font-bold tracking-tighter text-bone" style="text-shadow: 0 2px 30px rgba(0,0,0,0.9)">
          Joe Czarnecki
        </h1>
        <p class="mt-4 text-lg md:text-xl tracking-widest text-silver">
          musician · maker · developer
        </p>
      </div>

      <!-- Navigation -->
      <div v-if="activeNavLinks.length" class="mt-16 flex gap-12 pointer-events-auto">
        <a
          v-for="link in activeNavLinks"
          :key="link.key"
          :href="link.href"
          class="text-silver/70 hover:text-amber-400 transition-colors font-mono text-sm"
        >
          {{ link.label }}
        </a>
      </div>

      <!-- Social links -->
      <div class="absolute bottom-8 pointer-events-auto">
        <nav class="flex items-center gap-6">
          <a
            v-for="link in socialLinks"
            :key="link.key"
            :href="link.href"
            :target="link.external ? '_blank' : undefined"
            :rel="link.external ? 'noopener noreferrer' : undefined"
            class="text-silver/50 hover:text-amber-400 transition-colors text-sm"
          >
            {{ link.label }}
          </a>
        </nav>
      </div>
    </div>
  </div>
</template>

<style scoped>
.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s ease;
}

.slide-enter-from,
.slide-leave-to {
  opacity: 0;
  transform: translateX(-20px);
}
</style>
