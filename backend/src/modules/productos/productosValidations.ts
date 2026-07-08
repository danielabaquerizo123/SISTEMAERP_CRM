import { z } from 'zod';

export const createProductoSchema = z.object({
  codigo: z.string().min(1),
  nombre: z.string().min(1),
  descripcion: z.string().optional(),
  precioCompra: z.number().positive(),
  precioVenta: z.number().positive(),
  stockMinimo: z.number().int().min(0).optional(),
  categoriaId: z.number().int().optional(),
  proveedorId: z.number().int().optional(),
});

export const updateProductoSchema = z.object({
  codigo: z.string().min(1).optional(),
  nombre: z.string().min(1).optional(),
  descripcion: z.string().optional(),
  precioCompra: z.number().positive().optional(),
  precioVenta: z.number().positive().optional(),
  stockMinimo: z.number().int().min(0).optional(),
  categoriaId: z.number().int().optional(),
  proveedorId: z.number().int().optional(),
});
