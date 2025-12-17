<script setup lang="ts">
import { useLoop } from '@tresjs/core'

interface Props {
  type: 'torus' | 'icosa' | 'cube'
  color: string
  isActive: boolean
}

const props = defineProps<Props>()

const meshRef = ref()

const { onBeforeRender } = useLoop()

onBeforeRender(({ elapsed }) => {
  if (meshRef.value) {
    // Always rotate, but faster when active
    const speed = props.isActive ? 1 : 0.3
    meshRef.value.rotation.x = elapsed * 0.5 * speed
    meshRef.value.rotation.y = elapsed * 0.3 * speed
  }
})
</script>

<template>
  <!-- Torus Knot for Music -->
  <TresMesh v-if="type === 'torus'" ref="meshRef">
    <TresTorusKnotGeometry :args="[0.6, 0.2, 64, 8]" />
    <TresMeshBasicMaterial :color="color" :wireframe="true" :transparent="true" :opacity="isActive ? 1 : 0.4" />
  </TresMesh>

  <!-- Icosahedron for Work -->
  <TresMesh v-if="type === 'icosa'" ref="meshRef">
    <TresIcosahedronGeometry :args="[0.8, 0]" />
    <TresMeshBasicMaterial :color="color" :wireframe="true" :transparent="true" :opacity="isActive ? 1 : 0.4" />
  </TresMesh>

  <!-- Cube for Code -->
  <TresMesh v-if="type === 'cube'" ref="meshRef">
    <TresBoxGeometry :args="[1, 1, 1, 2, 2, 2]" />
    <TresMeshBasicMaterial :color="color" :wireframe="true" :transparent="true" :opacity="isActive ? 1 : 0.4" />
  </TresMesh>
</template>
