import { BaseRepository } from '../../shared/baseRepository';

class ComprasRepository extends BaseRepository {
  findAll() {
    return this.prisma.compra.findMany({
      include: {
        proveedor: true,
        usuario: { select: { id: true, name: true, lastName: true } },
        detalleCompra: { include: { producto: true } },
      },
    });
  }

  findById(id: number) {
    return this.prisma.compra.findUnique({
      where: { id },
      include: {
        proveedor: true,
        usuario: { select: { id: true, name: true, lastName: true } },
        detalleCompra: { include: { producto: true } },
      },
    });
  }

  findByNumeroDocumento(numeroDocumento: string) {
    return this.prisma.compra.findUnique({ where: { numeroDocumento } });
  }

  create(data: {
    numeroDocumento: string;
    proveedorId: number;
    usuarioId: number;
    subtotal: number;
    iva: number;
    total: number;
    estado?: string;
    detalleCompra: {
      create: {
        productoId: number;
        cantidad: number;
        precioUnitario: number;
        subtotal: number;
      }[];
    };
  }) {
    return this.prisma.compra.create({
      data: {
        numeroDocumento: data.numeroDocumento,
        proveedorId: data.proveedorId,
        usuarioId: data.usuarioId,
        subtotal: data.subtotal,
        iva: data.iva,
        total: data.total,
        estado: data.estado ?? 'PENDIENTE',
        detalleCompra: data.detalleCompra,
      },
      include: {
        proveedor: true,
        usuario: { select: { id: true, name: true, lastName: true } },
        detalleCompra: { include: { producto: true } },
      },
    });
  }

  delete(id: number) {
    return this.prisma.compra.delete({ where: { id } });
  }
}

export const comprasRepository = new ComprasRepository();
