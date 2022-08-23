import { FindAllCarUseService } from '@modules/car_use/services/FindAllCarUseService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export class FindAllCarUseController {
  async handle(request: Request, response: Response): Promise<Response> {
    const findAllDriverService = container.resolve(FindAllCarUseService);

    const carUse = await findAllDriverService.execute();

    return response.json(carUse);
  }
}
