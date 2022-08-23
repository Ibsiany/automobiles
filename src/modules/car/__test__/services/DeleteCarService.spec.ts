import { FakeCarRepository } from '@modules/car/repositories/fakes/FakeCarRepository';
import { ICarRepository } from '@modules/car/repositories/ICarRepository';
import { DeleteCarService } from '@modules/car/services/DeleteCarService';

describe('Delete car service test', () => {
  let deleteCarService: DeleteCarService;

  let fakeCarRepository: ICarRepository;

  beforeAll(async () => {
    fakeCarRepository = new FakeCarRepository();
    deleteCarService = new DeleteCarService(fakeCarRepository);
  });

  it('Should be able to delete car', async () => {
    const board = 'XXX';
    const color = 'blue';
    const brand = 'XXXXXX';

    const car = await fakeCarRepository.create({ board, color, brand });

    await deleteCarService.execute(car.id);

    const foundCar = await fakeCarRepository.findById(car.id);

    expect(foundCar).toBeUndefined();
  });

  it('Should not be able to delete car', async () => {
    try {
      await deleteCarService.execute(null);

      expect(true).toEqual(false);
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
      expect(error.message).toEqual('Inform car id!');
    }
  });
});
