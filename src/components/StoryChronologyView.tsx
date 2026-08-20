import { useMemo } from 'react'
import type { Entry } from '../data/types'
import { groupByDecade } from '../data/group'
import { Section } from './Section'
import { EntryCard } from './EntryCard'

export function StoryChronologyView({ entries }: { entries: Entry[] }) {
  const groups = useMemo(() => groupByDecade(entries), [entries])

  return (
    <div>
      <p className="mb-4 text-[13px] leading-snug text-neutral-500">
        Todos os estúdios misturados numa única linha do tempo, ordenados pelo período em que cada história
        <strong className="text-neutral-400"> se passa</strong> — não pelo ano de lançamento. Universos que nunca se
        cruzaram (MCU, Sony, Fox…) aparecem lado a lado sempre que suas tramas ocorrem na mesma época.
      </p>
      {groups.map((group) => (
        <Section key={group.label} title={group.label} count={group.entries.length}>
          {group.entries.map((entry) => (
            <EntryCard key={entry.id} entry={entry} subtitle={`Época da história: ${entry.storyEra}`} />
          ))}
        </Section>
      ))}
    </div>
  )
}
