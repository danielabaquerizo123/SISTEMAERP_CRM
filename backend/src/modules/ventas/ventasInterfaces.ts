export interface IDetalleVenta {
  productoId: number;
  cantidad: number;
  precioUnitario: number;
  subtotal: number;
}

export interface IVenta {
  id: number;
  numeroDocumento: string;
  clienteId: number;
  usuarioId: number;
  subtotal: number;
  iva: number;
  total: number;
  estado: string;
  createdAt: Date;
  updatedAt: Date;
  detalleVenta: IDetalleVenta[];
}

export interface ICreateVenta {
  numeroDocumento: string;
  clienteId: number;
  usuarioId: number;
  subtotal: number;
  iva: number;
  total: number;
  estado?: string;
  detalles: IDetalleVenta[];
}
