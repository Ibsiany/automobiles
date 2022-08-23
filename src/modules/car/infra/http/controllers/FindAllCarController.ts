import { FindAllCarService } from '@modules/car/services/FindAllCarService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export class FindAllCarController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { color, brand } = request.query;

    const findAllCarService = container.resolve(FindAllCarService);

    const cars = await findAllCarService.execute({
      color: color ? String(color) : null,
      brand: brand ? String(brand) : null,
    });

    return response.json(cars);
  }
}
