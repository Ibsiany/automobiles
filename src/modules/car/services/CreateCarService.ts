import { inject, injectable } from 'tsyringe';
import { ICreateCarDTO } from '../dtos/ICreateCarDTO';
import { Car } from '../infra/typeorm/entities/Car';
import { ICarRepository } from '../repositories/ICarRepository';

@injectable()
export class CreateCarService {
  constructor(
    @inject('CarRepository')
    private carRepository: ICarRepository,
  ) {}

  async execute({ board, color, brand }: ICreateCarDTO): Promise<Car> {
    if (!board || !color || !brand) {
      throw new Error('Inform all car data!');
    }

    return this.carRepository.create({
      board,
      color,
      brand,
    });
  }
}
