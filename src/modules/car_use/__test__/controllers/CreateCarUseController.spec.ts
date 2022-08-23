import { app } from '@shared/infra/http/app';
import request from 'supertest';
import { CreateCarUseService } from '@modules/car_use/services/CreateCarUseService';
import { CarUse } from '@modules/car_use/infra/typeorm/entities/CarUse';

jest.mock('@modules/car_use/services/CreateCarUseService');
const createCarUseServiceMock = CreateCarUseService as jest.MockedClass<
  typeof CreateCarUseService
>;

describe('Create car use controller test', () => {
  beforeEach(async () => {
    createCarUseServiceMock.mockClear();
  });

  it('Should be able to create a driver', async () => {
    await createCarUseServiceMock.prototype.execute.mockResolvedValueOnce(
      new CarUse(),
    );

    const response = await request(app).post(`/car_use/create`).send({
      car_id: '123456',
      driver_id: '123456',
      reason: 'XXX',
    });

    expect(response.status).toEqual(201);
  });
});
