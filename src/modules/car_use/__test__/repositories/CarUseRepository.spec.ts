import { Car } from '@modules/car/infra/typeorm/entities/Car';
import { CarUse } from '@modules/car_use/infra/typeorm/entities/CarUse';
import { CarUseRepository } from '@modules/car_use/infra/typeorm/repositories/CarUseRepository';
import { ICarUseRepository } from '@modules/car_use/repositories/ICarUseRepository';
import { Driver } from '@modules/driver/infra/typeorm/entities/Driver';
import { dataSource } from '@shared/infra/typeorm';
import { Repository } from 'typeorm';

describe('Car use repository test', () => {
  let ormDriverRepository: Repository<Driver>;
  let ormCarRepository: Repository<Car>;
  let ormCarUseRepository: Repository<CarUse>;

  let carUseRepositoryRepository: ICarUseRepository;

  beforeAll(async () => {
    ormDriverRepository = dataSource.getRepository(Driver);
    ormCarRepository = dataSource.getRepository(Car);
    ormCarUseRepository = dataSource.getRepository(CarUse);

    carUseRepositoryRepository = new CarUseRepository();
  });

  afterEach(async () => {
    await ormCarUseRepository.delete({});
    await ormDriverRepository.delete({});
    await ormCarRepository.delete({});
  });

  it('Should be able to create car use', async () => {
    const name = 'XXX 1';

    const driver = ormDriverRepository.create({ name });

    await ormDriverRepository.save(driver);

    const board = 'XXX';
    const color = 'blue';
    const brand = 'XXXXXX';

    const car = ormCarRepository.create({ board, color, brand });

    await ormCarRepository.save(car);

    const reason = 'XXX 0';

    const carUse = await carUseRepositoryRepository.create({
      reason,
      car_id: car.id,
      driver_id: driver.id,
    });

    expect(carUse).toBeInstanceOf(CarUse);
    expect(carUse.car_id).toEqual(car.id);
    expect(carUse.driver_id).toEqual(driver.id);
  });

  it('Should be able to update car use', async () => {
    const name = 'XXX 1';

    const driver = ormDriverRepository.create({ name });

    await ormDriverRepository.save(driver);

    const board = 'XXX';
    const color = 'blue';
    const brand = 'XXXXXX';

    const car = ormCarRepository.create({ board, color, brand });

    await ormCarRepository.save(car);

    const reason = 'XXX 2';

    const carUse = ormCarUseRepository.create({
      reason,
      car_id: car.id,
      driver_id: driver.id,
    });

    await ormCarUseRepository.save(carUse);

    carUse.end_date = new Date();

    const updateCarUse = await carUseRepositoryRepository.update(carUse);

    expect(updateCarUse).toBeInstanceOf(CarUse);
    expect(updateCarUse.end_date).not.toBeUndefined();
  });

  it('Should be able to find all car use', async () => {
    const name = 'XXX 1';

    const driver = ormDriverRepository.create({ name });

    await ormDriverRepository.save(driver);

    const board = 'XXX';
    const color = 'blue';
    const brand = 'XXXXXX';

    const car = ormCarRepository.create({ board, color, brand });

    await ormCarRepository.save(car);

    const reason = 'XXX 3';

    const carUse = ormCarUseRepository.create({
      reason,
      car_id: car.id,
      driver_id: driver.id,
    });

    await ormCarUseRepository.save(carUse);

    const foundCarUse = await carUseRepositoryRepository.findAll();

    expect(foundCarUse[0]).toBeInstanceOf(CarUse);
    expect(foundCarUse).toHaveLength(1);
  });

  it('Should be able to find by id', async () => {
    const name = 'XXX 1';

    const driver = ormDriverRepository.create({ name });

    await ormDriverRepository.save(driver);

    const board = 'XXX';
    const color = 'blue';
    const brand = 'XXXXXX';

    const car = ormCarRepository.create({ board, color, brand });

    await ormCarRepository.save(car);

    const reason = 'XXX 3';

    const carUse = ormCarUseRepository.create({
      reason,
      car_id: car.id,
      driver_id: driver.id,
    });

    await ormCarUseRepository.save(carUse);

    const foundCarUse = await carUseRepositoryRepository.findById(carUse.id);

    expect(foundCarUse).toBeInstanceOf(CarUse);
    expect(foundCarUse.id).toEqual(carUse.id);
  });

  it('Should be able to find by driver and end date null', async () => {
    const name = 'XXX 1';

    const driver = ormDriverRepository.create({ name });

    await ormDriverRepository.save(driver);

    const board = 'XXX';
    const color = 'blue';
    const brand = 'XXXXXX';

    const car = ormCarRepository.create({ board, color, brand });

    await ormCarRepository.save(car);

    const reason = 'XXX 4';

    const carUse = ormCarUseRepository.create({
      reason,
      car_id: car.id,
      driver_id: driver.id,
    });

    await ormCarUseRepository.save(carUse);

    const foundCarUse =
      await carUseRepositoryRepository.findByDriverIdAndEndDateNull(driver.id);

    expect(foundCarUse).toBeInstanceOf(CarUse);
    expect(foundCarUse.id).toEqual(carUse.id);
    expect(foundCarUse.end_date).toBeFalsy();
  });

  it('Should be able to find by id', async () => {
    const name = 'XXX 1';

    const driver = ormDriverRepository.create({ name });

    await ormDriverRepository.save(driver);

    const board = 'XXX';
    const color = 'blue';
    const brand = 'XXXXXX';

    const car = ormCarRepository.create({ board, color, brand });

    await ormCarRepository.save(car);

    const reason = 'XXX 5';

    const carUse = ormCarUseRepository.create({
      reason,
      car_id: car.id,
      driver_id: driver.id,
    });

    await ormCarUseRepository.save(carUse);

    const foundCarUse =
      await carUseRepositoryRepository.findByCarIdAndEndDateNull(car.id);

    expect(foundCarUse).toBeInstanceOf(CarUse);
    expect(foundCarUse.id).toEqual(carUse.id);
    expect(foundCarUse.end_date).toBeFalsy();
  });
});
