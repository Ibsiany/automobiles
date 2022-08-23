import { Car } from '@modules/car/infra/typeorm/entities/Car';
import { Driver } from 'typeorm';

export interface ICreateCarUseDTO {
  end_date?: Date;
  reason: string;
  car_id: string;
  car?: Car;
  driver_id: string;
  driver?: Driver;
}
