import { BaseRepository } from '../../../shared/baseRepository';

class CotizacionesRepository extends BaseRepository {
  findAll() {
    return this.prisma.cotizacion.findMany({
      include: { cliente: true, oportunidad: true, usuario: { select: { id: true, name: true, lastName: true } } },
    });
  }

  findById(id: number) {
    return this.prisma.cotizacion.findUnique({
      where: { id },
      include: { cliente: true, oportunidad: true, usuario: { select: { id: true, name: true, lastName: true } } },
    });
  }

  findByNumeroCotizacion(numeroCotizacion: string) {
    return this.prisma.cotizacion.findUnique({ where: { numeroCotizacion } });
  }

  create(data: {
    numeroCotizacion: string;
    oportunidadId?: number;
    clienteId: number;
    usuarioId: number;
    subtotal: number;
    iva: number;
    total: number;
    estado?: string;
    validez?: number;
    notas?: string;
  }) {
    return this.prisma.cotizacion.create({
      data,
      include: { cliente: true, oportunidad: true, usuario: { select: { id: true, name: true, lastName: true } } },
    });
  }

  update(id: number, data: Record<string, unknown>) {
    return this.prisma.cotizacion.update({
      where: { id },
      data,
      include: { cliente: true, oportunidad: true, usuario: { select: { id: true, name: true, lastName: true } } },
    });
  }

  delete(id: number) {
    return this.prisma.cotizacion.delete({ where: { id } });
  }
}

export const cotizacionesRepository = new CotizacionesRepository();
