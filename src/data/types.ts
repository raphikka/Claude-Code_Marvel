export type Studio = 'MCU' | 'SONY' | 'FOX' | 'MTV' | 'ANIM'

export type MediaType = 'movie' | 'series' | 'special'

export interface StudioInfo {
  id: Studio
  label: string
  short: string
  color: string
  textColor: string
}

export const STUDIOS: Record<Studio, StudioInfo> = {
  MCU: {
    id: 'MCU',
    label: 'Marvel Studios (MCU)',
    short: 'MCU',
    color: '#ed1d24',
    textColor: '#ffffff',
  },
  SONY: {
    id: 'SONY',
    label: "Sony (Homem-Aranha & Universo Sony)",
    short: 'Sony',
    color: '#0f5fae',
    textColor: '#ffffff',
  },
  FOX: {
    id: 'FOX',
    label: '20th Century Fox',
    short: 'Fox',
    color: '#1c1c1c',
    textColor: '#ffffff',
  },
  MTV: {
    id: 'MTV',
    label: 'Marvel Television',
    short: 'Marvel TV',
    color: '#6b1fb8',
    textColor: '#ffffff',
  },
  ANIM: {
    id: 'ANIM',
    label: 'Marvel Animation',
    short: 'Animação',
    color: '#0c8a5f',
    textColor: '#ffffff',
  },
}

export interface Entry {
  id: string
  title: string
  year: number
  yearEnd?: number
  releaseDate: string // YYYY-MM-DD, used for release-order sorting
  type: MediaType
  studio: Studio
  network?: string // original release platform, e.g. Netflix, Disney+, ABC, Hulu, FX
  streaming?: string // where to watch it today (can change over time, unlike `network`)
  arc: string // grouping used in "by studio/phase" view
  lineage: string[] // franchise/character tags, used by the lineage filter (see data/lineages.ts)
  saga?: string // MCU overarching saga
  storyEra: string // human label for the story-set period
  storyOrder: number // numeric sort key for unified story chronology
  seasons?: number
  note?: string
  upcoming?: boolean
}
