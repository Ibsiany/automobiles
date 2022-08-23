import { car } from '@modules/car/infra/http/routes/car.routes';
import { Router } from 'express';

const router = Router();

router.use('/car', car);

export { router };
