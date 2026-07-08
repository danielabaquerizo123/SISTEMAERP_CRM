import { BaseService } from '../../shared/baseService';
import { categoriasRepository } from './categoriasRepository';

class CategoriasService extends BaseService {
  async findAll() {
    return categoriasRepository.findAll();
  }

  async findById(id: number) {
    const categoria = await categoriasRepository.findById(id);
    if (!categoria) throw new Error('Categoria not found');
    return categoria;
  }

  async create(data: { nombre: string; descripcion?: string }) {
    this.validateEntity(data, ['nombre']);
    const existing = await categoriasRepository.findByNombre(data.nombre);
    if (existing) throw new Error('Categoria already exists');
    return categoriasRepository.create(data);
  }

  async update(id: number, data: Record<string, unknown>) {
    await this.findById(id);
    return categoriasRepository.update(id, data);
  }

  async delete(id: number) {
    await this.findById(id);
    return categoriasRepository.delete(id);
  }
}

export const categoriasService = new CategoriasService();
