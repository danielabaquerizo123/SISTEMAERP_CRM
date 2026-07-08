export interface ILoginRequest {
  email: string;
  password: string;
}

export interface IRegisterRequest {
  email: string;
  password: string;
  name: string;
  lastName: string;
  role?: 'ADMIN' | 'USER';
}

export interface IAuthResponse {
  user: {
    id: number;
    email: string;
    name: string;
    lastName: string;
    role: string;
  };
  token: string;
}

export interface IUserProfile {
  id: number;
  email: string;
  name: string;
  lastName: string;
  role: string;
  isActive: boolean;
  createdAt: string;
}
