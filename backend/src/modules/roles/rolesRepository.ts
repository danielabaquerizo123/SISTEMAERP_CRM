import { BaseRepository } from '../../shared/baseRepository';

class RolesRepository extends BaseRepository {
  findAll() { return this.prisma.role.findMany(); }
  findById(id: number) { return this.prisma.role.findUnique({ where: { id } }); }
  findByName(name: string) { return this.prisma.role.findUnique({ where: { name } }); }
  create(data: { name: string; description?: string; permissions?: string }) { return this.prisma.role.create({ data }); }
  update(id: number, data: Record<string, unknown>) { return this.prisma.role.update({ where: { id }, data }); }
  delete(id: number) { return this.prisma.role.delete({ where: { id } }); }
}

export const rolesRepository = new RolesRepository();
