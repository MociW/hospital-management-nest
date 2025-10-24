import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm';
import { UserEntity } from './user.entity';
import { SpecialtyEntity } from './specialty.entity';

@Entity('doctors')
export class DoctorEntity {
  @PrimaryColumn('uuid')
  id: string;

  @Column({ name: 'user_id', unique: true })
  userId: string;

  @OneToOne(() => UserEntity, (user) => user.id)
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  @Column({ name: 'specialty_id', nullable: true })
  specialtyId?: string;

  @OneToOne(() => SpecialtyEntity, (specialty) => specialty.id)
  @JoinColumn({ name: 'specialty_id' })
  specialty?: SpecialtyEntity;
}
