import { Module } from '@nestjs/common';
import { SecondaryService } from './secondary.service';
import { SecondaryController } from './secondary.controller';

@Module({
  providers: [SecondaryService],
  controllers: [SecondaryController]
})
export class SecondaryModule {}
