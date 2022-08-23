import { Driver } from '@modules/driver/infra/typeorm/entities/Driver';
import { FakeDriverRepository } from '@modules/driver/repositories/fakes/FakeDriverRepository';
import { IDriverRepository } from '@modules/driver/repositories/IDriverRepository';
import { CreateDriverService } from '@modules/driver/services/CreateDriverService';

describe('Create driver service test', () => {
  let createDriverService: CreateDriverService;

  let fakeDriverRepository: IDriverRepository;

  beforeAll(async () => {
    fakeDriverRepository = new FakeDriverRepository();
    createDriverService = new CreateDriverService(fakeDriverRepository);
  });

  it('Should be able to create driver service', async () => {
    const name = 'XXX';

    const driver = await createDriverService.execute({ name });

    expect(driver).toBeInstanceOf(Driver);
    expect(driver.name).toEqual(name);
  });

  it('Should not be able to create driver service', async () => {
    try {
      await createDriverService.execute({ name: null });
      expect(true).toEqual(false);
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
      expect(error.message).toEqual('Inform name!');
    }
  });
});
