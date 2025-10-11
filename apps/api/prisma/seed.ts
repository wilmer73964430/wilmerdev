import { PrismaClient, RoleType, PlanType, ServiceType, WalletOwnerType, AffiliateModel } from '@prisma/client';
import { ROLE_PERMISSIONS } from '@socialmentorify/shared';

const prisma = new PrismaClient();

async function main() {
  await prisma.role.deleteMany({});
  await prisma.permission.deleteMany({});
  await prisma.plan.deleteMany({});

  for (const [roleName, permissions] of Object.entries(ROLE_PERMISSIONS)) {
    const role = await prisma.role.create({ data: { name: roleName } });
    for (const permission of permissions) {
      const perm = await prisma.permission.upsert({
        where: { key: permission },
        update: {},
        create: { key: permission }
      });
      await prisma.rolePermission.create({
        data: {
          roleId: role.id,
          permissionId: perm.id
        }
      });
    }
  }

  await prisma.plan.createMany({
    data: [
      {
        code: 'PLAN_PRO',
        type: PlanType.PRO,
        price: 49,
        benefitsJson: { discountPercent: 30 }
      },
      {
        code: 'PANEL_SECUNDARIO',
        type: PlanType.SECONDARY,
        price: 79,
        benefitsJson: { domainProvision: true }
      },
      {
        code: 'SELLER_TIER_1',
        type: PlanType.SELLER,
        price: 99,
        benefitsJson: { commission: 15 }
      }
    ]
  });

  const admin = await prisma.user.upsert({
    where: { email: 'admin@socialmentorify.com' },
    update: {},
    create: {
      email: 'admin@socialmentorify.com',
      password: 'hashed-password',
      role: RoleType.ADMIN,
      profile: {
        create: { name: 'Super Admin' }
      }
    }
  });

  await prisma.wallet.upsert({
    where: { ownerId: admin.id },
    update: {},
    create: {
      ownerId: admin.id,
      ownerType: WalletOwnerType.USER,
      balance: 0
    }
  });

  await prisma.service.create({
    data: {
      name: 'Netflix UHD',
      sku: 'STREAM-NETFLIX-UHD',
      type: ServiceType.STREAMING,
      basePrice: 12.99,
      active: true
    }
  });

  await prisma.service.create({
    data: {
      name: 'Instagram Followers Boost',
      sku: 'SMM-INSTA-FOLLOW',
      type: ServiceType.SMM,
      basePrice: 5.5,
      active: true
    }
  });

  await prisma.discountRule.upsert({
    where: { id: 'plan-pro-discount' },
    update: {},
    create: {
      id: 'plan-pro-discount',
      appliesTo: 'all',
      percent: 30,
      planRequired: 'PLAN_PRO'
    }
  });

  await prisma.affiliate.upsert({
    where: { userId: admin.id },
    update: {},
    create: {
      userId: admin.id,
      code: 'ADMINREF',
      model: AffiliateModel.REVSHARE,
      percent: 20
    }
  });
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
