import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { DoctorEntity } from './doctor.entity';

@Entity('specialties')
export class SpecialtyEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @OneToMany(() => DoctorEntity, (doctor) => doctor.specialty)
  doctors: DoctorEntity[];
}
