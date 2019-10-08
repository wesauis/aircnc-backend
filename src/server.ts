require('dotenv-flow').config();
import http from 'http';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import path from 'path';
import socketio from 'socket.io';

import logger from './logger';
import routes from './routes';

// @todo replace any type with the correct one
const connectedUsers: any = {};

const app = express();
app.disable('x-powered-by');
const server = new http.Server(app);

//* socket.io injection
const io = socketio(server);
io.on('connection', socket => {
  const { user_id } = socket.handshake.query;
  connectedUsers[user_id] = socket.id;
});
app.use((req: any, res, next) => {
  req.io = io;
  req.connectedUsers = connectedUsers;
  return next();
});

//* mongodb connection
const MONGODB_URL = process.env.MONGODB_URL.replace(
  '<password>',
  process.env.MONGODB_PASS,
);
mongoose
  .connect(MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => logger.fine('sucessfully conected to mongodb atlas'))
  .catch(error => {
    console.error(error);
    logger.error(error.message);
    server.close();
  });

//* allow access from anyware
app.use(cors());

//* Log in the console the user-agent and the requested route
app.use((req, res, next) => {
  logger.info(`${req.headers['user-agent']} >> ${req.url}`);
  return next();
});

app.use(express.json());

//* allow to access uploaded images
app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads')));

//* route registration
app.use(routes);

//* Log when server open and close
server.addListener('listening', () =>
  logger.fine(`server running at localhost:${process.env.PORT}`),
);
server.addListener('close', () => {
  logger.fine('server closed');
});

//* Listen Configurated port
server.listen(+process.env.PORT);
