import { BaseService } from '../../shared/baseService';
import { clientesRepository } from './clientesRepository';

class ClientesService extends BaseService {
  async findAll() {
    return clientesRepository.findAll();
  }

  async findById(id: number) {
    const cliente = await clientesRepository.findById(id);
    if (!cliente) throw new Error('Cliente not found');
    return cliente;
  }

  async findByDocumento(numeroDocumento: string) {
    return clientesRepository.findByDocumento(numeroDocumento);
  }

  async create(data: {
    tipoDocumento: string;
    numeroDocumento: string;
    nombre: string;
    direccion?: string;
    telefono?: string;
    email?: string;
    vendedorId?: number;
  }) {
    this.validateEntity(data, ['tipoDocumento', 'numeroDocumento', 'nombre']);
    const existing = await clientesRepository.findByDocumento(data.numeroDocumento);
    if (existing) throw new Error('Cliente already exists with this document number');
    return clientesRepository.create(data);
  }

  async update(id: number, data: Record<string, unknown>) {
    await this.findById(id);
    return clientesRepository.update(id, data);
  }

  async delete(id: number) {
    await this.findById(id);
    return clientesRepository.delete(id);
  }
}

export const clientesService = new ClientesService();
