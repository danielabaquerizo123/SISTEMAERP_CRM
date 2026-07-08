import { BaseRepository } from '../../shared/baseRepository';

class VentasRepository extends BaseRepository {
  findAll() {
    return this.prisma.venta.findMany({
      include: {
        cliente: true,
        usuario: { select: { id: true, name: true, lastName: true } },
        detalleVenta: { include: { producto: true } },
      },
    });
  }

  findById(id: number) {
    return this.prisma.venta.findUnique({
      where: { id },
      include: {
        cliente: true,
        usuario: { select: { id: true, name: true, lastName: true } },
        detalleVenta: { include: { producto: true } },
      },
    });
  }

  findByNumeroDocumento(numeroDocumento: string) {
    return this.prisma.venta.findUnique({ where: { numeroDocumento } });
  }

  create(data: {
    numeroDocumento: string;
    clienteId: number;
    usuarioId: number;
    subtotal: number;
    iva: number;
    total: number;
    estado?: string;
    detalleVenta: {
      create: {
        productoId: number;
        cantidad: number;
        precioUnitario: number;
        subtotal: number;
      }[];
    };
  }) {
    return this.prisma.venta.create({
      data: {
        numeroDocumento: data.numeroDocumento,
        clienteId: data.clienteId,
        usuarioId: data.usuarioId,
        subtotal: data.subtotal,
        iva: data.iva,
        total: data.total,
        estado: data.estado ?? 'PENDIENTE',
        detalleVenta: data.detalleVenta,
      },
      include: {
        cliente: true,
        usuario: { select: { id: true, name: true, lastName: true } },
        detalleVenta: { include: { producto: true } },
      },
    });
  }

  delete(id: number) {
    return this.prisma.venta.delete({ where: { id } });
  }
}

export const ventasRepository = new VentasRepository();
