import { useState, type ReactNode } from 'react'
import { ChevronDownIcon } from './icons'

export function Section({
  title,
  subtitle,
  count,
  accentColor,
  defaultOpen = true,
  children,
}: {
  title: string
  subtitle?: string
  count?: number
  accentColor?: string
  defaultOpen?: boolean
  children: ReactNode
}) {
  const [open, setOpen] = useState(defaultOpen)

  return (
    <section className="mb-3">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center gap-2 rounded-lg px-1 py-2 text-left active:opacity-70"
        style={accentColor ? { borderLeft: `3px solid ${accentColor}`, paddingLeft: '0.6rem' } : undefined}
      >
        <div className="min-w-0 flex-1">
          <div className="flex items-baseline gap-2">
            <h2 className="truncate text-base font-bold text-neutral-100">{title}</h2>
            {count !== undefined && <span className="text-xs font-medium text-neutral-500">{count}</span>}
          </div>
          {subtitle && <p className="truncate text-xs text-neutral-500">{subtitle}</p>}
        </div>
        <ChevronDownIcon className={`h-4 w-4 shrink-0 text-neutral-500 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && <ul className="mt-1.5 flex flex-col gap-2">{children}</ul>}
    </section>
  )
}
