import { NavLink, Outlet } from 'react-router-dom'
import { LayoutDashboard, Bell, ClipboardList } from 'lucide-react'
import clsx from 'clsx'
import { useTriageAlerts } from '../hooks/useTriageAlerts'

const nav = [
  { to: '/dashboard', label: 'Command Centre', icon: LayoutDashboard },
  { to: '/alerts',    label: 'Triage Alerts',  icon: Bell },
  { to: '/handover',  label: 'Shift Handover', icon: ClipboardList },
]

export function DashboardLayout() {
  const { criticalCount, warningCount } = useTriageAlerts()
  const badge = criticalCount + warningCount

  return (
    <div className="flex h-screen overflow-hidden bg-[#F4F5F7]">
      {/* Sidebar */}
      <aside className="w-52 flex flex-col shrink-0 bg-white border-r border-ink-5">
        {/* Logo */}
        <div className="px-4 py-4 border-b border-ink-5">
          <div className="flex items-center gap-2.5">
            {/* Al Habib-style red square logo mark */}
            <div className="w-8 h-8 bg-hmg-red rounded flex items-center justify-center shrink-0">
              <span className="text-white font-bold text-xs tracking-tight">HMG</span>
            </div>
            <div>
              <p className="text-[11px] font-600 text-ink leading-none">CareCommand</p>
              <p className="text-[10px] text-ink-3 mt-0.5">Sulaiman Al Habib</p>
            </div>
          </div>
        </div>

        {/* Ward badge */}
        <div className="px-4 py-2.5 bg-hmg-red-l border-b border-hmg-red-m">
          <p className="text-2xs text-hmg-red font-500 uppercase tracking-wider">Surgical ICU — Riyadh</p>
        </div>

        {/* Nav links */}
        <nav className="flex-1 py-2 px-2 space-y-0.5">
          {nav.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) => clsx(
                'flex items-center gap-2.5 px-3 py-2 rounded text-[13px] font-400 transition-colors duration-100',
                isActive
                  ? 'bg-hmg-red text-white'
                  : 'text-ink-2 hover:bg-ink-6 hover:text-ink'
              )}
            >
              {({ isActive }) => (
                <>
                  <Icon size={14} className={isActive ? 'text-white' : 'text-ink-4'} />
                  <span className="flex-1">{label}</span>
                  {label === 'Triage Alerts' && badge > 0 && (
                    <span className={clsx(
                      'text-[10px] font-600 px-1.5 py-0.5 rounded-full min-w-[18px] text-center',
                      isActive ? 'bg-white text-hmg-red' : 'bg-hmg-red text-white'
                    )}>
                      {badge}
                    </span>
                  )}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Shift clock */}
        <div className="px-4 py-3 border-t border-ink-5">
          <p className="text-2xs text-ink-4 mb-0.5">Current time</p>
          <ShiftClock />
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  )
}

function ShiftClock() {
  const now = new Date()
  const time = now.toLocaleTimeString('en-SA', { hour: '2-digit', minute: '2-digit', hour12: false })
  const hour = now.getHours()
  const shift = hour >= 7 && hour < 19 ? 'Day shift' : 'Night shift'
  return (
    <div>
      <p className="text-[13px] font-mono font-500 text-ink">{time}</p>
      <p className="text-2xs text-ink-4">{shift} · ends {hour >= 7 && hour < 19 ? '19:00' : '07:00'}</p>
    </div>
  )
}
