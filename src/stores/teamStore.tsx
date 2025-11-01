import { create } from 'zustand';

export type TeamItem = {
  id: string;
  name: string;
  message: string;
  current: number;
  max: number; // 방 정원
  teamCount: number; // 팀 개수(추가로 관리하던 값)
};

type TeamState = {
  teams: TeamItem[];
  addTeam: (payload: Omit<TeamItem, 'id' | 'current'>) => string; // id 반환
  enterTeam: (id: string) => void; // current +1 (max 초과 방지)
  reset: () => void;
};

export const useTeamStore = create<TeamState>((set, get) => ({
  teams: [
    {
      id: crypto.randomUUID(),
      name: '승준이팀',
      message: '나랑 놀고싶은 사람 여기여기 모여라~',
      current: 4,
      max: 4,
      teamCount: 10,
    },
    {
      id: crypto.randomUUID(),
      name: 'EBTI 팀',
      message: '같이 프로젝트 해요!',
      current: 2,
      max: 6,
      teamCount: 3,
    },
  ],

  addTeam: ({ name, message, max, teamCount }) => {
    const id = crypto.randomUUID();
    set(({ teams }) => ({
      teams: [
        ...teams,
        {
          id,
          name,
          message,
          current: 1, // 생성 즉시 주인 1명 입장 처리
          max,
          teamCount,
        },
      ],
    }));
    return id;
  },

  enterTeam: (id) => {
    set(({ teams }) => ({
      teams: teams.map((t) =>
        t.id === id ? { ...t, current: Math.min(t.current + 1, t.max) } : t
      ),
    }));
  },

  reset: () => set({ teams: [] }),
}));
