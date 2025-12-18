type Concept = 'canvas' | 'glitch' | 'plasma'

const STORAGE_KEY = 'joeczar-concept'
const CONCEPTS: Concept[] = ['canvas', 'glitch', 'plasma']
const REDUCED_MOTION_CONCEPTS: Concept[] = ['canvas', 'plasma']

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
    return CONCEPTS[Math.floor(Math.random() * CONCEPTS.length)] ?? 'canvas'
  }

  // Pick random from reduced motion friendly concepts
  function pickRandomReducedMotion(): Concept {
    return REDUCED_MOTION_CONCEPTS[Math.floor(Math.random() * REDUCED_MOTION_CONCEPTS.length)] ?? 'canvas'
  }

  // Initialize - call this on mount
  function init(): Concept {
    prefersReducedMotion.value = checkReducedMotion()

    // Check for existing preference first
    const saved = getSaved()

    // Reduced motion users get canvas or plasma (calmer experiences)
    if (prefersReducedMotion.value) {
      // If they have a saved preference that's reduced-motion friendly, use it
      if (saved && REDUCED_MOTION_CONCEPTS.includes(saved)) {
        currentConcept.value = saved
        return saved
      }
      // Otherwise pick randomly from calm options
      const picked = pickRandomReducedMotion()
      savePreference(picked)
      currentConcept.value = picked
      return picked
    }

    // Regular users: use saved preference if exists
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
  function toggle(): Concept {
    const currentIndex = CONCEPTS.indexOf(currentConcept.value)
    const nextIndex = (currentIndex + 1) % CONCEPTS.length
    const next = CONCEPTS[nextIndex] ?? 'canvas'
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
