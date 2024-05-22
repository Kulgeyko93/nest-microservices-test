import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { IFileModel } from '@lib/common';
import { Field, ObjectType } from '@nestjs/graphql';
import { UserModel } from '@apps/account/src/user/models/user.model';
import { BaseModel } from '@lib/common';

@Entity('user')
@ObjectType()
export class FileModel extends BaseModel implements IFileModel {
  @Field({ description: 'Post Image' })
  @Column()
  fileUrl: string;

  @Field({ description: 'File type' })
  @Column()
  type: string;

  @Field(() => UserModel, { nullable: true })
  @OneToOne(() => UserModel, (user) => user.avatar)
  @JoinColumn()
  user: UserModel;
}
