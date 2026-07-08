import { BaseService } from '../../shared/baseService';
import { proveedoresRepository } from './proveedoresRepository';

class ProveedoresService extends BaseService {
  async findAll() {
    return proveedoresRepository.findAll();
  }

  async findById(id: number) {
    const proveedor = await proveedoresRepository.findById(id);
    if (!proveedor) throw new Error('Proveedor not found');
    return proveedor;
  }

  async findByDocumento(numeroDocumento: string) {
    return proveedoresRepository.findByDocumento(numeroDocumento);
  }

  async create(data: {
    tipoDocumento: string;
    numeroDocumento: string;
    nombre: string;
    direccion?: string;
    telefono?: string;
    email?: string;
  }) {
    this.validateEntity(data, ['tipoDocumento', 'numeroDocumento', 'nombre']);
    const existing = await proveedoresRepository.findByDocumento(data.numeroDocumento);
    if (existing) throw new Error('Proveedor already exists with this document number');
    return proveedoresRepository.create(data);
  }

  async update(id: number, data: Record<string, unknown>) {
    await this.findById(id);
    return proveedoresRepository.update(id, data);
  }

  async delete(id: number) {
    await this.findById(id);
    return proveedoresRepository.delete(id);
  }
}

export const proveedoresService = new ProveedoresService();
