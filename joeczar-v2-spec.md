# joeczar-v2: Portfolio Site Rebuild

## Project Overview

Build a new personal portfolio site for Joe Czarnecki - musician, humanitarian worker, and software developer. The landing page should be avant-garde and experimental, showcasing creative coding skills while setting up a "scrapbook" architecture where different sections can have wildly different aesthetics.

This spec creates four concept variations of the landing page as routes to compare:
- `/concepts/canvas` - Particle field + 3D parallax
- `/concepts/glitch` - Brutalist type + distortion
- `/concepts/organism` - Connected nodes + bioluminescence  
- `/concepts/portal` - Calm surface + peek-inside worlds

Plus a minimal index page to navigate between them.

---

## 1. Project Setup

### Initialize Nuxt 3 Project

```bash
cd ~/Code/personal
pnpm dlx nuxi@latest init joeczar-v2
cd joeczar-v2
```

### Install Dependencies

```bash
# Core - TresJS v5 with Nuxt module
pnpm add @tresjs/nuxt @tresjs/cientos three

# Styling
pnpm add -D @nuxtjs/tailwindcss

# Utilities
pnpm add @vueuse/core
```

> **Note:** `@tresjs/nuxt` automatically includes `@tresjs/core`. The `glsl-noise` package was removed as it's outdated and the shaders in this spec use inline GLSL. `@vueuse/motion` was removed as it's not used in these concepts.

### Configure nuxt.config.ts

```typescript
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/tailwindcss',
    '@tresjs/nuxt'
  ],
  css: ['~/assets/css/main.css'],
  tres: {
    devtools: true
  },
  app: {
    head: {
      title: 'Joe Czarnecki',
      meta: [
        { name: 'description', content: 'Musician · Maker · Developer' }
      ],
      link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Space+Mono:wght@400;700&display=swap' }
      ]
    }
  }
})
```

### Configure Tailwind (tailwind.config.js)

```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './app.vue'
  ],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Space Grotesk', 'system-ui', 'sans-serif'],
        'mono': ['Space Mono', 'monospace']
      },
      colors: {
        // Primary palette
        'void': '#0a0a0b',
        'smoke': '#1a1a1d', 
        'ash': '#2d2d30',
        'silver': '#a0a0a3',
        'bone': '#e8e8e6',
        
        // Accent colors (for the three entry points)
        'ember': '#ef4136',      // Music - warm, passionate
        'signal': '#50d2cb',     // Work/Humanitarian - clear, hopeful  
        'pulse': '#7ec245',      // Code - growth, logic
        
        // Effects
        'glow': '#f0f0f0'
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'breathe': 'breathe 8s ease-in-out infinite'
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' }
        },
        breathe: {
          '0%, 100%': { opacity: 0.8 },
          '50%': { opacity: 1 }
        }
      }
    }
  },
  plugins: []
}
```

### Base CSS (assets/css/main.css)

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  html {
    @apply bg-void text-bone antialiased;
  }
  
  body {
    @apply min-h-screen overflow-x-hidden;
  }
  
  ::selection {
    @apply bg-signal/30 text-bone;
  }
}

@layer components {
  .text-gradient {
    @apply bg-clip-text text-transparent bg-gradient-to-r;
  }
}
```

---

## 2. Shared Components

### components/SocialLinks.vue

```vue
<script setup lang="ts">
interface Props {
  class?: string
  size?: 'sm' | 'md'
}

const props = withDefaults(defineProps<Props>(), {
  size: 'md'
})

const links = [
  { name: 'GitHub', url: 'https://github.com/joeczar', icon: 'github' },
  { name: 'LinkedIn', url: 'https://www.linkedin.com/in/joe-czar/', icon: 'linkedin' },
  { name: 'CV', url: '/Joe_Czarnecki_Deutsch_2023.pdf', icon: 'file' }
]
</script>

<template>
  <nav :class="['flex items-center gap-6', props.class]">
    <a
      v-for="link in links"
      :key="link.name"
      :href="link.url"
      :target="link.url.startsWith('http') ? '_blank' : undefined"
      :rel="link.url.startsWith('http') ? 'noopener noreferrer' : undefined"
      class="text-silver hover:text-bone transition-colors duration-300"
      :class="size === 'sm' ? 'text-sm' : 'text-base'"
    >
      {{ link.name }}
    </a>
  </nav>
