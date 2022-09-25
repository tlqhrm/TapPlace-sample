import {
  Inject,
  Injectable,
  Logger,
  LoggerService,
  NestMiddleware,
} from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(@Inject(Logger) private readonly logger: LoggerService) {}
  use(req: Request, res: Response, next: NextFunction) {
    const { method, originalUrl } = req;
    const userAgent = req.get('user-agent');
    let ip = req.ip;
    if (req.header['x-forwarded-for']) ip = req.header['x-forwarded-for'];
    res.on('finish', () => {
      const { statusCode } = res;

      this.logger.log(
        `${method} - ${originalUrl} - ${statusCode} - ${ip} - ${userAgent}`,
      );
    });

    next();
  }
}
