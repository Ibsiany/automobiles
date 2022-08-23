import { CreateCarUseService } from '@modules/car_use/services/CreateCarUseService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export class CreateCarUseController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { car_id, driver_id, reason } = request.body;

    const createCarUseService = container.resolve(CreateCarUseService);

    const carUse = await createCarUseService.execute({
      car_id,
      driver_id,
      reason,
    });

    return response.status(201).json(carUse);
  }
}
