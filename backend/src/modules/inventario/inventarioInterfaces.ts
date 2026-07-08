export interface IInventario {
  id: number;
  productoId: number;
  cantidad: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface IMovimientoInventario {
  id: number;
  productoId: number;
  tipo: string;
  cantidad: number;
  motivo?: string | null;
  usuarioId: number;
  createdAt: Date;
}

export interface ICreateMovimientoInventario {
  productoId: number;
  tipo: 'ENTRADA' | 'SALIDA';
  cantidad: number;
  motivo?: string;
  usuarioId: number;
}
