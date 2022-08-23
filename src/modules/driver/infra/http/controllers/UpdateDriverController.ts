import { UpdateDriverService } from '@modules/driver/services/UpdateDriverService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export class UpdateDriverController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { name } = request.body;

    const updateDriverService = container.resolve(UpdateDriverService);

    const driver = await updateDriverService.execute({ name, id });

    return response.json(driver);
  }
}
