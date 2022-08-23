import { UpdateCarService } from '@modules/car/services/UpdateCarService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export class UpdateCarController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { board, color, brand } = request.body;

    const updateCarService = container.resolve(UpdateCarService);

    const car = await updateCarService.execute({ board, color, brand, id });

    return response.json(car);
  }
}
