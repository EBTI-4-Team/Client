import axiosInstance from './axiosInstance';

export const loginApi = async (id: string, password: string) => {
  const response = await axiosInstance.post('/api/auth/login', {
    id,
    password,
  });
  return response.data; // { accessToken: "..." }
};

export const registerApi = async (
  id: string,
  password: string,
  phone: string
) => {
  const response = await axiosInstance.post('/api/auth/register', {
    id,
    password,
    phone,
  });
  return response.data;
};
