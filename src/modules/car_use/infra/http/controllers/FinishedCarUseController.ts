import { FinishedCarUseService } from '@modules/car_use/services/FinishedCarUseService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export class FinishedCarUseController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const finishedCarUseService = container.resolve(FinishedCarUseService);

    const carUse = await finishedCarUseService.execute(id);

    return response.json(carUse);
  }
}
