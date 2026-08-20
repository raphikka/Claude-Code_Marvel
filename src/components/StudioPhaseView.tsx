import { useMemo } from 'react'
import type { Entry } from '../data/types'
import { STUDIOS } from '../data/types'
import { groupByStudioAndArc } from '../data/group'
import { Section } from './Section'
import { EntryCard } from './EntryCard'

export function StudioPhaseView({ entries }: { entries: Entry[] }) {
  const groups = useMemo(() => groupByStudioAndArc(entries), [entries])

  return (
    <div>
      <p className="mb-4 text-[13px] leading-snug text-neutral-500">
        Agrupado por estúdio e, no caso da Marvel Studios, por fase — sempre na ordem de lançamento nos cinemas e
        streaming.
      </p>
      {groups.map((group) => {
        const info = STUDIOS[group.studio]
        return (
          <div key={group.studio} className="mb-6">
            <div className="mb-2 flex items-center gap-2">
              <span
                className="h-2.5 w-2.5 rounded-full"
                style={{ backgroundColor: info.color }}
                aria-hidden="true"
              />
              <h2 className="font-display text-2xl tracking-wide text-neutral-50">{info.label}</h2>
              <span className="text-xs font-medium text-neutral-500">{group.total} títulos</span>
            </div>
            {group.arcs.map((arcGroup) => (
              <Section
                key={arcGroup.arc}
                title={arcGroup.arc}
                count={arcGroup.entries.length}
                accentColor={info.color}
              >
                {arcGroup.entries.map((entry) => (
                  <EntryCard key={entry.id} entry={entry} />
                ))}
              </Section>
            ))}
          </div>
        )
      })}
    </div>
  )
}
