import { v4 as uuidV4 } from 'uuid';
import { app } from '@shared/infra/http/app';
import request from 'supertest';
import { Car } from '@modules/car/infra/typeorm/entities/Car';
import { UpdateCarService } from '@modules/car/services/UpdateCarService';

jest.mock('@modules/car/services/UpdateCarService');
const updateCarServiceMock = UpdateCarService as jest.MockedClass<
  typeof UpdateCarService
>;

describe('Update car controller test', () => {
  beforeEach(async () => {
    updateCarServiceMock.mockClear();
  });

  it('Should be able to find by id', async () => {
    const car = new Car();

    await updateCarServiceMock.prototype.execute.mockResolvedValueOnce(car);

    const response = await request(app)
      .patch(`/car/${uuidV4()}`)
      .send({ color: 'xxx' });

    expect(response.status).toEqual(200);
    expect(response.body).toEqual(car);
  });
});
