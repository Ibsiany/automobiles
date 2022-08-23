import { inject, injectable } from 'tsyringe';
import { ICreateDriverDTO } from '../dtos/ICreateDriverDTO';
import { Driver } from '../infra/typeorm/entities/Driver';
import { IDriverRepository } from '../repositories/IDriverRepository';

@injectable()
export class CreateDriverService {
  constructor(
    @inject('DriverRepository')
    private driverRepository: IDriverRepository,
  ) {}

  async execute({ name }: ICreateDriverDTO): Promise<Driver> {
    if (!name) {
      throw new Error('Inform name!');
    }

    return this.driverRepository.create({
      name,
    });
  }
}
