import { Car } from '@modules/car/infra/typeorm/entities/Car';
import { Driver } from '@modules/driver/infra/typeorm/entities/Driver';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('car_use')
export class CarUse {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Column({ nullable: true })
  end_date: Date;

  @Column()
  reason: string;

  @Column()
  car_id: string;

  @OneToOne(() => Car)
  @JoinColumn({ name: 'car_id' })
  car: Car;

  @Column()
  driver_id: string;

  @OneToOne(() => Driver)
  @JoinColumn({ name: 'driver_id' })
  driver: Driver;
}
