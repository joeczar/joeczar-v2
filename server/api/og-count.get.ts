import { incrementOgCount } from '../utils/ogCounter'

export default defineEventHandler(async () => {
  // Increment and return the new count each time OG image is requested
  const count = await incrementOgCount()
  return { count }
})
