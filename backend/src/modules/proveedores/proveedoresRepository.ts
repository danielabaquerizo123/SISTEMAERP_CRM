import { BaseRepository } from '../../shared/baseRepository';

class ProveedoresRepository extends BaseRepository {
  findAll() {
    return this.prisma.proveedor.findMany();
  }

  findById(id: number) {
    return this.prisma.proveedor.findUnique({ where: { id } });
  }

  findByDocumento(numeroDocumento: string) {
    return this.prisma.proveedor.findUnique({ where: { numeroDocumento } });
  }

  create(data: {
    tipoDocumento: string;
    numeroDocumento: string;
    nombre: string;
    direccion?: string;
    telefono?: string;
    email?: string;
  }) {
    return this.prisma.proveedor.create({ data });
  }

  update(id: number, data: Record<string, unknown>) {
    return this.prisma.proveedor.update({ where: { id }, data });
  }

  delete(id: number) {
    return this.prisma.proveedor.delete({ where: { id } });
  }
}

export const proveedoresRepository = new ProveedoresRepository();
