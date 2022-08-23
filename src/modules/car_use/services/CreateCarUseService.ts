import { inject, injectable } from 'tsyringe';
import { CarUse } from '../infra/typeorm/entities/CarUse';
import { ICarUseRepository } from '../repositories/ICarUseRepository';

interface IResponse {
  reason: string;
  driver_id: string;
  car_id: string;
}

@injectable()
export class CreateCarUseService {
  constructor(
    @inject('CarUseRepository')
    private carUseRepository: ICarUseRepository,
  ) {}

  async execute({ reason, driver_id, car_id }: IResponse): Promise<CarUse> {
    if (!reason || !driver_id || !car_id) {
      throw new Error('Inform data!');
    }

    const foundCarUseByDriver =
      await this.carUseRepository.findByDriverIdAndEndDateNull(driver_id);

    if (foundCarUseByDriver) {
      throw new Error('Cannot assign a car to a busy driver!');
    }

    const foundCarUseByCar =
      await this.carUseRepository.findByCarIdAndEndDateNull(car_id);

    if (foundCarUseByCar) {
      throw new Error('It is not possible to use an occupied car!');
    }

    return this.carUseRepository.create({
      car_id,
      driver_id,
      reason,
    });
  }
}
