import { app } from '@shared/infra/http/app';
import request from 'supertest';
import { Driver } from '@modules/driver/infra/typeorm/entities/Driver';
import { FindAllDriverService } from '@modules/driver/services/FindAllDriverService';

jest.mock('@modules/driver/services/FindAllDriverService');
const findAllCarServiceMock = FindAllDriverService as jest.MockedClass<
  typeof FindAllDriverService
>;

describe('Find all driver controller test', () => {
  beforeEach(async () => {
    findAllCarServiceMock.mockClear();
  });

  it('Should be able to find all drivers', async () => {
    await findAllCarServiceMock.prototype.execute.mockResolvedValueOnce([
      new Driver(),
    ]);

    const response = await request(app)
      .get(`/driver/all`)
      .send({ color: 'xxx', brand: 'x' });

    expect(response.status).toEqual(200);
    expect(response.body).toHaveLength(1);
  });
});
