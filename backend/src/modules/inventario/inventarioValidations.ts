import { z } from 'zod';

export const createMovimientoSchema = z.object({
  productoId: z.number().int(),
  tipo: z.enum(['ENTRADA', 'SALIDA']),
  cantidad: z.number().int().positive(),
  motivo: z.string().optional(),
  usuarioId: z.number().int(),
});
