import type { Entry } from '../data/types'
import { StudioBadge } from './StudioBadge'
import { FilmIcon, TvIcon, SparkleIcon } from './icons'

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
  const Icon = TYPE_ICON[entry.type]
  const yearLabel = entry.yearEnd && entry.yearEnd !== entry.year ? `${entry.year}–${entry.yearEnd}` : `${entry.year}`

  return (
    <li className="flex gap-3 rounded-xl border border-neutral-800 bg-neutral-900/60 p-3 active:bg-neutral-900">
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
        {subtitle && <div className="mt-1 text-xs font-medium text-neutral-500">{subtitle}</div>}
        {entry.note && <p className="mt-1.5 text-[13px] leading-snug text-neutral-400">{entry.note}</p>}
      </div>
    </li>
  )
}
