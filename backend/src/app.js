import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import { v1 } from './routes/v1.js';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { errorHandlerMiddleware } from './middlewares/errorHandler.middleware.js';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

app.use(helmet());
app.use(
  cors({
    origin: 'http://localhost:3000',
  })
);
app.use(morgan('combined'));
app.use(express.json());

app.use(errorHandlerMiddleware);

app.use(
  express.static(join(__dirname, '..', 'public'), {
    index: false,
  })
);

app.use('/uploads', express.static(join(__dirname, '..', 'uploads')));

app.use('/v1', v1);

app.get('/*', (req, res) => {
  return res.sendFile(join(__dirname, '..', 'public', 'index.html'));
});

export default app;
