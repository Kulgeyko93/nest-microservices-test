import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import {
  FileEntityContract,
  FileTypes,
  PostEntity,
  UserEntity,
} from '@lib/common';

@Entity('file')
export class FileEntity implements FileEntityContract {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'file_url' })
  fileUrl: string;

  @Column()
  type: FileTypes;

  // relations

  @Column({ name: 'user_id' })
  userId: string;

  @OneToOne(() => UserEntity, (user) => user.avatar)
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  user: UserEntity;

  @Column({ name: 'post_id', nullable: true })
  postId: string;

  @ManyToOne(() => PostEntity, (post) => post.files)
  @JoinColumn({ name: 'post_id', referencedColumnName: 'id' })
  post: PostEntity;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
