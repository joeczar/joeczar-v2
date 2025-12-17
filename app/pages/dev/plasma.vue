<script setup lang="ts">
// =============================================================================
// TWEAK THESE VALUES
// =============================================================================
const GRID_COLS = ref(60)       // Number of LEDs horizontally
const GRID_ROWS = ref(30)       // Number of LEDs vertically
const LED_SIZE = ref(16)        // Size of each LED in pixels
const LED_GAP = ref(4)          // Gap between LEDs
const PLASMA_SCALE = ref(0.15)  // Wave size (smaller = larger waves)
const PLASMA_SPEED = ref(0.02)  // Animation speed

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
</script>

<template>
  <div class="fixed inset-0 bg-black overflow-hidden">
    <!-- Controls Panel -->
    <div class="absolute top-4 left-4 z-20 bg-black/80 p-4 rounded-lg font-mono text-xs space-y-3 min-w-64">
      <h2 class="text-white font-bold text-sm mb-4">Plasma Controls</h2>

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
        <input v-model.number="LED_GAP" type="range" min="0" max="20" class="w-full" />
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

      <div class="pt-2 border-t border-white/10 text-silver/50">
        Time: {{ time.toFixed(2) }}
      </div>
    </div>

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

    <!-- Text Overlay -->
    <div class="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-10">
      <div
        class="absolute inset-0"
        :style="{
          background: 'radial-gradient(ellipse at center, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.2) 100%)'
        }"
      />
      <div class="relative text-center">
        <h1 class="text-7xl font-bold tracking-tighter text-bone" style="text-shadow: 0 2px 20px rgba(0,0,0,0.8)">
          JOE<br>CZARNECKI
        </h1>
        <p class="mt-4 text-xl tracking-widest text-silver">
          musician · maker · developer
        </p>
      </div>
    </div>
  </div>
</template>
