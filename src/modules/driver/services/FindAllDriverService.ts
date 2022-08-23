import { inject, injectable } from 'tsyringe';
import { Driver } from '../infra/typeorm/entities/Driver';
import { IDriverRepository } from '../repositories/IDriverRepository';

@injectable()
export class FindAllDriverService {
  constructor(
    @inject('DriverRepository')
    private driverRepository: IDriverRepository,
  ) {}

  async execute(name?: string): Promise<Driver[]> {
    if (name) {
      return this.driverRepository.findByName(name);
    }

    return this.driverRepository.findAll();
  }
}
