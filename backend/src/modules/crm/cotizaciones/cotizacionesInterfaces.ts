export interface ICotizacion {
  id: number;
  numeroCotizacion: string;
  oportunidadId?: number | null;
  clienteId: number;
  usuarioId: number;
  subtotal: number;
  iva: number;
  total: number;
  estado: string;
  validez?: number | null;
  notas?: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface ICreateCotizacion {
  oportunidadId?: number;
  clienteId: number;
  usuarioId: number;
  subtotal: number;
  iva: number;
  total: number;
  estado?: string;
  validez?: number;
  notas?: string;
}

export interface IUpdateCotizacion {
  subtotal?: number;
  iva?: number;
  total?: number;
  estado?: string;
  validez?: number;
  notas?: string;
}
