import api from '@shared/services/api';
import type { ILoginRequest, IRegisterRequest, IAuthResponse, IUserProfile } from '@shared/types/auth';

export const authService = {
  login: async (data: ILoginRequest): Promise<IAuthResponse> => {
    const response = await api.post('/auth/login', data);
    return response.data.data;
  },

  register: async (data: IRegisterRequest): Promise<IAuthResponse> => {
    const response = await api.post('/auth/register', data);
    return response.data.data;
  },

  getProfile: async (): Promise<IUserProfile> => {
    const response = await api.get('/auth/profile');
    return response.data.data;
  },
};
