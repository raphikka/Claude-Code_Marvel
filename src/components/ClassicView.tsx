import type { Entry } from '../data/types'
import { byReleaseDate } from '../data/group'
import { EntryCard } from './EntryCard'

export function ClassicView({ entries }: { entries: Entry[] }) {
  const sorted = entries.slice().sort(byReleaseDate)

  return (
    <div>
      <p className="mb-4 text-[13px] leading-snug text-neutral-500">
        Produções anteriores ao ano 2000: os primeiros seriados, filmes para TV e longas que antecederam a era
        moderna do cinema de super-heróis, em ordem de lançamento.
      </p>
      <ul className="flex flex-col gap-2">
        {sorted.map((entry) => (
          <EntryCard key={entry.id} entry={entry} />
        ))}
      </ul>
    </div>
  )
}
