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

      // ✅ 응답 구조 반영 (res.data.data)
      const token = res.data?.data?.accessToken;
      const name = res.data?.data?.name;
      const userId = res.data?.data?.userId;

      if (token) {
        localStorage.setItem('token', token);
        localStorage.setItem('userName', name || '');
        localStorage.setItem('userId', String(userId || ''));

        console.log('로그인 성공 ✅', { token, name, userId });
      } else {
        throw new Error('accessToken이 응답에 없습니다.');
      }
    } catch (error) {
      console.error('❌ 로그인 요청 실패:', error);
      throw error;
    }
  },
}));
