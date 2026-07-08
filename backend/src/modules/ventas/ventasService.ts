import { BaseService } from '../../shared/baseService';
import { ventasRepository } from './ventasRepository';

class VentasService extends BaseService {
  async findAll() {
    return ventasRepository.findAll();
  }

  async findById(id: number) {
    const venta = await ventasRepository.findById(id);
    if (!venta) throw new Error('Venta not found');
    return venta;
  }

  async create(data: {
    numeroDocumento: string;
    clienteId: number;
    usuarioId: number;
    subtotal: number;
    iva: number;
    total: number;
    estado?: string;
    detalles: { productoId: number; cantidad: number; precioUnitario: number; subtotal: number }[];
  }) {
    this.validateEntity(data, ['numeroDocumento', 'clienteId', 'usuarioId', 'subtotal', 'iva', 'total', 'detalles']);
    const existing = await ventasRepository.findByNumeroDocumento(data.numeroDocumento);
    if (existing) throw new Error('Venta already exists with this document number');

    return ventasRepository.create({
      ...data,
      detalleVenta: {
        create: data.detalles,
      },
    });
  }

  async delete(id: number) {
    const venta = await this.findById(id);
    return ventasRepository.delete(id);
  }
}

export const ventasService = new VentasService();
