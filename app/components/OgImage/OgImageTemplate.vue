<script setup lang="ts">
// Inline plasma generation for Satori compatibility
const config = {
  cols: 60,
  rows: 30,
  ledSize: 8,
  ledGap: 20,
  scale: 0.30
}
const time = 0.5

function plasma(x: number, y: number): number {
  const v1 = Math.sin(x * config.scale + time)
  const v2 = Math.sin(y * config.scale + time * 1.3)
  const v3 = Math.sin((x + y) * config.scale * 0.5 + time * 0.7)
  const v4 = Math.sin(Math.sqrt(x * x + y * y) * config.scale * 0.5 + time * 1.1)
  return (v1 + v2 + v3 + v4 + 4) / 8
}

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

interface LED {
  x: number
  y: number
  color: string
  brightness: number
}

const leds: LED[] = []
for (let row = 0; row < config.rows; row++) {
  for (let col = 0; col < config.cols; col++) {
    const brightness = plasma(col, row)
    leds.push({
      x: col * (config.ledSize + config.ledGap),
      y: row * (config.ledSize + config.ledGap),
      color: getWarmColor(brightness),
      brightness
    })
  }
}

const gridWidth = config.cols * (config.ledSize + config.ledGap) - config.ledGap
const gridHeight = config.rows * (config.ledSize + config.ledGap) - config.ledGap
</script>

<template>
  <div class="w-full h-full flex flex-col items-center justify-center relative overflow-hidden bg-[#050505] font-sans">
    <!-- LED Grid (inlined for Satori) -->
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
          width: `${config.ledSize}px`,
          height: `${config.ledSize}px`,
          backgroundColor: led.color,
          boxShadow: led.brightness > 0.5 ? `0 0 ${Math.floor(led.brightness * 12)}px ${led.color}` : 'none'
        }"
      />
    </div>

    <!-- Dark overlay for text readability -->
    <div
      class="absolute inset-0"
      :style="{ background: 'radial-gradient(ellipse at center, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 100%)' }"
    />

    <!-- Main text -->
    <div class="relative z-10 text-center">
      <div
        class="text-[11rem] font-bold tracking-tighter leading-none"
        :style="{ color: '#e8e8e6', textShadow: '0 2px 20px rgba(0,0,0,0.8)' }"
      >
        <div>JOE</div>
        <div>CZARNECKI</div>
      </div>

      <!-- Subtitle -->
      <div
        class="mt-8 text-5xl tracking-widest"
        :style="{ color: '#e8e8e6' }"
      >
        musician · maker · developer
      </div>
    </div>
  </div>
</template>