</template>
```

### components/EntryPoints.vue

```vue
<script setup lang="ts">
interface Props {
  interactive?: boolean
}

defineProps<Props>()
const emit = defineEmits<{
  hover: [key: string | null]
}>()

const points = [
  { key: 'music', label: 'music', color: '#ef4136', colorClass: 'ember' },
  { key: 'work', label: 'work', color: '#50d2cb', colorClass: 'signal' },
  { key: 'code', label: 'code', color: '#7ec245', colorClass: 'pulse' }
]

const activePoint = ref<string | null>(null)

function handleHover(key: string | null) {
  activePoint.value = key
  emit('hover', key)
}
</script>

<template>
  <div class="flex items-center justify-center gap-12 md:gap-16">
    <div
      v-for="point in points"
      :key="point.key"
      class="flex flex-col items-center gap-3 cursor-pointer group"
      @mouseenter="handleHover(point.key)"
      @mouseleave="handleHover(null)"
    >
      <!-- The dot - using inline styles for dynamic colors (Tailwind JIT can't handle interpolated classes) -->
      <div
        class="w-3 h-3 rounded-full bg-silver/50 transition-all duration-500 group-hover:scale-150"
        :style="activePoint === point.key ? {
          backgroundColor: point.color,
          boxShadow: `0 10px 15px -3px ${point.color}80`
        } : {}"
      />
      <!-- The label -->
      <span
        class="text-sm font-mono text-silver/70 transition-colors duration-300"
        :style="activePoint === point.key ? { color: point.color } : {}"
      >
        {{ point.label }}
      </span>
    </div>
  </div>
</template>
```

### composables/useMouse3D.ts

```typescript
export function useMouse3D() {
  const mouse = reactive({ x: 0, y: 0 })
  const smoothMouse = reactive({ x: 0, y: 0 })
  
  function handleMouseMove(event: MouseEvent) {
    // Normalize to -1 to 1
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1
  }
  
  // Smooth interpolation
  let animationId: number
  function animate() {
    smoothMouse.x += (mouse.x - smoothMouse.x) * 0.05
    smoothMouse.y += (mouse.y - smoothMouse.y) * 0.05
    animationId = requestAnimationFrame(animate)
  }
  
  onMounted(() => {
    window.addEventListener('mousemove', handleMouseMove)
    animate()
  })
  
  onUnmounted(() => {
    window.removeEventListener('mousemove', handleMouseMove)
    cancelAnimationFrame(animationId)
  })
  
  return { mouse, smoothMouse }
}
```

---

## 3. Index Page (Concept Selector)

### pages/index.vue

```vue
<script setup lang="ts">
const concepts = [
  { path: '/concepts/canvas', name: 'Canvas', description: 'Particle field + 3D parallax' },
  { path: '/concepts/glitch', name: 'Glitch', description: 'Brutalist type + distortion' },
  { path: '/concepts/organism', name: 'Organism', description: 'Connected nodes + bioluminescence' },
  { path: '/concepts/portal', name: 'Portal', description: 'Calm surface + peek-inside worlds' }
]
</script>

<template>
  <div class="min-h-screen flex flex-col items-center justify-center p-8">
    <h1 class="text-4xl md:text-5xl font-light mb-4">joeczar-v2</h1>
    <p class="text-silver mb-12">Landing page concepts</p>
    
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl w-full">
      <NuxtLink
        v-for="concept in concepts"
        :key="concept.path"
        :to="concept.path"
        class="group p-6 border border-ash rounded-lg hover:border-silver transition-colors duration-300"
      >
        <h2 class="text-xl font-medium mb-2 group-hover:text-signal transition-colors">
          {{ concept.name }}
        </h2>
        <p class="text-silver text-sm">{{ concept.description }}</p>
      </NuxtLink>
    </div>
  </div>
