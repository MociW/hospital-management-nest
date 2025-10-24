import { Column, ManyToOne, PrimaryColumn } from 'typeorm';
import { User } from './user.entity';

export class Record {
  @PrimaryColumn('uuid')
  id: string;

  @Column()
  filename: string;

  @Column()
  mimetype: string;

  @Column()
  storageUrl: string;

  @ManyToOne(() => User, (user) => user.id)
  uploadedBy: string;

  @Column()
  createdAt: Date;
}
