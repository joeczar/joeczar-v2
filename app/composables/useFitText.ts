export interface FitTextLine {
  text: string
  ref: Ref<HTMLElement | undefined>
  fontSize: Ref<string>
}

export function useFitText(lines: string[], baseFontVW = 15) {
  const containerRef = ref<HTMLElement>()

  // Create refs for each line
  const lineRefs = lines.map(() => ref<HTMLElement>())
  const fontSizes = lines.map(() => ref(`${baseFontVW}vw`))

  function fitText() {
    if (!containerRef.value) return

    const containerWidth = containerRef.value.offsetWidth
    const viewportWidth = window.innerWidth
    const baseFontPx = (baseFontVW / 100) * viewportWidth

    // Reset to base size first
    fontSizes.forEach(fs => {
      fs.value = `${baseFontPx}px`
    })

    // Measure and scale after reset
    requestAnimationFrame(() => {
      lineRefs.forEach((lineRef, index) => {
        if (lineRef.value) {
          const textEl = lineRef.value.querySelector('span') as HTMLElement
          if (textEl) {
            const textWidth = textEl.offsetWidth
            if (textWidth > 0 && fontSizes[index]) {
              const scale = containerWidth / textWidth
              fontSizes[index].value = `${baseFontPx * scale}px`
            }
          }
        }
      })
    })
  }

  async function init() {
    // Wait for fonts to load
    await document.fonts.ready
    fitText()
  }

  onMounted(() => {
    init()

    // Fallback
    setTimeout(fitText, 500)

    // Refit on resize
    window.addEventListener('resize', fitText)
  })

  onUnmounted(() => {
    window.removeEventListener('resize', fitText)
  })

  return {
    containerRef,
    lineRefs,
    fontSizes,
    fitText
  }
}
