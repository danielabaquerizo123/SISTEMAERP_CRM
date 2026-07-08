export interface IClienteCRM {
  id: string;
  nombre: string;
  email: string;
  telefono: string;
  empresa: string;
  etapa: string;
  ultimoContacto: string;
  valorPotencial: number;
}

export interface IOportunidad {
  id: string;
  nombre: string;
  cliente: string;
  valor: number;
  etapa: 'nueva' | 'calificada' | 'propuesta' | 'negociacion' | 'cerrada_ganada' | 'cerrada_perdida';
  probabilidad: number;
  fechaCierre: string;
  responsable: string;
}

export interface ITicket {
  id: string;
  codigo: string;
  cliente: string;
  asunto: string;
  prioridad: 'baja' | 'media' | 'alta' | 'critica';
  estado: 'abierto' | 'en_progreso' | 'resuelto' | 'cerrado';
  fecha: string;
  responsable: string;
}

export interface IActividad {
  id: string;
  tipo: 'llamada' | 'reunion' | 'correo' | 'tarea';
  asunto: string;
  cliente: string;
  fecha: string;
  realizada: boolean;
}

export const clientesCRM: IClienteCRM[] = [
  { id: '1', nombre: 'Roberto García', email: 'rgarcia@empresa.com', telefono: '+593 9 8123 4567', empresa: 'Corporación Andina', etapa: 'Cliente', ultimoContacto: '2026-07-05', valorPotencial: 50000 },
  { id: '2', nombre: 'Laura Mendoza', email: 'lmendoza@techsol.com', telefono: '+593 9 9234 5678', empresa: 'TechSolutions', etapa: 'Prospecto', ultimoContacto: '2026-07-03', valorPotencial: 25000 },
  { id: '3', nombre: 'Carlos Ruiz', email: 'cruiz@importsur.ec', telefono: '+593 9 7345 6789', empresa: 'Importadora del Sur', etapa: 'Oportunidad', ultimoContacto: '2026-07-01', valorPotencial: 75000 },
  { id: '4', nombre: 'Ana Torres', email: 'atorres@distxyz.com', telefono: '+593 9 6456 7890', empresa: 'Distribuidora XYZ', etapa: 'Cliente', ultimoContacto: '2026-06-28', valorPotencial: 15000 },
  { id: '5', nombre: 'Pedro Sánchez', email: 'psanchez@gelider.ec', telefono: '+593 9 5567 8901', empresa: 'Grupo Líder', etapa: 'Lead', ultimoContacto: '2026-06-25', valorPotencial: 100000 },
];

export const oportunidadesMock: IOportunidad[] = [
  { id: '1', nombre: 'Implementación ERP Completo', cliente: 'Corporación Andina', valor: 45000, etapa: 'negociacion', probabilidad: 75, fechaCierre: '2026-08-15', responsable: 'Admin' },
  { id: '2', nombre: 'Renovación Licencias Software', cliente: 'TechSolutions', valor: 12000, etapa: 'propuesta', probabilidad: 60, fechaCierre: '2026-07-30', responsable: 'Admin' },
  { id: '3', nombre: 'Consultoría Transformación Digital', cliente: 'Importadora del Sur', valor: 28000, etapa: 'calificada', probabilidad: 40, fechaCierre: '2026-09-01', responsable: 'Admin' },
  { id: '4', nombre: 'Venta Equipos Cómputo 50 uds', cliente: 'Grupo Líder', valor: 35000, etapa: 'nueva', probabilidad: 20, fechaCierre: '2026-08-30', responsable: 'Admin' },
  { id: '5', nombre: 'Soporte Técnico Premium Anual', cliente: 'Distribuidora XYZ', valor: 6000, etapa: 'cerrada_ganada', probabilidad: 100, fechaCierre: '2026-07-01', responsable: 'Admin' },
];

export const ticketsMock: ITicket[] = [
  { id: '1', codigo: 'TKT-001', cliente: 'Corporación Andina', asunto: 'Error al generar factura electrónica', prioridad: 'alta', estado: 'abierto', fecha: '2026-07-05', responsable: 'Admin' },
  { id: '2', codigo: 'TKT-002', cliente: 'TechSolutions', asunto: 'Problema de conexión con API', prioridad: 'critica', estado: 'en_progreso', fecha: '2026-07-04', responsable: 'Admin' },
  { id: '3', codigo: 'TKT-003', cliente: 'Distribuidora XYZ', asunto: 'Actualización de datos de usuario', prioridad: 'baja', estado: 'resuelto', fecha: '2026-07-03', responsable: 'Admin' },
  { id: '4', codigo: 'TKT-004', cliente: 'Importadora del Sur', asunto: 'Solicitud de nuevo módulo CRM', prioridad: 'media', estado: 'abierto', fecha: '2026-07-02', responsable: 'Admin' },
  { id: '5', codigo: 'TKT-005', cliente: 'Grupo Líder', asunto: 'Capacitación de usuarios', prioridad: 'baja', estado: 'cerrado', fecha: '2026-06-30', responsable: 'Admin' },
];

export const actividadesMock: IActividad[] = [
  { id: '1', tipo: 'llamada', asunto: 'Seguimiento cotización ERP', cliente: 'Corporación Andina', fecha: '2026-07-05', realizada: true },
  { id: '2', tipo: 'reunion', asunto: 'Demo del sistema', cliente: 'Importadora del Sur', fecha: '2026-07-04', realizada: true },
  { id: '3', tipo: 'correo', asunto: 'Envío de propuesta comercial', cliente: 'TechSolutions', fecha: '2026-07-03', realizada: true },
  { id: '4', tipo: 'tarea', asunto: 'Preparar informe mensual', cliente: 'Interno', fecha: '2026-07-06', realizada: false },
  { id: '5', tipo: 'llamada', asunto: 'Soporte ticket TKT-002', cliente: 'TechSolutions', fecha: '2026-07-06', realizada: false },
];
