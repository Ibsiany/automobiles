import { ICreateCarUseDTO } from '../dtos/ICreateCarUseDTO';
import { CarUse } from '../infra/typeorm/entities/CarUse';

export interface ICarUseRepository {
  create(car_use: ICreateCarUseDTO): Promise<CarUse>;
  update(car_use: CarUse): Promise<CarUse>;
  findAll(): Promise<CarUse[]>;
  findById(id: string): Promise<CarUse>;
  findByDriverIdAndEndDateNull(driver_id: string): Promise<CarUse>;
  findByCarIdAndEndDateNull(car_id: string): Promise<CarUse>;
}
