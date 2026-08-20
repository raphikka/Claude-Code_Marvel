import { STUDIOS, type Studio } from '../data/types'

export function StudioBadge({ studio, size = 'sm' }: { studio: Studio; size?: 'sm' | 'xs' }) {
  const info = STUDIOS[studio]
  return (
    <span
      className={
        (size === 'xs' ? 'text-[10px] px-1.5 py-0.5 ' : 'text-xs px-2 py-0.5 ') +
        'inline-flex items-center rounded-full font-semibold tracking-wide whitespace-nowrap'
      }
      style={{ backgroundColor: info.color, color: info.textColor }}
    >
      {info.short}
    </span>
  )
}