</template>
```

---

## 4. Concept A: Canvas

**The vision:** A living particle field fills the viewport. Your name floats with subtle 3D parallax responding to mouse movement. Particles drift and cluster organically. The three entry points are subtle but react to the particle field.

### pages/concepts/canvas.vue

```vue
<script setup lang="ts">
const { smoothMouse } = useMouse3D()
const activePoint = ref<string | null>(null)
</script>

<template>
  <div class="fixed inset-0 bg-void">
    <!-- Three.js Canvas -->
    <ClientOnly>
      <TresCanvas alpha :dpr="[1, 2]">
        <TresPerspectiveCamera :position="[0, 0, 5]" :fov="75" />
        
        <!-- Particle Field -->
        <CanvasParticles :mouse="smoothMouse" :active-point="activePoint" />
        
        <!-- Subtle ambient light -->
        <TresAmbientLight :intensity="0.5" />
      </TresCanvas>
    </ClientOnly>
    
    <!-- HTML Overlay -->
    <div class="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
      <!-- Name with parallax -->
      <h1
        class="text-6xl md:text-8xl font-light tracking-tight mb-2 transition-transform duration-100 ease-out"
        :style="{
          transform: `translate(${smoothMouse.x * 20}px, ${smoothMouse.y * -10}px)`
        }"
      >
        Joe Czarnecki
      </h1>
      
      <!-- Subtitle -->
      <p
        class="text-silver text-lg md:text-xl font-light mb-16 transition-transform duration-150 ease-out"
        :style="{
          transform: `translate(${smoothMouse.x * 10}px, ${smoothMouse.y * -5}px)`
        }"
      >
        musician · maker · developer
      </p>
      
      <!-- Entry points -->
      <div class="pointer-events-auto">
        <EntryPoints @hover="activePoint = $event" />
      </div>
      
      <!-- Social links -->
      <div class="absolute bottom-8 pointer-events-auto">
        <SocialLinks size="sm" />
      </div>
    </div>
  </div>
</template>
```

### components/canvas/CanvasParticles.vue

```vue
<script setup lang="ts">
import * as THREE from 'three'
import { useLoop } from '@tresjs/core'

interface Props {
  mouse: { x: number; y: number }
  activePoint: string | null
}

const props = defineProps<Props>()

const particleCount = 2000
const positions = new Float32Array(particleCount * 3)
const randoms = new Float32Array(particleCount)

// Initialize particle positions
for (let i = 0; i < particleCount; i++) {
  positions[i * 3] = (Math.random() - 0.5) * 10
  positions[i * 3 + 1] = (Math.random() - 0.5) * 10
  positions[i * 3 + 2] = (Math.random() - 0.5) * 10
  randoms[i] = Math.random()
}

const geometry = new THREE.BufferGeometry()
geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
geometry.setAttribute('aRandom', new THREE.BufferAttribute(randoms, 1))

const uniforms = {
  uTime: { value: 0 },
  uMouse: { value: new THREE.Vector2(0, 0) },
  uColor1: { value: new THREE.Color('#a0a0a3') },  // silver default
  uColor2: { value: new THREE.Color('#50d2cb') }   // signal accent
}

const vertexShader = `
  attribute float aRandom;
  uniform float uTime;
  uniform vec2 uMouse;
  varying float vAlpha;

  void main() {
    vec3 pos = position;

    // Gentle floating motion
    pos.x += sin(uTime * 0.5 + aRandom * 6.28) * 0.1;
    pos.y += cos(uTime * 0.3 + aRandom * 6.28) * 0.1;
    pos.z += sin(uTime * 0.4 + aRandom * 3.14) * 0.05;

    // Mouse influence
    float dist = length(pos.xy - uMouse * 2.0);
    pos.xy += normalize(pos.xy - uMouse * 2.0) * (1.0 / (dist + 1.0)) * 0.3;

    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    gl_Position = projectionMatrix * mvPosition;
    gl_PointSize = (30.0 * aRandom + 10.0) * (1.0 / -mvPosition.z);

    vAlpha = aRandom * 0.5 + 0.2;
  }
`

