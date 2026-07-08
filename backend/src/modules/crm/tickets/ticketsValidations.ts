import { z } from 'zod';

export const createTicketSchema = z.object({
  clienteId: z.number().int(),
  usuarioId: z.number().int(),
  asunto: z.string().min(1),
  descripcion: z.string().optional(),
  estado: z.string().optional(),
  prioridad: z.string().optional(),
});

export const updateTicketSchema = z.object({
  asunto: z.string().min(1).optional(),
  descripcion: z.string().optional(),
  estado: z.string().optional(),
  prioridad: z.string().optional(),
});
