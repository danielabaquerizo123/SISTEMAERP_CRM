import { z } from 'zod';

export const createFacturaSchema = z.object({
  ventaId: z.number().int(),
  numeroFactura: z.string().min(1),
  subtotal: z.number().positive(),
  iva: z.number().min(0),
  total: z.number().positive(),
  estado: z.string().optional(),
});
