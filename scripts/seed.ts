import { PrismaClient, DeliveryType, Role } from '@prisma/client';
import { randomBytes } from 'crypto';
import argon2 from 'argon2';

const prisma = new PrismaClient();

async function main() {
  const adminPassword = await argon2.hash('Admin1234!');
  await prisma.user.upsert({
    where: { email: 'admin@demo.local' },
    update: {},
    create: { email: 'admin@demo.local', name: 'Admin', passwordHash: adminPassword, role: Role.ADMIN }
  });

  for (let i = 1; i <= 3; i++) {
    await prisma.user.upsert({
      where: { email: `cliente${i}@demo.local` },
      update: {},
      create: {
        email: `cliente${i}@demo.local`,
        name: `Cliente ${i}`,
        passwordHash: await argon2.hash('Cliente1234!')
      }
    });
  }

  const products = [
    { name: 'Plan Básico', slug: 'plan-basico', description: 'Suscripción básica' },
    { name: 'Plan Estándar', slug: 'plan-estandar', description: 'Suscripción intermedia' },
    { name: 'Plan Premium', slug: 'plan-premium', description: 'Suscripción avanzada' }
  ];

  for (const product of products) {
    const created = await prisma.product.upsert({
      where: { slug: product.slug },
      update: {},
      create: { ...product }
    });

    for (const variantName of ['Mensual', 'Anual']) {
      const price = variantName === 'Mensual' ? 900 : 9900;
      const variant = await prisma.variant.upsert({
        where: { id: `${created.id}-${variantName}` },
        update: { name: variantName, priceCents: price },
        create: {
          id: `${created.id}-${variantName}`,
          name: variantName,
          priceCents: price,
          currency: 'USD',
          productId: created.id,
          delivery: DeliveryType.CODE,
          stock: 50
        }
      });

      const codes = Array.from({ length: 50 }).map(() => ({
        variantId: variant.id,
        code: `CODE-${randomBytes(8).toString('hex')}`
      }));
      await prisma.digitalCode.createMany({ data: codes, skipDuplicates: true });
    }
  }

  await prisma.coupon.upsert({
    where: { code: 'DESC10' },
    update: {},
    create: { code: 'DESC10', description: '10% off', percentOff: 10 }
  });
  await prisma.coupon.upsert({
    where: { code: 'USD5' },
    update: {},
    create: { code: 'USD5', description: '5 USD off', amountOffCents: 500, currency: 'USD' }
  });
  await prisma.coupon.upsert({
    where: { code: 'LIMITADO' },
    update: {},
    create: {
      code: 'LIMITADO',
      description: 'Cupón por fecha',
      percentOff: 15,
      validTo: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7)
    }
  });

  console.log('Seed completado');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => prisma.$disconnect());
