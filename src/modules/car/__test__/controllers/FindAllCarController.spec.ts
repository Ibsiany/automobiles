import { app } from '@shared/infra/http/app';
import request from 'supertest';
import { FindAllCarService } from '@modules/car/services/FindAllCarService';
import { Car } from '@modules/car/infra/typeorm/entities/Car';

jest.mock('@modules/car/services/FindAllCarService');
const findAllCarServiceMock = FindAllCarService as jest.MockedClass<
  typeof FindAllCarService
>;

describe('Find all car controller test', () => {
  beforeEach(async () => {
    findAllCarServiceMock.mockClear();
  });

  it('Should be able to find all cars', async () => {
    await findAllCarServiceMock.prototype.execute.mockResolvedValueOnce([
      new Car(),
    ]);

    const response = await request(app)
      .get(`/car/all`)
      .send({ color: 'xxx', brand: 'x' });

    expect(response.status).toEqual(200);
    expect(response.body).toHaveLength(1);
  });

  it('Should be able to find all cars', async () => {
    await findAllCarServiceMock.prototype.execute.mockResolvedValueOnce([
      new Car(),
    ]);

    const response = await request(app)
      .get(`/car/all`)
      .send({ color: null, brand: null });

    expect(response.status).toEqual(200);
    expect(response.body).toHaveLength(1);
  });
});
