import { dataSource } from '@shared/infra/typeorm';
import { Repository } from 'typeorm';
import { IDriverRepository } from '@modules/driver/repositories/IDriverRepository';
import { ICreateDriverDTO } from '@modules/driver/dtos/ICreateDriverDTO';
import { Driver } from '../entities/Driver';

export class DriverRepository implements IDriverRepository {
  private ormRepository: Repository<Driver>;

  constructor() {
    this.ormRepository = dataSource.getRepository(Driver);
  }

  async create(driver: ICreateDriverDTO): Promise<Driver> {
    const newDriver = this.ormRepository.create(driver);

    return this.ormRepository.save(newDriver);
  }

  async delete(id: string): Promise<void> {
    await this.ormRepository.delete(id);
  }

  async update(driver: Driver): Promise<Driver> {
    return this.ormRepository.save(driver);
  }

  async findAll(): Promise<Driver[]> {
    return this.ormRepository.find();
  }

  async findByName(name: string): Promise<Driver[]> {
    return this.ormRepository.find({
      where: { name },
    });
  }

  async findById(id: string): Promise<Driver> {
    const [car] = await this.ormRepository.find({
      where: { id },
    });

    return car;
  }
}
