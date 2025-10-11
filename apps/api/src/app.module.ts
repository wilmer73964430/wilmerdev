import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './common/prisma/prisma.module';
import { AuthModule } from './modules/auth/auth.module';
import { PlansModule } from './modules/plans/plans.module';
import { SubscriptionsModule } from './modules/subscriptions/subscriptions.module';
import { ServicesModule } from './modules/services/services.module';
import { ProvidersModule } from './modules/providers/providers.module';
import { OrdersModule } from './modules/orders/orders.module';
import { WalletModule } from './modules/wallet/wallet.module';
import { AffiliatesModule } from './modules/affiliates/affiliates.module';
import { CoursesModule } from './modules/courses/courses.module';
import { TicketsModule } from './modules/tickets/tickets.module';
import { AdminModule } from './modules/admin/admin.module';
import { SecondaryModule } from './modules/secondary/secondary.module';
import { MockAuthGuard } from './common/guards/mock-auth.guard';
import { PermissionsGuard } from './common/guards/permissions.guard';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    AuthModule,
    PlansModule,
    SubscriptionsModule,
    ServicesModule,
    ProvidersModule,
    OrdersModule,
    WalletModule,
    AffiliatesModule,
    CoursesModule,
    TicketsModule,
    AdminModule,
    SecondaryModule
  ],
  providers: [
    { provide: APP_GUARD, useClass: MockAuthGuard },
    { provide: APP_GUARD, useClass: PermissionsGuard }
  ]
})
export class AppModule {}
