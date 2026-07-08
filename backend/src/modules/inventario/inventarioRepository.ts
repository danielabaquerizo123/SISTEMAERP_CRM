import { BaseRepository } from '../../shared/baseRepository';

class InventarioRepository extends BaseRepository {
  findStockAll() {
    return this.prisma.inventario.findMany({ include: { producto: true } });
  }

  findStockByProducto(productoId: number) {
    return this.prisma.inventario.findUnique({ where: { productoId }, include: { producto: true } });
  }

  upsertStock(productoId: number, cantidad: number) {
    return this.prisma.inventario.upsert({
      where: { productoId },
      update: { cantidad },
      create: { productoId, cantidad },
    });
  }

  findMovements(productoId?: number) {
    const where = productoId ? { productoId } : {};
    return this.prisma.movimientoInventario.findMany({
      where,
      include: { producto: true, usuario: { select: { id: true, name: true, lastName: true } } },
      orderBy: { createdAt: 'desc' },
    });
  }

  createMovement(data: {
    productoId: number;
    tipo: string;
    cantidad: number;
    motivo?: string;
    usuarioId: number;
  }) {
    return this.prisma.movimientoInventario.create({
      data,
      include: { producto: true, usuario: { select: { id: true, name: true, lastName: true } } },
    });
  }
}

export const inventarioRepository = new InventarioRepository();
