export interface IDetalleCompra {
  productoId: number;
  cantidad: number;
  precioUnitario: number;
  subtotal: number;
}

export interface ICompra {
  id: number;
  numeroDocumento: string;
  proveedorId: number;
  usuarioId: number;
  subtotal: number;
  iva: number;
  total: number;
  estado: string;
  createdAt: Date;
  updatedAt: Date;
  detalleCompra: IDetalleCompra[];
}

export interface ICreateCompra {
  numeroDocumento: string;
  proveedorId: number;
  usuarioId: number;
  subtotal: number;
  iva: number;
  total: number;
  estado?: string;
  detalles: IDetalleCompra[];
}
