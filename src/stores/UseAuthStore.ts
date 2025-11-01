import { create } from 'zustand';
import axiosInstance from '../apis/axiosInstance';

interface AuthState {
  id: string;
  password: string;
  setId: (value: string) => void;
  setPassword: (value: string) => void;
  login: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  id: '',
  password: '',
  setId: (value) => set({ id: value }),
  setPassword: (value) => set({ password: value }),

  // ✅ 로그인 함수
  login: async () => {
    const { id, password } = get();

    const payload = {
      phonenumber: id.replaceAll('-', ''),
      password,
    };

    try {
      const res = await axiosInstance.post('/api/auth/login', payload);
      const data = res.data?.data;

      const token = data?.accessToken;
      const name = data?.name;
      const userId = data?.userId;
      const teams = data?.teams || []; // ✅ role 정보 포함

      if (token) {
        localStorage.setItem('token', token);
        localStorage.setItem('userName', name || '');
        localStorage.setItem('userId', String(userId || ''));
        localStorage.setItem('teams', JSON.stringify(teams)); // ✅ 저장 추가

        console.log('로그인 성공 ✅', { token, name, userId, teams });
      } else {
        throw new Error('accessToken이 응답에 없습니다.');
      }
    } catch (error) {
      console.error('❌ 로그인 요청 실패:', error);
      throw error;
    }
  },
}));
