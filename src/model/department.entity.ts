import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('departments')
export class Department {
  @PrimaryColumn('varchar')
  id: string;

  @Column()
  code: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column({ name: 'head_id', unique: true, nullable: true, type: 'varchar' })
  headId: string | null;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updateAt: Date;

  @DeleteDateColumn({ name: 'deleted_at', type: 'timestamptz', nullable: true })
  deletedAt: Date | null;

  @Column({ name: 'created_by', unique: true })
  createdBy: string;

  @Column({ name: 'update_by', unique: true })
  updatedBy: string;

  @Column({ name: 'deleted_by', unique: true, nullable: true, type: 'varchar' })
  deletedBy: string | null;
}
