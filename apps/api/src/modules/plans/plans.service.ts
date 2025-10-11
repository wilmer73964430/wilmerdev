import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../common/prisma/prisma.service';
import { CreatePlanDto } from './dto/create-plan.dto';
import { UpdatePlanDto } from './dto/update-plan.dto';

@Injectable()
export class PlansService {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.plan.findMany({ where: { active: true } });
  }

  async create(input: CreatePlanDto) {
    return this.prisma.plan.create({ data: input });
  }

  async update(id: string, input: UpdatePlanDto) {
    const plan = await this.prisma.plan.update({ where: { id }, data: input });
    if (!plan) {
      throw new NotFoundException('Plan no encontrado');
    }
    return plan;
  }

  async remove(id: string) {
    await this.prisma.plan.delete({ where: { id } });
    return { deleted: true };
  }
}
