import { ConfigModule, ConfigService } from '@nestjs/config';

export const getMinioConfig = () => ({
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: (configService: ConfigService) => ({
    endPoint: configService.get('MINIO_ENDPOINT'),
    port: configService.get('MINIO_PORT'),
    useSSL: false,
    accessKey: configService.get('MINIO_ACCESS_KEY'),
    secretKey: configService.get('MINIO_ACCESS_SECRET'),
  }),
});
