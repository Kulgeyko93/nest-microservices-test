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
import { UserEntity } from '@apps/account/src/user/entities/user.model';

@Entity('file')
export class FileEntity implements FileEntityContract {
  @Column()
  fileUrl: string;

  @Column()
  type: string;

  @Column({ name: 'user_id' })
  userId: string;

  @OneToOne(() => UserEntity, (user) => user.avatar)
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  user: UserEntity;

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
