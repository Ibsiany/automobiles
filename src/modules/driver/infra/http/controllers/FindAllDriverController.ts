import { FindAllDriverService } from '@modules/driver/services/FindAllDriverService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export class FindAllDriverController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name } = request.query;

    const findAllDriverService = container.resolve(FindAllDriverService);

    const drivers = await findAllDriverService.execute(
      name ? String(name) : null,
    );

    return response.json(drivers);
  }
}
