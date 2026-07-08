import { z } from 'zod';

export const createUserSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  name: z.string().min(1),
  lastName: z.string().min(1),
  roleId: z.number().int(),
});

export const updateUserSchema = z.object({
  email: z.string().email().optional(),
  name: z.string().min(1).optional(),
  lastName: z.string().min(1).optional(),
  roleId: z.number().int().optional(),
  isActive: z.boolean().optional(),
});
