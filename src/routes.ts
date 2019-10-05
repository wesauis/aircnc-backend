import { Router } from 'express';
import multer from 'multer';

import uploadConfig from './configs/upload';
import SessionController from './controllers/SessionController';
import SpotController from './controllers/SpotController';
import DashboardController from './controllers/DashboardController';
import BookingController from './controllers/BookingController';

const routes = Router();
const upload = multer(uploadConfig);

routes.post('/sessions', SessionController.store);

routes.get('/spots', SpotController.index);
routes.post('/spots', upload.single('thumbnail'), SpotController.store);
routes.post('/spots/:spot_id/bookings', BookingController.store);

routes.get('/dashboard', DashboardController.show);

export default routes;
