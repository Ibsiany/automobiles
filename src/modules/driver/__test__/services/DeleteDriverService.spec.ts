import { FakeDriverRepository } from '@modules/driver/repositories/fakes/FakeDriverRepository';
import { IDriverRepository } from '@modules/driver/repositories/IDriverRepository';
import { DeleteDriverService } from '@modules/driver/services/DeleteDriverService';

describe('Delete driver service test', () => {
  let deleteDriverService: DeleteDriverService;

  let fakeDriverRepository: IDriverRepository;

  beforeAll(async () => {
    fakeDriverRepository = new FakeDriverRepository();
    deleteDriverService = new DeleteDriverService(fakeDriverRepository);
  });

  it('Should be able to delete driver', async () => {
    const name = 'XXX';

    const driver = await fakeDriverRepository.create({ name });

    await deleteDriverService.execute(driver.id);

    const foundDriver = await fakeDriverRepository.findById(driver.id);

    expect(foundDriver).toBeUndefined();
  });

  it('Should not be able to delete driver', async () => {
    try {
      await deleteDriverService.execute(null);

      expect(true).toEqual(false);
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
      expect(error.message).toEqual('Inform driver id!');
    }
  });
});
