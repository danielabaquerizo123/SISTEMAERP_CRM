import { BaseService } from '../../shared/baseService';
import { configRepository } from './configRepository';

class ConfigService extends BaseService {
  async getConfig() {
    return configRepository.getConfig();
  }

  async updateConfig(data: Record<string, unknown>) {
    await configRepository.updateConfig(data);
    return configRepository.getConfig();
  }
}

export const configService = new ConfigService();
