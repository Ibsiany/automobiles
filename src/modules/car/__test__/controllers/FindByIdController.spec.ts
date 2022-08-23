import { v4 as uuidV4 } from 'uuid';
import { app } from '@shared/infra/http/app';
import request from 'supertest';
import { Car } from '@modules/car/infra/typeorm/entities/Car';
import { FindByIdService } from '@modules/car/services/FindByIdService';

jest.mock('@modules/car/services/FindByIdService');
const findByIdServiceMock = FindByIdService as jest.MockedClass<
  typeof FindByIdService
>;

describe('Find by id controller test', () => {
  beforeEach(async () => {
    findByIdServiceMock.mockClear();
  });

  it('Should be able to find by id', async () => {
    const car = new Car();

    await findByIdServiceMock.prototype.execute.mockResolvedValueOnce(car);

    const response = await request(app).get(`/car/car/${uuidV4()}`).send();

    expect(response.status).toEqual(200);
    expect(response.body).toEqual(car);
  });
});
