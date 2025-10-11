import { describe, expect, it, vi } from 'vitest';
import { PlansService } from './plans.service';

const mockPrisma = {
  plan: {
    findMany: vi.fn().mockResolvedValue([]),
    create: vi.fn().mockImplementation(async ({ data }) => ({ id: 'plan', ...data })),
    update: vi.fn().mockResolvedValue({ id: 'plan' }),
    delete: vi.fn().mockResolvedValue({})
  }
} as any;

describe('PlansService', () => {
  const service = new PlansService(mockPrisma);

  it('returns active plans', async () => {
    await service.findAll();
    expect(mockPrisma.plan.findMany).toHaveBeenCalledWith({ where: { active: true } });
  });

  it('creates a plan', async () => {
    const created = await service.create({
      code: 'TEST',
      type: 'PRO' as any,
      price: 10,
      currency: 'USD',
      interval: 'monthly',
      active: true
    });
    expect(created.code).toBe('TEST');
  });
});
