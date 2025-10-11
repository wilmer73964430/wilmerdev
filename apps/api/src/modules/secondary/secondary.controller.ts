import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { SecondaryService } from './secondary.service';
import { ActivateSecondaryDto } from './dto/activate-secondary.dto';
import { VerifyDomainDto } from './dto/verify-domain.dto';
import { UpdateBrandingDto } from './dto/update-branding.dto';
import { MockAuthGuard } from '../../common/guards/mock-auth.guard';
import { Request } from 'express';

@UseGuards(MockAuthGuard)
@Controller('secondary')
export class SecondaryController {
  constructor(private readonly secondary: SecondaryService) {}

  @Post('activate')
  activate(@Req() req: Request, @Body() input: ActivateSecondaryDto) {
    const userId = (req as any).user?.id as string;
    return this.secondary.activate(userId, input);
  }

  @Post('domains/verify')
  verify(@Body() input: VerifyDomainDto) {
    return this.secondary.verifyDomain(input);
  }

  @Post('branding')
  branding(@Body() input: UpdateBrandingDto) {
    return this.secondary.updateBranding(input);
  }
}
