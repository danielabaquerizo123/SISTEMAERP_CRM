export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar?: string;
  sucursal?: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
}

export interface Product {
  id: string;
  codigo: string;
  nombre: string;
  categoria: string;
  precioCompra: number;
  precioVenta: number;
  stock: number;
  stockMinimo: number;
  unidad: string;
  sucursal: string;
  estado: 'activo' | 'inactivo' | 'agotado';
  createdAt: string;
}

export interface Categoria {
  id: string;
  nombre: string;
  descripcion: string;
  productos: number;
  estado: 'activo' | 'inactivo';
}

export interface InventarioItem {
  id: string;
  producto: string;
  codigo: string;
  categoria: string;
  stockActual: number;
  stockMinimo: number;
  stockMaximo: number;
  ubicacion: string;
  sucursal: string;
  estado: 'normal' | 'bajo' | 'critico' | 'exceso';
  ultimoMovimiento: string;
}

export interface Movimiento {
  id: string;
  tipo: 'entrada' | 'salida' | 'transferencia' | 'ajuste';
  producto: string;
  codigo: string;
  cantidad: number;
  origen?: string;
  destino?: string;
  motivo: string;
  usuario: string;
  fecha: string;
  sucursal: string;
}

export interface Venta {
  id: string;
  numero: string;
  cliente: string;
  identificacion: string;
  fecha: string;
  items: number;
  subtotal: number;
  impuesto: number;
  total: number;
  metodoPago: string;
  sucursal: string;
  estado: 'completada' | 'pendiente' | 'anulada' | 'devuelta';
}

export interface Compra {
  id: string;
  numero: string;
  proveedor: string;
  ruc: string;
  fecha: string;
  items: number;
  subtotal: number;
  impuesto: number;
  total: number;
  metodoPago: string;
  sucursal: string;
  estado: 'recibida' | 'pendiente' | 'anulada';
}

export interface OrdenCompra {
  id: string;
  numero: string;
  proveedor: string;
  fechaEmision: string;
  fechaEntrega: string;
  items: number;
  total: number;
  sucursal: string;
  estado: 'pendiente' | 'aprobada' | 'enviada' | 'recibida' | 'cancelada';
}

export interface Proveedor {
  id: string;
  ruc: string;
  nombre: string;
  contacto: string;
  telefono: string;
  email: string;
  direccion: string;
  ciudad: string;
  categoria: string;
  estado: 'activo' | 'inactivo';
  productos: number;
}

export interface Factura {
  id: string;
  numero: string;
  tipo: 'factura' | 'boleta' | 'nota-credito' | 'nota-debito';
  cliente: string;
  identificacion: string;
  fechaEmision: string;
  fechaVencimiento: string;
  subtotal: number;
  impuesto: number;
  total: number;
  estado: 'emitida' | 'pagada' | 'vencida' | 'anulada';
  sucursal: string;
}

export interface Sucursal {
  id: string;
  nombre: string;
  direccion: string;
  ciudad: string;
  provincia: string;
  telefono: string;
  encargado: string;
  tipo: 'sucursal' | 'centro-distribucion' | 'bodega';
  estado: 'activo' | 'inactivo';
  empleados: number;
}

export interface Cliente {
  id: string;
  identificacion: string;
  nombre: string;
  email: string;
  telefono: string;
  direccion: string;
  ciudad: string;
  provincia: string;
  tipo: 'natural' | 'juridico';
  categoria: string;
  credito: number;
  estado: 'activo' | 'inactivo';
  compras: number;
  ultimaCompra: string;
}

export interface SeguimientoCliente {
  id: string;
  cliente: string;
  tipo: 'llamada' | 'correo' | 'visita' | 'whatsapp';
  fecha: string;
  motivo: string;
  resultado: string;
  usuario: string;
  proximoContacto: string;
}

export interface Fidelizacion {
  id: string;
  cliente: string;
  puntos: number;
  nivel: 'bronce' | 'plata' | 'oro' | 'platino';
  ingresos: number;
  ultimaVisita: string;
  membresia: string;
}

export interface Ticket {
  id: string;
  numero: string;
  cliente: string;
  asunto: string;
  categoria: string;
  prioridad: 'baja' | 'media' | 'alta' | 'critica';
  fecha: string;
  usuario: string;
  estado: 'abierto' | 'en_proceso' | 'pendiente' | 'resuelto' | 'cerrado';
  ultimaActualizacion: string;
}

