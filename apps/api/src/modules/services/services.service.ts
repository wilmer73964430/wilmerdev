import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../common/prisma/prisma.service';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { ServiceType } from '@prisma/client';

@Injectable()
export class ServicesService {
  constructor(private readonly prisma: PrismaService) {}

  list(type?: ServiceType) {
    return this.prisma.service.findMany({ where: { type, active: true } });
  }

  create(input: CreateServiceDto) {
    return this.prisma.service.create({ data: input });
  }

  update(id: string, input: UpdateServiceDto) {
    return this.prisma.service.update({ where: { id }, data: input });
  }
}
