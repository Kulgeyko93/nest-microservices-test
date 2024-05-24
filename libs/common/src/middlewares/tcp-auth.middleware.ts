import { MicroservicesNames } from '@lib/common';
import { Inject, Injectable, NestMiddleware } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { NextFunction, Request, Response } from 'express';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class TcpAuthMiddleware implements NestMiddleware {
  constructor(
    @Inject(MicroservicesNames.ACCOUNT_MS) private authClient: ClientProxy,
  ) {}

  async use(req: Request, res: Response, next: NextFunction) {
    console.log('Request...');
    const user = await lastValueFrom(
      this.authClient.send('authenticate', {
        Authorization: req.headers?.authentication,
      }),
    );
    next();
  }
}
