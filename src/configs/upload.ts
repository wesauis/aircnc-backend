import multer from 'multer';
import path from 'path';

export default {
  storage: multer.diskStorage({
    destination: path.resolve(__dirname, '..', '..', 'uploads'),
    filename(req, file, callback) {
      const extname = path.extname(file.originalname);
      const timestamp = Date.now();
      const name = path.basename(file.originalname, extname);

      callback(null, `${name}-${timestamp}${extname}`);
    },
  }),
};
