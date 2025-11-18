import { describe, expect, it } from 'vitest';
import { checkoutInput } from '../../apps/storefront/lib/order-service';

describe('checkoutInput schema', () => {
  it('valida datos mínimos', () => {
    const result = checkoutInput.parse({ userId: 'u1', variantId: 'v1', quantity: 1 });
    expect(result.variantId).toBe('v1');
  });

  it('rechaza quantity inválido', () => {
    expect(() => checkoutInput.parse({ userId: 'u1', variantId: 'v1', quantity: 0 })).toThrow();
  });
});
