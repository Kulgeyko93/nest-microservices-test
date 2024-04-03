import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { IUserModel } from '@lib/common';
import { Field, ObjectType } from '@nestjs/graphql';

@Entity('user')
@ObjectType()
export class UserModel extends BaseEntity implements IUserModel {
  @PrimaryGeneratedColumn('uuid')
  @Field()
  id: string;

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

  @Column({
    type: 'varchar',
    nullable: true,
  })
  @Field({ nullable: true })
  refreshToken: string;

  @CreateDateColumn()
  @Field()
  createdAt: Date;

  @UpdateDateColumn()
  @Field()
  updatedAt: Date;
}
