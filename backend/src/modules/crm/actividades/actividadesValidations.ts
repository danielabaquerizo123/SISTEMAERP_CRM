import { z } from 'zod';

export const createActividadSchema = z.object({
  ticketId: z.number().int().optional(),
  oportunidadId: z.number().int().optional(),
  tipo: z.string().min(1),
  asunto: z.string().min(1),
  descripcion: z.string().optional(),
  fecha: z.string().optional(),
  usuarioId: z.number().int(),
});

export const updateActividadSchema = z.object({
  tipo: z.string().min(1).optional(),
  asunto: z.string().min(1).optional(),
  descripcion: z.string().optional(),
  fecha: z.string().optional(),
});
