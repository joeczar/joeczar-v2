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
