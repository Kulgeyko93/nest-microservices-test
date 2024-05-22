import { Column, Entity, OneToOne } from 'typeorm';
import { IFileModel, IUserModel } from '@lib/common';
import { Field, ObjectType } from '@nestjs/graphql';
import { FileModel } from '@apps/feed/src/modules/upload/models/file.model';
import { BaseModel } from '@lib/common';

@Entity('user')
@ObjectType()
export class UserModel extends BaseModel implements IUserModel {
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

  @Field(() => FileModel, { nullable: true })
  @OneToOne(() => FileModel, (file) => file.user)
  avatar: IFileModel;
}
