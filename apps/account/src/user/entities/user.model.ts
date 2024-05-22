import {
  Column,
  CreateDateColumn,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { IUserEntityContract } from '@lib/common';
import { Field, ObjectType } from '@nestjs/graphql';
import { FileEntity } from '@apps/feed/src/modules/upload/entities/file.entity';

@Entity('user')
@ObjectType()
export class UserEntity implements IUserEntityContract {
  @Column({
    type: 'varchar',
    nullable: false,
    unique: true,
  })
  @Field()
  email: string;

  @Column({
    type: 'varchar',
    nullable: false,
  })
  @Field()
  password: string;

  @Field({ nullable: true })
  @Column({
    type: 'varchar',
    nullable: true,
  })
  refreshToken: string;

  // @Field(() => FileEntity, { nullable: true })
  @OneToOne(() => FileEntity, (file) => file.user)
  avatar: FileEntity;

  @PrimaryGeneratedColumn('uuid')
  @Field()
  id: string;

  @Field()
  @CreateDateColumn()
  createdAt: Date;

  @Field()
  @UpdateDateColumn()
  updatedAt: Date;
}
