import { inject, injectable } from 'tsyringe';
import { Car } from '../infra/typeorm/entities/Car';
import { ICarRepository } from '../repositories/ICarRepository';

interface IResponse {
  id: string;
  board?: string;
  color?: string;
  brand?: string;
}

@injectable()
export class UpdateCarService {
  constructor(
    @inject('CarRepository')
    private carRepository: ICarRepository,
  ) {}

  async execute({ board, color, brand, id }: IResponse): Promise<Car> {
    if (!id) {
      throw new Error('Inform car id!');
    }

    if (!board && !color && !brand) {
      throw new Error('Enter any attribute of the car!');
    }

    const car = await this.carRepository.findById(id);

    if (board) {
      car.board = board;
    }

    if (color) {
      car.color = color;
    }

    if (brand) {
      car.brand = brand;
    }

    return this.carRepository.update(car);
  }
}
