import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';
import helmet from "helmet";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  // Security header middleware
  app.use(helmet());

  // Cors
  app.enableCors({
    origin: configService.get('CORS_ORIGIN', "*"),
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    credentials: true,
  })

  // Global prefix
  app.setGlobalPrefix('api/v1');

  const PORT = process.env.PORT ?? 3000
  await app.listen(PORT);

  console.log(`Server is running on: http://localhost:${PORT}/api/v1`);
  // if (configService.get('NODE_ENV') !== 'production') {
  //   console.log(`Swagger documentation: http://localhost:${port}/api-docs`);
  // }
}

bootstrap();
