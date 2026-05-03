import type { HandoverNote } from '../types/patient';

const now = new Date();
const mins = (n: number) => new Date(now.getTime() - n * 60000).toISOString();

export const mockHandoverNotes: HandoverNote[] = [
  {
    id: 'h1',
    patientId: 'p1',
    patientName: 'Fatima Al-Otaibi',
    room: 'ICU-04',
    shift: 'day',
    generatedAt: mins(5),
    outgoingNurse: 'Nurse Aisha Mahmoud',
    incomingNurse: 'Nurse Omar Badr',
    summary:
      'Post-CABG × 3, 3.5h out of theatre. Haemodynamically unstable — HR trending up (102→114), BP rising (148→162 systolic), SpO2 dropping (95→91%). Pain score 7/10 uncontrolled. Two critical alerts active.',
    keyEvents: [
      'Returned from theatre at 14:30 after CABG × 3',
      'SpO2 dropped from 95% to 91% over last 60 min — O2 increased to 6L',
      'HR sustained above 110 bpm — cardiology notified',
      'Anticoagulation commenced per protocol',
      'Pain management — IV morphine 4mg administered at 16:00',
    ],
    watchItems: [
      'SpO2 — alert threshold tightened to <93% during post-op window',
      'HR — if sustained above 120 bpm, escalate to Dr. Al-Rasheed',
      'Anticoagulant dose due at 19:45 — do not miss',
      'Drain output — check every 30 min, >200ml/hr escalate immediately',
    ],
    alertCount: 2,
    vitalsTrend: 'deteriorating',
  },
  {
    id: 'h2',
    patientId: 'p4',
    patientName: 'Abdullah Al-Dosari',
    room: 'ICU-01',
    shift: 'day',
    generatedAt: mins(5),
    outgoingNurse: 'Nurse Omar Badr',
    incomingNurse: 'Nurse Aisha Mahmoud',
    summary:
      'Post-TAVR, 1h out of theatre. Highest acuity patient on ward — triage score 93/100. SpO2 critically low at 88% and worsening. Fever 39.2°C. Post-op fever protocol activated.',
    keyEvents: [
      'Returned from theatre at 17:00 following TAVR procedure',
      'SpO2 declined from 93% to 88% in 60 min — escalated to Dr. Al-Zahrani',
      'Temp spiked to 39.2°C at 17:45 — blood cultures drawn, antipyretics given',
      'HR escalating — 108 to 122 bpm over 60 min',
      'Respiratory rate 28 — chest physiotherapy ordered',
    ],
    watchItems: [
      'CRITICAL: SpO2 <90% — escalate immediately, do not wait',
      'Fever — recheck temp at 19:00, if >39.5 call Dr. Al-Zahrani directly',
      'Blood culture results expected within 2h',
      'Strict fluid balance — hourly urine output must be documented',
      'Still within 6h critical post-op window — heightened monitoring active',
    ],
    alertCount: 3,
    vitalsTrend: 'deteriorating',
  },
  {
    id: 'h3',
    patientId: 'p3',
    patientName: 'Nora Al-Qahtani',
    room: 'Ward-08A',
    shift: 'day',
    generatedAt: mins(5),
    outgoingNurse: 'Nurse Aisha Mahmoud',
    incomingNurse: 'Nurse Omar Badr',
    summary:
      'Post-laparoscopic appendectomy, 7h out of theatre — outside critical window. All vitals stable and improving. Pain score 3/10 well controlled. Expected discharge tomorrow morning.',
    keyEvents: [
      'Returned from theatre at 11:00 — uncomplicated procedure',
      'Cleared critical post-op window at 17:00 with stable vitals',
      'Tolerating sips of water — diet to advance to soft foods at 20:00',
      'Mobilised with physiotherapy at 15:30 — no dizziness reported',
    ],
    watchItems: [
      'Pain score — reassess at 21:00, paracetamol PRN available',
      'Wound site — check dressing at next round',
      'Discharge paperwork to be prepared for Dr. Al-Rasheed to sign in morning',
    ],
    alertCount: 0,
    vitalsTrend: 'improving',
  },
];
