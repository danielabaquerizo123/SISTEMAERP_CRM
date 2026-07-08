import { BaseRepository } from '../../shared/baseRepository';

class ClientesRepository extends BaseRepository {
  findAll() {
    return this.prisma.cliente.findMany({ include: { vendedor: { select: { id: true, name: true, lastName: true } } } });
  }

  findById(id: number) {
    return this.prisma.cliente.findUnique({ where: { id }, include: { vendedor: { select: { id: true, name: true, lastName: true } } } });
  }

  findByDocumento(numeroDocumento: string) {
    return this.prisma.cliente.findUnique({ where: { numeroDocumento } });
  }

  create(data: {
    tipoDocumento: string;
    numeroDocumento: string;
    nombre: string;
    direccion?: string;
    telefono?: string;
    email?: string;
    vendedorId?: number;
  }) {
    return this.prisma.cliente.create({ data, include: { vendedor: { select: { id: true, name: true, lastName: true } } } });
  }

  update(id: number, data: Record<string, unknown>) {
    return this.prisma.cliente.update({ where: { id }, data, include: { vendedor: { select: { id: true, name: true, lastName: true } } } });
  }

  delete(id: number) {
    return this.prisma.cliente.delete({ where: { id } });
  }
}

export const clientesRepository = new ClientesRepository();
