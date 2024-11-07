import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import notFound from './app/middlewares/notFound';
import router from './app/routes';
import path from 'path';


const app: Application = express();

// parser
app.use(express.json());
app.use(
  cors({
    origin: ['http://localhost:3000', 'https://root-n-rise.vercel.app/'],
    credentials: true,
  }),
);

// Connect the application routes
app.use('/api/', router);


app.get('/', (req: Request, res: Response) => {
  res.send('Hello  World! This is Root & Rise database on live');
});

app.use(express.static(path.join(__dirname, 'public')));

app.use(globalErrorHandler);
app.use(notFound);

export default app;
