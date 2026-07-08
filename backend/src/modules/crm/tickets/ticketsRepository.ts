import { BaseRepository } from '../../../shared/baseRepository';

class TicketsRepository extends BaseRepository {
  findAll() {
    return this.prisma.ticketCRM.findMany({
      include: { cliente: true, usuario: { select: { id: true, name: true, lastName: true } } },
    });
  }

  findById(id: number) {
    return this.prisma.ticketCRM.findUnique({
      where: { id },
      include: { cliente: true, usuario: { select: { id: true, name: true, lastName: true } } },
    });
  }

  findByCodigo(codigo: string) {
    return this.prisma.ticketCRM.findUnique({ where: { codigo } });
  }

  create(data: {
    codigo: string;
    clienteId: number;
    usuarioId: number;
    asunto: string;
    descripcion?: string;
    estado?: string;
    prioridad?: string;
  }) {
    return this.prisma.ticketCRM.create({
      data,
      include: { cliente: true, usuario: { select: { id: true, name: true, lastName: true } } },
    });
  }

  update(id: number, data: Record<string, unknown>) {
    return this.prisma.ticketCRM.update({
      where: { id },
      data,
      include: { cliente: true, usuario: { select: { id: true, name: true, lastName: true } } },
    });
  }

  delete(id: number) {
    return this.prisma.ticketCRM.delete({ where: { id } });
  }
}

export const ticketsRepository = new TicketsRepository();
