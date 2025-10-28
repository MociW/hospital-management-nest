import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { EmploymentStatus, Gender, UserStatus } from './enum.entity';

@Entity('employees')
export class Employee {
  @PrimaryColumn('uuid')
  id: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ name: 'full_name' })
  fullName: string;

  @Column({ name: 'date_of_birth', type: 'timestamptz', nullable: false })
  dateOfBirth: Date;

  @Column({ type: 'enum', enum: Gender })
  gender: Gender;

  @Column({ nullable: true, type: 'varchar' })
  phone: string | null;

  @Column({ name: 'citizen_id' })
  citizenId: string;

  @Column({ name: 'employee_code' })
  employeeCode: string;

  @Column({ name: 'department_id', nullable: true, type: 'uuid' })
  departmentId?: string | null;

  @Column({ name: 'user_status', type: 'enum', enum: UserStatus })
  userStatus: UserStatus;

  @Column({ name: 'employment_status', type: 'enum', enum: EmploymentStatus })
  employmentStatus: EmploymentStatus;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updateAt: Date;

  @DeleteDateColumn({ name: 'deleted_at', type: 'timestamptz', nullable: true })
  deletedAt?: Date;

  @Column({ name: 'created_by', type: 'uuid', nullable: true })
  createdBy?: string | null;

  @Column({ name: 'updated_by', type: 'uuid', nullable: true })
  updatedBy?: string | null;

  @Column({ name: 'deleted_by', type: 'uuid', nullable: true })
  deletedBy?: string | null;

  @Column({ nullable: true, type: 'uuid' })
  token?: string | null;
}
