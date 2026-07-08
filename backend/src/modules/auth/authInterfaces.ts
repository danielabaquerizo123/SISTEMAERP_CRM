export interface ICreateUser {
  email: string;
  password: string;
  name: string;
  lastName: string;
  roleId?: number;
}

export interface ILoginUser {
  email: string;
  password: string;
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
