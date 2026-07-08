import { BaseRepository } from '../../shared/baseRepository';

class UsersRepository extends BaseRepository {
  findAll() {
    return this.prisma.user.findMany({
      select: { id: true, email: true, name: true, lastName: true, role: true, isActive: true, createdAt: true },
    });
  }

  findById(id: number) {
    return this.prisma.user.findUnique({ where: { id }, include: { role: true } });
  }

  update(id: number, data: Record<string, unknown>) {
    return this.prisma.user.update({ where: { id }, data, include: { role: true } });
  }

  delete(id: number) {
    return this.prisma.user.delete({ where: { id } });
  }
}

export const usersRepository = new UsersRepository();
