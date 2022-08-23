import { FindByIdService } from '@modules/car/services/FindByIdService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export class FindByIdController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const findByIdService = container.resolve(FindByIdService);

    const car = await findByIdService.execute(id);

    return response.json(car);
  }
}
