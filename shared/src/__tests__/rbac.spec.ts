import { describe, expect, it } from 'vitest';
import { hasPermission } from '..';

describe('RBAC helpers', () => {
  it('grants admin permissions', () => {
    expect(hasPermission('ADMIN', 'plan.create')).toBe(true);
  });

  it('denies missing permissions', () => {
    expect(hasPermission('USUARIO', 'plan.create')).toBe(false);
  });
});
