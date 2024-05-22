import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { IFileModel } from '@lib/common';
import { Field, ObjectType } from '@nestjs/graphql';
import { UserModel } from '@apps/account/src/user/models/user.model';

@Entity('user')
@ObjectType()
export class FileModel extends BaseEntity implements IFileModel {
  @PrimaryGeneratedColumn('uuid')
  @Field()
  id: string;

  @Column()
  @Field({ description: 'Post Image' })
  fileUrl: string;

  @Column()
  @Field({ description: 'File type' })
  type: string;

  @Field(() => UserModel)
  @OneToOne(() => UserModel)
  profile: UserModel;

  @CreateDateColumn()
  @Field()
  createdAt: Date;

  @UpdateDateColumn()
  @Field()
  updatedAt: Date;
}
