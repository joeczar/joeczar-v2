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
