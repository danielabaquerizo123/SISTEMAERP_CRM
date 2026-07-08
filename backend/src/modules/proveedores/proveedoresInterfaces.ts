export interface IProveedor {
  id: number;
  tipoDocumento: string;
  numeroDocumento: string;
  nombre: string;
  direccion?: string | null;
  telefono?: string | null;
  email?: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface ICreateProveedor {
  tipoDocumento: string;
  numeroDocumento: string;
  nombre: string;
  direccion?: string;
  telefono?: string;
  email?: string;
}

export interface IUpdateProveedor {
  tipoDocumento?: string;
  numeroDocumento?: string;
  nombre?: string;
  direccion?: string;
  telefono?: string;
  email?: string;
}
