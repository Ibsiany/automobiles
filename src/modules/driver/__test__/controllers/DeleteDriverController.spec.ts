import { DeleteDriverService } from '@modules/driver/services/DeleteDriverService';
import { app } from '@shared/infra/http/app';
import request from 'supertest';

jest.mock('@modules/driver/services/DeleteDriverService');
const deleteCarControllerMock = DeleteDriverService as jest.MockedClass<
  typeof DeleteDriverService
>;

describe('Delete driver controller test', () => {
  beforeEach(async () => {
    deleteCarControllerMock.mockClear();
  });

  it('Should be able to delete driver', async () => {
    await deleteCarControllerMock.prototype.execute.mockResolvedValueOnce();

    const response = await request(app)
      .delete(`/driver/delete`)
      .send({ id: 'x' });

    expect(response.status).toEqual(200);
  });
});
