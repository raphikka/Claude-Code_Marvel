import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'

const STORAGE_KEY = 'mapa-marvel:assistidos'

function loadWatched(): Set<string> {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    const arr = raw ? JSON.parse(raw) : []
    return new Set(Array.isArray(arr) ? arr : [])
  } catch {
    return new Set()
  }
}

interface WatchedContextValue {
  isWatched: (id: string) => boolean
  toggle: (id: string) => void
  watchedCount: number
}

const WatchedContext = createContext<WatchedContextValue | null>(null)

export function WatchedProvider({ children }: { children: ReactNode }) {
  const [watched, setWatched] = useState<Set<string>>(loadWatched)

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(Array.from(watched)))
  }, [watched])

  const value = useMemo<WatchedContextValue>(
    () => ({
      isWatched: (id) => watched.has(id),
      toggle: (id) =>
        setWatched((prev) => {
          const next = new Set(prev)
          if (next.has(id)) next.delete(id)
          else next.add(id)
          return next
        }),
      watchedCount: watched.size,
    }),
    [watched],
  )

  return <WatchedContext.Provider value={value}>{children}</WatchedContext.Provider>
}

export function useWatched() {
  const ctx = useContext(WatchedContext)
  if (!ctx) throw new Error('useWatched deve ser usado dentro de WatchedProvider')
  return ctx
}
