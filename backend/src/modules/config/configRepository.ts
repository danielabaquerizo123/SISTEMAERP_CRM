import { BaseRepository } from '../../shared/baseRepository';

class ConfigRepository extends BaseRepository {
  async getConfig() {
    let config = await this.prisma.configuracionEmpresa.findFirst();
    if (!config) {
      config = await this.prisma.configuracionEmpresa.create({
        data: {
          nombreEmpresa: 'Mi Empresa',
          ruc: '0000000000000',
          moneda: 'USD',
          ivaPorcentaje: 15.0,
        },
      });
    }
    return config;
  }

  updateConfig(data: Record<string, unknown>) {
    return this.prisma.configuracionEmpresa.updateMany({ data });
  }
}

export const configRepository = new ConfigRepository();
