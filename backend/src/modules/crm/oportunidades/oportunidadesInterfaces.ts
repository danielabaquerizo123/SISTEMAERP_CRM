export interface IOportunidadCRM {
  id: number;
  clienteId: number;
  usuarioId: number;
  nombre: string;
  descripcion?: string | null;
  valorEstimado: number;
  etapa: string;
  probabilidad: number;
  fechaCierre?: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface ICreateOportunidadCRM {
  clienteId: number;
  usuarioId: number;
  nombre: string;
  descripcion?: string;
  valorEstimado: number;
  etapa?: string;
  probabilidad?: number;
  fechaCierre?: string;
}

export interface IUpdateOportunidadCRM {
  nombre?: string;
  descripcion?: string;
  valorEstimado?: number;
  etapa?: string;
  probabilidad?: number;
  fechaCierre?: string;
}
