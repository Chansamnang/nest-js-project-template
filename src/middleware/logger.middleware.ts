import { Injectable, NestMiddleware } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Log } from 'src/entities/log.entity';
import { LogRepository } from 'src/repositories/log.repository';
import { getClientIpUtil } from 'src/utils/get-client-ip.util';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(
    @InjectRepository(LogRepository)
    private logRepository: LogRepository,
  ) {}
  use(req: any, res: any, next: (error?: any) => void) {
    const log = this.logRepository.create({
      method: req.method,
      url: req.originalUrl,
      hostname: req.hostname,
      request_body: JSON.stringify(req.body) === '{}' ? req.query : req.body,
      status_code: res.statusCode,
      platform:
        req.headers['sec-ch-ua-platform'] || req.headers['sec-ch-ua-mobile'],
      ip_address: getClientIpUtil(req),
      requested_by: req?.user?.username || 'guest',
      user_agent: req.headers['user-agent'],
    });
    console.log(log);
    next();
  }
}
