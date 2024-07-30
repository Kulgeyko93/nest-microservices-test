import { AccountValidateUser, KafkaMicroserviceNames } from '@lib/common';
import {
  Inject,
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { ClientKafka } from '@nestjs/microservices';
import { NextFunction, Request, Response } from 'express';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(
    @Inject(KafkaMicroserviceNames.AccountMS)
    private accountClient: ClientKafka,

    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async use(req: Request, res: Response, next: NextFunction) {
    try {
      const bearerToken = req.headers?.authorization;

      if (!bearerToken) {
        throw new UnauthorizedException();
      }

      const [, token] = bearerToken.split(' ');

      if (!token) {
        throw new UnauthorizedException();
      }

      const user = await lastValueFrom(
        this.accountClient.send(AccountValidateUser.topic, {
          token,
        }),
      );

      if (!user) {
        throw new UnauthorizedException();
      }

      req.user = user;
    } catch (error) {
      throw new UnauthorizedException();
    }

    next();
  }

  async onModuleInit() {
    this.accountClient.subscribeToResponseOf(AccountValidateUser.topic);
    await this.accountClient.connect();
  }
}
