import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EntityClassOrSchema } from '@nestjs/typeorm/dist/interfaces/entity-class-or-schema.type';
import { FileEntity } from '../../../../apps/feed/src/modules/upload/entities/file.entity';
import { UserEntity } from '../../../../apps/account/src/user/entities/user.model';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: (configServie: ConfigService) => ({
        type: 'postgres',
        host: configServie.get<string>('POSTGRES_HOST'),
        port: configServie.get<number>('POSTGRES_PORT'),
        database: configServie.get<string>('POSTGRES_DB'),
        username: configServie.get<string>('POSTGRES_USER'),
        password: configServie.get<string>('POSTGRES_PASSWORD'),
        autoLoadEntities: true,
        logging: configServie.get<boolean>('POSTGRES_LOGGING'),
        synchronize: configServie.get<boolean>('POSTGRES_SYNCHRONIZE'),
        entities: [FileEntity, UserEntity],
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
