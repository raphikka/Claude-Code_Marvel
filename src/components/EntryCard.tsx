import type { Entry } from '../data/types'
import { StudioBadge } from './StudioBadge'
import { FilmIcon, TvIcon, SparkleIcon, CheckIcon, CloseIcon } from './icons'
import { useWatched } from '../hooks/useWatched'

const TYPE_ICON = {
  movie: FilmIcon,
  series: TvIcon,
  special: SparkleIcon,
}

const TYPE_LABEL: Record<Entry['type'], string> = {
  movie: 'Filme',
  series: 'Série',
  special: 'Especial',
}

export function EntryCard({ entry, subtitle }: { entry: Entry; subtitle?: string }) {
  const { getStatus, toggleWatched, toggleSkip } = useWatched()
  const status = getStatus(entry.id)
  const Icon = TYPE_ICON[entry.type]
  const yearLabel = entry.yearEnd && entry.yearEnd !== entry.year ? `${entry.year}–${entry.yearEnd}` : `${entry.year}`

  return (
    <li className="flex items-start gap-2 rounded-xl border border-neutral-800 bg-neutral-900/60 p-3 active:bg-neutral-900">
      <div className={'flex min-w-0 flex-1 gap-3 transition-opacity ' + (status ? 'opacity-45' : '')}>
        <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-neutral-800 text-neutral-400">
          <Icon className="h-5 w-5" />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
            <h3 className="text-[15px] font-semibold leading-tight text-neutral-50">{entry.title}</h3>
            {entry.upcoming && (
              <span className="rounded-full bg-amber-500/15 px-1.5 py-0.5 text-[10px] font-semibold text-amber-400">
                Em breve
              </span>
            )}
          </div>
          <div className="mt-1 flex flex-wrap items-center gap-1.5">
            <StudioBadge studio={entry.studio} size="xs" />
            <span className="text-xs font-medium text-neutral-400">{yearLabel}</span>
            <span className="text-xs text-neutral-600">·</span>
            <span className="text-xs text-neutral-500">{TYPE_LABEL[entry.type]}</span>
            {entry.seasons && entry.seasons > 1 && (
              <span className="text-xs text-neutral-500">· {entry.seasons} temporadas</span>
            )}
          </div>
          {entry.streaming && (
            <div className="mt-1 text-xs text-neutral-500">
              Onde assistir: <span className="font-medium text-neutral-400">{entry.streaming}</span>
            </div>
          )}
          {subtitle && <div className="mt-1 text-xs font-medium text-neutral-500">{subtitle}</div>}
          {entry.note && <p className="mt-1.5 text-[13px] leading-snug text-neutral-400">{entry.note}</p>}
        </div>
      </div>

      <div className="flex shrink-0 gap-1">
        <button
          type="button"
          aria-pressed={status === 'watched'}
          aria-label={status === 'watched' ? `Desmarcar "${entry.title}" como assistido` : `Marcar "${entry.title}" como assistido`}
          onClick={() => toggleWatched(entry.id)}
          className={
            'flex h-8 w-8 items-center justify-center rounded-full border transition-colors ' +
            (status === 'watched'
              ? 'border-emerald-500 bg-emerald-500/15 text-emerald-400'
              : 'border-neutral-700 text-neutral-600 active:border-neutral-500')
          }
        >
          <CheckIcon className="h-4 w-4" />
        </button>
        <button
          type="button"
          aria-pressed={status === 'skip'}
          aria-label={
            status === 'skip' ? `Remover marca "não vou assistir" de "${entry.title}"` : `Marcar "${entry.title}" como não vou assistir`
          }
          onClick={() => toggleSkip(entry.id)}
          className={
            'flex h-8 w-8 items-center justify-center rounded-full border transition-colors ' +
            (status === 'skip'
              ? 'border-red-500 bg-red-500/15 text-red-400'
              : 'border-neutral-700 text-neutral-600 active:border-neutral-500')
          }
        >
          <CloseIcon className="h-4 w-4" />
        </button>
      </div>
    </li>
  )
}
