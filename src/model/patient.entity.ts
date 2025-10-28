import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('patients')
export class Patient {
  @PrimaryColumn('uuid')
  id: string;

  @Column({ name: 'user_id', unique: true })
  userId: string;

  @Column({ unique: true })
  mrn: string;

}
