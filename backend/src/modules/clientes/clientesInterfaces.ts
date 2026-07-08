export interface ICliente {
  id: number;
  tipoDocumento: string;
  numeroDocumento: string;
  nombre: string;
  direccion?: string | null;
  telefono?: string | null;
  email?: string | null;
  vendedorId?: number | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface ICreateCliente {
  tipoDocumento: string;
  numeroDocumento: string;
  nombre: string;
  direccion?: string;
  telefono?: string;
  email?: string;
  vendedorId?: number;
}

export interface IUpdateCliente {
  tipoDocumento?: string;
  numeroDocumento?: string;
  nombre?: string;
  direccion?: string;
  telefono?: string;
  email?: string;
  vendedorId?: number;
}
