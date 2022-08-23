import { inject, injectable } from 'tsyringe';
import { Driver } from '../infra/typeorm/entities/Driver';
import { IDriverRepository } from '../repositories/IDriverRepository';

interface IResponse {
  id: string;
  name: string;
}

@injectable()
export class UpdateDriverService {
  constructor(
    @inject('DriverRepository')
    private driverRepository: IDriverRepository,
  ) {}

  async execute({ name, id }: IResponse): Promise<Driver> {
    if (!id) {
      throw new Error('Inform driver id!');
    }

    if (!name) {
      throw new Error('Enter any attribute of the driver!');
    }

    const driver = await this.driverRepository.findById(id);

    driver.name = name;

    return this.driverRepository.update(driver);
  }
}
