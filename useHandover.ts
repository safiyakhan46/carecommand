export type RiskLevel = 'critical' | 'warning' | 'stable';
export type AlertType = 'vitals' | 'device' | 'medication' | 'fall' | 'surgical';
export type DeviceStatus = 'online' | 'offline' | 'error';
export type SurgicalStatus = 'post-op' | 'pre-op' | 'in-theatre' | 'none';
export type AlertTrend = 'worsening' | 'stable' | 'improving';
export type Shift = 'day' | 'night'; // day = 07:00–19:00, night = 19:00–07:00

export interface VitalReading {
  timestamp: string;
  value: number;
}

export interface PatientVitals {
  heartRate: number;
  bloodPressureSys: number;
  bloodPressureDia: number;
  oxygenSat: number;
  temperature: number;
  respiratoryRate: number;
  painScore: number; // 0–10
}

export interface SurgicalInfo {
  status: SurgicalStatus;
  procedure: string;
  surgeonName: string;
  theatreExitTime: string | null; // ISO — when they left theatre
  criticalWindowHours: number;   // default 6
}

export interface Patient {
  id: string;
  name: string;
  age: number;
  room: string;
  ward: string;
  branch: string; // HMG branch e.g. "HMG Riyadh"
  condition: string;
  riskLevel: RiskLevel;
  alertScore: number;  // 0–100 composite triage score
  vitals: PatientVitals;
  vitalsHistory: {
    heartRate: VitalReading[];
    oxygenSat: VitalReading[];
    bloodPressureSys: VitalReading[];
  };
  surgical: SurgicalInfo;
  admittedAt: string;
  assignedNurse: string;
  assignedDoctor: string;
  mrn: string; // Medical Record Number
}

export interface Alert {
  id: string;
  patientId: string;
  patientName: string;
  room: string;
  type: AlertType;
  message: string;
  riskLevel: RiskLevel;
  triageScore: number;  // 0–100
  trend: AlertTrend;
  timestamp: string;
  acknowledged: boolean;
  acknowledgedBy?: string;
  note?: string;
}

export interface Device {
  id: string;
  patientId: string;
  patientName: string;
  name: string;
  type: string;
  status: DeviceStatus;
  battery: number;
  lastSeen: string;
  room: string;
}

export interface HandoverNote {
  id: string;
  patientId: string;
  patientName: string;
  room: string;
  shift: Shift;
  generatedAt: string;
  outgoingNurse: string;
  incomingNurse: string;
  summary: string;
  keyEvents: string[];
  watchItems: string[];
  alertCount: number;
  vitalsTrend: 'deteriorating' | 'stable' | 'improving';
}
