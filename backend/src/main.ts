import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, //delete extra data
      forbidNonWhitelisted: true, // error if extra data
      transform: true, // transform from json to Dto
    }),
  );
  //to be able to get request from my frontend
  app.enableCors({
    origin: 'http://localhost:5173',
    credentials: true,
  });
  const configService = app.get(ConfigService);
  const port = configService.get<number>('APP_PORT')!;
  await app.listen(process.env.PORT ?? port);
}
bootstrap();
