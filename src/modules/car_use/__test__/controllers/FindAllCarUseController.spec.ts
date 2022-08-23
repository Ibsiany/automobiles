import { app } from '@shared/infra/http/app';
import request from 'supertest';
import { FindAllCarUseService } from '@modules/car_use/services/FindAllCarUseService';
import { CarUse } from '@modules/car_use/infra/typeorm/entities/CarUse';

jest.mock('@modules/car_use/services/FindAllCarUseService');
const findAllCarUseServiceMock = FindAllCarUseService as jest.MockedClass<
  typeof FindAllCarUseService
>;

describe('Find all car use controller test', () => {
  beforeEach(async () => {
    findAllCarUseServiceMock.mockClear();
  });

  it('Should be able to find all car use', async () => {
    await findAllCarUseServiceMock.prototype.execute.mockResolvedValueOnce([
      new CarUse(),
    ]);

    const response = await request(app)
      .get(`/car_use/all`)
      .send({ color: 'xxx', brand: 'x' });

    expect(response.status).toEqual(200);
    expect(response.body).toHaveLength(1);
  });
});
