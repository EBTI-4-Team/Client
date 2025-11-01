import { create } from 'zustand';

type TeamModalFields = {
  name: string;
  capacity: number; // max
  message: string;
  teamCount: number; // 팀 개수
};

type TeamModalState = {
  isOpen: boolean;
  fields: TeamModalFields;
  open: () => void;
  close: () => void;
  setField: <K extends keyof TeamModalFields>(
    key: K,
    value: TeamModalFields[K]
  ) => void;
  resetFields: () => void;
};

const initialFields: TeamModalFields = {
  name: '',
  capacity: 0,
  message: '',
  teamCount: 0,
};

export const useTeamModalStore = create<TeamModalState>((set) => ({
  isOpen: false,
  fields: initialFields,

  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
  setField: (key, value) =>
    set((s) => ({ fields: { ...s.fields, [key]: value } })),
  resetFields: () => set({ fields: initialFields }),
}));