const fragmentShader = `
  uniform vec3 uColor1;
  uniform vec3 uColor2;
  varying float vAlpha;

  void main() {
    // Soft circular point
    float dist = length(gl_PointCoord - vec2(0.5));
    if (dist > 0.5) discard;

    float alpha = smoothstep(0.5, 0.2, dist) * vAlpha;
    vec3 color = mix(uColor1, uColor2, vAlpha);

    gl_FragColor = vec4(color, alpha);
  }
`

const material = new THREE.ShaderMaterial({
  uniforms,
  vertexShader,
  fragmentShader,
  transparent: true,
  depthWrite: false,
  blending: THREE.AdditiveBlending
})

// Animation loop - TresJS v5 uses useLoop instead of useRenderLoop
const { onBeforeRender } = useLoop()
onBeforeRender(({ elapsed }) => {
  uniforms.uTime.value = elapsed
  uniforms.uMouse.value.set(props.mouse.x, props.mouse.y)

  // Change accent color based on active point
  if (props.activePoint === 'music') {
    uniforms.uColor2.value.lerp(new THREE.Color('#ef4136'), 0.1)
  } else if (props.activePoint === 'work') {
    uniforms.uColor2.value.lerp(new THREE.Color('#50d2cb'), 0.1)
  } else if (props.activePoint === 'code') {
    uniforms.uColor2.value.lerp(new THREE.Color('#7ec245'), 0.1)
  } else {
    uniforms.uColor2.value.lerp(new THREE.Color('#50d2cb'), 0.05)
  }
})
</script>

<template>
  <TresPoints :geometry="geometry" :material="material" />
</template>
```

---

## 5. Concept B: Glitch

**The vision:** Aggressive brutalist typography. Your name is massive, possibly broken across lines. Glitch/distortion effects on hover. The entry points are just words that shatter and rebuild. Everything feels like it might break apart at any moment.

### pages/concepts/glitch.vue

```vue
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
```

---

## 6. Concept C: Organism

**The vision:** Everything is connected. A network of nodes and tendrils, breathing and pulsing like a living thing. The three entry points are nodes that pulse with bioluminescent color. Lines connect everything. It feels alive.

### pages/concepts/organism.vue

```vue
<script setup lang="ts">
const { smoothMouse } = useMouse3D()
const activePoint = ref<string | null>(null)
</script>

<template>
  <div class="fixed inset-0 bg-void">
    <!-- Three.js Canvas -->
    <ClientOnly>
      <TresCanvas alpha :dpr="[1, 2]">
        <TresPerspectiveCamera :position="[0, 0, 6]" :fov="60" />
        <OrganismNetwork :mouse="smoothMouse" :active-point="activePoint" />
      </TresCanvas>
    </ClientOnly>
    
    <!-- HTML Overlay -->
    <div class="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
      <h1 class="text-5xl md:text-7xl font-light tracking-wide mb-4 mix-blend-difference">
        Joe Czarnecki
      </h1>
      
      <p class="text-silver/60 text-lg font-light mb-20">
        musician · maker · developer
      </p>
      
      <!-- Entry points as glowing nodes -->
      <div class="flex items-center gap-20 pointer-events-auto">
        <button
          v-for="(point, index) in [
            { key: 'music', label: 'music', color: '#ef4136' },
            { key: 'work', label: 'work', color: '#50d2cb' },
            { key: 'code', label: 'code', color: '#7ec245' }
          ]"
          :key="point.key"
          class="relative group"
          @mouseenter="activePoint = point.key"
          @mouseleave="activePoint = null"
        >
          <!-- Glow effect -->
          <div
            class="absolute inset-0 rounded-full blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-500"
            :style="{ backgroundColor: point.color }"
          />
          
          <!-- Node -->
          <div
            class="relative w-4 h-4 rounded-full transition-all duration-500 group-hover:scale-150"
            :class="activePoint === point.key ? 'scale-150' : ''"
            :style="{
              backgroundColor: activePoint === point.key ? point.color : '#a0a0a3',
              boxShadow: activePoint === point.key ? `0 0 30px ${point.color}` : 'none'
            }"
          />
          
          <!-- Label -->
          <span
            class="absolute -bottom-8 left-1/2 -translate-x-1/2 text-xs font-mono text-silver/50 group-hover:text-silver transition-colors whitespace-nowrap"
          >
            {{ point.label }}
          </span>
        </button>
      </div>
      
      <!-- Social -->
      <div class="absolute bottom-8 pointer-events-auto">
        <SocialLinks size="sm" class="opacity-50 hover:opacity-100 transition-opacity" />
      </div>
    </div>
  </div>
