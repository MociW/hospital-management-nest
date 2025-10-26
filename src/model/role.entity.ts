import {
  Column,
  DeleteDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('roles')
export class Role {
  @PrimaryColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  text: string;

  @Column()
  isSystem: boolean;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updateDate: Date;

  @DeleteDateColumn({ name: 'deleted_at', type: 'timestamptz' })
  deletedAt: Date;

  @Column({ name: 'created_by', unique: true })
  createdBy: string;
}
