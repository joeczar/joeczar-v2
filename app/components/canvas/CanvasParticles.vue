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

// Cleanup on unmount to prevent memory leaks
onUnmounted(() => {
  geometry.dispose()
  material.dispose()
})

// Animation loop - TresJS v5 uses useLoop instead of useRenderLoop
const { onBeforeRender } = useLoop()
onBeforeRender(({ elapsed }: { elapsed: number }) => {
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
