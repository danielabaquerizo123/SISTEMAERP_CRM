import { BaseService } from '../../../shared/baseService';
import { actividadesRepository } from './actividadesRepository';

class ActividadesService extends BaseService {
  async findAll() {
    return actividadesRepository.findAll();
  }

  async findById(id: number) {
    const actividad = await actividadesRepository.findById(id);
    if (!actividad) throw new Error('Actividad not found');
    return actividad;
  }

  async findByTicketId(ticketId: number) {
    return actividadesRepository.findByTicketId(ticketId);
  }

  async findByOportunidadId(oportunidadId: number) {
    return actividadesRepository.findByOportunidadId(oportunidadId);
  }

  async create(data: {
    ticketId?: number;
    oportunidadId?: number;
    tipo: string;
    asunto: string;
    descripcion?: string;
    fecha?: string;
    usuarioId: number;
  }) {
    this.validateEntity(data, ['tipo', 'asunto', 'usuarioId']);
    const createData: any = { ...data };
    if (data.fecha) {
      createData.fecha = new Date(data.fecha);
    }
    return actividadesRepository.create(createData);
  }

  async update(id: number, data: Record<string, unknown>) {
    await this.findById(id);
    const updateData: any = { ...data };
    if (data.fecha && typeof data.fecha === 'string') {
      updateData.fecha = new Date(data.fecha);
    }
    return actividadesRepository.update(id, updateData);
  }

  async delete(id: number) {
    await this.findById(id);
    return actividadesRepository.delete(id);
  }
}

export const actividadesService = new ActividadesService();
