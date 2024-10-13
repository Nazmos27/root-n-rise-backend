import express, { Application, Request, Response } from 'express';
import cors from 'cors';

const app: Application = express();

// parser
app.use(express.json());
app.use(
  cors({
    origin: ['http://localhost:5173'],
    credentials: true,
  }),
);

// Connect the application routes

app.get('/', (req: Request, res: Response) => {
  res.send('Hello  World! This is Root & Rise database on live');
});

export default app;
