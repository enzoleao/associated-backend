import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CustomValidationPipe } from '@/common/pipes/custom-validation-pipe';
import { BullBoardModule } from './modules/bull-board/bull-board.module';
import { getQueueToken } from '@nestjs/bull';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new CustomValidationPipe());

  const whatsappQueue = app.get(getQueueToken('whatsapp-auth-code'));

  BullBoardModule.forRoot(app, [whatsappQueue]);

  await app.listen(process.env.PORT ?? 3000);
}

void bootstrap();
