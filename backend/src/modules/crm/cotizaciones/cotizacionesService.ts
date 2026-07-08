import { BaseService } from '../../../shared/baseService';
import { cotizacionesRepository } from './cotizacionesRepository';

class CotizacionesService extends BaseService {
  private async generateNumeroCotizacion(): Promise<string> {
    const all = await this.findAll();
    const num = all.length + 1;
    return `COT-${String(num).padStart(6, '0')}`;
  }

  async findAll() {
    return cotizacionesRepository.findAll();
  }

  async findById(id: number) {
    const cotizacion = await cotizacionesRepository.findById(id);
    if (!cotizacion) throw new Error('Cotizacion not found');
    return cotizacion;
  }

  async create(data: {
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
    this.validateEntity(data, ['clienteId', 'usuarioId', 'subtotal', 'iva', 'total']);
    const numeroCotizacion = await this.generateNumeroCotizacion();
    return cotizacionesRepository.create({ ...data, numeroCotizacion });
  }

  async update(id: number, data: Record<string, unknown>) {
    await this.findById(id);
    return cotizacionesRepository.update(id, data);
  }

  async delete(id: number) {
    await this.findById(id);
    return cotizacionesRepository.delete(id);
  }
}

export const cotizacionesService = new CotizacionesService();
