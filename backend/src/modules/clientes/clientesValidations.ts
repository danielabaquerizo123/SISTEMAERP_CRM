import { z } from 'zod';

export const createClienteSchema = z.object({
  tipoDocumento: z.string().min(1),
  numeroDocumento: z.string().min(1),
  nombre: z.string().min(1),
  direccion: z.string().optional(),
  telefono: z.string().optional(),
  email: z.string().email().optional(),
  vendedorId: z.number().int().optional(),
});

export const updateClienteSchema = z.object({
  tipoDocumento: z.string().min(1).optional(),
  numeroDocumento: z.string().min(1).optional(),
  nombre: z.string().min(1).optional(),
  direccion: z.string().optional(),
  telefono: z.string().optional(),
  email: z.string().email().optional(),
  vendedorId: z.number().int().optional(),
});
