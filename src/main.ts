import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule); // 여기서 모듈을 확장함.
  await app.listen(3000);
}

bootstrap();
