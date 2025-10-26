import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Department {
  @PrimaryColumn('uuid')
  id: string;

  @Column()
  code: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column({ name: 'head_id', unique: true })
  headId: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createDate: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updateDate: Date;

  @DeleteDateColumn({ name: 'deleted_at', type: 'timestamptz' })
  deletedAt: Date;

  @Column({ name: 'created_by', unique: true })
  createdBy: string;

  @Column({ name: 'update_by', unique: true })
  updatedBy: string;

  @Column({ name: 'deleted_by', unique: true })
  deletedBy: string;
}
