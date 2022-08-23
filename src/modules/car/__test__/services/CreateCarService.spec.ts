import { Car } from '@modules/car/infra/typeorm/entities/Car';
import { FakeCarRepository } from '@modules/car/repositories/fakes/FakeCarRepository';
import { ICarRepository } from '@modules/car/repositories/ICarRepository';
import { CreateCarService } from '@modules/car/services/CreateCarService';

describe('Create car service test', () => {
  let createCarService: CreateCarService;

  let fakeCarRepository: ICarRepository;

  beforeAll(async () => {
    fakeCarRepository = new FakeCarRepository();
    createCarService = new CreateCarService(fakeCarRepository);
  });

  it('Should be able to create car service', async () => {
    const board = 'XXX';
    const color = 'blue';
    const brand = 'XXXXXX';

    const car = await createCarService.execute({ board, color, brand });

    expect(car).toBeInstanceOf(Car);
    expect(car.color).toEqual(color);
    expect(car.board).toEqual(board);
    expect(car.brand).toEqual(brand);
  });

  it('Should not be able to create car service', async () => {
    try {
      const board = 'XXX';
      const color = 'blue';

      await createCarService.execute({ board, color, brand: null });
      expect(true).toEqual(false);
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
      expect(error.message).toEqual('Inform all car data!');
    }
  });
});
