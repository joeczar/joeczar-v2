import { readFile, writeFile, mkdir } from 'fs/promises'
import { existsSync } from 'fs'
import { join, dirname } from 'path'

const DATA_DIR = join(process.cwd(), '.data')
const COUNTER_FILE = join(DATA_DIR, 'og-counter.json')

interface CounterData {
  count: number
  lastUpdated: string
}

async function ensureDataDir() {
  if (!existsSync(DATA_DIR)) {
    await mkdir(DATA_DIR, { recursive: true })
  }
}

export async function getOgCount(): Promise<number> {
  try {
    await ensureDataDir()
    if (!existsSync(COUNTER_FILE)) {
      return 0
    }
    const data = await readFile(COUNTER_FILE, 'utf-8')
    const parsed: CounterData = JSON.parse(data)
    return parsed.count
  } catch {
    return 0
  }
}

export async function incrementOgCount(): Promise<number> {
  await ensureDataDir()
  const current = await getOgCount()
  const newCount = current + 1

  const data: CounterData = {
    count: newCount,
    lastUpdated: new Date().toISOString()
  }

  await writeFile(COUNTER_FILE, JSON.stringify(data, null, 2))
  return newCount
}
