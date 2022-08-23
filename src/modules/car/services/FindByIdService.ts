import { inject, injectable } from 'tsyringe';
import { Car } from '../infra/typeorm/entities/Car';
import { ICarRepository } from '../repositories/ICarRepository';

@injectable()
export class FindByIdService {
  constructor(
    @inject('CarRepository')
    private carRepository: ICarRepository,
  ) {}

  async execute(id: string): Promise<Car> {
    if (!id) {
      throw new Error('Inform car id!');
    }

    return this.carRepository.findById(id);
  }
}
