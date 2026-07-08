import { BaseService } from '../../shared/baseService';
import { IGeneralMetrics, ISalesMetrics, IInventoryMetrics, ICRMMetrics } from './dashboardInterfaces';

class DashboardService extends BaseService {
  async getGeneralMetrics(): Promise<IGeneralMetrics> {
    return {
      totalClientes: 0,
      totalProveedores: 0,
      totalProductos: 0,
      totalVentas: 0,
      totalCompras: 0,
      ventasDelMes: 0,
      comprasDelMes: 0,
    };
  }

  async getSalesMetrics(): Promise<ISalesMetrics> {
    return {
      ventasPorDia: [],
      ventasPorMes: [],
      topProductos: [],
    };
  }

  async getInventoryMetrics(): Promise<IInventoryMetrics> {
    return {
      stockBajo: 0,
      productosSinStock: 0,
      totalProductos: 0,
      valorInventario: 0,
    };
  }

  async getCRMMetrics(): Promise<ICRMMetrics> {
    return {
      ticketsAbiertos: 0,
      oportunidadesActivas: 0,
      conversiones: 0,
      actividadesRecientes: 0,
    };
  }
}

export const dashboardService = new DashboardService();
