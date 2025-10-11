import { Body, Controller, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { MockAuthGuard } from '../../common/guards/mock-auth.guard';
import { Request } from 'express';
import { UpdateProgressDto } from './dto/update-progress.dto';

@Controller('courses')
export class CoursesController {
  constructor(private readonly courses: CoursesService) {}

  @Get('modules')
  modules() {
    return this.courses.modules();
  }

  @Get('lessons/:id')
  lesson(@Param('id') id: string) {
    return this.courses.lesson(id);
  }

  @UseGuards(MockAuthGuard)
  @Post('progress')
  progress(@Req() req: Request, @Body() input: UpdateProgressDto) {
    const userId = (req as any).user?.id as string;
    return this.courses.updateProgress(userId, input);
  }
}
