import { z } from 'zod';

export const productSchema = z.object({
  title: z.string().min(2),
  description: z.string().min(10),
  price: z.number().positive(),
  inventory: z.number().int().nonnegative(),
  deliveryUrl: z.string().url().optional(),
  previewUrl: z.string().url().optional()
});
