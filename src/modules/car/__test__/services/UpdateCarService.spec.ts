import { Car } from '@modules/car/infra/typeorm/entities/Car';
import { FakeCarRepository } from '@modules/car/repositories/fakes/FakeCarRepository';
import { ICarRepository } from '@modules/car/repositories/ICarRepository';
import { UpdateCarService } from '@modules/car/services/UpdateCarService';

describe('Update car service test', () => {
  let updateCarService: UpdateCarService;

  let fakeCarRepository: ICarRepository;

  beforeAll(async () => {
    fakeCarRepository = new FakeCarRepository();
    updateCarService = new UpdateCarService(fakeCarRepository);
  });

  it('Should be able to update car with board', async () => {
    const board = 'XXX 0';
    const color = 'blue';
    const brand = 'XXXXXX 0';

    const car = await fakeCarRepository.create({ board, color, brand });

    const updatedCar = await updateCarService.execute({
      id: car.id,
      board: 'YYY 0',
    });

    expect(updatedCar).toBeInstanceOf(Car);
    expect(updatedCar.board).toEqual('YYY 0');
  });

  it('Should be able to update car with color', async () => {
    const board = 'XXX 1';
    const color = 'blue';
    const brand = 'XXXXXX 1';

    const car = await fakeCarRepository.create({ board, color, brand });

    const updatedCar = await updateCarService.execute({
      id: car.id,
      color: 'pink',
    });

    expect(updatedCar).toBeInstanceOf(Car);
    expect(updatedCar.color).toEqual('pink');
  });

  it('Should be able to update car with brand', async () => {
    const board = 'XXX 2';
    const color = 'blue';
    const brand = 'XXXXXX 2';

    const car = await fakeCarRepository.create({ board, color, brand });

    const updatedCar = await updateCarService.execute({
      id: car.id,
      brand: 'YYYYYY 2',
    });

    expect(updatedCar).toBeInstanceOf(Car);
    expect(updatedCar.brand).toEqual('YYYYYY 2');
  });

  it('Should not be able to update car', async () => {
    try {
      await updateCarService.execute({
        id: null,
        board: null,
        color: null,
        brand: null,
      });

      expect(true).toEqual(false);
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
      expect(error.message).toEqual('Inform car id!');
    }
  });

  it('Should not be able to update car', async () => {
    try {
      await updateCarService.execute({
        id: '123',
        board: null,
        color: null,
        brand: null,
      });

      expect(true).toEqual(false);
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
      expect(error.message).toEqual('Enter any attribute of the car!');
    }
  });
});
