import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

export const PORT = 3002;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(PORT);
}
bootstrap();
