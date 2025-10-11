import { Body, Controller, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { ServicesService } from './services.service';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { ServiceType } from '@prisma/client';
import { MockAuthGuard } from '../../common/guards/mock-auth.guard';
import { PermissionsGuard } from '../../common/guards/permissions.guard';
import { Permissions } from '../../common/decorators/permissions.decorator';

@Controller()
export class ServicesController {
  constructor(private readonly services: ServicesService) {}

  @Get('services')
  list(@Query('type') type?: ServiceType) {
    return this.services.list(type);
  }

  @UseGuards(MockAuthGuard, PermissionsGuard)
  @Permissions('provider.inventory.update')
  @Post('admin/services')
  create(@Body() input: CreateServiceDto) {
    return this.services.create(input);
  }

  @UseGuards(MockAuthGuard, PermissionsGuard)
  @Permissions('provider.inventory.update')
  @Patch('admin/services/:id')
  update(@Param('id') id: string, @Body() input: UpdateServiceDto) {
    return this.services.update(id, input);
  }
}
