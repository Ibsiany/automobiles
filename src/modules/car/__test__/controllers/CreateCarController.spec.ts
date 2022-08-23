import { app } from '@shared/infra/http/app';
import request from 'supertest';
import { CreateCarService } from '@modules/car/services/CreateCarService';
import { Car } from '@modules/car/infra/typeorm/entities/Car';

jest.mock('@modules/car/services/CreateCarService');
const createCarServiceMock = CreateCarService as jest.MockedClass<
  typeof CreateCarService
>;

describe('Create car controller test', () => {
  beforeEach(async () => {
    createCarServiceMock.mockClear();
  });

  it('Should be able to create a car', async () => {
    await createCarServiceMock.prototype.execute.mockResolvedValueOnce(
      new Car(),
    );

    const board = 'XXX';
    const color = 'blue';
    const brand = 'XXXXXX';

    const response = await request(app)
      .post(`/car`)
      .send({ board, color, brand });

    expect(response.status).toEqual(201);
  });
});
