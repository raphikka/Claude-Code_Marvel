import { useState } from 'react'
import { ENTRIES, PRE_2000_ENTRIES } from './data/entries'
import { StudioPhaseView } from './components/StudioPhaseView'
import { StoryChronologyView } from './components/StoryChronologyView'
import { ReleaseChronologyView } from './components/ReleaseChronologyView'
import { ClassicView } from './components/ClassicView'
import { LayersIcon, ClockIcon, CalendarIcon } from './components/icons'

type EraTab = 'modern' | 'classic'
type ModernView = 'studio' | 'story' | 'release'

const MODERN_VIEWS: { id: ModernView; label: string; short: string; icon: typeof LayersIcon }[] = [
  { id: 'studio', label: 'Por Estúdio & Fase', short: 'Estúdio', icon: LayersIcon },
  { id: 'story', label: 'Cronologia da História', short: 'História', icon: ClockIcon },
  { id: 'release', label: 'Cronologia de Lançamento', short: 'Lançamento', icon: CalendarIcon },
]

function App() {
  const [era, setEra] = useState<EraTab>('modern')
  const [view, setView] = useState<ModernView>('studio')

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
        </div>

        <nav className="flex gap-1 px-3 pb-3" role="tablist" aria-label="Período">
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
        {era === 'modern' ? (
          <>
            {view === 'studio' && <StudioPhaseView entries={ENTRIES} />}
            {view === 'story' && <StoryChronologyView entries={ENTRIES} />}
            {view === 'release' && <ReleaseChronologyView entries={ENTRIES} />}
          </>
        ) : (
          <ClassicView entries={PRE_2000_ENTRIES} />
        )}
      </main>

      <footer
        className="px-4 pb-4 text-center text-[11px] text-neutral-600"
        style={{ paddingBottom: 'calc(env(safe-area-inset-bottom) + 0.5rem)' }}
      >
        Cronologia editorial não-oficial, feita por fãs — sujeita a revisão conforme novos lançamentos.
      </footer>
    </div>
  )
}

export default App
