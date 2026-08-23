import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'

const STORAGE_KEY = 'mapa-marvel:status'
const LEGACY_STORAGE_KEY = 'mapa-marvel:assistidos'

export type WatchStatus = 'watched' | 'skip'

function loadStatus(): Record<string, WatchStatus> {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (raw) {
      const parsed = JSON.parse(raw)
      if (parsed && typeof parsed === 'object' && !Array.isArray(parsed)) return parsed
    }
  } catch {
    // ignore malformed storage
  }

  // Migrate the old "just a list of watched ids" format from before "não vou assistir" existed.
  try {
    const legacyRaw = window.localStorage.getItem(LEGACY_STORAGE_KEY)
    if (legacyRaw) {
      const ids = JSON.parse(legacyRaw)
      if (Array.isArray(ids)) {
        const migrated: Record<string, WatchStatus> = {}
        for (const id of ids) migrated[id] = 'watched'
        return migrated
      }
    }
  } catch {
    // ignore malformed storage
  }

  return {}
}

interface WatchedContextValue {
  getStatus: (id: string) => WatchStatus | undefined
  toggleWatched: (id: string) => void
  toggleSkip: (id: string) => void
  watchedCount: number
  skipCount: number
}

const WatchedContext = createContext<WatchedContextValue | null>(null)

export function WatchedProvider({ children }: { children: ReactNode }) {
  const [status, setStatus] = useState<Record<string, WatchStatus>>(loadStatus)

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(status))
  }, [status])

  const value = useMemo<WatchedContextValue>(() => {
    const setOne = (id: string, next: WatchStatus) =>
      setStatus((prev) => {
        const copy = { ...prev }
        if (copy[id] === next) delete copy[id]
        else copy[id] = next
        return copy
      })

    let watchedCount = 0
    let skipCount = 0
    for (const s of Object.values(status)) {
      if (s === 'watched') watchedCount++
      else if (s === 'skip') skipCount++
    }

    return {
      getStatus: (id) => status[id],
      toggleWatched: (id) => setOne(id, 'watched'),
      toggleSkip: (id) => setOne(id, 'skip'),
      watchedCount,
      skipCount,
    }
  }, [status])

  return <WatchedContext.Provider value={value}>{children}</WatchedContext.Provider>
}

export function useWatched() {
  const ctx = useContext(WatchedContext)
  if (!ctx) throw new Error('useWatched deve ser usado dentro de WatchedProvider')
  return ctx
}
