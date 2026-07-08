import { BaseService } from '../../shared/baseService';
import { comprasRepository } from './comprasRepository';

class ComprasService extends BaseService {
  async findAll() {
    return comprasRepository.findAll();
  }

  async findById(id: number) {
    const compra = await comprasRepository.findById(id);
    if (!compra) throw new Error('Compra not found');
    return compra;
  }

  async create(data: {
    numeroDocumento: string;
    proveedorId: number;
    usuarioId: number;
    subtotal: number;
    iva: number;
    total: number;
    estado?: string;
    detalles: { productoId: number; cantidad: number; precioUnitario: number; subtotal: number }[];
  }) {
    this.validateEntity(data, ['numeroDocumento', 'proveedorId', 'usuarioId', 'subtotal', 'iva', 'total', 'detalles']);
    const existing = await comprasRepository.findByNumeroDocumento(data.numeroDocumento);
    if (existing) throw new Error('Compra already exists with this document number');

    return comprasRepository.create({
      ...data,
      detalleCompra: {
        create: data.detalles,
      },
    });
  }

  async delete(id: number) {
    const compra = await this.findById(id);
    return comprasRepository.delete(id);
  }
}

export const comprasService = new ComprasService();
