import { BaseRepository } from '../../shared/baseRepository';

class ProductosRepository extends BaseRepository {
  findAll() {
    return this.prisma.producto.findMany({ include: { categoria: true, proveedor: true } });
  }

  findById(id: number) {
    return this.prisma.producto.findUnique({ where: { id }, include: { categoria: true, proveedor: true } });
  }

  findByCodigo(codigo: string) {
    return this.prisma.producto.findUnique({ where: { codigo } });
  }

  create(data: {
    codigo: string;
    nombre: string;
    descripcion?: string;
    precioCompra: number;
    precioVenta: number;
    stockMinimo?: number;
    categoriaId?: number;
    proveedorId?: number;
  }) {
    return this.prisma.producto.create({ data, include: { categoria: true, proveedor: true } });
  }

  update(id: number, data: Record<string, unknown>) {
    return this.prisma.producto.update({ where: { id }, data, include: { categoria: true, proveedor: true } });
  }

  delete(id: number) {
    return this.prisma.producto.delete({ where: { id } });
  }
}

export const productosRepository = new ProductosRepository();
