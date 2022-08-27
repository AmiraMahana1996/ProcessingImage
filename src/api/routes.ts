import express from 'express';
import { validationMiddelware } from '../middlewares/validation.middleware';
import { resizeImage } from '../controllers/resize-img';
import cacheImage from '../cache/caching'
const router = express.Router();
// server side routes
router.post('/resize-img',cacheImage(300), validationMiddelware, resizeImage);

router.get('/message', (req, res) => {
  res.send(req.flash('message'));
});

router.get('/', (req, res) => {
  res.render('index', {
    title: 'process img',
  });
});

export default router;
