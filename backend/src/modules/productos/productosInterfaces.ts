export interface IProducto {
  id: number;
  codigo: string;
  nombre: string;
  descripcion?: string | null;
  precioCompra: number;
  precioVenta: number;
  stockMinimo: number;
  categoriaId?: number | null;
  proveedorId?: number | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface ICreateProducto {
  codigo: string;
  nombre: string;
  descripcion?: string;
  precioCompra: number;
  precioVenta: number;
  stockMinimo?: number;
  categoriaId?: number;
  proveedorId?: number;
}

export interface IUpdateProducto {
  codigo?: string;
  nombre?: string;
  descripcion?: string;
  precioCompra?: number;
  precioVenta?: number;
  stockMinimo?: number;
  categoriaId?: number;
  proveedorId?: number;
}
