import axios from 'axios';
import type { InternalAxiosRequestConfig } from 'axios'; // ✅ 타입만 import (TS1484 해결)

// 백엔드 주소 (나중에 교체)
const BASE_URL = 'http://localhost:8080';

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// ✅ 요청 시 토큰 자동 첨부
axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // ✅ 올바른 타입
    const token = localStorage.getItem('token');
    if (token) {
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;
