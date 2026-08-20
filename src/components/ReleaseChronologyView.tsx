import { useMemo } from 'react'
import type { Entry } from '../data/types'
import { groupByReleaseYear } from '../data/group'
import { Section } from './Section'
import { EntryCard } from './EntryCard'

export function ReleaseChronologyView({ entries }: { entries: Entry[] }) {
  const groups = useMemo(() => groupByReleaseYear(entries), [entries])

  return (
    <div>
      <p className="mb-4 text-[13px] leading-snug text-neutral-500">
        Todos os estúdios misturados, na ordem real em que chegaram aos cinemas e ao streaming — sem separação por
        fase ou franquia.
      </p>
      {groups.map((group) => (
        <Section key={group.year} title={String(group.year)} count={group.entries.length}>
          {group.entries.map((entry) => (
            <EntryCard key={entry.id} entry={entry} />
          ))}
        </Section>
      ))}
    </div>
  )
}
