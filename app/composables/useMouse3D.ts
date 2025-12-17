export function useMouse3D() {
  const mouse = reactive({ x: 0, y: 0 })
  const smoothMouse = reactive({ x: 0, y: 0 })

  // Normalize coordinates to -1 to 1
  function updatePosition(clientX: number, clientY: number) {
    mouse.x = (clientX / window.innerWidth) * 2 - 1
    mouse.y = -(clientY / window.innerHeight) * 2 + 1
  }

  function handleMouseMove(event: MouseEvent) {
    updatePosition(event.clientX, event.clientY)
  }

  function handleTouchMove(event: TouchEvent) {
    const touch = event.touches[0]
    if (touch) {
      updatePosition(touch.clientX, touch.clientY)
    }
  }

  function handleTouchStart(event: TouchEvent) {
    const touch = event.touches[0]
    if (touch) {
      updatePosition(touch.clientX, touch.clientY)
    }
  }

  // Smooth interpolation
  let animationId: number
  function animate() {
    smoothMouse.x += (mouse.x - smoothMouse.x) * 0.05
    smoothMouse.y += (mouse.y - smoothMouse.y) * 0.05
    animationId = requestAnimationFrame(animate)
  }

  onMounted(() => {
    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('touchmove', handleTouchMove, { passive: true })
    window.addEventListener('touchstart', handleTouchStart, { passive: true })
    animate()
  })

  onUnmounted(() => {
    window.removeEventListener('mousemove', handleMouseMove)
    window.removeEventListener('touchmove', handleTouchMove)
    window.removeEventListener('touchstart', handleTouchStart)
    cancelAnimationFrame(animationId)
  })

  return { mouse, smoothMouse }
}
