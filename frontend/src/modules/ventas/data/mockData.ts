export interface IVenta {
  id: string;
  numeroDocumento: string;
  cliente: string;
  fecha: string;
  subtotal: number;
  iva: number;
  total: number;
  estado: 'completado' | 'pendiente' | 'cancelado';
  metodoPago: string;
  items: number;
}

export const ventasMock: IVenta[] = [
  { id: '1', numeroDocumento: 'FACT-001', cliente: 'Corporación Andina SA', fecha: '2026-07-05', subtotal: 2200, iva: 330, total: 2530, estado: 'completado', metodoPago: 'Transferencia', items: 3 },
  { id: '2', numeroDocumento: 'FACT-002', cliente: 'TechSolutions EC', fecha: '2026-07-05', subtotal: 800, iva: 120, total: 920, estado: 'completado', metodoPago: 'Tarjeta', items: 2 },
  { id: '3', numeroDocumento: 'FACT-003', cliente: 'Importadora del Sur', fecha: '2026-07-04', subtotal: 150, iva: 22.5, total: 172.5, estado: 'pendiente', metodoPago: 'Efectivo', items: 1 },
  { id: '4', numeroDocumento: 'FACT-004', cliente: 'Distribuidora XYZ', fecha: '2026-07-04', subtotal: 75, iva: 11.25, total: 86.25, estado: 'completado', metodoPago: 'Transferencia', items: 1 },
  { id: '5', numeroDocumento: 'FACT-005', cliente: 'Grupo Empresarial Líder', fecha: '2026-07-03', subtotal: 180, iva: 27, total: 207, estado: 'cancelado', metodoPago: 'Tarjeta', items: 1 },
  { id: '6', numeroDocumento: 'FACT-006', cliente: 'María Fernanda López', fecha: '2026-07-03', subtotal: 3200, iva: 480, total: 3680, estado: 'completado', metodoPago: 'Transferencia', items: 5 },
  { id: '7', numeroDocumento: 'FACT-007', cliente: 'Distribuidora XYZ', fecha: '2026-07-02', subtotal: 450, iva: 67.5, total: 517.5, estado: 'pendiente', metodoPago: 'Efectivo', items: 2 },
];
