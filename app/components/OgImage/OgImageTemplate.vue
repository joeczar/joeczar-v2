<script setup lang="ts">
// =============================================================================
// CONFIGURABLE PARAMETERS
// =============================================================================
const GRID_COLS = 60        // Number of LEDs horizontally
const GRID_ROWS = 30        // Number of LEDs vertically
const LED_SIZE = 8          // Size of each LED in pixels
const LED_GAP = 20          // Gap between LEDs
const PLASMA_SCALE = 0.30   // How "zoomed in" the plasma is (smaller = larger waves)

// =============================================================================
// PLASMA CALCULATION
// =============================================================================
const time = 0.5  // Static plasma state

function plasma(x: number, y: number): number {
  // Classic plasma formula - layered sine waves
  const v1 = Math.sin(x * PLASMA_SCALE + time)
  const v2 = Math.sin(y * PLASMA_SCALE + time * 1.3)
  const v3 = Math.sin((x + y) * PLASMA_SCALE * 0.5 + time * 0.7)
  const v4 = Math.sin(Math.sqrt(x * x + y * y) * PLASMA_SCALE * 0.5 + time * 1.1)

  // Combine and normalize to 0-1
  return (v1 + v2 + v3 + v4 + 4) / 8
}

// =============================================================================
// WARM COLOR PALETTE
// =============================================================================
function getWarmColor(value: number): string {
  // value: 0 = dark, 1 = bright
  // Warm palette: black → deep orange → amber → warm white

  if (value < 0.2) {
    // Very dark - near black with hint of warmth
    const v = value / 0.2
    return `rgb(${Math.floor(v * 30)}, ${Math.floor(v * 10)}, 0)`
  } else if (value < 0.4) {
    // Dark orange/red
    const v = (value - 0.2) / 0.2
    return `rgb(${Math.floor(30 + v * 100)}, ${Math.floor(10 + v * 30)}, 0)`
  } else if (value < 0.6) {
    // Orange
    const v = (value - 0.4) / 0.2
    return `rgb(${Math.floor(130 + v * 70)}, ${Math.floor(40 + v * 50)}, ${Math.floor(v * 10)})`
  } else if (value < 0.8) {
    // Amber/yellow
    const v = (value - 0.6) / 0.2
    return `rgb(${Math.floor(200 + v * 40)}, ${Math.floor(90 + v * 80)}, ${Math.floor(10 + v * 30)})`
  } else {
    // Warm white
    const v = (value - 0.8) / 0.2
    return `rgb(${Math.floor(240 + v * 15)}, ${Math.floor(170 + v * 70)}, ${Math.floor(40 + v * 150)})`
  }
}

// =============================================================================
// GENERATE LED GRID
// =============================================================================
interface LED {
  x: number
  y: number
  color: string
  brightness: number
}

const leds: LED[] = []

for (let row = 0; row < GRID_ROWS; row++) {
  for (let col = 0; col < GRID_COLS; col++) {
    const brightness = plasma(col, row)
    leds.push({
      x: col * (LED_SIZE + LED_GAP),
      y: row * (LED_SIZE + LED_GAP),
      color: getWarmColor(brightness),
      brightness
    })
  }
}

// Calculate total grid dimensions
const gridWidth = GRID_COLS * (LED_SIZE + LED_GAP) - LED_GAP
const gridHeight = GRID_ROWS * (LED_SIZE + LED_GAP) - LED_GAP
</script>

<template>
  <div
    class="w-full h-full flex flex-col items-center justify-center relative overflow-hidden"
    :style="{
      backgroundColor: '#050505',
      fontFamily: 'Space Grotesk, sans-serif'
    }"
  >
    <!-- LED Grid Background -->
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
      class="absolute inset-0"
      :style="{
        background: 'radial-gradient(ellipse at center, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 100%)'
      }"
    />

    <!-- Main text -->
    <div class="relative z-10 text-center">
      <div
        class="text-7xl font-bold tracking-tighter"
        :style="{
          color: '#e8e8e6',
          textShadow: '0 2px 20px rgba(0,0,0,0.8)'
        }"
      >
        <div>JOE</div>
        <div>CZARNECKI</div>
      </div>

      <!-- Subtitle -->
      <div
        class="mt-4 text-xl tracking-widest"
        :style="{ color: '#a0a0a3' }"
      >
        musician · maker · developer
      </div>
    </div>

  </div>
</template>
