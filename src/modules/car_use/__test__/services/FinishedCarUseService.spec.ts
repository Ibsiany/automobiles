import { Car } from '@modules/car/infra/typeorm/entities/Car';
import { CarUse } from '@modules/car_use/infra/typeorm/entities/CarUse';
import { FakeCarUseRepository } from '@modules/car_use/repositories/fakes/FakeCarUseRepository';
import { ICarUseRepository } from '@modules/car_use/repositories/ICarUseRepository';
import { FinishedCarUseService } from '@modules/car_use/services/FinishedCarUseService';
import { Driver } from '@modules/driver/infra/typeorm/entities/Driver';
import { v4 as uuidV4 } from 'uuid';

describe('Finished car use service test', () => {
  let finishedCarUseService: FinishedCarUseService;

  let fakeCarUseRepository: ICarUseRepository;

  let carUseTest1: CarUse;

  beforeAll(async () => {
    carUseTest1 = new CarUse();

    Object.assign(carUseTest1, {
      id: uuidV4(),
      reason: 'XXX 0',
      car_id: uuidV4(),
      driver_id: uuidV4(),
      car: new Car(),
      drive: new Driver(),
    });

    fakeCarUseRepository = new FakeCarUseRepository([carUseTest1]);
    finishedCarUseService = new FinishedCarUseService(fakeCarUseRepository);
  });

  it('Should be able to finished car use', async () => {
    const updatedDriver = await finishedCarUseService.execute(carUseTest1.id);

    expect(updatedDriver).toBeInstanceOf(CarUse);
    expect(updatedDriver.end_date).not.toBeUndefined();
  });

  it('Should not be able to finished car use with id null', async () => {
    try {
      await finishedCarUseService.execute(null);

      expect(true).toEqual(false);
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
      expect(error.message).toEqual('Inform car use id!');
    }
  });

  it('Should not be able to finished car use', async () => {
    try {
      await finishedCarUseService.execute('123456');

      expect(true).toEqual(false);
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
      expect(error.message).toEqual('Car use invalid!');
    }
  });
});