</template>
```

### components/organism/OrganismNetwork.vue

```vue
<script setup lang="ts">
import * as THREE from 'three'
import { useLoop } from '@tresjs/core'
import { Line2 } from '@tresjs/cientos'

interface Props {
  mouse: { x: number; y: number }
  activePoint: string | null
}

const props = defineProps<Props>()

// Node positions - central arrangement
const nodeCount = 30
const nodes = ref<THREE.Vector3[]>([])
const connections = ref<[number, number][]>([])

// Initialize nodes
onMounted(() => {
  for (let i = 0; i < nodeCount; i++) {
    const theta = Math.random() * Math.PI * 2
    const phi = Math.acos(2 * Math.random() - 1)
    const r = 2 + Math.random() * 2

    nodes.value.push(new THREE.Vector3(
      r * Math.sin(phi) * Math.cos(theta),
      r * Math.sin(phi) * Math.sin(theta),
      r * Math.cos(phi)
    ))
  }

  // Create connections between nearby nodes
  for (let i = 0; i < nodeCount; i++) {
    for (let j = i + 1; j < nodeCount; j++) {
      if (nodes.value[i].distanceTo(nodes.value[j]) < 2) {
        connections.value.push([i, j])
      }
    }
  }
})

// Animate nodes - TresJS v5 uses useLoop instead of useRenderLoop
const { onBeforeRender } = useLoop()
const time = ref(0)

onBeforeRender(({ delta }) => {
  time.value += delta

  // Gentle breathing motion
  nodes.value.forEach((node, i) => {
    const offset = i * 0.5
    node.x += Math.sin(time.value * 0.5 + offset) * 0.001
    node.y += Math.cos(time.value * 0.3 + offset) * 0.001
  })
})

// Get color based on active point
const accentColor = computed(() => {
  switch (props.activePoint) {
    case 'music': return '#ef4136'
    case 'work': return '#50d2cb'
    case 'code': return '#7ec245'
    default: return '#a0a0a3'
  }
})

// Helper to convert Vector3 to array for Line2
function getLinePoints(a: number, b: number): [number, number, number][] {
  if (!nodes.value[a] || !nodes.value[b]) return [[0, 0, 0], [0, 0, 0]]
  return [
    [nodes.value[a].x, nodes.value[a].y, nodes.value[a].z],
    [nodes.value[b].x, nodes.value[b].y, nodes.value[b].z]
  ]
}
</script>

<template>
  <!-- Nodes -->
  <TresMesh
    v-for="(node, i) in nodes"
    :key="i"
    :position="[node.x, node.y, node.z]"
  >
    <TresSphereGeometry :args="[0.03, 8, 8]" />
    <TresMeshBasicMaterial :color="accentColor" :transparent="true" :opacity="0.6" />
  </TresMesh>

  <!-- Connections - using Line2 from @tresjs/cientos -->
  <Line2
    v-for="([a, b], i) in connections"
    :key="`line-${i}`"
    :points="getLinePoints(a, b)"
    color="#2d2d30"
    :line-width="1"
  />
</template>
```

---

## 7. Concept D: Portal

**The vision:** The surface is calm, minimal, almost boring. But each entry point is a window into another dimension. Hover to peek inside - a tiny 3D world representing each domain. The contrast between the stillness and the chaos within.

### pages/concepts/portal.vue

```vue
<script setup lang="ts">
const activePortal = ref<string | null>(null)
</script>

