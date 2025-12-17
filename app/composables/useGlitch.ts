export function useGlitch() {
  const isGlitching = ref(false)
  const isMajorGlitch = ref(false)
  const isViewportShift = ref(false)
  const hasEntered = ref(false)

  // Viewport shift - random position for the oversized text
  const viewportOffset = ref({ x: 0, y: 0 })

  function triggerGlitch() {
    isGlitching.value = true
    setTimeout(() => {
      isGlitching.value = false
    }, 100 + Math.random() * 150)
  }

  function triggerMajorGlitch() {
    isMajorGlitch.value = true
    isGlitching.value = true

    // Trigger viewport shift during major glitch
    triggerViewportShift()

    setTimeout(() => {
      isMajorGlitch.value = false
      isGlitching.value = false
    }, 200 + Math.random() * 300)
  }

  function triggerViewportShift() {
    isViewportShift.value = true

    // Random offset to show different parts of the oversized text
    viewportOffset.value = {
      x: (Math.random() - 0.5) * 100,
      y: (Math.random() - 0.3) * 400
    }

    setTimeout(() => {
      if (Math.random() > 0.5) {
        viewportOffset.value = { x: 0, y: 0 }
      }
      isViewportShift.value = false
    }, 150 + Math.random() * 200)
  }

  // Ambient viewport drift
  let driftInterval: ReturnType<typeof setInterval> | null = null
  let glitchInterval: ReturnType<typeof setInterval> | null = null
  let majorGlitchInterval: ReturnType<typeof setInterval> | null = null

  function startViewportDrift() {
    driftInterval = setInterval(() => {
      if (!isGlitching.value && !isMajorGlitch.value) {
        viewportOffset.value = {
          x: Math.sin(Date.now() / 3000) * 20,
          y: Math.sin(Date.now() / 4000) * 30
        }
      }
    }, 50)
  }

  function startGlitchLoop() {
    // Random glitch triggers
    glitchInterval = setInterval(() => {
      if (Math.random() > 0.5) {
        triggerGlitch()
      }
    }, 600)

    // Occasional MAJOR glitch
    majorGlitchInterval = setInterval(() => {
      if (Math.random() > 0.8) {
        triggerMajorGlitch()
      }
    }, 1500)
  }

  function start() {
    startViewportDrift()
    startGlitchLoop()
  }

  function stop() {
    if (driftInterval) clearInterval(driftInterval)
    if (glitchInterval) clearInterval(glitchInterval)
    if (majorGlitchInterval) clearInterval(majorGlitchInterval)
  }

  function enter() {
    hasEntered.value = true
  }

  return {
    // State
    isGlitching: readonly(isGlitching),
    isMajorGlitch: readonly(isMajorGlitch),
    isViewportShift: readonly(isViewportShift),
    hasEntered: readonly(hasEntered),
    viewportOffset: readonly(viewportOffset),

    // Actions
    triggerGlitch,
    triggerMajorGlitch,
    start,
    stop,
    enter
  }
}
