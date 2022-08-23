import { CarUse } from '@modules/car_use/infra/typeorm/entities/CarUse';
import { FakeCarUseRepository } from '@modules/car_use/repositories/fakes/FakeCarUseRepository';
import { ICarUseRepository } from '@modules/car_use/repositories/ICarUseRepository';
import { CreateCarUseService } from '@modules/car_use/services/CreateCarUseService';
import { v4 as uuidV4 } from 'uuid';

describe('Create car use service test', () => {
  let createCarUseService: CreateCarUseService;

  let fakeCarUseRepository: ICarUseRepository;

  beforeAll(async () => {
    fakeCarUseRepository = new FakeCarUseRepository();
    createCarUseService = new CreateCarUseService(fakeCarUseRepository);
  });

  it('Should be able to create car use', async () => {
    const reason = 'XXX 0';
    const driverId = uuidV4();
    const carId = uuidV4();

    const carUse = await createCarUseService.execute({
      reason,
      car_id: carId,
      driver_id: driverId,
    });

    expect(carUse).toBeInstanceOf(CarUse);
    expect(carUse.car_id).toEqual(carId);
    expect(carUse.driver_id).toEqual(driverId);
  });

  it('Should not be able to create car use without params', async () => {
    try {
      await createCarUseService.execute({
        reason: null,
        car_id: null,
        driver_id: null,
      });

      expect(true).toEqual(false);
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
      expect(error.message).toEqual('Inform data!');
    }
  });

  it('Should not be able to create car use with driver already exists', async () => {
    try {
      const reason = 'XXX 0';
      const driverId = uuidV4();
      const carId = uuidV4();

      await fakeCarUseRepository.create({
        reason,
        driver_id: driverId,
        car_id: carId,
      });

      await createCarUseService.execute({
        reason: 'xxx',
        driver_id: driverId,
        car_id: 'test',
      });

      expect(true).toEqual(false);
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
      expect(error.message).toEqual('Cannot assign a car to a busy driver!');
    }
  });

  it('Should not be able to create car use with car already exists', async () => {
    try {
      const reason = 'XXX 1';
      const driverId = uuidV4();
      const carId = uuidV4();

      await fakeCarUseRepository.create({
        reason,
        driver_id: driverId,
        car_id: carId,
      });

      const aq = await createCarUseService.execute({
        reason: 'xxx',
        driver_id: 'test',
        car_id: carId,
      });

      console.log(aq);

      expect(true).toEqual(false);
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
      expect(error.message).toEqual(
        'It is not possible to use an occupied car!',
      );
    }
  });
});
