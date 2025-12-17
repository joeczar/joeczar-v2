<script setup lang="ts">
const lines = ['JOE', 'CZAR', 'NECKI']

// Composables
const glitch = useGlitch()
const { containerRef, lineRefs, fontSizes } = useFitText(lines)

// Timer for cleanup
let initTimer: ReturnType<typeof setTimeout> | null = null

// Start glitch effects after entrance
onMounted(() => {
  // Wait for text to fit, then enter and start glitching
  initTimer = setTimeout(() => {
    glitch.enter()
    glitch.start()
  }, 100)
})

onUnmounted(() => {
  if (initTimer) clearTimeout(initTimer)
  glitch.stop()
})
</script>

<template>
  <div class="fixed inset-0 bg-void overflow-hidden">
    <!-- CRT Effects -->
    <GlitchCrtOverlay :is-major-glitch="glitch.isMajorGlitch.value" />

    <!-- Main content -->
    <div
      ref="containerRef"
      class="min-h-screen flex flex-col justify-center px-2 overflow-hidden"
    >
      <!-- Glitch Text -->
      <GlitchText
        :lines="lines"
        :font-sizes="fontSizes.map(fs => fs.value)"
        :line-refs="lineRefs"
        :has-entered="glitch.hasEntered.value"
        :is-glitching="glitch.isGlitching.value"
        :is-major-glitch="glitch.isMajorGlitch.value"
        :is-viewport-shift="glitch.isViewportShift.value"
        :viewport-offset="glitch.viewportOffset.value"
        @click="glitch.triggerMajorGlitch"
      />

      <!-- Terminal -->
      <div class="absolute bottom-6 left-4 md:left-8 z-10">
        <TerminalWindow user="joe" host="void" />
      </div>
    </div>
  </div>
</template>
