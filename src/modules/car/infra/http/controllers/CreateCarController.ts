import { CreateCarService } from '@modules/car/services/CreateCarService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export class CreateCarController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { board, color, brand } = request.body;

    const createCarService = container.resolve(CreateCarService);

    const car = await createCarService.execute({ board, color, brand });

    return response.status(201).json(car);
  }
}