export interface Reclamo {
  id: string;
  numero: string;
  cliente: string;
  tipo: 'queja' | 'reclamo' | 'devolucion' | 'garantia';
  fecha: string;
  descripcion: string;
  prioridad: 'baja' | 'media' | 'alta' | 'critica';
  producto?: string;
  monto: number;
  usuario: string;
  estado: 'abierto' | 'en_proceso' | 'resuelto' | 'rechazado';
  resolucion?: string;
}

export interface Campaña {
  id: string;
  nombre: string;
  tipo: 'email' | 'sms' | 'redes' | 'evento' | 'promocion';
  fechaInicio: string;
  fechaFin: string;
  audiencia: number;
  presupuesto: number;
  costoReal: number;
  resultados: number;
  estado: 'planificada' | 'activa' | 'pausada' | 'finalizada' | 'cancelada';
  sucursal: string;
}

export interface CRMReport {
  metricas: {
    totalClientes: number;
    nuevosClientes: number;
    clientesActivos: number;
    clientesPerdidos: number;
    tasaRetencion: number;
    satisfaccion: number;
    ticketsAbiertos: number;
    reclamosPendientes: number;
  };
  ventasPorCliente: { cliente: string; total: number; tendencia: number }[];
  estadoTickets: { estado: string; cantidad: number }[];
  satisfaccionMensual: { mes: string; valor: number }[];
}

export interface Role {
  id: string;
  nombre: string;
  descripcion: string;
  usuarios: number;
  permisos: string[];
  estado: 'activo' | 'inactivo';
}

export interface AppConfig {
  id: string;
  grupo: string;
  clave: string;
  valor: string;
  descripcion: string;
}

export interface DashboardMetrics {
  ventasDia: { valor: number; cambio: number };
  ventasMes: { valor: number; cambio: number };
  comprasPendientes: { valor: number; cambio: number };
  inventarioCritico: { valor: number; cambio: number };
  productosAgotados: { valor: number; cambio: number };
  clientesRegistrados: { valor: number; cambio: number };
  clientesAtendidos: { valor: number; cambio: number };
  reclamosAbiertos: { valor: number; cambio: number };
  ordenesPendientes: { valor: number; cambio: number };
  proveedoresActivos: { valor: number; cambio: number };
  sucursales: { valor: number; cambio: number };
  centrosDistribucion: { valor: number; cambio: number };
}

export interface VentasPorSucursal {
  sucursal: string;
  ventas: number;
  meta: number;
  crecimiento: number;
}

export interface VentasPorCategoria {
  categoria: string;
  ventas: number;
  porcentaje: number;
  crecimiento: number;
}

export interface TopProducto {
  producto: string;
  codigo: string;
  vendidos: number;
  ingresos: number;
  stock: number;
  crecimiento: number;
}

export interface TopCliente {
  cliente: string;
  identificacion: string;
  compras: number;
  total: number;
  ultimaCompra: string;
  tendencia: number;
}

export interface DashboardCharts {
  ventasSucursales: VentasPorSucursal[];
  ventasCategoria: VentasPorCategoria[];
  ventasProvincia: { provincia: string; ventas: number }[];
  inventarioCategoria: { categoria: string; total: number; minimo: number }[];
  comprasProveedor: { proveedor: string; total: number; pendientes: number }[];
  topProductos: TopProducto[];
  topClientes: TopCliente[];
  estadoTickets: { estado: string; cantidad: number }[];
  satisfaccion: { mes: string; valor: number }[];
  actividadReciente: Actividad[];
}

export interface Actividad {
  id: string;
  tipo: 'venta' | 'compra' | 'ticket' | 'reclamo' | 'cliente' | 'inventario';
  descripcion: string;
  usuario: string;
  fecha: string;
  hora: string;
  sucursal: string;
}

export interface ReporteErp {
  ingresos: number[];
  gastos: number[];
  meses: string[];
  ventasSucursal: { sucursal: string; ventas: number; meta: number }[];
  topProductos: { nombre: string; cantidad: number; ingresos: number }[];
  eficienciaInventario: { categoria: string; rotacion: number; diasStock: number }[];
  resumen: {
    ingresosTotales: number;
    gastosTotales: number;
    margen: number;
    ordenesPendientes: number;
    proveedoresActivos: number;
    productosBajoStock: number;
  };
}
