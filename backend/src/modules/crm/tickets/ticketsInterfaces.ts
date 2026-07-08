export interface ITicketCRM {
  id: number;
  codigo: string;
  clienteId: number;
  usuarioId: number;
  asunto: string;
  descripcion?: string | null;
  estado: string;
  prioridad: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ICreateTicketCRM {
  clienteId: number;
  usuarioId: number;
  asunto: string;
  descripcion?: string;
  estado?: string;
  prioridad?: string;
}

export interface IUpdateTicketCRM {
  asunto?: string;
  descripcion?: string;
  estado?: string;
  prioridad?: string;
}
