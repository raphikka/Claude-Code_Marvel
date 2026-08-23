import { useEffect } from 'react'
import type { MediaType, Studio } from '../data/types'
import { STUDIOS } from '../data/types'
import { LINEAGE_GROUPS } from '../data/lineages'
import { DEFAULT_FILTERS, toggleInArray, type Filters } from '../data/filters'
import { CloseIcon } from './icons'

const TYPE_OPTIONS: { id: MediaType; label: string }[] = [
  { id: 'movie', label: 'Filme' },
  { id: 'series', label: 'Série' },
  { id: 'special', label: 'Especial' },
]

const STUDIO_OPTIONS: Studio[] = ['MCU', 'SONY', 'FOX', 'MTV', 'ANIM']

function Chip({
  active,
  onClick,
  children,
}: {
  active: boolean
  onClick: () => void
  children: React.ReactNode
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={
        'shrink-0 rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors ' +
        (active
          ? 'border-marvel-red bg-marvel-red/15 text-marvel-red'
          : 'border-neutral-800 bg-transparent text-neutral-400')
      }
    >
      {children}
    </button>
  )
}

function FilterSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="border-t border-neutral-800/80 px-4 py-4 first:border-t-0">
      <h3 className="mb-2.5 text-xs font-bold uppercase tracking-wide text-neutral-500">{title}</h3>
      {children}
    </section>
  )
}

export function FilterPanel({
  open,
  onClose,
  filters,
  onChange,
  resultCount,
  yearBounds,
}: {
  open: boolean
  onClose: () => void
  filters: Filters
  onChange: (next: Filters) => void
  resultCount: number
  yearBounds: [number, number]
}) {
  useEffect(() => {
    if (!open) return
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prevOverflow
    }
  }, [open])

  if (!open) return null

  const [minYear, maxYear] = yearBounds
  const years: number[] = []
  for (let y = minYear; y <= maxYear; y++) years.push(y)

  return (
    <div className="fixed inset-0 z-50 flex flex-col justify-end">
      <button
        aria-label="Fechar filtros"
        className="absolute inset-0 bg-black/60"
        onClick={onClose}
      />
      <div className="relative flex max-h-[85vh] flex-col rounded-t-2xl border-t border-neutral-800 bg-neutral-950">
        <div className="flex items-center justify-between px-4 py-3.5">
          <h2 className="font-display text-2xl tracking-wide text-neutral-50">FILTROS</h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Fechar"
            className="flex h-8 w-8 items-center justify-center rounded-full bg-neutral-900 text-neutral-400"
          >
            <CloseIcon className="h-4 w-4" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto">
          <FilterSection title="Assistidos">
            <div className="flex flex-wrap gap-2">
              {(
                [
                  { id: 'all', label: 'Todos' },
                  { id: 'watched', label: 'Assistidos' },
                  { id: 'skip', label: 'Não vou assistir' },
                  { id: 'pending', label: 'Pendentes' },
                ] as const
              ).map((opt) => (
                <Chip key={opt.id} active={filters.watched === opt.id} onClick={() => onChange({ ...filters, watched: opt.id })}>
                  {opt.label}
                </Chip>
              ))}
            </div>
          </FilterSection>

          <FilterSection title="Tipo">
            <div className="flex flex-wrap gap-2">
              {TYPE_OPTIONS.map((opt) => (
                <Chip
                  key={opt.id}
                  active={filters.types.includes(opt.id)}
                  onClick={() => onChange({ ...filters, types: toggleInArray(filters.types, opt.id) })}
                >
                  {opt.label}
                </Chip>
              ))}
            </div>
          </FilterSection>

          <FilterSection title="Estúdio">
            <div className="flex flex-wrap gap-2">
              {STUDIO_OPTIONS.map((id) => (
                <Chip
                  key={id}
                  active={filters.studios.includes(id)}
                  onClick={() => onChange({ ...filters, studios: toggleInArray(filters.studios, id) })}
                >
                  {STUDIOS[id].short}
                </Chip>
              ))}
            </div>
          </FilterSection>

          <FilterSection title="Ano">
            <div className="flex items-center gap-2">
              <select
                value={filters.yearFrom ?? ''}
                onChange={(e) => onChange({ ...filters, yearFrom: e.target.value ? Number(e.target.value) : null })}
                className="min-w-0 flex-1 rounded-lg border border-neutral-800 bg-neutral-900 px-2.5 py-2 text-sm text-neutral-200"
              >
                <option value="">De</option>
                {years.map((y) => (
                  <option key={y} value={y}>
                    {y}
                  </option>
                ))}
              </select>
              <span className="text-neutral-600">—</span>
              <select
                value={filters.yearTo ?? ''}
                onChange={(e) => onChange({ ...filters, yearTo: e.target.value ? Number(e.target.value) : null })}
                className="min-w-0 flex-1 rounded-lg border border-neutral-800 bg-neutral-900 px-2.5 py-2 text-sm text-neutral-200"
              >
                <option value="">Até</option>
                {years.map((y) => (
                  <option key={y} value={y}>
                    {y}
                  </option>
                ))}
              </select>
            </div>
          </FilterSection>

          <FilterSection title="Linhagem">
            <div className="flex flex-col gap-3">
              {LINEAGE_GROUPS.map(({ group, lineages }) => (
                <div key={group}>
                  <p className="mb-1.5 text-[11px] font-semibold text-neutral-600">{group}</p>
                  <div className="flex flex-wrap gap-2">
                    {lineages.map((l) => (
                      <Chip
                        key={l.id}
                        active={filters.lineages.includes(l.id)}
                        onClick={() => onChange({ ...filters, lineages: toggleInArray(filters.lineages, l.id) })}
                      >
                        {l.label}
                      </Chip>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </FilterSection>
        </div>

        <div
          className="flex gap-2 border-t border-neutral-800 px-4 pt-3"
          style={{ paddingBottom: 'calc(env(safe-area-inset-bottom) + 0.75rem)' }}
        >
          <button
            type="button"
            onClick={() => onChange(DEFAULT_FILTERS)}
            className="rounded-lg border border-neutral-800 px-4 py-3 text-sm font-semibold text-neutral-300"
          >
            Limpar
          </button>
          <button
            type="button"
            onClick={onClose}
            className="flex-1 rounded-lg bg-marvel-red py-3 text-sm font-semibold text-white"
          >
            Ver {resultCount} {resultCount === 1 ? 'resultado' : 'resultados'}
          </button>
        </div>
      </div>
    </div>
  )
}
