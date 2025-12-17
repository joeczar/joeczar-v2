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
