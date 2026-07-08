import { BaseService } from '../../shared/baseService';
import { rolesRepository } from './rolesRepository';

class RolesService extends BaseService {
  async findAll() { return rolesRepository.findAll(); }

  async findById(id: number) {
    const role = await rolesRepository.findById(id);
    if (!role) throw new Error('Role not found');
    return role;
  }

  async create(data: { name: string; description?: string; permissions?: string }) {
    const existing = await rolesRepository.findByName(data.name);
    if (existing) throw new Error('Role already exists');
    return rolesRepository.create(data);
  }

  async update(id: number, data: Record<string, unknown>) {
    await this.findById(id);
    return rolesRepository.update(id, data);
  }

  async delete(id: number) {
    await this.findById(id);
    return rolesRepository.delete(id);
  }
}

export const rolesService = new RolesService();
