export interface IReporteFiltros {
  fechaDesde?: string;
  fechaHasta?: string;
  clienteId?: number;
  proveedorId?: number;
  productoId?: number;
  estado?: string;
}

export interface IReporteResponse {
  data: unknown[];
  total: number;
  resumen: Record<string, unknown>;
}
