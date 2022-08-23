import { inject, injectable } from 'tsyringe';
import { IDriverRepository } from '../repositories/IDriverRepository';

@injectable()
export class DeleteDriverService {
  constructor(
    @inject('DriverRepository')
    private driverRepository: IDriverRepository,
  ) {}

  async execute(id: string): Promise<void> {
    if (!id) {
      throw new Error('Inform driver id!');
    }

    return this.driverRepository.delete(id);
  }
}
