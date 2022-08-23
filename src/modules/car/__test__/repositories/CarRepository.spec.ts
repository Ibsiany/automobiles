import { Car } from '@modules/car/infra/typeorm/entities/Car';
import { CarRepository } from '@modules/car/infra/typeorm/repositories/CarRepository';
import { ICarRepository } from '@modules/car/repositories/ICarRepository';
import { dataSource } from '@shared/infra/typeorm';
import { Repository } from 'typeorm';

describe('Car repository test', () => {
  let ormCarRepository: Repository<Car>;

  let carRepositoryRepository: ICarRepository;

  beforeAll(async () => {
    ormCarRepository = dataSource.getRepository(Car);

    carRepositoryRepository = new CarRepository();
  });

  afterEach(async () => {
    await ormCarRepository.delete({});
  });

  it('Should be able to create car', async () => {
    const board = 'XXX';
    const color = 'blue';
    const brand = 'XXXXXX';

    const car = await carRepositoryRepository.create({ board, color, brand });

    expect(car).toBeInstanceOf(Car);
    expect(car.color).toEqual(color);
    expect(car.board).toEqual(board);
    expect(car.brand).toEqual(brand);
  });
});
