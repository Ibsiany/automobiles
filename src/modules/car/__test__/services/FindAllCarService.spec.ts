import { FakeCarRepository } from '@modules/car/repositories/fakes/FakeCarRepository';
import { ICarRepository } from '@modules/car/repositories/ICarRepository';
import { FindAllCarService } from '@modules/car/services/FindAllCarService';

describe('Find all car service test', () => {
  let findAllCarService: FindAllCarService;

  let fakeCarRepository: ICarRepository;

  beforeAll(async () => {
    fakeCarRepository = new FakeCarRepository();
    findAllCarService = new FindAllCarService(fakeCarRepository);
  });

  it('Should be able to find all cars', async () => {
    const board = 'XXX 0';
    const color = 'blue';
    const brand = 'XXXXXX 0';

    await fakeCarRepository.create({ board, color, brand });

    const cars = await findAllCarService.execute({});

    expect(cars).toHaveLength(1);
    expect(cars[0].board).toEqual(board);
    expect(cars[0].color).toEqual(color);
    expect(cars[0].brand).toEqual(brand);
  });

  it('Should be able to find all cars by color', async () => {
    const board = 'XXX 1';
    const color = 'green';
    const brand = 'XXXXXX 1';

    await fakeCarRepository.create({ board, color, brand });

    const cars = await findAllCarService.execute({ color });

    expect(cars).toHaveLength(1);
    expect(cars[0].board).toEqual(board);
    expect(cars[0].color).toEqual(color);
    expect(cars[0].brand).toEqual(brand);
  });

  it('Should be able to find all cars by brand', async () => {
    const board = 'XXX 2';
    const color = 'pink';
    const brand = 'XXXXXX 2';

    await fakeCarRepository.create({ board, color, brand });

    const cars = await findAllCarService.execute({ brand });

    expect(cars).toHaveLength(1);
    expect(cars[0].board).toEqual(board);
    expect(cars[0].color).toEqual(color);
    expect(cars[0].brand).toEqual(brand);
  });

  it('Should be able to find all cars by brand and color', async () => {
    const board = 'XXX 3';
    const color = 'dark';
    const brand = 'XXXXXX 3';

    await fakeCarRepository.create({ board, color, brand });

    const cars = await findAllCarService.execute({ brand, color });

    expect(cars).toHaveLength(1);
    expect(cars[0].board).toEqual(board);
    expect(cars[0].color).toEqual(color);
    expect(cars[0].brand).toEqual(brand);
  });
});
