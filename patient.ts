import { TrendingDown, TrendingUp, Minus, ArrowRight, ChevronRight } from 'lucide-react'
import clsx from 'clsx'
import type { HandoverNote } from '../types/patient'

interface Props { note: HandoverNote; onClick: () => void }

const trendCfg = {
  deteriorating: { icon: <TrendingDown size={11} />, cls: 'text-hmg-red bg-hmg-red-l', label: 'Deteriorating' },
  stable:        { icon: <Minus size={11} />,        cls: 'text-ink-3 bg-ink-6',       label: 'Stable' },
  improving:     { icon: <TrendingUp size={11} />,   cls: 'text-green-700 bg-green-50', label: 'Improving' },
}

export function HandoverCard({ note, onClick }: Props) {
  const t = trendCfg[note.vitalsTrend]
  return (
    <div onClick={onClick} className="bg-white rounded border border-ink-5 cursor-pointer hover:shadow-md hover:border-ink-4 transition-all duration-150">
      <div className="px-3.5 pt-3 pb-2.5">
        <div className="flex items-start justify-between gap-2 mb-1.5">
          <div>
            <div className="flex items-center gap-2 mb-0.5">
              <span className="text-[13px] font-600 text-ink">{note.patientName}</span>
              {note.alertCount > 0 && (
                <span className="bg-hmg-red-l text-hmg-red text-2xs font-600 px-1.5 py-0.5 rounded-full">
                  {note.alertCount} alerts
                </span>
              )}
            </div>
            <p className="text-2xs text-ink-4">{note.room}</p>
          </div>
          <span className={clsx('flex items-center gap-1 text-2xs font-500 px-2 py-1 rounded shrink-0', t.cls)}>
            {t.icon}{t.label}
          </span>
        </div>
        <p className="text-[11px] text-ink-3 leading-relaxed line-clamp-2">{note.summary}</p>
      </div>
      <div className="px-3.5 py-2 border-t border-ink-5 flex items-center justify-between">
        <div className="flex items-center gap-1 text-2xs text-ink-4">
          <span>{note.outgoingNurse.replace('Nurse ', '')}</span>
          <ArrowRight size={10} />
          <span>{note.incomingNurse.replace('Nurse ', '')}</span>
        </div>
        <ChevronRight size={13} className="text-ink-5" />
      </div>
    </div>
  )
}
