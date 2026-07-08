import { z } from 'zod';

export const createCategoriaSchema = z.object({
  nombre: z.string().min(1),
  descripcion: z.string().optional(),
});

export const updateCategoriaSchema = z.object({
  nombre: z.string().min(1).optional(),
  descripcion: z.string().optional(),
});
