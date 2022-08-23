import { app } from '@shared/infra/http/app';
import request from 'supertest';
import { Driver } from '@modules/driver/infra/typeorm/entities/Driver';
import { CreateDriverService } from '@modules/driver/services/CreateDriverService';

jest.mock('@modules/driver/services/CreateDriverService');
const createCarServiceMock = CreateDriverService as jest.MockedClass<
  typeof CreateDriverService
>;

describe('Create driver controller test', () => {
  beforeEach(async () => {
    createCarServiceMock.mockClear();
  });

  it('Should be able to create a driver', async () => {
    await createCarServiceMock.prototype.execute.mockResolvedValueOnce(
      new Driver(),
    );

    const name = 'XXX';

    const response = await request(app).post(`/driver/create`).send({ name });

    expect(response.status).toEqual(201);
  });
});
