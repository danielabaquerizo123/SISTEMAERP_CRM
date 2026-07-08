export interface ICompra {
  id: string;
  numeroDocumento: string;
  proveedor: string;
  fecha: string;
  subtotal: number;
  iva: number;
  total: number;
  estado: 'pendiente' | 'recibida' | 'cancelada';
  items: number;
}

export interface IProveedor {
  id: string;
  nombre: string;
  contacto: string;
  telefono: string;
  email: string;
  tipo: string;
  estado: 'activo' | 'inactivo';
}

export const comprasMock: ICompra[] = [
  { id: '1', numeroDocumento: 'C-001', proveedor: 'TechDistribuidora SA', fecha: '2026-07-05', subtotal: 4500, iva: 675, total: 5175, estado: 'recibida', items: 15 },
  { id: '2', numeroDocumento: 'C-002', proveedor: 'ImportExport Global', fecha: '2026-07-03', subtotal: 3200, iva: 480, total: 3680, estado: 'pendiente', items: 8 },
  { id: '3', numeroDocumento: 'C-003', proveedor: 'Proveedor Nacional Cía.', fecha: '2026-06-28', subtotal: 1800, iva: 270, total: 2070, estado: 'recibida', items: 5 },
  { id: '4', numeroDocumento: 'C-004', proveedor: 'Suministros EC', fecha: '2026-06-25', subtotal: 5600, iva: 840, total: 6440, estado: 'cancelada', items: 20 },
  { id: '5', numeroDocumento: 'C-005', proveedor: 'TechDistribuidora SA', fecha: '2026-06-20', subtotal: 2900, iva: 435, total: 3335, estado: 'recibida', items: 10 },
];

export const proveedoresMock: IProveedor[] = [
  { id: '1', nombre: 'TechDistribuidora SA', contacto: 'Roberto García', telefono: '+593 2 234 1111', email: 'ventas@techdist.ec', tipo: 'Tecnología', estado: 'activo' },
  { id: '2', nombre: 'ImportExport Global', contacto: 'Laura Mendoza', telefono: '+593 4 212 2222', email: 'info@importexport.com', tipo: 'Importadora', estado: 'activo' },
  { id: '3', nombre: 'Proveedor Nacional Cía.', contacto: 'Pedro Sánchez', telefono: '+593 3 245 3333', email: 'pedro@prouveedor.ec', tipo: 'General', estado: 'activo' },
  { id: '4', nombre: 'Suministros EC', contacto: 'Carmen Ruiz', telefono: '+593 7 234 4444', email: 'carmen@sumentos.ec', tipo: 'Suministros', estado: 'inactivo' },
];