<template>
  <div class="fixed inset-0 bg-void">
    <div class="min-h-screen flex flex-col items-center justify-center">
      <!-- Name - stark, still -->
      <h1 class="text-5xl md:text-7xl font-extralight tracking-widest mb-2">
        Joe Czarnecki
      </h1>
      <p class="text-silver/40 text-sm font-light tracking-[0.3em] uppercase mb-24">
        musician · maker · developer
      </p>
      
      <!-- Portal entry points -->
      <div class="flex items-center gap-16 md:gap-24">
        <PortalWindow
          v-for="portal in [
            { key: 'music', label: 'music', color: '#ef4136' },
            { key: 'work', label: 'work', color: '#50d2cb' },
            { key: 'code', label: 'code', color: '#7ec245' }
          ]"
          :key="portal.key"
          :portal-key="portal.key"
          :label="portal.label"
          :color="portal.color"
          :is-active="activePortal === portal.key"
          @mouseenter="activePortal = portal.key"
          @mouseleave="activePortal = null"
        />
      </div>
      
      <!-- Social -->
      <div class="absolute bottom-8">
        <SocialLinks size="sm" class="opacity-30 hover:opacity-100 transition-opacity duration-500" />
      </div>
    </div>
  </div>
</template>
```

### components/portal/PortalWindow.vue

```vue
<script setup lang="ts">
interface Props {
  portalKey: string
  label: string
  color: string
  isActive: boolean
}

const props = defineProps<Props>()
</script>

<template>
  <div class="relative group cursor-pointer">
    <!-- The portal frame -->
    <div
      class="w-24 h-24 md:w-32 md:h-32 rounded-full border transition-all duration-500 overflow-hidden"
      :class="isActive ? 'border-transparent scale-110' : 'border-ash'"
      :style="{
        boxShadow: isActive ? `0 0 60px ${color}40, inset 0 0 30px ${color}20` : 'none'
      }"
    >
      <!-- The world inside -->
      <ClientOnly>
        <div class="w-full h-full" :class="isActive ? 'opacity-100' : 'opacity-0'" style="transition: opacity 0.5s">
          <TresCanvas :dpr="[1, 1.5]">
            <TresPerspectiveCamera :position="[0, 0, 3]" />
            
            <!-- Music world: abstract waves -->
            <PortalMusicScene v-if="portalKey === 'music'" :is-active="isActive" />
            
            <!-- Work world: connected nodes -->
            <PortalWorkScene v-if="portalKey === 'work'" :is-active="isActive" />
            
            <!-- Code world: matrix/grid -->
            <PortalCodeScene v-if="portalKey === 'code'" :is-active="isActive" />
          </TresCanvas>
        </div>
      </ClientOnly>
      
      <!-- Inactive state: just a dot -->
      <div
        class="absolute inset-0 flex items-center justify-center transition-opacity duration-500"
        :class="isActive ? 'opacity-0' : 'opacity-100'"
      >
        <div class="w-2 h-2 rounded-full bg-ash" />
      </div>
    </div>
    
    <!-- Label -->
    <span
      class="absolute -bottom-8 left-1/2 -translate-x-1/2 text-xs font-mono transition-all duration-300 whitespace-nowrap"
      :class="isActive ? 'text-bone' : 'text-silver/40'"
    >
      {{ label }}
    </span>
  </div>
</template>
```

### components/portal/PortalMusicScene.vue

```vue
<script setup lang="ts">
import * as THREE from 'three'
import { useLoop } from '@tresjs/core'

interface Props {
  isActive: boolean
}

const props = defineProps<Props>()

const { onBeforeRender } = useLoop()
const meshRef = ref()

onBeforeRender(({ elapsed }) => {
  if (meshRef.value && props.isActive) {
    meshRef.value.rotation.x = elapsed * 0.5
    meshRef.value.rotation.y = elapsed * 0.3
  }
})
</script>

<template>
  <TresMesh ref="meshRef">
    <TresTorusKnotGeometry :args="[0.6, 0.2, 100, 16]" />
    <TresMeshBasicMaterial color="#ef4136" :wireframe="true" />
  </TresMesh>
</template>
```

### components/portal/PortalWorkScene.vue

```vue
<script setup lang="ts">
import * as THREE from 'three'
import { useLoop } from '@tresjs/core'

interface Props {
  isActive: boolean
}

