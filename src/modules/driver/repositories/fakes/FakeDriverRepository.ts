import { ICreateDriverDTO } from '@modules/driver/dtos/ICreateDriverDTO';
import { Driver } from '@modules/driver/infra/typeorm/entities/Driver';
import { v4 as uuidV4 } from 'uuid';
import { IDriverRepository } from '../IDriverRepository';

export class FakeDriverRepository implements IDriverRepository {
  private fakeRepository: Driver[];

  constructor(drivers?: Driver[]) {
    this.fakeRepository = drivers || [];
  }

  async create(car: ICreateDriverDTO): Promise<Driver> {
    const newCar = new Driver();

    Object.assign(newCar, car);

    newCar.id = uuidV4();

    if (!newCar.created_at) {
      newCar.created_at = new Date();
    }

    if (!newCar.updated_at) {
      newCar.updated_at = new Date();
    }

    this.fakeRepository.push(newCar);

    return newCar;
  }

  async delete(id: string): Promise<void> {
    const cars = this.fakeRepository.filter(car => car.id !== id);

    this.fakeRepository = cars;
  }

  async update(driver: Driver): Promise<Driver> {
    const oldDriver = this.fakeRepository.find(
      foundDriver => foundDriver.id === driver.id,
    );

    if (oldDriver) {
      Object.assign(oldDriver, driver);
    } else {
      this.fakeRepository.push(driver);
    }

    return driver;
  }

  async findAll(): Promise<Driver[]> {
    return this.fakeRepository;
  }

  async findByName(name: string): Promise<Driver[]> {
    return this.fakeRepository.filter(driver => driver.name === name);
  }

  async findById(id: string): Promise<Driver> {
    return this.fakeRepository.find(driver => driver.id === id);
  }
}
