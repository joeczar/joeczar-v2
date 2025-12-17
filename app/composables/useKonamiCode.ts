// Konami Code: ↑ ↑ ↓ ↓ ← → ← → B A
const KONAMI_SEQUENCE = [
  'ArrowUp', 'ArrowUp',
  'ArrowDown', 'ArrowDown',
  'ArrowLeft', 'ArrowRight',
  'ArrowLeft', 'ArrowRight',
  'KeyB', 'KeyA'
]

export function useKonamiCode(onActivate: () => void) {
  const inputSequence = ref<string[]>([])
  const isActive = ref(false)

  function handleKeyDown(event: KeyboardEvent) {
    // Add the key to sequence
    inputSequence.value.push(event.code)

    // Keep only the last N keys (length of Konami code)
    if (inputSequence.value.length > KONAMI_SEQUENCE.length) {
      inputSequence.value.shift()
    }

    // Check if sequence matches
    if (inputSequence.value.length === KONAMI_SEQUENCE.length) {
      const matches = inputSequence.value.every(
        (key, index) => key === KONAMI_SEQUENCE[index]
      )

      if (matches) {
        isActive.value = true
        inputSequence.value = []
        onActivate()

        // Reset active state after a moment
        setTimeout(() => {
          isActive.value = false
        }, 1000)
      }
    }
  }

  onMounted(() => {
    window.addEventListener('keydown', handleKeyDown)
  })

  onUnmounted(() => {
    window.removeEventListener('keydown', handleKeyDown)
  })

  return {
    isActive: readonly(isActive)
  }
}
