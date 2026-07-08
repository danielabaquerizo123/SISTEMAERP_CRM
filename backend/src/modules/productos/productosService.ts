import { BaseService } from '../../shared/baseService';
import { productosRepository } from './productosRepository';

class ProductosService extends BaseService {
  async findAll() {
    return productosRepository.findAll();
  }

  async findById(id: number) {
    const producto = await productosRepository.findById(id);
    if (!producto) throw new Error('Producto not found');
    return producto;
  }

  async findByCodigo(codigo: string) {
    return productosRepository.findByCodigo(codigo);
  }

  async create(data: {
    codigo: string;
    nombre: string;
    descripcion?: string;
    precioCompra: number;
    precioVenta: number;
    stockMinimo?: number;
    categoriaId?: number;
    proveedorId?: number;
  }) {
    this.validateEntity(data, ['codigo', 'nombre', 'precioCompra', 'precioVenta']);
    const existing = await productosRepository.findByCodigo(data.codigo);
    if (existing) throw new Error('Producto already exists with this code');
    return productosRepository.create(data);
  }

  async update(id: number, data: Record<string, unknown>) {
    await this.findById(id);
    return productosRepository.update(id, data);
  }

  async delete(id: number) {
    await this.findById(id);
    return productosRepository.delete(id);
  }
}

export const productosService = new ProductosService();
