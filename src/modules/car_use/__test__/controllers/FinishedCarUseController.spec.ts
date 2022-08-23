import { v4 as uuidV4 } from 'uuid';
import { app } from '@shared/infra/http/app';
import request from 'supertest';
import { CarUse } from '@modules/car_use/infra/typeorm/entities/CarUse';
import { FinishedCarUseService } from '@modules/car_use/services/FinishedCarUseService';

jest.mock('@modules/car_use/services/FinishedCarUseService');
const finishedCarUseServiceMock = FinishedCarUseService as jest.MockedClass<
  typeof FinishedCarUseService
>;

describe('Finished car use controller test', () => {
  beforeEach(async () => {
    finishedCarUseServiceMock.mockClear();
  });

  it('Should be able to find by id', async () => {
    const carUse = new CarUse();

    await finishedCarUseServiceMock.prototype.execute.mockResolvedValueOnce(
      carUse,
    );

    const response = await request(app)
      .patch(`/car-use/${uuidV4()}`)
      .send({ color: 'xxx' });

    expect(response.status).toEqual(200);
    expect(response.body).toEqual(carUse);
  });
});
