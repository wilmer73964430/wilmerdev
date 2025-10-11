import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { PlansService } from './plans.service';
import { CreatePlanDto } from './dto/create-plan.dto';
import { UpdatePlanDto } from './dto/update-plan.dto';
import { Permissions } from '../../common/decorators/permissions.decorator';
import { PermissionsGuard } from '../../common/guards/permissions.guard';
import { MockAuthGuard } from '../../common/guards/mock-auth.guard';

@Controller()
export class PlansController {
  constructor(private readonly plans: PlansService) {}

  @Get('plans')
  list() {
    return this.plans.findAll();
  }

  @UseGuards(MockAuthGuard, PermissionsGuard)
  @Permissions('plan.create')
  @Post('admin/plans')
  create(@Body() input: CreatePlanDto) {
    return this.plans.create(input);
  }

  @UseGuards(MockAuthGuard, PermissionsGuard)
  @Permissions('plan.update')
  @Patch('admin/plans/:id')
  update(@Param('id') id: string, @Body() input: UpdatePlanDto) {
    return this.plans.update(id, input);
  }

  @UseGuards(MockAuthGuard, PermissionsGuard)
  @Permissions('plan.delete')
  @Delete('admin/plans/:id')
  remove(@Param('id') id: string) {
    return this.plans.remove(id);
  }
}
