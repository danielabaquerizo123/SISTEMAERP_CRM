import { BaseRepository } from '../../../shared/baseRepository';

class ActividadesRepository extends BaseRepository {
  findAll() {
    return this.prisma.actividadCRM.findMany({
      include: { ticket: true, oportunidad: true, usuario: { select: { id: true, name: true, lastName: true } } },
      orderBy: { fecha: 'desc' },
    });
  }

  findById(id: number) {
    return this.prisma.actividadCRM.findUnique({
      where: { id },
      include: { ticket: true, oportunidad: true, usuario: { select: { id: true, name: true, lastName: true } } },
    });
  }

  findByTicketId(ticketId: number) {
    return this.prisma.actividadCRM.findMany({
      where: { ticketId },
      include: { usuario: { select: { id: true, name: true, lastName: true } } },
      orderBy: { fecha: 'desc' },
    });
  }

  findByOportunidadId(oportunidadId: number) {
    return this.prisma.actividadCRM.findMany({
      where: { oportunidadId },
      include: { usuario: { select: { id: true, name: true, lastName: true } } },
      orderBy: { fecha: 'desc' },
    });
  }

  create(data: {
    ticketId?: number;
    oportunidadId?: number;
    tipo: string;
    asunto: string;
    descripcion?: string;
    fecha?: Date;
    usuarioId: number;
  }) {
    return this.prisma.actividadCRM.create({
      data,
      include: { ticket: true, oportunidad: true, usuario: { select: { id: true, name: true, lastName: true } } },
    });
  }

  update(id: number, data: Record<string, unknown>) {
    return this.prisma.actividadCRM.update({
      where: { id },
      data,
      include: { ticket: true, oportunidad: true, usuario: { select: { id: true, name: true, lastName: true } } },
    });
  }

  delete(id: number) {
    return this.prisma.actividadCRM.delete({ where: { id } });
  }
}

export const actividadesRepository = new ActividadesRepository();
