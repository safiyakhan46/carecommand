import { useState, useMemo } from 'react';
import type { HandoverNote, Shift } from '../types/patient';
import { mockHandoverNotes } from '../data/mockHandover';

interface UseHandover {
  notes: HandoverNote[];
  currentShift: Shift;
  shiftLabel: string;
  shiftStart: string;
  nextShiftTime: string;
  selectedNote: HandoverNote | null;
  selectNote: (id: string) => void;
  clearNote: () => void;
}

function getCurrentShift(): Shift {
  const hour = new Date().getHours();
  return hour >= 7 && hour < 19 ? 'day' : 'night';
}

function getShiftTimes(): { label: string; start: string; next: string } {
  const shift = getCurrentShift();
  if (shift === 'day') {
    return { label: 'Day Shift', start: '07:00', next: '19:00' };
  }
  return { label: 'Night Shift', start: '19:00', next: '07:00' };
}

export function useHandover(): UseHandover {
  const [notes] = useState<HandoverNote[]>(mockHandoverNotes);
  const [selectedNote, setSelectedNote] = useState<HandoverNote | null>(null);

  const currentShift = useMemo(() => getCurrentShift(), []);
  const { label, start, next } = useMemo(() => getShiftTimes(), []);

  const selectNote = (id: string) => {
    const found = notes.find((n) => n.id === id) ?? null;
    setSelectedNote(found);
  };

  const clearNote = () => setSelectedNote(null);

  return {
    notes,
    currentShift,
    shiftLabel: label,
    shiftStart: start,
    nextShiftTime: next,
    selectedNote,
    selectNote,
    clearNote,
  };
}
