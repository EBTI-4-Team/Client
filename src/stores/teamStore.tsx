import { create } from 'zustand';

export type TeamItem = {
  id: string;
  name: string;
  message: string;
  current: number;
  max: number; // 방 정원
  teamCount: number; // 팀 개수
};

type TeamState = {
  teams: TeamItem[];
  // 팀별 입장 사용자 기록: teamId -> Set<userId>
  teamMembers: Record<string, Set<string>>;
  // 세션별 고유 사용자 id
  myId: string;

  getTeamById: (id: string) => TeamItem | null;
  addTeam: (payload: Omit<TeamItem, 'id' | 'current'>) => string;
  enterTeamOnce: (id: string) => void; // ✅ 같은 세션에서는 한 번만 +1
  reset: () => void;
};

// 세션별 고정 사용자 id 발급
function getOrCreateMyId(): string {
  const KEY = 'ebting_myid';
  let v = sessionStorage.getItem(KEY);
  if (!v) {
    v = crypto?.randomUUID?.() ?? `${Date.now()}-${Math.random()}`;
    sessionStorage.setItem(KEY, v);
  }
  return v;
}

export const useTeamStore = create<TeamState>((set, get) => ({
  teams: [
    {
      id: crypto.randomUUID(),
      name: '승준이팀',
      message: '나랑 놀고싶은 사람 여기여기 모여라~',
      current: 4,
      max: 10,
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
  teamMembers: {}, // ✅ 팀별 입장 기록
  myId: getOrCreateMyId(), // ✅ 세션 사용자 id

  getTeamById: (id) => get().teams.find((t) => t.id === id) ?? null,

  addTeam: ({ name, message, max, teamCount }) => {
    const id = crypto.randomUUID();
    const { myId, teamMembers } = get();

    // 생성자 본인은 자동 입장 처리(1명)
    const newMembers = new Set<string>([myId]);

    set((s) => ({
      teams: [
        ...s.teams,
        {
          id,
          name,
          message,
          current: 1, // 생성 즉시 1명
          max,
          teamCount,
        },
      ],
      teamMembers: {
        ...teamMembers,
        [id]: newMembers,
      },
    }));

    return id;
  },

  enterTeamOnce: (id) => {
    const { teams, teamMembers, myId } = get();
    const team = teams.find((t) => t.id === id);
    if (!team) return;

    // 이미 들어간 사용자면 증가 금지
    const members = new Set(teamMembers[id] ?? []);
    if (members.has(myId)) return;

    // 정원 초과 금지
    if (team.current >= team.max) return;

    members.add(myId);

    set({
      teams: teams.map((t) =>
        t.id === id ? { ...t, current: Math.min(t.current + 1, t.max) } : t
      ),
      teamMembers: {
        ...teamMembers,
        [id]: members,
      },
    });
  },

  reset: () => set({ teams: [], teamMembers: {} }),
}));
