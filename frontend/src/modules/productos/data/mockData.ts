export interface IProducto {
  id: string;
  codigo: string;
  nombre: string;
  descripcion: string;
  categoria: string;
  precioCompra: number;
  precioVenta: number;
  stock: number;
  stockMinimo: number;
  estado: 'activo' | 'inactivo';
  imagen?: string;
}

export const productosMock: IProducto[] = [
  { id: '1', codigo: 'PRO-001', nombre: 'Laptop Pro X1 16"', descripcion: 'Laptop profesional 16GB RAM, 512GB SSD', categoria: 'Electrónicos', precioCompra: 1800, precioVenta: 2499.99, stock: 15, stockMinimo: 5, estado: 'activo' },
  { id: '2', codigo: 'PRO-002', nombre: 'Monitor 27" 4K UHD', descripcion: 'Monitor IPS 27 pulgadas 4K', categoria: 'Electrónicos', precioCompra: 550, precioVenta: 899.99, stock: 3, stockMinimo: 5, estado: 'activo' },
  { id: '3', codigo: 'PRO-003', nombre: 'Teclado Mecánico RGB', descripcion: 'Teclado mecánico switches Cherry MX', categoria: 'Periféricos', precioCompra: 85, precioVenta: 159.99, stock: 2, stockMinimo: 10, estado: 'activo' },
  { id: '4', codigo: 'PRO-004', nombre: 'Mouse Inalámbrico Pro', descripcion: 'Mouse ergonómico inalámbrico 8000 DPI', categoria: 'Periféricos', precioCompra: 45, precioVenta: 79.99, stock: 25, stockMinimo: 10, estado: 'activo' },
  { id: '5', codigo: 'PRO-005', nombre: 'Webcam HD Pro 1080p', descripcion: 'Cámara web 1080p con micrófono', categoria: 'Electrónicos', precioCompra: 110, precioVenta: 199.99, stock: 1, stockMinimo: 8, estado: 'activo' },
  { id: '6', codigo: 'PRO-006', nombre: 'Hub USB-C 7 Puertos', descripcion: 'Hub multipuerto USB-C con HDMI', categoria: 'Accesorios', precioCompra: 25, precioVenta: 49.99, stock: 4, stockMinimo: 15, estado: 'activo' },
  { id: '7', codigo: 'PRO-007', nombre: 'Audífonos Bluetooth ANC', descripcion: 'Audífonos con cancelación de ruido', categoria: 'Audio', precioCompra: 120, precioVenta: 229.99, stock: 18, stockMinimo: 5, estado: 'activo' },
  { id: '8', codigo: 'PRO-008', nombre: 'Cable HDMI 2.1 3m', descripcion: 'Cable HDMI 2.1 de alta velocidad', categoria: 'Accesorios', precioCompra: 8, precioVenta: 19.99, stock: 50, stockMinimo: 20, estado: 'activo' },
];
