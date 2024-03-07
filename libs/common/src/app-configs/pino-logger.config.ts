import { Params } from 'nestjs-pino';

export const pinoLoggerConfig = (): Params => ({
  pinoHttp: {
    transport: {
      target: 'pino-pretty',
      options: {
        singleLine: true,
      },
    },
  },
});
