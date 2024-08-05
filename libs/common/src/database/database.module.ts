import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EntityClassOrSchema } from '@nestjs/typeorm/dist/interfaces/entity-class-or-schema.type';
import { FileEntity } from './entities/file.entity';
import { PostEntity } from './entities/post.entity';
import { UserEntity } from './entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        autoLoadEntities: true,
        logging: configService.get<boolean>('POSTGRES_LOGGING'),
        synchronize: configService.get<boolean>('POSTGRES_SYNCHRONIZE'),
        entities: [FileEntity, UserEntity, PostEntity],

        replication: {
          master: {
            host: configService.get<string>('POSTGRES_HOST'),
            port: configService.get<number>('POSTGRES_PORT'),
            username: configService.get<string>('POSTGRES_USER_MASTER'),
            password: configService.get<string>('POSTGRES_PASSWORD_MASTER'),
            database: configService.get<string>('POSTGRES_DB_MASTER'),
          },
          slaves: [
            {
              host: configService.get<string>('POSTGRES_HOST'),
              port: configService.get<number>('POSTGRES_PORT'),
              username: configService.get<string>('POSTGRES_USER_SLAVE'),
              password: configService.get<string>('POSTGRES_PASSWORD_SLAVE'),
              database: configService.get<string>('POSTGRES_DB_SLAVE'),
            },
          ],
        },
      }),
      inject: [ConfigService],
    }),
  ],
})
export class DatabaseModule {
  static forFeature(entities: EntityClassOrSchema[]) {
    return TypeOrmModule.forFeature(entities);
  }
}
