import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../common/prisma/prisma.service';
import { CreateProviderDto } from './dto/create-provider.dto';
import { UpdateProviderDto } from './dto/update-provider.dto';
import { UpdateInventoryDto } from './dto/update-inventory.dto';

@Injectable()
export class ProvidersService {
  constructor(private readonly prisma: PrismaService) {}

  list() {
    return this.prisma.provider.findMany({ include: { services: true } });
  }

  create(input: CreateProviderDto) {
    return this.prisma.provider.create({ data: input });
  }

  update(id: string, input: UpdateProviderDto) {
    return this.prisma.provider.update({ where: { id }, data: input });
  }

  async upsertInventory(input: UpdateInventoryDto) {
    const { providerId, serviceId, stock, reserved, metadataJson } = input;
    return this.prisma.providerInventory.upsert({
      where: {
        providerId_serviceId: {
          providerId,
          serviceId
        }
      },
      update: { stock, reserved, metadataJson },
      create: { providerId, serviceId, stock, reserved: reserved ?? 0, metadataJson }
    });
  }
}
