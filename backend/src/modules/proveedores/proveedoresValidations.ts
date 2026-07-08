import { z } from 'zod';

export const createProveedorSchema = z.object({
  tipoDocumento: z.string().min(1),
  numeroDocumento: z.string().min(1),
  nombre: z.string().min(1),
  direccion: z.string().optional(),
  telefono: z.string().optional(),
  email: z.string().email().optional(),
});

export const updateProveedorSchema = z.object({
  tipoDocumento: z.string().min(1).optional(),
  numeroDocumento: z.string().min(1).optional(),
  nombre: z.string().min(1).optional(),
  direccion: z.string().optional(),
  telefono: z.string().optional(),
  email: z.string().email().optional(),
});
