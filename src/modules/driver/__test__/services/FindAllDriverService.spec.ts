import { FakeDriverRepository } from '@modules/driver/repositories/fakes/FakeDriverRepository';
import { IDriverRepository } from '@modules/driver/repositories/IDriverRepository';
import { FindAllDriverService } from '@modules/driver/services/FindAllDriverService';

describe('Find all driver service test', () => {
  let findAllDriverService: FindAllDriverService;

  let fakeDriverRepository: IDriverRepository;

  beforeAll(async () => {
    fakeDriverRepository = new FakeDriverRepository();
    findAllDriverService = new FindAllDriverService(fakeDriverRepository);
  });

  it('Should be able to find all drivers', async () => {
    const name = 'XXX 0';

    await fakeDriverRepository.create({ name });

    const drivers = await findAllDriverService.execute();

    expect(drivers).toHaveLength(1);
    expect(drivers[0].name).toEqual(name);
  });

  it('Should be able to find all drivers by color', async () => {
    const name = 'XXX 1';

    await fakeDriverRepository.create({ name });

    const drivers = await findAllDriverService.execute(name);

    expect(drivers).toHaveLength(1);
    expect(drivers[0].name).toEqual(name);
  });
});
