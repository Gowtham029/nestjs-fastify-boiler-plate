import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { LoggerService } from '../services/logger.service';

@Injectable()
export class ResponseTimeInterceptor implements NestInterceptor {
  constructor(private readonly logger: LoggerService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const start = Date.now();
    const request = context.switchToHttp().getRequest();
    const { method, url } = request;

    return next.handle().pipe(
      tap(() => {
        const responseTime = Date.now() - start;
        this.logger.info(`${method} ${url} - ${responseTime}ms`, {
          method,
          url,
          responseTime,
        });
      }),
    );
  }
}