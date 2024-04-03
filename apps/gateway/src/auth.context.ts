import { UnauthorizedException } from '@nestjs/common';
import { ACCOUNT_SERVICE } from '@lib/common';
import { app } from './app';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

export const authContext = async ({ req }) => {
  try {
    const authClient = app.get<ClientProxy>(ACCOUNT_SERVICE);
    const user = await lastValueFrom(
      authClient.send('authenticate', {
        Authorization: req.headers?.authentication,
      }),
    );

    return { user };
  } catch (error) {
    throw new UnauthorizedException('User unauthorize');
  }
};
