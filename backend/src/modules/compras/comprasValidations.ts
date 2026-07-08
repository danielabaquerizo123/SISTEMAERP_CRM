import { z } from 'zod';

const detalleCompraSchema = z.object({
  productoId: z.number().int(),
  cantidad: z.number().int().positive(),
  precioUnitario: z.number().positive(),
  subtotal: z.number().positive(),
});

export const createCompraSchema = z.object({
  numeroDocumento: z.string().min(1),
  proveedorId: z.number().int(),
  usuarioId: z.number().int(),
  subtotal: z.number().positive(),
  iva: z.number().min(0),
  total: z.number().positive(),
  estado: z.string().optional(),
  detalles: z.array(detalleCompraSchema).min(1),
});
