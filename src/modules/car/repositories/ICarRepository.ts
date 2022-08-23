import { ICreateCarDTO } from '../dtos/ICreateCarDTO';
import { Car } from '../infra/typeorm/entities/Car';

export interface ICarRepository {
  create(car: ICreateCarDTO): Promise<Car>;
  delete(id: string): Promise<void>;
  update(car: Car): Promise<Car>;
  findAll(): Promise<Car[]>;
  findAllByColor(color: string): Promise<Car[]>;
  findAllByBrand(brand: string): Promise<Car[]>;
  findAllByBrandAndColor(brand: string, color: string): Promise<Car[]>;
  findById(id: string): Promise<Car>;
}
