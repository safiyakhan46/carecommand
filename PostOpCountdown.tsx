import { TrendingUp, TrendingDown, Minus, CheckCircle, AlertCircle, AlertTriangle, Info } from 'lucide-react'
import clsx from 'clsx'
import type { Alert } from '../types/patient'

interface Props { alert: Alert; onAcknowledge: (id: string, by: string) => void; compact?: boolean }

const cfg = {
  critical: { icon: <AlertCircle size={13} />, bar: 'bg-hmg-red', score: 'bg-hmg-red-l text-hmg-red', btn: 'bg-hmg-red hover:bg-hmg-red-d text-white', border: 'border-l-2 border-l-hmg-red', tag: 'bg-hmg-red-l text-hmg-red' },
  warning:  { icon: <AlertTriangle size={13} />, bar: 'bg-amber-400', score: 'bg-amber-50 text-amber-700', btn: 'bg-amber-500 hover:bg-amber-600 text-white', border: 'border-l-2 border-l-amber-400', tag: 'bg-amber-50 text-amber-700' },
  stable:   { icon: <Info size={13} />, bar: 'bg-green-500', score: 'bg-green-50 text-green-700', btn: 'bg-green-600 hover:bg-green-700 text-white', border: 'border-l-2 border-l-green-500', tag: 'bg-green-50 text-green-700' },
}

const trend = {
  worsening: { icon: <TrendingDown size={10} className="text-hmg-red" />, label: 'Worsening', cls: 'text-hmg-red' },
  stable:    { icon: <Minus size={10} className="text-ink-4" />, label: 'Stable', cls: 'text-ink-4' },
  improving: { icon: <TrendingUp size={10} className="text-green-600" />, label: 'Improving', cls: 'text-green-600' },
}

function ago(iso: string) {
  const s = Math.floor((Date.now() - new Date(iso).getTime()) / 1000)
  if (s < 60) return `${s}s ago`
  if (s < 3600) return `${Math.floor(s / 60)}m ago`
  return `${Math.floor(s / 3600)}h ago`
}

export function TriageAlertItem({ alert, onAcknowledge, compact = false }: Props) {
  const c = cfg[alert.riskLevel]
  const t = trend[alert.trend]

  return (
    <div className={clsx(
      'bg-white rounded border border-ink-5 transition-opacity duration-200',
      c.border,
      alert.acknowledged && 'opacity-40'
    )}>
      <div className="flex items-stretch">
        {/* Score column */}
        <div className={clsx('flex flex-col items-center justify-center px-2.5 py-2 shrink-0 rounded-l', c.score)}>
          <span className="font-mono font-500 text-[15px] leading-none">{alert.triageScore}</span>
          <div className="w-6 h-0.5 bg-black/10 rounded-full mt-1 overflow-hidden">
            <div className={clsx('h-full rounded-full', c.bar)} style={{ width: `${alert.triageScore}%` }} />
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0 px-2.5 py-2">
          <div className="flex items-center gap-1.5 mb-0.5 flex-wrap">
            <span className={clsx('shrink-0', alert.riskLevel === 'critical' ? 'text-hmg-red' : alert.riskLevel === 'warning' ? 'text-amber-500' : 'text-green-600')}>
              {c.icon}
            </span>
            <span className="text-[12px] font-600 text-ink truncate">{alert.patientName}</span>
            <span className="text-2xs text-ink-4">· {alert.room}</span>
            <span className={clsx('text-2xs font-500 px-1.5 py-0.5 rounded capitalize ml-auto', c.tag)}>{alert.type}</span>
          </div>
          {!compact && <p className="text-[11px] text-ink-3 leading-relaxed mb-1">{alert.message}</p>}
          <div className="flex items-center gap-2 text-2xs">
            <span className="text-ink-4">{ago(alert.timestamp)}</span>
            <span className={clsx('flex items-center gap-0.5', t.cls)}>
              {t.icon}{t.label}
            </span>
          </div>
        </div>

        {/* Ack button */}
        <div className="flex items-center px-2 shrink-0">
          {alert.acknowledged
            ? <CheckCircle size={14} className="text-green-500" />
            : <button
                onClick={(e) => { e.stopPropagation(); onAcknowledge(alert.id, 'Charge Nurse') }}
                className={clsx('text-[11px] font-500 px-2 py-1.5 rounded transition-colors', c.btn)}
              >Ack</button>
          }
        </div>
      </div>
    </div>
  )
}
