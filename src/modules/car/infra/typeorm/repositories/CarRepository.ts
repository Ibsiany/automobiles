import { ICarRepository } from '@modules/car/repositories/ICarRepository';
import { dataSource } from '@shared/infra/typeorm';
import { Repository } from 'typeorm';
import { ICreateCarDTO } from '@modules/car/dtos/ICreateCarDTO';
import { Car } from '../entities/Car';

export class CarRepository implements ICarRepository {
  private ormRepository: Repository<Car>;

  constructor() {
    this.ormRepository = dataSource.getRepository(Car);
  }

  async create(car: ICreateCarDTO): Promise<Car> {
    const newCar = this.ormRepository.create(car);

    return this.ormRepository.save(newCar);
  }

  async delete(id: string): Promise<void> {
    await this.ormRepository.delete(id);
  }

  async update(car: Car): Promise<Car> {
    return this.ormRepository.save(car);
  }

  async findAll(): Promise<Car[]> {
    return this.ormRepository.find();
  }

  async findAllByColor(color: string): Promise<Car[]> {
    return this.ormRepository.find({
      where: { color },
    });
  }

  async findAllByBrand(brand: string): Promise<Car[]> {
    return this.ormRepository.find({
      where: { brand },
    });
  }

  async findById(id: string): Promise<Car> {
    const [car] = await this.ormRepository.find({
      where: { id },
    });

    return car;
  }

  async findAllByBrandAndColor(brand: string, color: string): Promise<Car[]> {
    return this.ormRepository.find({
      where: { brand, color },
    });
  }
}
