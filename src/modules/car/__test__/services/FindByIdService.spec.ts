import { Car } from '@modules/car/infra/typeorm/entities/Car';
import { FakeCarRepository } from '@modules/car/repositories/fakes/FakeCarRepository';
import { ICarRepository } from '@modules/car/repositories/ICarRepository';
import { FindByIdService } from '@modules/car/services/FindByIdService';

describe('Find by id service test', () => {
  let findByIdService: FindByIdService;

  let fakeCarRepository: ICarRepository;

  beforeAll(async () => {
    fakeCarRepository = new FakeCarRepository();
    findByIdService = new FindByIdService(fakeCarRepository);
  });

  it('Should be able to find by id car', async () => {
    const board = 'XXX';
    const color = 'yellow';
    const brand = 'XXXXXX';

    const car = await fakeCarRepository.create({ board, color, brand });

    const foundCarService = await findByIdService.execute(car.id);

    expect(foundCarService).toBeInstanceOf(Car);
    expect(foundCarService.color).toEqual(color);
    expect(foundCarService.board).toEqual(board);
    expect(foundCarService.brand).toEqual(brand);
  });

  it('Should not be able to find by id car', async () => {
    try {
      await findByIdService.execute(null);

      expect(true).toEqual(false);
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
      expect(error.message).toEqual('Inform car id!');
    }
  });
});
