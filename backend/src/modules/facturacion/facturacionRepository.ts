import { BaseRepository } from '../../shared/baseRepository';

class FacturacionRepository extends BaseRepository {
  findAll() {
    return this.prisma.factura.findMany({ include: { venta: { include: { cliente: true } } } });
  }

  findById(id: number) {
    return this.prisma.factura.findUnique({ where: { id }, include: { venta: { include: { cliente: true, detalleVenta: { include: { producto: true } } } } } });
  }

  findByNumeroFactura(numeroFactura: string) {
    return this.prisma.factura.findUnique({ where: { numeroFactura } });
  }

  findByVentaId(ventaId: number) {
    return this.prisma.factura.findUnique({ where: { ventaId } });
  }

  create(data: {
    ventaId: number;
    numeroFactura: string;
    subtotal: number;
    iva: number;
    total: number;
    estado?: string;
  }) {
    return this.prisma.factura.create({
      data,
      include: { venta: { include: { cliente: true } } },
    });
  }

  update(id: number, data: Record<string, unknown>) {
    return this.prisma.factura.update({
      where: { id },
      data,
      include: { venta: { include: { cliente: true } } },
    });
  }

  delete(id: number) {
    return this.prisma.factura.delete({ where: { id } });
  }
}

export const facturacionRepository = new FacturacionRepository();
