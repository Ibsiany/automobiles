import { inject, injectable } from 'tsyringe';
import { Car } from '../infra/typeorm/entities/Car';
import { ICarRepository } from '../repositories/ICarRepository';

interface IResponse {
  color?: string;
  brand?: string;
}

@injectable()
export class FindAllCarService {
  constructor(
    @inject('CarRepository')
    private carRepository: ICarRepository,
  ) {}

  async execute({ color, brand }: IResponse): Promise<Car[]> {
    if (color && brand) {
      return this.carRepository.findAllByBrandAndColor(brand, color);
    }

    if (color && !brand) {
      return this.carRepository.findAllByColor(color);
    }

    if (!color && brand) {
      return this.carRepository.findAllByBrand(brand);
    }

    return this.carRepository.findAll();
  }
}
