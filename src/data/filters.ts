import type { Entry, MediaType, Studio } from './types'
import type { WatchStatus } from '../hooks/useWatched'

export type WatchedFilter = 'all' | 'watched' | 'skip' | 'pending'

export interface Filters {
  lineages: string[]
  studios: Studio[]
  types: MediaType[]
  watched: WatchedFilter
  yearFrom: number | null
  yearTo: number | null
}

export const DEFAULT_FILTERS: Filters = {
  lineages: [],
  studios: [],
  types: [],
  watched: 'all',
  yearFrom: null,
  yearTo: null,
}

export function isFiltersActive(f: Filters): boolean {
  return (
    f.lineages.length > 0 ||
    f.studios.length > 0 ||
    f.types.length > 0 ||
    f.watched !== 'all' ||
    f.yearFrom != null ||
    f.yearTo != null
  )
}

export function activeFilterCount(f: Filters): number {
  let n = 0
  if (f.lineages.length > 0) n++
  if (f.studios.length > 0) n++
  if (f.types.length > 0) n++
  if (f.watched !== 'all') n++
  if (f.yearFrom != null || f.yearTo != null) n++
  return n
}

export function applyFilters(
  entries: Entry[],
  filters: Filters,
  getStatus: (id: string) => WatchStatus | undefined,
): Entry[] {
  return entries.filter((e) => {
    if (filters.lineages.length > 0 && !e.lineage.some((l) => filters.lineages.includes(l))) return false
    if (filters.studios.length > 0 && !filters.studios.includes(e.studio)) return false
    if (filters.types.length > 0 && !filters.types.includes(e.type)) return false
    if (filters.watched === 'watched' && getStatus(e.id) !== 'watched') return false
    if (filters.watched === 'skip' && getStatus(e.id) !== 'skip') return false
    if (filters.watched === 'pending' && getStatus(e.id) !== undefined) return false
    if (filters.yearFrom != null && e.year < filters.yearFrom) return false
    if (filters.yearTo != null && e.year > filters.yearTo) return false
    return true
  })
}

export function toggleInArray<T>(arr: T[], value: T): T[] {
  return arr.includes(value) ? arr.filter((v) => v !== value) : [...arr, value]
}
