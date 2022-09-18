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
    const start = new Date().getTime();
    const { ip, method, originalUrl } = req;
    const userAgent = req.get('user-agent');

    res.on('finish', () => {
      const end = new Date().getTime();
      const { statusCode } = res;

      this.logger.log(
        `${method} ${originalUrl} ${statusCode} ${ip} ${userAgent} ${
          end - start
        }`,
      );
    });

    next();
  }
}