const props = defineProps<Props>()

const { onBeforeRender } = useLoop()
const groupRef = ref()

onBeforeRender(({ elapsed }) => {
  if (groupRef.value && props.isActive) {
    groupRef.value.rotation.y = elapsed * 0.2
  }
})

// Create icosahedron vertices for connected nodes
const positions = [
  [0, 1, 0.5], [0, 1, -0.5], [0, -1, 0.5], [0, -1, -0.5],
  [1, 0.5, 0], [-1, 0.5, 0], [1, -0.5, 0], [-1, -0.5, 0],
  [0.5, 0, 1], [-0.5, 0, 1], [0.5, 0, -1], [-0.5, 0, -1]
].map(p => p.map(v => v * 0.7))
</script>

<template>
  <TresGroup ref="groupRef">
    <TresMesh v-for="(pos, i) in positions" :key="i" :position="pos">
      <TresSphereGeometry :args="[0.08, 8, 8]" />
      <TresMeshBasicMaterial color="#50d2cb" />
    </TresMesh>
  </TresGroup>
</template>
```

### components/portal/PortalCodeScene.vue

```vue
<script setup lang="ts">
import * as THREE from 'three'
import { useLoop } from '@tresjs/core'

interface Props {
  isActive: boolean
}

const props = defineProps<Props>()

const { onBeforeRender } = useLoop()
const meshRef = ref()

onBeforeRender(({ elapsed }) => {
  if (meshRef.value && props.isActive) {
    meshRef.value.rotation.x = elapsed * 0.3
    meshRef.value.rotation.y = elapsed * 0.5
  }
})
</script>

<template>
  <TresMesh ref="meshRef">
    <TresBoxGeometry :args="[1, 1, 1, 4, 4, 4]" />
    <TresMeshBasicMaterial color="#7ec245" :wireframe="true" />
  </TresMesh>
</template>
```

---

## 8. File Structure Summary

```
joeczar-v2/
├── nuxt.config.ts
├── tailwind.config.js
├── package.json
├── assets/
│   └── css/
│       └── main.css
├── components/
│   ├── SocialLinks.vue
│   ├── EntryPoints.vue
│   ├── canvas/
│   │   └── CanvasParticles.vue
│   ├── organism/
│   │   └── OrganismNetwork.vue
│   └── portal/
│       ├── PortalWindow.vue
│       ├── PortalMusicScene.vue
│       ├── PortalWorkScene.vue
│       └── PortalCodeScene.vue
├── composables/
│   └── useMouse3D.ts
├── pages/
│   ├── index.vue
│   └── concepts/
│       ├── canvas.vue
│       ├── glitch.vue
│       ├── organism.vue
│       └── portal.vue
└── public/
    └── Joe_Czarnecki_Deutsch_2023.pdf
```

---

## 9. Running the Project

```bash
pnpm dev
```

Visit:
- `http://localhost:3000` - Concept selector
- `http://localhost:3000/concepts/canvas` - Particle field concept
- `http://localhost:3000/concepts/glitch` - Brutalist concept
- `http://localhost:3000/concepts/organism` - Bioluminescent network
- `http://localhost:3000/concepts/portal` - Peek-inside portals

---

## Notes for Implementation

1. **TresJS v5**: This spec uses TresJS v5 APIs. The animation loop uses `useLoop().onBeforeRender()` instead of the deprecated `useRenderLoop().onLoop()`.

2. **Line2 Component**: For drawing lines between points, use the `Line2` component from `@tresjs/cientos` instead of a non-existent `TresLine` component.

3. **Tailwind Dynamic Classes**: Tailwind's JIT compiler can't handle interpolated class names like `` `bg-${color}` ``. Use inline styles or safelist classes instead.

4. **Performance**: The particle count (2000) and node counts (30) can be adjusted based on performance testing. Consider reducing for mobile.

5. **Mobile**: These concepts are desktop-first. Mobile adaptations should simplify or disable 3D elements. Consider using `matchMedia` to detect mobile and reduce complexity.

6. **Iteration**: Once one concept is chosen, we'll refine it further before building out the chapter pages.
