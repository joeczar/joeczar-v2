type Concept = 'canvas' | 'glitch'

const COOKIE_NAME = 'joeczar-concept'
const CONCEPTS: Concept[] = ['canvas', 'glitch']

export function useConceptPicker() {
  const currentConcept = useState<Concept>('concept', () => 'canvas')
  const prefersReducedMotion = ref(false)

  // Check reduced motion preference
  function checkReducedMotion(): boolean {
    if (import.meta.server) return false
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches
  }

  // Get cookie value
  function getCookie(): Concept | null {
    if (import.meta.server) return null
    const match = document.cookie.match(new RegExp(`${COOKIE_NAME}=([^;]+)`))
    const value = match?.[1] as Concept | undefined
    return value && CONCEPTS.includes(value) ? value : null
  }

  // Set cookie (1 year expiry)
  function setCookie(concept: Concept) {
    if (import.meta.server) return
    const expires = new Date()
    expires.setFullYear(expires.getFullYear() + 1)
    document.cookie = `${COOKIE_NAME}=${concept};expires=${expires.toUTCString()};path=/;SameSite=Lax`
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
    const saved = getCookie()
    if (saved) {
      currentConcept.value = saved
      return saved
    }

    // First visit - random pick and persist
    const picked = pickRandom()
    setCookie(picked)
    currentConcept.value = picked
    return picked
  }

  // Switch to other concept (for Konami code)
  function toggle() {
    const next: Concept = currentConcept.value === 'canvas' ? 'glitch' : 'canvas'
    setCookie(next)
    currentConcept.value = next
    return next
  }

  // Force a specific concept
  function setConcept(concept: Concept) {
    setCookie(concept)
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
