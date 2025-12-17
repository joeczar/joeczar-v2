export interface PlasmaConfig {
  cols: number
  rows: number
  ledSize: number
  ledGap: number
  scale: number
}

export interface LED {
  x: number
  y: number
  color: string
  brightness: number
}

export function plasma(x: number, y: number, t: number, scale: number): number {
  const v1 = Math.sin(x * scale + t)
  const v2 = Math.sin(y * scale + t * 1.3)
  const v3 = Math.sin((x + y) * scale * 0.5 + t * 0.7)
  const v4 = Math.sin(Math.sqrt(x * x + y * y) * scale * 0.5 + t * 1.1)
  return (v1 + v2 + v3 + v4 + 4) / 8
}

export function getWarmColor(value: number): string {
  if (value < 0.2) {
    const v = value / 0.2
    return `rgb(${Math.floor(v * 30)}, ${Math.floor(v * 10)}, 0)`
  } else if (value < 0.4) {
    const v = (value - 0.2) / 0.2
    return `rgb(${Math.floor(30 + v * 100)}, ${Math.floor(10 + v * 30)}, 0)`
  } else if (value < 0.6) {
    const v = (value - 0.4) / 0.2
    return `rgb(${Math.floor(130 + v * 70)}, ${Math.floor(40 + v * 50)}, ${Math.floor(v * 10)})`
  } else if (value < 0.8) {
    const v = (value - 0.6) / 0.2
    return `rgb(${Math.floor(200 + v * 40)}, ${Math.floor(90 + v * 80)}, ${Math.floor(10 + v * 30)})`
  } else {
    const v = (value - 0.8) / 0.2
    return `rgb(${Math.floor(240 + v * 15)}, ${Math.floor(170 + v * 70)}, ${Math.floor(40 + v * 150)})`
  }
}

export function generateLeds(config: PlasmaConfig, time: number): LED[] {
  const leds: LED[] = []
  const { cols, rows, ledSize, ledGap, scale } = config

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const brightness = plasma(col, row, time, scale)
      leds.push({
        x: col * (ledSize + ledGap),
        y: row * (ledSize + ledGap),
        color: getWarmColor(brightness),
        brightness
      })
    }
  }
  return leds
}

export function getGridDimensions(config: PlasmaConfig) {
  const { cols, rows, ledSize, ledGap } = config
  return {
    width: cols * (ledSize + ledGap) - ledGap,
    height: rows * (ledSize + ledGap) - ledGap
  }
}

