import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EntityClassOrSchema } from '@nestjs/typeorm/dist/interfaces/entity-class-or-schema.type';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: (configServie: ConfigService) => ({
        type: 'postgres',
        host: configServie.get<string>('PSQL_HOSTNAME'),
        port: configServie.get<number>('PSQL_PORT'),
        database: configServie.get<string>('PSQL_DB_NAME'),
        username: configServie.get<string>('PSQL_USERNAME'),
        password: configServie.get<string>('PSQL_PASSWORD'),
        autoLoadEntities: true,
        logging: configServie.get<boolean>('PSQL_LOGGING'),
        synchronize: configServie.get<boolean>('PSQL_SYNCHRONIZE'),
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
