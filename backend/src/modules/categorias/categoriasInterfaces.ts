export interface ICategoria {
  id: number;
  nombre: string;
  descripcion?: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface ICreateCategoria {
  nombre: string;
  descripcion?: string;
}

export interface IUpdateCategoria {
  nombre?: string;
  descripcion?: string;
}
