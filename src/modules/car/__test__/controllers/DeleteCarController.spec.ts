import { app } from '@shared/infra/http/app';
import request from 'supertest';
import { DeleteCarService } from '@modules/car/services/DeleteCarService';

jest.mock('@modules/car/services/DeleteCarService');
const deleteCarControllerMock = DeleteCarService as jest.MockedClass<
  typeof DeleteCarService
>;

describe('Delete car controller test', () => {
  beforeEach(async () => {
    deleteCarControllerMock.mockClear();
  });

  it('Should be able to delete car', async () => {
    await deleteCarControllerMock.prototype.execute.mockResolvedValueOnce();

    const response = await request(app).delete(`/car/delete`).send({ id: 'x' });

    expect(response.status).toEqual(200);
  });
});
