import { car } from '@modules/car/infra/http/routes/car.routes';
import { driver } from '@modules/driver/infra/http/routes/driver.routes';
import { Router } from 'express';

const router = Router();

router.use('/car', car);
router.use('/driver', driver);

export { router };
