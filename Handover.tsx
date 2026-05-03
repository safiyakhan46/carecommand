import { useState, useCallback, useMemo } from 'react';
import type { Patient, RiskLevel } from '../types/patient';
import { mockPatients } from '../data/mockPatients';

interface UsePatients {
  patients: Patient[];
  filteredPatients: Patient[];
  activeFilter: RiskLevel | 'all';
  filterByRisk: (risk: RiskLevel | 'all') => void;
  selectPatient: (id: string) => Patient | undefined;
  postOpPatients: Patient[];
  criticalPostOpPatients: Patient[];
}

export function usePatients(): UsePatients {
  const [patients] = useState<Patient[]>(mockPatients);
  const [activeFilter, setActiveFilter] = useState<RiskLevel | 'all'>('all');

  // Sort by alertScore descending so highest acuity appears first
  const sortedPatients = useMemo(
    () => [...patients].sort((a, b) => b.alertScore - a.alertScore),
    [patients]
  );

  const filteredPatients = useMemo(() => {
    return activeFilter === 'all'
      ? sortedPatients
      : sortedPatients.filter((p) => p.riskLevel === activeFilter);
  }, [sortedPatients, activeFilter]);

  const postOpPatients = useMemo(
    () => patients.filter((p) => p.surgical.status === 'post-op'),
    [patients]
  );

  const criticalPostOpPatients = useMemo(
    () => postOpPatients.filter((p) => p.riskLevel === 'critical'),
    [postOpPatients]
  );

  const filterByRisk = useCallback((risk: RiskLevel | 'all') => {
    setActiveFilter(risk);
  }, []);

  const selectPatient = useCallback(
    (id: string) => patients.find((p) => p.id === id),
    [patients]
  );

  return {
    patients,
    filteredPatients,
    activeFilter,
    filterByRisk,
    selectPatient,
    postOpPatients,
    criticalPostOpPatients,
  };
}
