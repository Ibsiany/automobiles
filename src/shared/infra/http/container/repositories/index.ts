import { container } from 'tsyringe';
import { CarRepository } from '@modules/car/infra/typeorm/repositories/CarRepository';
import { ICarRepository } from '@modules/car/repositories/ICarRepository';
import { ICarUseRepository } from '@modules/car_use/repositories/ICarUseRepository';
import { CarUseRepository } from '@modules/car_use/infra/typeorm/repositories/CarUseRepository';
import { IDriverRepository } from '@modules/driver/repositories/IDriverRepository';
import { DriverRepository } from '@modules/driver/infra/typeorm/repositories/DriverRepository';

container.registerSingleton<ICarRepository>('CarRepository', CarRepository);

container.registerSingleton<IDriverRepository>(
  'DriverRepository',
  DriverRepository,
);

container.registerSingleton<ICarUseRepository>(
  'CarUseRepository',
  CarUseRepository,
);
