import { BaseRepository } from '../../../shared/baseRepository';

class OportunidadesRepository extends BaseRepository {
  findAll() {
    return this.prisma.oportunidadCRM.findMany({
      include: { cliente: true, usuario: { select: { id: true, name: true, lastName: true } } },
    });
  }

  findById(id: number) {
    return this.prisma.oportunidadCRM.findUnique({
      where: { id },
      include: { cliente: true, usuario: { select: { id: true, name: true, lastName: true } } },
    });
  }

  create(data: {
    clienteId: number;
    usuarioId: number;
    nombre: string;
    descripcion?: string;
    valorEstimado: number;
    etapa?: string;
    probabilidad?: number;
    fechaCierre?: Date;
  }) {
    return this.prisma.oportunidadCRM.create({
      data,
      include: { cliente: true, usuario: { select: { id: true, name: true, lastName: true } } },
    });
  }

  update(id: number, data: Record<string, unknown>) {
    return this.prisma.oportunidadCRM.update({
      where: { id },
      data,
      include: { cliente: true, usuario: { select: { id: true, name: true, lastName: true } } },
    });
  }

  delete(id: number) {
    return this.prisma.oportunidadCRM.delete({ where: { id } });
  }
}

export const oportunidadesRepository = new OportunidadesRepository();
