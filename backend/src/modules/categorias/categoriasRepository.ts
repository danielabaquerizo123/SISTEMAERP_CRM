import { BaseRepository } from '../../shared/baseRepository';

class CategoriasRepository extends BaseRepository {
  findAll() {
    return this.prisma.categoria.findMany();
  }

  findById(id: number) {
    return this.prisma.categoria.findUnique({ where: { id } });
  }

  findByNombre(nombre: string) {
    return this.prisma.categoria.findUnique({ where: { nombre } });
  }

  create(data: { nombre: string; descripcion?: string }) {
    return this.prisma.categoria.create({ data });
  }

  update(id: number, data: Record<string, unknown>) {
    return this.prisma.categoria.update({ where: { id }, data });
  }

  delete(id: number) {
    return this.prisma.categoria.delete({ where: { id } });
  }
}

export const categoriasRepository = new CategoriasRepository();
