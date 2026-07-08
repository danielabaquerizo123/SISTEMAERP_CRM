export interface IMovimiento {
  id: string;
  fecha: string;
  producto: string;
  tipo: 'entrada' | 'salida';
  cantidad: number;
  motivo: string;
  usuario: string;
}

export const movimientosMock: IMovimiento[] = [
  { id: '1', fecha: '2026-07-05', producto: 'Laptop Pro X1', tipo: 'entrada', cantidad: 10, motivo: 'Compra #C-001', usuario: 'Admin' },
  { id: '2', fecha: '2026-07-04', producto: 'Monitor 27" 4K', tipo: 'salida', cantidad: 2, motivo: 'Venta #FACT-002', usuario: 'Admin' },
  { id: '3', fecha: '2026-07-03', producto: 'Teclado Mecánico RGB', tipo: 'entrada', cantidad: 20, motivo: 'Compra #C-002', usuario: 'Admin' },
  { id: '4', fecha: '2026-07-02', producto: 'Mouse Inalámbrico Pro', tipo: 'salida', cantidad: 5, motivo: 'Venta #FACT-004', usuario: 'Admin' },
  { id: '5', fecha: '2026-07-01', producto: 'Webcam HD Pro 1080p', tipo: 'salida', cantidad: 1, motivo: 'Venta #FACT-005', usuario: 'Admin' },
  { id: '6', fecha: '2026-06-30', producto: 'Hub USB-C 7 Puertos', tipo: 'entrada', cantidad: 15, motivo: 'Compra #C-003', usuario: 'Admin' },
  { id: '7', fecha: '2026-06-29', producto: 'Cable HDMI 2.1 3m', tipo: 'entrada', cantidad: 50, motivo: 'Compra #C-004', usuario: 'Admin' },
  { id: '8', fecha: '2026-06-28', producto: 'Audífonos Bluetooth ANC', tipo: 'salida', cantidad: 3, motivo: 'Venta #FACT-008', usuario: 'Admin' },
];
