import { Driver } from '@modules/driver/infra/typeorm/entities/Driver';
import { FakeDriverRepository } from '@modules/driver/repositories/fakes/FakeDriverRepository';
import { IDriverRepository } from '@modules/driver/repositories/IDriverRepository';
import { FindByIdService } from '@modules/driver/services/FindByIdService';

describe('Find by id service test', () => {
  let findByIdService: FindByIdService;

  let fakeDriverRepository: IDriverRepository;

  beforeAll(async () => {
    fakeDriverRepository = new FakeDriverRepository();
    findByIdService = new FindByIdService(fakeDriverRepository);
  });

  it('Should be able to find by id driver', async () => {
    const name = 'XXX';

    const car = await fakeDriverRepository.create({ name });

    const foundCarService = await findByIdService.execute(car.id);

    expect(foundCarService).toBeInstanceOf(Driver);
    expect(foundCarService.name).toEqual(name);
  });

  it('Should not be able to find by id driver', async () => {
    try {
      await findByIdService.execute(null);

      expect(true).toEqual(false);
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
      expect(error.message).toEqual('Inform driver id!');
    }
  });
});
