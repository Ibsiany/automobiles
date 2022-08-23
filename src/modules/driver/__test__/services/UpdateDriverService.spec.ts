import { Driver } from '@modules/driver/infra/typeorm/entities/Driver';
import { FakeDriverRepository } from '@modules/driver/repositories/fakes/FakeDriverRepository';
import { IDriverRepository } from '@modules/driver/repositories/IDriverRepository';
import { UpdateDriverService } from '@modules/driver/services/UpdateDriverService';

describe('Update driver service test', () => {
  let updateDriverService: UpdateDriverService;

  let fakeDriverRepository: IDriverRepository;

  beforeAll(async () => {
    fakeDriverRepository = new FakeDriverRepository();
    updateDriverService = new UpdateDriverService(fakeDriverRepository);
  });

  it('Should be able to update driver with name', async () => {
    const name = 'XXX 0';

    const driver = await fakeDriverRepository.create({ name });

    const updatedDriver = await updateDriverService.execute({
      id: driver.id,
      name: 'YYY 0',
    });

    expect(updatedDriver).toBeInstanceOf(Driver);
    expect(updatedDriver.name).toEqual('YYY 0');
  });

  it('Should not be able to update driver', async () => {
    try {
      await updateDriverService.execute({
        id: null,
        name: null,
      });

      expect(true).toEqual(false);
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
      expect(error.message).toEqual('Inform driver id!');
    }
  });

  it('Should not be able to update driver', async () => {
    try {
      await updateDriverService.execute({
        id: '123',
        name: null,
      });

      expect(true).toEqual(false);
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
      expect(error.message).toEqual('Enter any attribute of the driver!');
    }
  });
});
