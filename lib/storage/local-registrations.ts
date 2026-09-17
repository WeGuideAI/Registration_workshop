import fs from 'fs/promises'
import path from 'path'
import os from 'os'
import type { Registration } from '@/lib/types/workshop'

// In serverless environments (AWS Lambda / Vercel), process.cwd() is read-only (/var/task).
// We write to os.tmpdir() instead in serverless environments.
function getDataDir(): string {
  const isServerless = Boolean(
    process.env.VERCEL ||
    process.env.AWS_LAMBDA_FUNCTION_NAME ||
    process.env.LAMBDA_TASK_ROOT ||
    (typeof process.cwd === 'function' && process.cwd().startsWith('/var/task'))
  )

  return isServerless
    ? path.join(os.tmpdir(), 'weguide-registrations')
    : path.join(process.cwd(), 'data')
}

function getFilePath(): string {
  return path.join(getDataDir(), 'registrations.json')
}

async function ensureDataDir(): Promise<void> {
  try {
    const dir = getDataDir()
    await fs.mkdir(dir, { recursive: true })
  } catch {
    // Directory already exists or can't be created
  }
}

export async function getLocalRegistrations(): Promise<Registration[]> {
  try {
    await ensureDataDir()
    const content = await fs.readFile(getFilePath(), 'utf-8')
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
    const filePath = getFilePath()
    const existing = await getLocalRegistrations()
    const index = existing.findIndex((r) => r.id === reg.id)
    if (index >= 0) {
      existing[index] = reg
    } else {
      existing.unshift(reg)
    }
    await fs.writeFile(filePath, JSON.stringify(existing, null, 2), 'utf-8')
  } catch (err) {
    console.warn('Local storage cache update skipped:', (err as Error)?.message || err)
  }
}

export async function deleteLocalRegistration(id: string): Promise<void> {
  try {
    await ensureDataDir()
    const filePath = getFilePath()
    const existing = await getLocalRegistrations()
    const filtered = existing.filter((r) => r.id !== id)
    await fs.writeFile(filePath, JSON.stringify(filtered, null, 2), 'utf-8')
  } catch (err) {
    console.warn('Local storage delete skipped:', (err as Error)?.message || err)
  }
}

