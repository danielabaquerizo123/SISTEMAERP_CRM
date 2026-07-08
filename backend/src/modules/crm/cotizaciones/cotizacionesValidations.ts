import { z } from 'zod';

export const createCotizacionSchema = z.object({
  oportunidadId: z.number().int().optional(),
  clienteId: z.number().int(),
  usuarioId: z.number().int(),
  subtotal: z.number().positive(),
  iva: z.number().min(0),
  total: z.number().positive(),
  estado: z.string().optional(),
  validez: z.number().int().optional(),
  notas: z.string().optional(),
});

export const updateCotizacionSchema = z.object({
  subtotal: z.number().positive().optional(),
  iva: z.number().min(0).optional(),
  total: z.number().positive().optional(),
  estado: z.string().optional(),
  validez: z.number().int().optional(),
  notas: z.string().optional(),
});
