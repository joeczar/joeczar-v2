export function useMouse3D() {
  const mouse = reactive({ x: 0, y: 0 })
  const smoothMouse = reactive({ x: 0, y: 0 })

  function handleMouseMove(event: MouseEvent) {
    // Normalize to -1 to 1
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1
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
    animate()
  })

  onUnmounted(() => {
    window.removeEventListener('mousemove', handleMouseMove)
    cancelAnimationFrame(animationId)
  })

  return { mouse, smoothMouse }
}
