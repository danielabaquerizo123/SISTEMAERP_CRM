import { BaseService } from '../../../shared/baseService';
import { ticketsRepository } from './ticketsRepository';

class TicketsService extends BaseService {
  private nextCodigo = 1;

  private async generateCodigo(): Promise<string> {
    const last = await this.findAll();
    const num = last.length + 1;
    return `TICKET-${String(num).padStart(6, '0')}`;
  }

  async findAll() {
    return ticketsRepository.findAll();
  }

  async findById(id: number) {
    const ticket = await ticketsRepository.findById(id);
    if (!ticket) throw new Error('Ticket not found');
    return ticket;
  }

  async create(data: {
    clienteId: number;
    usuarioId: number;
    asunto: string;
    descripcion?: string;
    estado?: string;
    prioridad?: string;
  }) {
    this.validateEntity(data, ['clienteId', 'usuarioId', 'asunto']);
    const codigo = await this.generateCodigo();
    return ticketsRepository.create({ ...data, codigo });
  }

  async update(id: number, data: Record<string, unknown>) {
    await this.findById(id);
    return ticketsRepository.update(id, data);
  }

  async delete(id: number) {
    await this.findById(id);
    return ticketsRepository.delete(id);
  }
}

export const ticketsService = new TicketsService();
