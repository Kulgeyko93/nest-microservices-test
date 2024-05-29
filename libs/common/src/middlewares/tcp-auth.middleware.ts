import { MicroservicesNames, ResponseWithUser } from '@lib/common';
import {
  BadRequestException,
  Inject,
  Injectable,
  NestMiddleware,
  NotFoundException,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { NextFunction, Request } from 'express';

@Injectable()
export class TcpAuthMiddleware implements NestMiddleware {
  constructor(
    @Inject(MicroservicesNames.ACCOUNT_MS) private authClient: ClientProxy,
  ) {}

  async use(req: Request, res: ResponseWithUser, next: NextFunction) {
    try {
      // const authElements = req.headers?.authorization?.split(' ');

      // if (!req.headers?.authorization || !authElements?.length) {
      //   throw new BadRequestException();
      // }
      // const user = await lastValueFrom(
      //   this.authClient.send(AccountMessageNames.Authenticate, {
      //     Authorization: authElements[1],
      //   }),
      // );
      // req.user = user;
      throw new BadRequestException();
    } catch (error) {
      throw new NotFoundException('Wrong credentials');
    }

    next();
  }
}
