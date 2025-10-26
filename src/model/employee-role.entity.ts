import { Entity, PrimaryColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('employee_roles')
export class EmployeeRole {
  @PrimaryColumn('uuid')
  employee_id: string;

  @PrimaryColumn('uuid')
  role_id: string;

  @CreateDateColumn({
    type: 'timestamptz',
    default: () => 'now()',
  })
  assigned_at: Date;

  @Column('uuid', { nullable: true })
  assigned_by: string | null;
}
