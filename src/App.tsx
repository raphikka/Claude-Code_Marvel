import { useMemo, useState } from 'react'
import { ENTRIES, PRE_2000_ENTRIES } from './data/entries'
import { DEFAULT_FILTERS, activeFilterCount, applyFilters, type Filters } from './data/filters'
import { StudioPhaseView } from './components/StudioPhaseView'
import { StoryChronologyView } from './components/StoryChronologyView'
import { ReleaseChronologyView } from './components/ReleaseChronologyView'
import { ClassicView } from './components/ClassicView'
import { FilterPanel } from './components/FilterPanel'
import { LayersIcon, ClockIcon, CalendarIcon, FilterIcon } from './components/icons'
import { WatchedProvider, useWatched } from './hooks/useWatched'

type EraTab = 'modern' | 'classic'
type ModernView = 'studio' | 'story' | 'release'

const MODERN_VIEWS: { id: ModernView; label: string; short: string; icon: typeof LayersIcon }[] = [
  { id: 'studio', label: 'Por Estúdio & Fase', short: 'Estúdio', icon: LayersIcon },
  { id: 'story', label: 'Cronologia da História', short: 'História', icon: ClockIcon },
  { id: 'release', label: 'Cronologia de Lançamento', short: 'Lançamento', icon: CalendarIcon },
]

const TOTAL_ENTRIES = ENTRIES.length + PRE_2000_ENTRIES.length

const ALL_YEARS = [...ENTRIES, ...PRE_2000_ENTRIES].map((e) => e.year)
const YEAR_BOUNDS: [number, number] = [Math.min(...ALL_YEARS), Math.max(...ALL_YEARS)]

function WatchedProgress() {
  const { watchedCount, skipCount } = useWatched()
  const donePct = TOTAL_ENTRIES === 0 ? 0 : (watchedCount / TOTAL_ENTRIES) * 100
  const skipPct = TOTAL_ENTRIES === 0 ? 0 : (skipCount / TOTAL_ENTRIES) * 100

  return (
    <div className="mt-2.5 flex items-center gap-2">
      <div className="flex h-1.5 flex-1 overflow-hidden rounded-full bg-neutral-800">
        <div className="h-full bg-emerald-500 transition-[width]" style={{ width: `${donePct}%` }} />
        <div className="h-full bg-red-500 transition-[width]" style={{ width: `${skipPct}%` }} />
      </div>
      <span className="shrink-0 text-xs font-medium text-neutral-500">
        {watchedCount + skipCount}/{TOTAL_ENTRIES}
      </span>
    </div>
  )
}

function EmptyState({ onClear }: { onClear: () => void }) {
  return (
    <div className="flex flex-col items-center gap-3 rounded-xl border border-dashed border-neutral-800 px-4 py-12 text-center">
      <p className="text-sm font-medium text-neutral-400">Nenhum título encontrado com esses filtros.</p>
      <button
        type="button"
        onClick={onClear}
        className="rounded-lg bg-neutral-800 px-4 py-2 text-sm font-semibold text-neutral-200"
      >
        Limpar filtros
      </button>
    </div>
  )
}

