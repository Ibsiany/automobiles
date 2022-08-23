import express, {
  NextFunction,
  RequestHandler,
  Response,
  Request,
} from 'express';
import '@shared/infra/http/container';
import { router as routes } from './routes';

const app = express();

app.use(express.json() as RequestHandler);

app.use(routes);

app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  console.log(err);

  if (err) {
    return response.status(400).json({ message: err.message, status: 400 });
  }

  return response
    .status(500)
    .json({ message: 'Internal server error!', status: 500 });
});

export { app };
