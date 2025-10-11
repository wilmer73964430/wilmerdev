import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../common/prisma/prisma.service';
import { UpdateProgressDto } from './dto/update-progress.dto';

@Injectable()
export class CoursesService {
  constructor(private readonly prisma: PrismaService) {}

  modules() {
    return this.prisma.courseModule.findMany({ include: { lessons: true } });
  }

  lesson(id: string) {
    return this.prisma.courseLesson.findUnique({ where: { id }, include: { module: true } });
  }

  async updateProgress(userId: string, input: UpdateProgressDto) {
    return this.prisma.courseProgress.upsert({
      where: {
        lessonId_userId: {
          lessonId: input.lessonId,
          userId
        }
      },
      update: { completed: input.completed, completedAt: input.completed ? new Date() : null },
      create: {
        lessonId: input.lessonId,
        userId,
        completed: input.completed,
        completedAt: input.completed ? new Date() : null
      }
    });
  }
}
