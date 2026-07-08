import bcrypt from 'bcrypt';
import { BaseService } from '../../shared/baseService';
import { AppError } from '../../shared/AppError';
import { authRepository } from './authRepository';
import { generateToken } from '../../shared/tokenUtils';
import { ICreateUser, ILoginUser, IAuthResponse } from './authInterfaces';

export class AuthService extends BaseService {
  async register(data: ICreateUser): Promise<IAuthResponse> {
    this.validateEntity(data, ['email', 'password', 'name', 'lastName']);

    const existing = await authRepository.findByEmail(data.email);
    if (existing) {
      throw new AppError('Email already registered', 409);
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);
    const user = await authRepository.create({ ...data, password: hashedPassword });

    const token = generateToken({ userId: user.id, role: user.role.name });

    return {
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        lastName: user.lastName,
        role: user.role.name,
      },
      token,
    };
  }

  async login(data: ILoginUser): Promise<IAuthResponse> {
    const user = await authRepository.findByEmail(data.email);
    if (!user) {
      throw new AppError('Invalid credentials', 401);
    }

    const isPasswordValid = await bcrypt.compare(data.password, user.password);
    if (!isPasswordValid) {
      throw new AppError('Invalid credentials', 401);
    }

    if (!user.isActive) {
      throw new AppError('Account is deactivated', 403);
    }

    const token = generateToken({ userId: user.id, role: user.role.name });

    return {
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        lastName: user.lastName,
        role: user.role.name,
      },
      token,
    };
  }

  async getProfile(userId: number) {
    const user = await authRepository.findById(userId);
    if (!user) {
      throw new AppError('User not found', 404);
    }
    return {
      id: user.id,
      email: user.email,
      name: user.name,
      lastName: user.lastName,
      role: user.role.name,
      isActive: user.isActive,
      createdAt: user.createdAt,
    };
  }
}

export const authService = new AuthService();
