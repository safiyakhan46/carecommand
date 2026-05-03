import { useMemo } from 'react';
import type { Patient } from '../types/patient';

export interface SurgicalWatchInfo {
  patientId: string;
  inCriticalWindow: boolean;
  minutesElapsed: number;
  minutesRemaining: number;
  percentElapsed: number;
  urgency: 'high' | 'medium' | 'low' | 'cleared';
}

export function useSurgicalWatch(patients: Patient[]): SurgicalWatchInfo[] {
  return useMemo(() => {
    const now = Date.now();

    return patients
      .filter((p) => p.surgical.status === 'post-op' && p.surgical.theatreExitTime)
      .map((p) => {
        const exitTime = new Date(p.surgical.theatreExitTime!).getTime();
        const windowMs = p.surgical.criticalWindowHours * 60 * 60 * 1000;
        const elapsed = now - exitTime;
        const remaining = windowMs - elapsed;
        const minutesElapsed = Math.floor(elapsed / 60000);
        const minutesRemaining = Math.max(0, Math.floor(remaining / 60000));
        const percentElapsed = Math.min(100, (elapsed / windowMs) * 100);
        const inCriticalWindow = elapsed < windowMs;

        let urgency: SurgicalWatchInfo['urgency'] = 'cleared';
        if (inCriticalWindow) {
          if (percentElapsed < 33) urgency = 'high';
          else if (percentElapsed < 66) urgency = 'medium';
          else urgency = 'low';
        }

        return {
          patientId: p.id,
          inCriticalWindow,
          minutesElapsed,
          minutesRemaining,
          percentElapsed,
          urgency,
        };
      });
  }, [patients]);
}
