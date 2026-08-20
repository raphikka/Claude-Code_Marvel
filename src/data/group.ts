import type { Entry, Studio } from './types'

export function byReleaseDate(a: Entry, b: Entry) {
  return a.releaseDate.localeCompare(b.releaseDate)
}

export function byStoryOrder(a: Entry, b: Entry) {
  return a.storyOrder - b.storyOrder
}

export interface ArcGroup {
  arc: string
  entries: Entry[]
}

export interface StudioGroup {
  studio: Studio
  arcs: ArcGroup[]
  total: number
}

const STUDIO_ORDER: Studio[] = ['MCU', 'SONY', 'FOX', 'MTV', 'ANIM']

export function groupByStudioAndArc(entries: Entry[]): StudioGroup[] {
  const byStudio = new Map<Studio, Entry[]>()
  for (const e of entries) {
    if (!byStudio.has(e.studio)) byStudio.set(e.studio, [])
    byStudio.get(e.studio)!.push(e)
  }

  return STUDIO_ORDER.filter((s) => byStudio.has(s)).map((studio) => {
    const studioEntries = byStudio.get(studio)!.slice().sort(byReleaseDate)

    // Só a Marvel Studios (MCU) é subdividida por fase — as demais entram
    // numa única caixa por estúdio, unificando todas as sublinhagens.
    if (studio !== 'MCU') {
      return {
        studio,
        total: studioEntries.length,
        arcs: [{ arc: 'all', entries: studioEntries }],
      }
    }

    const arcOrder: string[] = []
    const byArc = new Map<string, Entry[]>()
    for (const e of studioEntries) {
      if (!byArc.has(e.arc)) {
        byArc.set(e.arc, [])
        arcOrder.push(e.arc)
      }
      byArc.get(e.arc)!.push(e)
    }
    return {
      studio,
      total: studioEntries.length,
      arcs: arcOrder.map((arc) => ({ arc, entries: byArc.get(arc)! })),
    }
  })
}

export function decadeLabel(storyOrder: number): string {
  const year = Math.floor(storyOrder)
  if (year < 1900) return 'Antiguidade / Pré-história'
  const decade = Math.floor(year / 10) * 10
  return `Década de ${decade}`
}

export interface DecadeGroup {
  label: string
  entries: Entry[]
}

export function groupByDecade(entries: Entry[]): DecadeGroup[] {
  const sorted = entries.slice().sort(byStoryOrder)
  const order: string[] = []
  const byLabel = new Map<string, Entry[]>()
  for (const e of sorted) {
    const label = decadeLabel(e.storyOrder)
    if (!byLabel.has(label)) {
      byLabel.set(label, [])
      order.push(label)
    }
    byLabel.get(label)!.push(e)
  }
  return order.map((label) => ({ label, entries: byLabel.get(label)! }))
}

export interface YearGroup {
  year: number
  entries: Entry[]
}

export function groupByReleaseYear(entries: Entry[]): YearGroup[] {
  const sorted = entries.slice().sort(byReleaseDate)
  const order: number[] = []
  const byYear = new Map<number, Entry[]>()
  for (const e of sorted) {
    if (!byYear.has(e.year)) {
      byYear.set(e.year, [])
      order.push(e.year)
    }
    byYear.get(e.year)!.push(e)
  }
  return order.map((year) => ({ year, entries: byYear.get(year)! }))
}
