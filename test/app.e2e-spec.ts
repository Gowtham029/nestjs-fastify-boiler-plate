import { Test, TestingModule } from '@nestjs/testing';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { AppModule } from '../src/app.module';

describe('AppController (e2e)', () => {
  let app: NestFastifyApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication<NestFastifyApplication>(
      new FastifyAdapter(),
    );
    await app.init();
    await app.getHttpAdapter().getInstance().ready();
  });

  it('/health (GET)', () => {
    return app
      .inject({
        method: 'GET',
        url: '/api/v1/health',
      })
      .then((result) => {
        expect(result.statusCode).toEqual(200);
        expect(JSON.parse(result.payload)).toHaveProperty('status', 'ok');
      });
  });

  afterAll(async () => {
    await app.close();
  });
});