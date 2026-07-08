import { BaseService } from '../../shared/baseService';
import { facturacionRepository } from './facturacionRepository';

class FacturacionService extends BaseService {
  async findAll() {
    return facturacionRepository.findAll();
  }

  async findById(id: number) {
    const factura = await facturacionRepository.findById(id);
    if (!factura) throw new Error('Factura not found');
    return factura;
  }

  async generateFromVenta(data: {
    ventaId: number;
    numeroFactura: string;
    subtotal: number;
    iva: number;
    total: number;
    estado?: string;
  }) {
    this.validateEntity(data, ['ventaId', 'numeroFactura', 'subtotal', 'iva', 'total']);

    const existing = await facturacionRepository.findByNumeroFactura(data.numeroFactura);
    if (existing) throw new Error('Factura already exists with this number');

    const existingVentaFactura = await facturacionRepository.findByVentaId(data.ventaId);
    if (existingVentaFactura) throw new Error('This sale already has an invoice');

    return facturacionRepository.create(data);
  }

  async update(id: number, data: Record<string, unknown>) {
    await this.findById(id);
    return facturacionRepository.update(id, data);
  }

  async delete(id: number) {
    await this.findById(id);
    return facturacionRepository.delete(id);
  }
}

export const facturacionService = new FacturacionService();
