import { UnauthorizedException } from '@nestjs/common';
import { AUTH_SERVICE } from '@lib/common';
import { app } from './app';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

export const authContext = async ({ req }) => {
  try {
    const authClient = app.get<ClientProxy>(AUTH_SERVICE);
    const user = await lastValueFrom(
      authClient.send('authenticate', {
        Authentication: req.headers?.authentication,
      }),
    );

    return { user };
  } catch (error) {
    throw new UnauthorizedException(error);
  }
};
