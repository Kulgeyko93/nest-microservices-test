import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { FileEntityContract } from '@lib/common';
import { Field, ObjectType } from '@nestjs/graphql';
import { UserEntity } from '@apps/account/src/user/entities/user.model';

@Entity('file')
@ObjectType()
export class FileEntity implements FileEntityContract {
  @Field({ description: 'File url' })
  @Column()
  fileUrl: string;

  @Field({ description: 'File type' })
  @Column()
  type: string;

  @Field()
  @Column({ name: 'user_id' })
  userId: string;

  // @Field(() => UserEntity, { nullable: true })
  @OneToOne(() => UserEntity, (user) => user.avatar)
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  user: UserEntity;

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
