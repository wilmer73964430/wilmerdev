import { Body, Controller, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ProvidersService } from './providers.service';
import { CreateProviderDto } from './dto/create-provider.dto';
import { UpdateProviderDto } from './dto/update-provider.dto';
import { UpdateInventoryDto } from './dto/update-inventory.dto';
import { MockAuthGuard } from '../../common/guards/mock-auth.guard';
import { PermissionsGuard } from '../../common/guards/permissions.guard';
import { Permissions } from '../../common/decorators/permissions.decorator';

@Controller()
export class ProvidersController {
  constructor(private readonly providers: ProvidersService) {}

  @UseGuards(MockAuthGuard, PermissionsGuard)
  @Permissions('provider.inventory.update')
  @Get('admin/providers')
  list() {
    return this.providers.list();
  }

  @UseGuards(MockAuthGuard, PermissionsGuard)
  @Permissions('provider.inventory.update')
  @Post('admin/providers')
  create(@Body() input: CreateProviderDto) {
    return this.providers.create(input);
  }

  @UseGuards(MockAuthGuard, PermissionsGuard)
  @Permissions('provider.inventory.update')
  @Patch('admin/providers/:id')
  update(@Param('id') id: string, @Body() input: UpdateProviderDto) {
    return this.providers.update(id, input);
  }

  @UseGuards(MockAuthGuard, PermissionsGuard)
  @Permissions('provider.inventory.update')
  @Post('providers/inventory')
  upsertInventory(@Body() input: UpdateInventoryDto) {
    return this.providers.upsertInventory(input);
  }
}
