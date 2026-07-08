import { z } from 'zod';

const detalleVentaSchema = z.object({
  productoId: z.number().int(),
  cantidad: z.number().int().positive(),
  precioUnitario: z.number().positive(),
  subtotal: z.number().positive(),
});

export const createVentaSchema = z.object({
  numeroDocumento: z.string().min(1),
  clienteId: z.number().int(),
  usuarioId: z.number().int(),
  subtotal: z.number().positive(),
  iva: z.number().min(0),
  total: z.number().positive(),
  estado: z.string().optional(),
  detalles: z.array(detalleVentaSchema).min(1),
});
