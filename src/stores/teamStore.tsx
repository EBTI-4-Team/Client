// src/stores/teamStore.ts
import { create } from 'zustand';
import axiosInstance from '../apis/axiosInstance';

export type TeamItem = {
  teamId: number;
  teamName: string;
  teamExplain: string;
  maxMember: number;
};

type TeamState = {
  teams: TeamItem[];
  fetchTeams: () => Promise<void>;
  addTeam: (payload: {
    userId: number;
    teamName: string;
    teamExplain: string;
    maxMember: number;
  }) => Promise<void>;
};

export const useTeamStore = create<TeamState>((set) => ({
  teams: [],

  // ✅ 팀 목록 조회
  fetchTeams: async () => {
    try {
      const res = await axiosInstance.get('/api/teams');
      console.log('✅ 팀 목록:', res.data);
      set({ teams: res.data.data || [] });
    } catch (err) {
      console.error('❌ 팀 목록 불러오기 실패:', err);
      alert('팀 목록을 불러오는 중 오류가 발생했습니다.');
    }
  },

  // ✅ 팀 추가
  addTeam: async ({ userId, teamName, teamExplain, maxMember }) => {
    try {
      const res = await axiosInstance.post('/api/teams', {
        userId,
        teamName,
        maxMember,
        teamExplain,
      });
      console.log('✅ 팀 추가 성공:', res.data);
      // 새로고침 없이 즉시 반영
      set((state) => ({
        teams: [...state.teams, res.data.data],
      }));
    } catch (err) {
      console.error('❌ 팀 추가 실패:', err);
      alert('팀 추가 중 오류가 발생했습니다.');
    }
  },
}));
