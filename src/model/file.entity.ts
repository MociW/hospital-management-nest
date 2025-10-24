import { Column, ManyToOne, PrimaryColumn } from 'typeorm';
import { UserEntity } from './user.entity';

export class FileEntity {
  @PrimaryColumn('uuid')
  id: string;

  @Column()
  filename: string;

  @Column()
  mimetype: string;

  @Column()
  storageUrl: string;

  @ManyToOne(() => UserEntity, (user) => user.id)
  uploadedBy: string;

  @Column()
  createdAt: Date;
}
