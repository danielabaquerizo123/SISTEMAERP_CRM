export interface IFactura {
  id: number;
  ventaId: number;
  numeroFactura: string;
  fechaEmision: Date;
  subtotal: number;
  iva: number;
  total: number;
  estado: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ICreateFactura {
  ventaId: number;
  numeroFactura: string;
  subtotal: number;
  iva: number;
  total: number;
  estado?: string;
}
