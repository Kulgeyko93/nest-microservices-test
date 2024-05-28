import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { IUserEntityContract } from '@lib/common';
import { Field, ObjectType } from '@nestjs/graphql';
import { PostEntity } from './post.entity';
import { FileEntity } from './file.entity';

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

  @OneToOne(() => FileEntity, (file) => file.user)
  avatar: FileEntity;

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
