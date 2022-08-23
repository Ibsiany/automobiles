import { container } from 'tsyringe';
import { CarRepository } from '@modules/car/infra/typeorm/repositories/CarRepository';
import { ICarRepository } from '@modules/car/repositories/ICarRepository';

container.registerSingleton<ICarRepository>('CarRepository', CarRepository);
