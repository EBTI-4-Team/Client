import { create } from 'zustand';

interface SurveyState {
  answers: Record<number, number>; // {문항번호: 선택값}
  setAnswer: (id: number, value: number) => void;
  resetAnswers: () => void;
}

export const useSurveyStore = create<SurveyState>((set) => ({
  answers: {},
  setAnswer: (id, value) =>
    set((state) => ({
      answers: { ...state.answers, [id]: value },
    })),
  resetAnswers: () => set({ answers: {} }),
}));
