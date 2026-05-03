import { useNavigate } from 'react-router-dom'
import { Heart, Activity, Thermometer, Wind, AlertTriangle } from 'lucide-react'
import clsx from 'clsx'
import type { Patient } from '../types/patient'
import { PostOpCountdown } from './PostOpCountdown'
import type { SurgicalWatchInfo } from '../hooks/useSurgicalWatch'

interface Props { patient: Patient; watchInfo?: SurgicalWatchInfo }

const riskLeft = { critical: 'border-l-[3px] border-l-hmg-red', warning: 'border-l-[3px] border-l-amber-400', stable: 'border-l-[3px] border-l-green-500' }
const riskDot  = { critical: 'bg-hmg-red risk-pulse', warning: 'bg-amber-400', stable: 'bg-green-500' }
const riskTag  = { critical: 'bg-hmg-red-l text-hmg-red', warning: 'bg-amber-50 text-amber-700', stable: 'bg-green-50 text-green-700' }
const scoreBg  = (s: number) => s >= 75 ? 'bg-hmg-red-l text-hmg-red' : s >= 40 ? 'bg-amber-50 text-amber-700' : 'bg-green-50 text-green-700'

const surgTag = {
  'post-op':    'bg-purple-50 text-purple-700',
  'pre-op':     'bg-sky-50 text-sky-700',
  'in-theatre': 'bg-orange-50 text-orange-700',
  'none':       '',
}

export function PatientCard({ patient, watchInfo }: Props) {
  const nav = useNavigate()

  return (
    <div
      onClick={() => nav(`/patient/${patient.id}`)}
      className={clsx(
        'bg-white rounded border border-ink-5 cursor-pointer hover:shadow-md hover:border-ink-4 transition-all duration-150',
        riskLeft[patient.riskLevel],
        watchInfo?.inCriticalWindow && watchInfo.urgency === 'high' && 'ring-1 ring-hmg-red/20'
      )}
    >
      {/* Top bar: name + score */}
      <div className="px-3 pt-3 pb-2 flex items-start justify-between gap-2">
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1.5 mb-0.5 flex-wrap">
            <span className={clsx('w-1.5 h-1.5 rounded-full shrink-0 mt-px', riskDot[patient.riskLevel])} />
            <span className="text-[13px] font-600 text-ink truncate">{patient.name}</span>
          </div>
          <p className="text-2xs text-ink-4 ml-3">{patient.mrn} · {patient.room} · {patient.ward}</p>
        </div>
        {/* Triage score */}
        <div className={clsx('shrink-0 rounded px-2 py-1 text-center', scoreBg(patient.alertScore))}>
          <p className="font-mono text-[15px] font-500 leading-none">{patient.alertScore}</p>
          <p className="text-2xs opacity-70 mt-0.5">score</p>
        </div>
      </div>

      {/* Tags row */}
      <div className="px-3 pb-2 flex gap-1 flex-wrap">
        <span className={clsx('text-2xs font-500 px-1.5 py-0.5 rounded capitalize', riskTag[patient.riskLevel])}>
          {patient.riskLevel}
        </span>
        {patient.surgical.status !== 'none' && (
          <span className={clsx('text-2xs font-500 px-1.5 py-0.5 rounded capitalize', surgTag[patient.surgical.status])}>
            {patient.surgical.status}
          </span>
        )}
        <span className="text-2xs text-ink-4 px-1.5 py-0.5">{patient.condition}</span>
      </div>

      {/* Post-op countdown */}
      {watchInfo?.inCriticalWindow && (
        <div className="px-3 pb-2">
          <PostOpCountdown watchInfo={watchInfo} />
        </div>
      )}

      {/* Vitals 2×2 grid */}
      <div className="px-3 pb-2 grid grid-cols-2 gap-1">
        <Vital icon={<Heart size={10} />} label="HR" val={`${patient.vitals.heartRate}`} unit="bpm" alert={patient.vitals.heartRate > 100} />
        <Vital icon={<Activity size={10} />} label="SpO₂" val={`${patient.vitals.oxygenSat}`} unit="%" alert={patient.vitals.oxygenSat < 94} />
        <Vital icon={<Wind size={10} />} label="BP" val={`${patient.vitals.bloodPressureSys}/${patient.vitals.bloodPressureDia}`} unit="mmHg" alert={patient.vitals.bloodPressureSys > 140} />
        <Vital icon={<Thermometer size={10} />} label="Temp" val={`${patient.vitals.temperature}`} unit="°C" alert={patient.vitals.temperature > 38} />
      </div>

      {/* Footer */}
      <div className="px-3 pb-2.5 pt-1.5 border-t border-ink-5 flex items-center justify-between">
        <span className="text-2xs text-ink-4">{patient.assignedNurse.replace('Nurse ', '')}</span>
        {patient.alertScore >= 75 && (
          <span className="flex items-center gap-1 text-2xs text-hmg-red font-500">
            <AlertTriangle size={10} />Review needed
          </span>
        )}
      </div>
    </div>
  )
}

function Vital({ icon, label, val, unit, alert }: { icon: React.ReactNode; label: string; val: string; unit: string; alert: boolean }) {
  return (
    <div className={clsx('flex items-center gap-1 px-1.5 py-1 rounded text-2xs', alert ? 'bg-hmg-red-l' : 'bg-ink-6')}>
      <span className={alert ? 'text-hmg-red' : 'text-ink-4'}>{icon}</span>
      <span className={alert ? 'text-hmg-red/70' : 'text-ink-4'}>{label}</span>
      <span className={clsx('ml-auto font-mono font-500', alert ? 'text-hmg-red' : 'text-ink-2')}>{val}<span className="font-400 opacity-60 ml-0.5">{unit}</span></span>
    </div>
  )
}
