type Concept = 'canvas' | 'glitch' | 'plasma'

const STORAGE_KEY = 'joeczar-concept'
const CONCEPTS: Concept[] = ['canvas', 'glitch', 'plasma']

export function useConceptPicker() {
  const currentConcept = useState<Concept>('concept', () => 'canvas')
  const prefersReducedMotion = ref(false)

  // Check reduced motion preference
  function checkReducedMotion(): boolean {
    if (import.meta.server) return false
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches
  }

  // Get saved preference from localStorage
  function getSaved(): Concept | null {
    if (import.meta.server) return null
    const value = localStorage.getItem(STORAGE_KEY) as Concept | null
    return value && CONCEPTS.includes(value) ? value : null
  }

  // Save preference to localStorage
  function savePreference(concept: Concept) {
    if (import.meta.server) return
    localStorage.setItem(STORAGE_KEY, concept)
  }

  // Pick random concept
  function pickRandom(): Concept {
    return CONCEPTS[Math.floor(Math.random() * CONCEPTS.length)]
  }

  // Initialize - call this on mount
  function init(): Concept {
    prefersReducedMotion.value = checkReducedMotion()

    // Reduced motion users always get canvas (calmer experience)
    if (prefersReducedMotion.value) {
      currentConcept.value = 'canvas'
      return 'canvas'
    }

    // Check for existing preference
    const saved = getSaved()
    if (saved) {
      currentConcept.value = saved
      return saved
    }

    // First visit - random pick and persist
    const picked = pickRandom()
    savePreference(picked)
    currentConcept.value = picked
    return picked
  }

  // Cycle to next concept (for Konami code)
  function toggle() {
    const currentIndex = CONCEPTS.indexOf(currentConcept.value)
    const nextIndex = (currentIndex + 1) % CONCEPTS.length
    const next = CONCEPTS[nextIndex]
    savePreference(next)
    currentConcept.value = next
    return next
  }

  // Force a specific concept
  function setConcept(concept: Concept) {
    savePreference(concept)
    currentConcept.value = concept
  }

  // Get the route path for current concept
  const conceptPath = computed(() => `/concepts/${currentConcept.value}`)

  return {
    currentConcept: readonly(currentConcept),
    prefersReducedMotion: readonly(prefersReducedMotion),
    conceptPath,
    init,
    toggle,
    setConcept
  }
}
