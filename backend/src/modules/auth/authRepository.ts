import { BaseRepository } from '../../shared/baseRepository';
import { ICreateUser } from './authInterfaces';

export class AuthRepository extends BaseRepository {
  async findByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email },
      include: { role: true },
    });
  }

  async findById(id: number) {
    return this.prisma.user.findUnique({
      where: { id },
      include: { role: true },
    });
  }

  async create(data: ICreateUser) {
    return this.prisma.user.create({
      data: {
        email: data.email,
        password: data.password,
        name: data.name,
        lastName: data.lastName,
        roleId: data.roleId ?? 1,
      },
      include: { role: true },
    });
  }
}

export const authRepository = new AuthRepository();
