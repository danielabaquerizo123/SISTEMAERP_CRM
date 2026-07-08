export interface IConfiguracionEmpresa {
  id: number;
  nombreEmpresa: string;
  ruc: string;
  direccion?: string | null;
  telefono?: string | null;
  email?: string | null;
  logo?: string | null;
  moneda: string;
  ivaPorcentaje: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface IUpdateConfiguracionEmpresa {
  nombreEmpresa?: string;
  ruc?: string;
  direccion?: string;
  telefono?: string;
  email?: string;
  logo?: string;
  moneda?: string;
  ivaPorcentaje?: number;
}
