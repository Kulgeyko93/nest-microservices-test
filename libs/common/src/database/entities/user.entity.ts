import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { FileEntity, IUserEntityContract } from '@lib/common';
import { Field, ObjectType } from '@nestjs/graphql';
import { PostEntity } from './post.entity';

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

  @OneToMany(() => FileEntity, (file) => file.user)
  files: FileEntity[];

  @OneToMany(() => PostEntity, (post) => post.user)
  posts: PostEntity[];

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
