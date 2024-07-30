import { Field, ObjectType } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { FileEntity } from './file.entity';
import { UserEntity } from './user.entity';

@Entity('post')
@ObjectType()
export class PostEntity {
  @PrimaryGeneratedColumn('uuid')
  @Field()
  id: string;

  @Column({
    type: 'varchar',
    nullable: false,
  })
  @Field()
  content: string;

  // relations

  @OneToMany(() => FileEntity, (file) => file.user)
  files?: FileEntity[];

  @Column({ name: 'user_id' })
  @Field()
  userId: string;

  @ManyToOne(() => UserEntity, (user) => user.posts)
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  user: UserEntity;

  @Field()
  @CreateDateColumn()
  createdAt: Date;

  @Field()
  @UpdateDateColumn()
  updatedAt: Date;
}
