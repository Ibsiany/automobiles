import { ICreateCarDTO } from '@modules/car/dtos/ICreateCarDTO';
import { Car } from '@modules/car/infra/typeorm/entities/Car';
import { v4 as uuidV4 } from 'uuid';
import { ICarRepository } from '../ICarRepository';

export class FakeCarRepository implements ICarRepository {
  private fakeRepository: Car[];

  constructor(cars?: Car[]) {
    this.fakeRepository = cars || [];
  }

  async create(car: ICreateCarDTO): Promise<Car> {
    const newCar = new Car();

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

  async update(car: Car): Promise<Car> {
    const oldCar = this.fakeRepository.find(foundCar => foundCar.id === car.id);

    if (oldCar) {
      Object.assign(oldCar, car);
    } else {
      this.fakeRepository.push(car);
    }

    return car;
  }

  async findAll(): Promise<Car[]> {
    return this.fakeRepository;
  }

  async findAllByColor(color: string): Promise<Car[]> {
    return this.fakeRepository.filter(car => car.color === color);
  }

  async findAllByBrand(brand: string): Promise<Car[]> {
    return this.fakeRepository.filter(car => car.brand === brand);
  }

  async findById(id: string): Promise<Car> {
    return this.fakeRepository.find(car => car.id === id);
  }

  async findAllByBrandAndColor(brand: string, color: string): Promise<Car[]> {
    return this.fakeRepository.filter(
      car => car.brand === brand && car.color === color,
    );
  }
}
