<script setup lang="ts">
import * as THREE from 'three'
import { useLoop } from '@tresjs/core'

const emit = defineEmits<{
  hover: [key: string | null]
}>()

const points = [
  { key: 'music', label: 'music', color: '#ef4136' },
  { key: 'work', label: 'work', color: '#50d2cb' },
  { key: 'code', label: 'code', color: '#7ec245' }
]

const activePoint = ref<string | null>(null)

function handleHover(key: string | null) {
  activePoint.value = key
  emit('hover', key)
}
</script>

<template>
  <div class="flex items-center justify-center gap-16 md:gap-20">
    <div
      v-for="point in points"
      :key="point.key"
      class="flex flex-col items-center gap-4 cursor-pointer group"
      @mouseenter="handleHover(point.key)"
      @mouseleave="handleHover(null)"
    >
      <!-- Mini 3D scene -->
      <div
        class="w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden transition-all duration-500"
        :class="activePoint === point.key ? 'scale-125' : ''"
        :style="{
          boxShadow: activePoint === point.key ? `0 0 40px ${point.color}60` : 'none'
        }"
      >
        <ClientOnly>
          <TresCanvas :dpr="[1, 1.5]" :style="{ background: 'transparent' }">
            <TresPerspectiveCamera :position="[0, 0, 3]" />

            <!-- Music: Torus Knot -->
            <CanvasEntryMesh
              v-if="point.key === 'music'"
              type="torus"
              :color="point.color"
              :is-active="activePoint === point.key"
            />

            <!-- Work: Icosahedron -->
            <CanvasEntryMesh
              v-if="point.key === 'work'"
              type="icosa"
              :color="point.color"
              :is-active="activePoint === point.key"
            />

            <!-- Code: Cube -->
            <CanvasEntryMesh
              v-if="point.key === 'code'"
              type="cube"
              :color="point.color"
              :is-active="activePoint === point.key"
            />
          </TresCanvas>
        </ClientOnly>
      </div>

      <!-- Label -->
      <span
        class="text-sm font-mono transition-colors duration-300"
        :style="{ color: activePoint === point.key ? point.color : '#a0a0a3' }"
      >
        {{ point.label }}
      </span>
    </div>
  </div>
</template>
