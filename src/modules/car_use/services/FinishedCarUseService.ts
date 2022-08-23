import { inject, injectable } from 'tsyringe';
import { CarUse } from '../infra/typeorm/entities/CarUse';
import { ICarUseRepository } from '../repositories/ICarUseRepository';

@injectable()
export class FinishedCarUseService {
  constructor(
    @inject('CarUseRepository')
    private carUseRepository: ICarUseRepository,
  ) {}

  async execute(id: string): Promise<CarUse> {
    if (!id) {
      throw new Error('Inform car use id!');
    }

    const carUse = await this.carUseRepository.findById(id);

    if (!carUse) {
      throw new Error('Car use invalid!');
    }

    carUse.end_date = new Date();

    return this.carUseRepository.update(carUse);
  }
}
