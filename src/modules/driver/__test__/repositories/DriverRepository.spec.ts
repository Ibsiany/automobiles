import { Driver } from '@modules/driver/infra/typeorm/entities/Driver';
import { DriverRepository } from '@modules/driver/infra/typeorm/repositories/DriverRepository';
import { IDriverRepository } from '@modules/driver/repositories/IDriverRepository';
import { dataSource } from '@shared/infra/typeorm';
import { Repository } from 'typeorm';

describe('Driver repository test', () => {
  let ormDriverRepository: Repository<Driver>;

  let driverRepositoryRepository: IDriverRepository;

  beforeAll(async () => {
    ormDriverRepository = dataSource.getRepository(Driver);

    driverRepositoryRepository = new DriverRepository();
  });

  afterEach(async () => {
    await ormDriverRepository.delete({});
  });

  it('Should be able to create driver', async () => {
    const name = 'XXX';

    const driver = await driverRepositoryRepository.create({ name });

    expect(driver).toBeInstanceOf(Driver);
    expect(driver.name).toEqual(name);
  });

  it('Should be able to delete driver', async () => {
    const name = 'XXX 1';

    const driver = ormDriverRepository.create({ name });

    await ormDriverRepository.save(driver);

    await driverRepositoryRepository.delete(driver.id);

    const foundDriver = await driverRepositoryRepository.findById(driver.id);

    expect(foundDriver).toBe(undefined);
  });

  it('Should be able to update driver', async () => {
    const name = 'XXX 2';

    const driver = ormDriverRepository.create({ name });

    await ormDriverRepository.save(driver);

    driver.name = 'YYY 2';

    const updateDriver = await driverRepositoryRepository.update(driver);

    expect(updateDriver).toBeInstanceOf(Driver);
    expect(driver.name).toEqual('YYY 2');
  });

  it('Should be able to find all driver', async () => {
    const name = 'XXX 3';

    const driver = ormDriverRepository.create({ name });

    await ormDriverRepository.save(driver);

    const drivers = await driverRepositoryRepository.findAll();

    expect(drivers[0]).toBeInstanceOf(Driver);
    expect(drivers).toHaveLength(1);
  });

  it('Should be able to find by name', async () => {
    const name = 'XXX 4';

    const driver = ormDriverRepository.create({ name });

    await ormDriverRepository.save(driver);

    const drivers = await driverRepositoryRepository.findByName(name);

    expect(drivers[0]).toBeInstanceOf(Driver);
    expect(drivers).toHaveLength(1);
  });

  it('Should be able to find by ID', async () => {
    const name = 'XXX 4';

    const driver = ormDriverRepository.create({ name });

    await ormDriverRepository.save(driver);

    const foundDriver = await driverRepositoryRepository.findById(driver.id);

    expect(foundDriver).toBeInstanceOf(Driver);
    expect(foundDriver.id).toEqual(driver.id);
  });
});
