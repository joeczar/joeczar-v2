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
