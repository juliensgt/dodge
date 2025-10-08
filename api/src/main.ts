import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { appConfig } from './config/app.config';
import { LoggerService } from './common/services/logger.service';
import { AllExceptionsFilter } from './common/filters/all-exceptions.filter';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Get logger service instance
  const loggerService = app.get(LoggerService);

  // Enable CORS
  app.enableCors(appConfig.cors);

  // Enable validation pipes
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  // Register global exception filters
  app.useGlobalFilters(
    new AllExceptionsFilter(loggerService),
    new HttpExceptionFilter(loggerService),
  );

  await app.listen(process.env.API_PORT || 3000);
  loggerService.log(`Application is running on: ${await app.getUrl()}`, 'Bootstrap');
}

void bootstrap();
