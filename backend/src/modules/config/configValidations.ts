import { z } from 'zod';

export const updateConfigSchema = z.object({
  nombreEmpresa: z.string().min(1).optional(),
  ruc: z.string().min(1).optional(),
  direccion: z.string().optional(),
  telefono: z.string().optional(),
  email: z.string().email().optional(),
  logo: z.string().optional(),
  moneda: z.string().optional(),
  ivaPorcentaje: z.number().min(0).max(100).optional(),
});
