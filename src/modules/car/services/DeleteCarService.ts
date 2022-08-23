import { inject, injectable } from 'tsyringe';
import { ICarRepository } from '../repositories/ICarRepository';

@injectable()
export class DeleteCarService {
  constructor(
    @inject('CarRepository')
    private carRepository: ICarRepository,
  ) {}

  async execute(id: string): Promise<void> {
    if (!id) {
      throw new Error('Inform car id!');
    }

    return this.carRepository.delete(id);
  }
}
