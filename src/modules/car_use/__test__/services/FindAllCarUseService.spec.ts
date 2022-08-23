import { FakeCarUseRepository } from '@modules/car_use/repositories/fakes/FakeCarUseRepository';
import { ICarUseRepository } from '@modules/car_use/repositories/ICarUseRepository';
import { FindAllCarUseService } from '@modules/car_use/services/FindAllCarUseService';
import { v4 as uuidV4 } from 'uuid';

describe('Find all car use service test', () => {
  let findAllCarUseService: FindAllCarUseService;

  let fakeCarUseRepository: ICarUseRepository;

  beforeAll(async () => {
    fakeCarUseRepository = new FakeCarUseRepository();
    findAllCarUseService = new FindAllCarUseService(fakeCarUseRepository);
  });

  it('Should be able to find all car use', async () => {
    const reason = 'XXX 0';
    const driverId = uuidV4();
    const carId = uuidV4();

    await fakeCarUseRepository.create({
      reason,
      driver_id: driverId,
      car_id: carId,
    });

    const carUse = await findAllCarUseService.execute();

    expect(carUse).toHaveLength(1);
    expect(carUse[0].car_id).toEqual(carId);
    expect(carUse[0].driver_id).toEqual(driverId);
    expect(carUse[0].reason).toEqual(reason);
  });
});
