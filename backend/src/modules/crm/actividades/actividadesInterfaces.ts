export interface IActividadCRM {
  id: number;
  ticketId?: number | null;
  oportunidadId?: number | null;
  tipo: string;
  asunto: string;
  descripcion?: string | null;
  fecha: Date;
  usuarioId: number;
  createdAt: Date;
}

export interface ICreateActividadCRM {
  ticketId?: number;
  oportunidadId?: number;
  tipo: string;
  asunto: string;
  descripcion?: string;
  fecha?: string;
  usuarioId: number;
}

export interface IUpdateActividadCRM {
  tipo?: string;
  asunto?: string;
  descripcion?: string;
  fecha?: string;
}
