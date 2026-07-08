export interface ICliente {
  id: string;
  tipoDocumento: string;
  numeroDocumento: string;
  nombre: string;
  direccion: string;
  telefono: string;
  email: string;
  estado: 'activo' | 'inactivo';
  fechaRegistro: string;
  totalCompras: number;
}

export const clientesMock: ICliente[] = [
  { id: '1', tipoDocumento: 'RUC', numeroDocumento: '1790012345001', nombre: 'Corporación Andina SA', direccion: 'Av. Amazonas 1234, Quito', telefono: '+593 2 234 5678', email: 'info@corpandina.com', estado: 'activo', fechaRegistro: '2025-03-15', totalCompras: 45890 },
  { id: '2', tipoDocumento: 'RUC', numeroDocumento: '1790098765001', nombre: 'TechSolutions EC', direccion: 'Calle Francisco de Orellana 567, Guayaquil', telefono: '+593 4 212 3456', email: 'ventas@techsolutions.ec', estado: 'activo', fechaRegistro: '2025-05-20', totalCompras: 23400 },
  { id: '3', tipoDocumento: 'CEDULA', numeroDocumento: '1712345678', nombre: 'María Fernanda López', direccion: 'Av. 6 de Diciembre 890, Quito', telefono: '+593 9 8765 4321', email: 'mafe.lopez@email.com', estado: 'activo', fechaRegistro: '2025-06-10', totalCompras: 8900 },
  { id: '4', tipoDocumento: 'RUC', numeroDocumento: '1790034567001', nombre: 'Importadora del Sur', direccion: 'Av. República 234, Cuenca', telefono: '+593 7 234 5678', email: 'compras@importsur.ec', estado: 'inactivo', fechaRegistro: '2025-01-05', totalCompras: 56700 },
  { id: '5', tipoDocumento: 'CEDULA', numeroDocumento: '1723456789', nombre: 'Carlos Andrés Mejía', direccion: 'Calle Larga 456, Loja', telefono: '+593 9 7654 3210', email: 'cmejia@outlook.com', estado: 'activo', fechaRegistro: '2025-07-22', totalCompras: 3400 },
  { id: '6', tipoDocumento: 'RUC', numeroDocumento: '1790056789001', nombre: 'Distribuidora XYZ Cía. Ltda.', direccion: 'Av. América 789, Ambato', telefono: '+593 3 245 6789', email: 'info@distxyz.com', estado: 'activo', fechaRegistro: '2025-08-01', totalCompras: 12300 },
  { id: '7', tipoDocumento: 'CEDULA', numeroDocumento: '1734567890', nombre: 'Ana Cecilia Torres', direccion: 'Calle Barcelona 321, Manta', telefono: '+593 9 6543 2109', email: 'anatorres@hotmail.com', estado: 'inactivo', fechaRegistro: '2025-02-14', totalCompras: 5600 },
  { id: '8', tipoDocumento: 'RUC', numeroDocumento: '1790078901001', nombre: 'Grupo Empresarial Líder', direccion: 'Av. Patria 456, Quito', telefono: '+593 2 256 7890', email: 'contacto@gelider.ec', estado: 'activo', fechaRegistro: '2025-09-10', totalCompras: 78900 },
];
