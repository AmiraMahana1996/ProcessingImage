import { Request, Response, Router } from 'express';
import { validationMiddelware } from '../middlewares/validation.middleware';
import { resizeImage } from '../controllers/resize-img';

import cache from '../middlewares/cacge.middleware';
const router = Router();

// server side routes
router.get('api/images', cache(300), validationMiddelware, resizeImage);

// call handel
router.get('/', (req: Request, res: Response): any => {
  res.json({ message: 'Server is running and you can call apis.' });
});
export default router;
