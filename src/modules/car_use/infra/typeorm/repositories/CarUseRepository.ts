import { ICreateCarUseDTO } from '@modules/car_use/dtos/ICreateCarUseDTO';
import { ICarUseRepository } from '@modules/car_use/repositories/ICarUseRepository';
import { dataSource } from '@shared/infra/typeorm';
import { IsNull, Repository } from 'typeorm';
import { CarUse } from '../entities/CarUse';

export class CarUseRepository implements ICarUseRepository {
  private ormRepository: Repository<CarUse>;

  constructor() {
    this.ormRepository = dataSource.getRepository(CarUse);
  }

  async create(car_use: ICreateCarUseDTO): Promise<CarUse> {
    const carUseCreated = new CarUse();

    Object.assign(carUseCreated, car_use);

    const carUse = this.ormRepository.create(carUseCreated);

    return this.ormRepository.save(carUse);
  }

  async update(car_use: CarUse): Promise<CarUse> {
    return this.ormRepository.save(car_use);
  }

  async findAll(): Promise<CarUse[]> {
    return this.ormRepository.find({
      relations: {
        car: true,
        driver: true,
      },
    });
  }

  async findById(id: string): Promise<CarUse> {
    const [caruse] = await this.ormRepository.find({
      where: { id },
    });

    return caruse;
  }

  async findByDriverIdAndEndDateNull(driver_id: string): Promise<CarUse> {
    const [carUse] = await this.ormRepository.find({
      where: { driver_id, end_date: IsNull() },
    });

    return carUse;
  }

  async findByCarIdAndEndDateNull(car_id: string): Promise<CarUse> {
    const [carUse] = await this.ormRepository.find({
      where: { car_id, end_date: IsNull() },
    });

    return carUse;
  }
}
