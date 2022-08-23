import { v4 as uuidV4 } from 'uuid';
import { app } from '@shared/infra/http/app';
import request from 'supertest';
import { Driver } from '@modules/driver/infra/typeorm/entities/Driver';
import { FindByIdService } from '@modules/driver/services/FindByIdService';

jest.mock('@modules/driver/services/FindByIdService');
const findByIdServiceMock = FindByIdService as jest.MockedClass<
  typeof FindByIdService
>;

describe('Find by id controller test', () => {
  beforeEach(async () => {
    findByIdServiceMock.mockClear();
  });

  it('Should be able to find by id', async () => {
    const driver = new Driver();

    await findByIdServiceMock.prototype.execute.mockResolvedValueOnce(driver);

    const response = await request(app)
      .get(`/driver/driver/${uuidV4()}`)
      .send();

    expect(response.status).toEqual(200);
    expect(response.body).toEqual(driver);
  });
});
