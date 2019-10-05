require('dotenv').config();
import http from 'http';
import express from 'express';
import mongoose from 'mongoose';

import logger from './logger';
import routes from './routes';

const app = express();
app.disable('x-powered-by');

mongoose
  .connect(
    'mongodb+srv://omni:omni@dev-qh4c7.mongodb.net/dev?retryWrites=true&w=majority',
    { useNewUrlParser: true, useUnifiedTopology: true },
  )
  .then(() => logger.fine('sucessfully conected to mongodb atlas'))
  .catch(error => {
    console.error(error);
    logger.error(error.message);
    server.close();
  });

/**
 * Log in the console the user-agent and the requested route
 */
app.use((req, res, next) => {
  logger.info(`${req.headers['user-agent']} >> ${req.url}`);
  next();
});

app.use(express.json());
app.use(routes);

const server = http.createServer(app);
server.addListener('listening', () =>
  logger.fine(`server running at localhost:${process.env.PORT}`),
);
server.addListener('close', () => {
  logger.fine('server closed');
});
server.listen(+process.env.PORT);
