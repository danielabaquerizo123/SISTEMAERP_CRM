import { BaseService } from '../../../shared/baseService';
import { oportunidadesRepository } from './oportunidadesRepository';

class OportunidadesService extends BaseService {
  async findAll() {
    return oportunidadesRepository.findAll();
  }

  async findById(id: number) {
    const oportunidad = await oportunidadesRepository.findById(id);
    if (!oportunidad) throw new Error('Oportunidad not found');
    return oportunidad;
  }

  async create(data: {
    clienteId: number;
    usuarioId: number;
    nombre: string;
    descripcion?: string;
    valorEstimado: number;
    etapa?: string;
    probabilidad?: number;
    fechaCierre?: string;
  }) {
    this.validateEntity(data, ['clienteId', 'usuarioId', 'nombre', 'valorEstimado']);
    const createData: any = { ...data };
    if (data.fechaCierre) {
      createData.fechaCierre = new Date(data.fechaCierre);
    }
    return oportunidadesRepository.create(createData);
  }

  async update(id: number, data: Record<string, unknown>) {
    await this.findById(id);
    const updateData: any = { ...data };
    if (data.fechaCierre && typeof data.fechaCierre === 'string') {
      updateData.fechaCierre = new Date(data.fechaCierre);
    }
    return oportunidadesRepository.update(id, updateData);
  }

  async delete(id: number) {
    await this.findById(id);
    return oportunidadesRepository.delete(id);
  }
}

export const oportunidadesService = new OportunidadesService();
