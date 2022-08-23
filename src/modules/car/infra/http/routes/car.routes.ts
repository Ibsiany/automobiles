import { Router } from 'express';
import { CreateCarController } from '../controllers/CreateCarController';
import { DeleteCarController } from '../controllers/DeleteCarController';
import { FindAllCarController } from '../controllers/FindAllCarController';
import { FindByIdController } from '../controllers/FindByIdController';
import { UpdateCarController } from '../controllers/UpdateCarController';

const car = Router();

const createCarController = new CreateCarController();
const deleteCarController = new DeleteCarController();
const findByIdController = new FindByIdController();
const findAllCarController = new FindAllCarController();
const updateCarController = new UpdateCarController();

car.post('/', createCarController.handle);
car.delete('/delete', deleteCarController.handle);
car.get('/all', findAllCarController.handle);
car.get('/car/:id', findByIdController.handle);
car.patch('/:id', updateCarController.handle);

export { car };
