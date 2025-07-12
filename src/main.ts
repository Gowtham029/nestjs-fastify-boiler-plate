import { NestFactory } from '@nestjs/core';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { v4 as uuidv4 } from 'uuid';
// import helmet from '@fastify/helmet';
import { AppModule } from './app.module';
import { ResponseTimeInterceptor } from './shared/interceptors/response-time.interceptor';
import { GlobalExceptionFilter } from './shared/filters/global-exception.filter';
import { LoggerService } from './shared/services/logger.service';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({
      logger: {
        level: 'info',
        serializers: {
          req: (req) => ({
            method: req.method,
            url: req.url,
            hostname: req.hostname,
            remoteAddress: req.ip,
            remotePort: req.socket?.remotePort,
          }),
          res: (res) => ({
            statusCode: res.statusCode,
          }),
        },
      },
      genReqId: () => uuidv4(),
      requestIdLogLabel: 'correlationId',
    }),
  );

  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT', 3000);
  const apiPrefix = configService.get<string>('API_PREFIX', 'api/v1');

  // Security - helmet temporarily disabled due to type compatibility
  // await app.register(helmet);

  // Global prefix
  app.setGlobalPrefix(apiPrefix);

  // Global pipes
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  // Get logger service
  const logger = app.get(LoggerService);

  // Global interceptors
  app.useGlobalInterceptors(new ResponseTimeInterceptor(logger));

  // Global filters
  app.useGlobalFilters(new GlobalExceptionFilter(logger));

  // Swagger documentation
  const config = new DocumentBuilder()
    .setTitle('NestJS Fastify BFF API')
    .setDescription('Enterprise Backend for Frontend API')
    .setVersion('1.0')
    .addBearerAuth()
    .addApiKey({ type: 'apiKey', name: 'x-api-key', in: 'header' }, 'api-key')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(`${apiPrefix}/docs`, app, document);

  await app.listen(port, '0.0.0.0');
  // console.log(`Application is running on: http://localhost:${port}/${apiPrefix}`);
  // console.log(`Swagger docs: http://localhost:${port}/${apiPrefix}/docs`);
}

bootstrap();