import { z } from 'zod';

export const checkoutSchema = z.object({
  items: z
    .array(
      z.object({
        productId: z.string().uuid(),
        quantity: z.number().int().positive()
      })
    )
    .nonempty(),
  promoCode: z.string().optional()
});
