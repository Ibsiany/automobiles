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

  it('Should be able to delete driver', async () => {
    const board = 'XXX';
    const color = 'blue';
    const brand = 'XXXXXX';

    const car = ormCarRepository.create({ board, color, brand });

    await ormCarRepository.save(car);

    await carRepositoryRepository.delete(car.id);

    const foundCar = await carRepositoryRepository.findById(car.id);

    expect(foundCar).toBe(undefined);
  });

  it('Should be able to update car', async () => {
    const board = 'XXX';
    const color = 'blue';
    const brand = 'XXXXXX';

    const car = ormCarRepository.create({ board, color, brand });

    await ormCarRepository.save(car);

    car.board = 'YYY 2';

    const updateCar = await carRepositoryRepository.update(car);

    expect(updateCar).toBeInstanceOf(Car);
    expect(car.board).toEqual('YYY 2');
  });

  it('Should be able to find all car', async () => {
    const board = 'XXX 2';
    const color = 'blue';
    const brand = 'XXXXXX 2';

    const car = ormCarRepository.create({ board, color, brand });

    await ormCarRepository.save(car);

    const cars = await carRepositoryRepository.findAll();

    expect(cars[0]).toBeInstanceOf(Car);
    expect(cars).toHaveLength(1);
  });

  it('Should be able to find by brand', async () => {
    const board = 'XXX 3';
    const color = 'blue';
    const brand = 'XXXXXX 3';

    const car = ormCarRepository.create({ board, color, brand });

    await ormCarRepository.save(car);

    const cars = await carRepositoryRepository.findAllByBrand(brand);

    expect(cars[0]).toBeInstanceOf(Car);
    expect(cars).toHaveLength(1);
  });

  it('Should be able to find by color', async () => {
    const board = 'XXX 4';
    const color = 'blue';
    const brand = 'XXXXXX 4';

    const car = ormCarRepository.create({ board, color, brand });

    await ormCarRepository.save(car);

    const cars = await carRepositoryRepository.findAllByColor(color);

    expect(cars[0]).toBeInstanceOf(Car);
    expect(cars).toHaveLength(1);
  });

  it('Should be able to find by brand and color', async () => {
    const board = 'XXX 5';
    const color = 'blue';
    const brand = 'XXXXXX 5';

    const car = ormCarRepository.create({ board, color, brand });

    await ormCarRepository.save(car);

    const cars = await carRepositoryRepository.findAllByBrandAndColor(
      brand,
      color,
    );

    expect(cars[0]).toBeInstanceOf(Car);
    expect(cars).toHaveLength(1);
  });

  it('Should be able to find by ID', async () => {
    const board = 'XXX 6';
    const color = 'blue';
    const brand = 'XXXXXX 6';

    const car = ormCarRepository.create({ board, color, brand });

    await ormCarRepository.save(car);

    const foundCar = await carRepositoryRepository.findById(car.id);

    expect(foundCar).toBeInstanceOf(Car);
    expect(foundCar.id).toEqual(car.id);
  });
});
