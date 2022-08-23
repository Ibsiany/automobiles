import { v4 as uuidV4 } from 'uuid';
import { app } from '@shared/infra/http/app';
import request from 'supertest';
import { UpdateDriverService } from '@modules/driver/services/UpdateDriverService';
import { Driver } from '@modules/driver/infra/typeorm/entities/Driver';

jest.mock('@modules/driver/services/UpdateDriverService');
const updateDriverServiceMock = UpdateDriverService as jest.MockedClass<
  typeof UpdateDriverService
>;

describe('Update driver controller test', () => {
  beforeEach(async () => {
    updateDriverServiceMock.mockClear();
  });

  it('Should be able to find by id', async () => {
    const car = new Driver();

    await updateDriverServiceMock.prototype.execute.mockResolvedValueOnce(car);

    const response = await request(app)
      .patch(`/driver/${uuidV4()}`)
      .send({ color: 'xxx' });

    expect(response.status).toEqual(200);
    expect(response.body).toEqual(car);
  });
});
