import { ICreateCarUseDTO } from '@modules/car_use/dtos/ICreateCarUseDTO';
import { CarUse } from '@modules/car_use/infra/typeorm/entities/CarUse';
import { v4 as uuidV4 } from 'uuid';
import { ICarUseRepository } from '../ICarUseRepository';

export class FakeCarUseRepository implements ICarUseRepository {
  private fakeRepository: CarUse[];

  constructor(car_use?: CarUse[]) {
    this.fakeRepository = car_use || [];
  }

  async create(car_use: ICreateCarUseDTO): Promise<CarUse> {
    const newCarUse = new CarUse();

    Object.assign(newCarUse, car_use);

    newCarUse.id = uuidV4();

    if (!newCarUse.created_at) {
      newCarUse.created_at = new Date();
    }

    if (!newCarUse.updated_at) {
      newCarUse.updated_at = new Date();
    }

    this.fakeRepository.push(newCarUse);

    return newCarUse;
  }

  async update(car_use: CarUse): Promise<CarUse> {
    const oldCarUse = this.fakeRepository.find(
      foundCarUse => foundCarUse.id === car_use.id,
    );

    if (oldCarUse) {
      Object.assign(oldCarUse, car_use);
    } else {
      this.fakeRepository.push(car_use);
    }

    return car_use;
  }

  async findAll(): Promise<CarUse[]> {
    return this.fakeRepository;
  }

  async findById(id: string): Promise<CarUse> {
    return this.fakeRepository.find(car_use => car_use.id === id);
  }

  async findByDriverIdAndEndDateNull(driver_id: string): Promise<CarUse> {
    return this.fakeRepository.find(
      car_use => car_use.driver_id === driver_id && !car_use.end_date,
    );
  }

  async findByCarIdAndEndDateNull(car_id: string): Promise<CarUse> {
    return this.fakeRepository.find(
      car_use => car_use.car_id === car_id && !car_use.end_date,
    );
  }
}
