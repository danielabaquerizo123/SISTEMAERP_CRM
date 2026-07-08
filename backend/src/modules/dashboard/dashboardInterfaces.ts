export interface IGeneralMetrics {
  totalClientes: number;
  totalProveedores: number;
  totalProductos: number;
  totalVentas: number;
  totalCompras: number;
  ventasDelMes: number;
  comprasDelMes: number;
}

export interface ISalesMetrics {
  ventasPorDia: { fecha: string; total: number }[];
  ventasPorMes: { mes: string; total: number }[];
  topProductos: { producto: string; cantidad: number }[];
}

export interface IInventoryMetrics {
  stockBajo: number;
  productosSinStock: number;
  totalProductos: number;
  valorInventario: number;
}

export interface ICRMMetrics {
  ticketsAbiertos: number;
  oportunidadesActivas: number;
  conversiones: number;
  actividadesRecientes: number;
}
