import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, ReferenceLine } from 'recharts'
import type { VitalReading } from '../types/patient'

interface Props { heartRate: VitalReading[]; oxygenSat: VitalReading[]; bloodPressureSys: VitalReading[] }

const fmt = (iso: string) => new Date(iso).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })

export function VitalsChart({ heartRate, oxygenSat, bloodPressureSys }: Props) {
  const data = heartRate.map((r, i) => ({
    t: fmt(r.timestamp),
    hr: r.value,
    spo2: oxygenSat[i]?.value ?? 0,
    bp: bloodPressureSys[i]?.value ?? 0,
  }))

  return (
    <div className="bg-white rounded border border-ink-5 p-4">
      <div className="flex items-center justify-between mb-3">
        <p className="text-[12px] font-600 text-ink">Vitals trend — last 60 min</p>
        <div className="flex items-center gap-3 text-2xs text-ink-4">
          <span className="flex items-center gap-1"><span className="w-3 h-0.5 bg-hmg-red inline-block" />HR</span>
          <span className="flex items-center gap-1"><span className="w-3 h-0.5 bg-blue-400 inline-block" />SpO₂</span>
          <span className="flex items-center gap-1"><span className="w-3 h-0.5 bg-violet-400 inline-block" />BP sys</span>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={160}>
        <LineChart data={data} margin={{ top: 4, right: 4, left: -24, bottom: 0 }}>
          <CartesianGrid strokeDasharray="2 2" stroke="#F3F4F6" />
          <XAxis dataKey="t" tick={{ fontSize: 9, fill: '#9CA3AF', fontFamily: 'IBM Plex Mono' }} tickLine={false} axisLine={false} />
          <YAxis tick={{ fontSize: 9, fill: '#9CA3AF', fontFamily: 'IBM Plex Mono' }} tickLine={false} axisLine={false} />
          <Tooltip
            contentStyle={{ fontSize: 11, borderRadius: 4, border: '1px solid #E5E7EB', fontFamily: 'IBM Plex Sans' }}
            labelStyle={{ color: '#6B7280' }}
          />
          <ReferenceLine y={100} stroke="#C8102E" strokeDasharray="3 3" strokeWidth={1} strokeOpacity={0.5} />
          <ReferenceLine y={94}  stroke="#60A5FA" strokeDasharray="3 3" strokeWidth={1} strokeOpacity={0.5} />
          <Line type="monotone" dataKey="hr"   name="Heart rate" stroke="#C8102E" strokeWidth={1.5} dot={false} activeDot={{ r: 3, strokeWidth: 0 }} />
          <Line type="monotone" dataKey="spo2" name="SpO₂"       stroke="#60A5FA" strokeWidth={1.5} dot={false} activeDot={{ r: 3, strokeWidth: 0 }} />
          <Line type="monotone" dataKey="bp"   name="BP sys"     stroke="#A78BFA" strokeWidth={1.5} dot={false} activeDot={{ r: 3, strokeWidth: 0 }} />
        </LineChart>
      </ResponsiveContainer>
      <p className="text-2xs text-ink-5 mt-1">Dashed lines: HR threshold 100 bpm · SpO₂ threshold 94%</p>
    </div>
  )
}