function AppShell() {
  const [era, setEra] = useState<EraTab>('modern')
  const [view, setView] = useState<ModernView>('studio')
  const [filters, setFilters] = useState<Filters>(DEFAULT_FILTERS)
  const [filtersOpen, setFiltersOpen] = useState(false)
  const { getStatus } = useWatched()

  const modernEntries = useMemo(() => applyFilters(ENTRIES, filters, getStatus), [filters, getStatus])
  const classicEntries = useMemo(() => applyFilters(PRE_2000_ENTRIES, filters, getStatus), [filters, getStatus])
  const activeEntries = era === 'modern' ? modernEntries : classicEntries
  const filterCount = activeFilterCount(filters)

  return (
    <div className="mx-auto flex min-h-dvh max-w-2xl flex-col">
      <header
        className="sticky top-0 z-20 border-b border-neutral-800/80 bg-neutral-950/90 backdrop-blur"
        style={{ paddingTop: 'env(safe-area-inset-top)' }}
      >
        <div className="px-4 pb-3 pt-4">
          <h1 className="font-display text-3xl tracking-wide text-neutral-50">
            MAPA <span className="text-marvel-red">MARVEL</span>
          </h1>
          <p className="text-xs text-neutral-500">Filmes e séries da Marvel, Sony, Fox e mais — de 2000 até hoje</p>
          <WatchedProgress />
        </div>

        <div className="flex gap-2 px-3 pb-3">
          <nav className="flex flex-1 gap-1" role="tablist" aria-label="Período">
            <button
              role="tab"
              aria-selected={era === 'modern'}
              onClick={() => setEra('modern')}
              className={
                'flex-1 rounded-lg px-3 py-2 text-sm font-semibold transition-colors ' +
                (era === 'modern' ? 'bg-marvel-red text-white' : 'bg-neutral-900 text-neutral-400')
              }
            >
              2000 até hoje
            </button>
            <button
              role="tab"
              aria-selected={era === 'classic'}
              onClick={() => setEra('classic')}
              className={
                'flex-1 rounded-lg px-3 py-2 text-sm font-semibold transition-colors ' +
                (era === 'classic' ? 'bg-marvel-red text-white' : 'bg-neutral-900 text-neutral-400')
              }
            >
              Antes de 2000
            </button>
          </nav>
          <button
            type="button"
            onClick={() => setFiltersOpen(true)}
            className={
              'relative flex shrink-0 items-center gap-1.5 rounded-lg border px-3 py-2 text-sm font-semibold transition-colors ' +
              (filterCount > 0
                ? 'border-marvel-red bg-marvel-red/15 text-marvel-red'
                : 'border-neutral-800 bg-neutral-900 text-neutral-400')
            }
          >
            <FilterIcon className="h-4 w-4" />
            Filtros
            {filterCount > 0 && (
              <span className="flex h-4 min-w-4 items-center justify-center rounded-full bg-marvel-red px-1 text-[10px] font-bold text-white">
                {filterCount}
              </span>
            )}
          </button>
        </div>

        {era === 'modern' && (
          <div className="no-scrollbar flex gap-2 overflow-x-auto px-3 pb-3" role="tablist" aria-label="Visualização">
            {MODERN_VIEWS.map(({ id, label, short, icon: Icon }) => (
              <button
                key={id}
                role="tab"
                aria-selected={view === id}
                onClick={() => setView(id)}
                className={
                  'flex shrink-0 items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors ' +
                  (view === id
                    ? 'border-marvel-red bg-marvel-red/15 text-marvel-red'
                    : 'border-neutral-800 bg-transparent text-neutral-400')
                }
              >
                <Icon className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">{label}</span>
                <span className="sm:hidden">{short}</span>
              </button>
            ))}
          </div>
        )}
      </header>

      <main className="flex-1 px-4 pb-10 pt-4">
        {activeEntries.length === 0 ? (
          <EmptyState onClear={() => setFilters(DEFAULT_FILTERS)} />
        ) : era === 'modern' ? (
          <>
            {view === 'studio' && <StudioPhaseView entries={modernEntries} />}
            {view === 'story' && <StoryChronologyView entries={modernEntries} />}
            {view === 'release' && <ReleaseChronologyView entries={modernEntries} />}
          </>
        ) : (
          <ClassicView entries={classicEntries} />
        )}
      </main>

      <footer
        className="px-4 pb-4 text-center text-[11px] text-neutral-600"
        style={{ paddingBottom: 'calc(env(safe-area-inset-bottom) + 0.5rem)' }}
      >
        Cronologia editorial não-oficial, feita por fãs — sujeita a revisão conforme novos lançamentos. Seu progresso
        de "assistidos" fica salvo neste navegador. Informações de streaming podem variar por região e mudar com o
        tempo.
      </footer>

      <FilterPanel
        open={filtersOpen}
        onClose={() => setFiltersOpen(false)}
        filters={filters}
        onChange={setFilters}
        resultCount={activeEntries.length}
        yearBounds={YEAR_BOUNDS}
      />
    </div>
  )
}

function App() {
  return (
    <WatchedProvider>
      <AppShell />
    </WatchedProvider>
  )
}

export default App
