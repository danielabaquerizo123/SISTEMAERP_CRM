import { BaseService } from '../../shared/baseService';
import { usersRepository } from './usersRepository';

class UsersService extends BaseService {
  async findAll() {
    return usersRepository.findAll();
  }

  async findById(id: number) {
    const user = await usersRepository.findById(id);
    if (!user) throw new Error('User not found');
    return user;
  }

  async update(id: number, data: Record<string, unknown>) {
    await this.findById(id);
    return usersRepository.update(id, data);
  }

  async delete(id: number) {
    await this.findById(id);
    return usersRepository.delete(id);
  }
}

export const usersService = new UsersService();
