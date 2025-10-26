import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { EmploymentStatus, Gender, UserStatus } from './enum.entity';

@Entity()
export class Employee {
  @PrimaryColumn('uuid')
  id: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  fullName: string;

  @Column({ type: 'timestamptz', nullable: false })
  datOfBirth: Date;

  @Column()
  gender: Gender;

  @Column()
  phone: string;

  @Column()
  citizenId: string;

  @Column()
  employeeCode: string;

  @Column({ name: 'department_id', unique: true })
  departmentId: string;

  @Column({ type: 'enum', enum: UserStatus })
  userStatus: UserStatus;

  @Column({ type: 'enum', enum: EmploymentStatus })
  employmentStatus: EmploymentStatus;

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

  @Column()
  token: string;
}
