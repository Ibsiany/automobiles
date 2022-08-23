import { inject, injectable } from 'tsyringe';
import { Driver } from '../infra/typeorm/entities/Driver';
import { IDriverRepository } from '../repositories/IDriverRepository';

@injectable()
export class FindByIdService {
  constructor(
    @inject('DriverRepository')
    private driverRepository: IDriverRepository,
  ) {}

  async execute(id: string): Promise<Driver> {
    if (!id) {
      throw new Error('Inform driver id!');
    }

    return this.driverRepository.findById(id);
  }
}
