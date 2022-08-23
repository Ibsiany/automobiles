import { Router } from 'express';
import { CreateCarUseController } from '../controllers/CreateCarUseController';
import { FindAllCarUseController } from '../controllers/FindAllCarUseController';
import { FinishedCarUseController } from '../controllers/FinishedCarUseController';

const carUse = Router();

const createCarUseController = new CreateCarUseController();
const findAllCarUseController = new FindAllCarUseController();
const finishedCarUseController = new FinishedCarUseController();

carUse.post('/', createCarUseController.handle);
carUse.get('/all', findAllCarUseController.handle);
carUse.patch('/:id', finishedCarUseController.handle);

export { carUse };
