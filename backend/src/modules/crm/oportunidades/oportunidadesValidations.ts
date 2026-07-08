import { z } from 'zod';

export const createOportunidadSchema = z.object({
  clienteId: z.number().int(),
  usuarioId: z.number().int(),
  nombre: z.string().min(1),
  descripcion: z.string().optional(),
  valorEstimado: z.number().positive(),
  etapa: z.string().optional(),
  probabilidad: z.number().int().min(0).max(100).optional(),
  fechaCierre: z.string().optional(),
});

export const updateOportunidadSchema = z.object({
  nombre: z.string().min(1).optional(),
  descripcion: z.string().optional(),
  valorEstimado: z.number().positive().optional(),
  etapa: z.string().optional(),
  probabilidad: z.number().int().min(0).max(100).optional(),
  fechaCierre: z.string().optional(),
});
