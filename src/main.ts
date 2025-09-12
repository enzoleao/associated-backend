import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CustomValidationPipe } from '@/common/pipes/custom-validation-pipe';
import { BullBoardModule } from './modules/bull-board/bull-board.module';
import { getQueueToken } from '@nestjs/bull';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new CustomValidationPipe());

  const whatsappQueue = app.get(getQueueToken('whatsapp-auth-code'));
  const resetPasswordQueue = app.get(getQueueToken('reset-password'));
  const notificationQueue = app.get(getQueueToken('notification'));

  BullBoardModule.forRoot(app, [whatsappQueue, resetPasswordQueue, notificationQueue]);

  await app.listen(process.env.PORT ?? 3000);
}

void bootstrap();
