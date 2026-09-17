import fs from 'fs/promises'
import path from 'path'
import type { Registration } from '@/lib/types/workshop'

const DATA_DIR = path.join(process.cwd(), 'data')
const FILE_PATH = path.join(DATA_DIR, 'registrations.json')

async function ensureDataDir(): Promise<void> {
  try {
    await fs.mkdir(DATA_DIR, { recursive: true })
  } catch {
    // Directory already exists or can't be created
  }
}

export async function getLocalRegistrations(): Promise<Registration[]> {
  try {
    await ensureDataDir()
    const content = await fs.readFile(FILE_PATH, 'utf-8')
    const list = JSON.parse(content)
    if (Array.isArray(list)) return list
    return []
  } catch {
    return []
  }
}

export async function saveLocalRegistration(reg: Registration): Promise<void> {
  try {
    await ensureDataDir()
    const existing = await getLocalRegistrations()
    // Check if ID already exists or update
    const index = existing.findIndex((r) => r.id === reg.id)
    if (index >= 0) {
      existing[index] = reg
    } else {
      existing.unshift(reg)
    }
    await fs.writeFile(FILE_PATH, JSON.stringify(existing, null, 2), 'utf-8')
  } catch (err) {
    console.error('Failed to save registration to local storage:', err)
  }
}

export async function deleteLocalRegistration(id: string): Promise<void> {
  try {
    await ensureDataDir()
    const existing = await getLocalRegistrations()
    const filtered = existing.filter((r) => r.id !== id)
    await fs.writeFile(FILE_PATH, JSON.stringify(filtered, null, 2), 'utf-8')
  } catch (err) {
    console.error('Failed to delete registration from local storage:', err)
  }
}
