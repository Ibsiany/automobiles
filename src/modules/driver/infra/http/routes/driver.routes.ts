import { Router } from 'express';
import { CreateDriverController } from '../controllers/CreateDriverController';
import { DeleteDriverController } from '../controllers/DeleteDriverController';
import { FindAllDriverController } from '../controllers/FindAllDriverController';
import { FindByIdController } from '../controllers/FindByIdController';
import { UpdateDriverController } from '../controllers/UpdateDriverController';

const driver = Router();

const createDriverController = new CreateDriverController();
const deleteDriverController = new DeleteDriverController();
const findByIdController = new FindByIdController();
const findAllDriverController = new FindAllDriverController();
const updateDriverController = new UpdateDriverController();

driver.post('/', createDriverController.handle);
driver.delete('/', deleteDriverController.handle);
driver.get('/all', findAllDriverController.handle);
driver.get('/driver/:id', findByIdController.handle);
driver.patch('/:id', updateDriverController.handle);

export { driver };
