import { z } from 'zod';

export const PermissionSchema = z.string().min(1);
export const RoleSchema = z.object({
  id: z.string(),
  name: z.string(),
  permissions: z.array(PermissionSchema)
});

export type PermissionKey = z.infer<typeof PermissionSchema>;
export type RoleDefinition = z.infer<typeof RoleSchema>;

export const ROLE_PERMISSIONS: Record<string, PermissionKey[]> = {
  ADMIN: [
    'plan.create',
    'plan.update',
    'plan.delete',
    'subscription.cancel',
    'wallet.withdraw.approve',
    'provider.inventory.update',
    'affiliate.link.create'
  ],
  PROVEEDOR_STREAMING: ['provider.inventory.update'],
  VENDEDOR: ['wallet.withdraw.request', 'order.create'],
  AFILIADO: ['affiliate.link.create'],
  USUARIO: ['order.create'],
  SOPORTE: ['ticket.manage']
};

export const hasPermission = (role: string, permission: PermissionKey): boolean => {
  const permissions = ROLE_PERMISSIONS[role] ?? [];
  return permissions.includes(permission);
};

export const ensurePermission = (role: string, permission: PermissionKey) => {
  if (!hasPermission(role, permission)) {
    throw new Error(`Role ${role} lacks permission ${permission}`);
  }
};
