import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../common/prisma/prisma.service';
import { ActivateSecondaryDto } from './dto/activate-secondary.dto';
import { VerifyDomainDto } from './dto/verify-domain.dto';
import { UpdateBrandingDto } from './dto/update-branding.dto';
import { v4 as uuid } from 'uuid';

@Injectable()
export class SecondaryService {
  constructor(private readonly prisma: PrismaService) {}

  async activate(userId: string, input: ActivateSecondaryDto) {
    const subscription = await this.prisma.subscription.findUnique({
      where: { id: input.subscriptionId, userId },
      include: { plan: true }
    });

    if (!subscription || subscription.plan?.type !== 'SECONDARY') {
      throw new NotFoundException('Suscripción marca blanca no encontrada');
    }

    const secondaryKey = subscription.secondaryPanelKey ?? uuid();
    const domain = input.preferredSubdomain ?? `${userId.slice(0, 6)}.socialmentorify.app`;

    await this.prisma.subscription.update({
      where: { id: subscription.id },
      data: {
        secondaryPanelKey: secondaryKey,
        secondaryDomain: domain
      }
    });

    const redirectUrl = `https://${domain}/onboarding?key=${secondaryKey}`;

    return { secondaryPanelKey: secondaryKey, redirectUrl };
  }

  async verifyDomain(input: VerifyDomainDto) {
    await this.prisma.domain.upsert({
      where: { subscriptionId: input.subscriptionId },
      update: { apexDomain: input.domain, status: 'verified', sslStatus: 'pending' },
      create: {
        subscriptionId: input.subscriptionId,
        apexDomain: input.domain,
        status: 'pending',
        sslStatus: 'pending'
      }
    });

    return { status: 'pending_verification' };
  }

  async updateBranding(input: UpdateBrandingDto) {
    await this.prisma.auditLog.create({
      data: {
        actorId: input.subscriptionId,
        action: 'secondary.branding.update',
        entity: 'subscription',
        entityId: input.subscriptionId,
        diffJson: input.branding
      }
    });

    return { status: 'branding_saved' };
  }
}
