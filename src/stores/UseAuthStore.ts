import { create } from 'zustand';
import { loginApi, registerApi } from '../apis/authApi.ts';

interface AuthState {
  id: string;
  password: string;
  setId: (id: string) => void;
  setPassword: (password: string) => void;
  login: () => Promise<void>;
  register: (phone: string) => Promise<void>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  id: '',
  password: '',

  setId: (id) => set({ id }),
  setPassword: (password) => set({ password }),

  // ✅ 로그인
  login: async () => {
    const { id, password } = get();
    try {
      const data = await loginApi(id, password);
      localStorage.setItem('token', data.accessToken);
      alert('로그인 성공!');
    } catch (error: any) {
      alert(error.response?.data?.message || '로그인 실패');
    }
  },

  // ✅ 회원가입
  register: async (phone) => {
    const { id, password } = get();
    try {
      await registerApi(id, password, phone);
      alert('회원가입 성공!');
    } catch (error: any) {
      alert(error.response?.data?.message || '회원가입 실패');
    }
  },

  // ✅ 로그아웃
  logout: () => {
    localStorage.removeItem('token');
    set({ id: '', password: '' });
  },
}));
