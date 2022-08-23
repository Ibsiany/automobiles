import { ICreateDriverDTO } from '../dtos/ICreateDriverDTO';
import { Driver } from '../infra/typeorm/entities/Driver';

export interface IDriverRepository {
  create(driver: ICreateDriverDTO): Promise<Driver>;
  delete(id: string): Promise<void>;
  update(driver: Driver): Promise<Driver>;
  findAll(): Promise<Driver[]>;
  findById(id: string): Promise<Driver>;
  findByName(name: string): Promise<Driver[]>;
}
