import { inject, injectable } from 'tsyringe';
import { CarUse } from '../infra/typeorm/entities/CarUse';
import { ICarUseRepository } from '../repositories/ICarUseRepository';

@injectable()
export class FindAllCarUseService {
  constructor(
    @inject('CarUseRepository')
    private carUseRepository: ICarUseRepository,
  ) {}

  async execute(): Promise<CarUse[]> {
    return this.carUseRepository.findAll();
  }
}
