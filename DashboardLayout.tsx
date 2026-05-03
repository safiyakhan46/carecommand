import { X, TrendingDown, TrendingUp, Minus, CheckCircle, AlertCircle, ArrowRight } from 'lucide-react'
import clsx from 'clsx'
import type { HandoverNote } from '../types/patient'

interface Props { note: HandoverNote; onClose: () => void }

const trendCfg = {
  deteriorating: { icon: <TrendingDown size={13} />, cls: 'text-hmg-red', label: 'Deteriorating' },
  stable:        { icon: <Minus size={13} />,        cls: 'text-ink-3',   label: 'Stable' },
  improving:     { icon: <TrendingUp size={13} />,   cls: 'text-green-600', label: 'Improving' },
}

export function HandoverModal({ note, onClose }: Props) {
  const t = trendCfg[note.vitalsTrend]
  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-xl max-h-[88vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
        {/* Header */}
        <div className="flex items-start justify-between px-5 py-4 border-b border-ink-5">
          <div>
            <div className="flex items-center gap-2 mb-0.5">
              <h2 className="text-[15px] font-600 text-ink">{note.patientName}</h2>
              <span className={clsx('flex items-center gap-1 text-[11px] font-500', t.cls)}>{t.icon}{t.label}</span>
            </div>
            <p className="text-2xs text-ink-4">{note.room} · Shift handover brief</p>
          </div>
          <button onClick={onClose} className="text-ink-4 hover:text-ink transition-colors p-1">
            <X size={16} />
          </button>
        </div>

        {/* Nurse handover strip */}
        <div className="px-5 py-2.5 bg-ink-6 border-b border-ink-5 flex items-center gap-2 text-[12px]">
          <span className="font-500 text-ink">{note.outgoingNurse}</span>
          <ArrowRight size={12} className="text-ink-4" />
          <span className="font-500 text-ink">{note.incomingNurse}</span>
          {note.alertCount > 0 && (
            <span className="ml-auto bg-hmg-red-l text-hmg-red text-2xs font-600 px-2 py-0.5 rounded-full">
              {note.alertCount} active alerts
            </span>
          )}
        </div>

        <div className="px-5 py-4 space-y-4">
          {/* Summary */}
          <div>
            <p className="text-2xs font-600 text-ink-4 uppercase tracking-wider mb-1.5">Patient summary</p>
            <p className="text-[12px] text-ink-2 leading-relaxed">{note.summary}</p>
          </div>

          {/* Events */}
          <div>
            <p className="text-2xs font-600 text-ink-4 uppercase tracking-wider mb-1.5">Events this shift</p>
            <div className="space-y-1">
              {note.keyEvents.map((ev, i) => (
                <div key={i} className="flex items-start gap-2">
                  <CheckCircle size={12} className="text-green-500 mt-px shrink-0" />
                  <p className="text-[12px] text-ink-2">{ev}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Watch items */}
          <div>
            <p className="text-2xs font-600 text-ink-4 uppercase tracking-wider mb-1.5">Watch items — incoming nurse</p>
            <div className="space-y-1.5">
              {note.watchItems.map((item, i) => (
                <div key={i} className={clsx('flex items-start gap-2 px-2.5 py-2 rounded', item.startsWith('CRITICAL') ? 'bg-hmg-red-l' : 'bg-amber-50/60')}>
                  <AlertCircle size={12} className={clsx('mt-px shrink-0', item.startsWith('CRITICAL') ? 'text-hmg-red' : 'text-amber-500')} />
                  <p className={clsx('text-[12px]', item.startsWith('CRITICAL') ? 'text-hmg-red font-500' : 'text-ink-2')}>{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="px-5 pb-4">
          <button onClick={onClose} className="w-full py-2 bg-hmg-red hover:bg-hmg-red-d text-white rounded text-[13px] font-500 transition-colors">
            Close handover brief
          </button>
        </div>
      </div>
    </div>
  )
}
