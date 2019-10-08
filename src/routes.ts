import { Router } from 'express';
import multer from 'multer';
import uploadConfig from './configs/upload';
import ApprovalController from './controllers/ApprovalController';
import BookingController from './controllers/BookingController';
import DashboardController from './controllers/DashboardController';
import RejectionController from './controllers/RejectionController';
import SessionController from './controllers/SessionController';
import SpotController from './controllers/SpotController';

const routes = Router();
const upload = multer(uploadConfig);

routes.post('/sessions', SessionController.store);

routes.get('/spots', SpotController.index);
routes.post('/spots', upload.single('thumbnail'), SpotController.store);
routes.post('/spots/:spot_id/bookings', BookingController.store);

routes.get('/dashboard', DashboardController.show);

routes.post('/bookings/:booking_id/approvals', ApprovalController.store);
routes.post('/bookings/:booking_id/rejections', RejectionController.store);

export default routes;
