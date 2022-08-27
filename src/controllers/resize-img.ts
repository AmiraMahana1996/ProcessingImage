import { NextFunction, Request, Response } from 'express';
import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

export const resizeImage = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name, height, width } = req.body;

  if (!fs.existsSync(`${path.resolve('./')}/assets/images/${name}`)) {
    req.flash('message', `This image doesn't exist`);
    res.redirect('/message');
  } else {
    try {
      await sharp(`${path.resolve('./')}/assets/images/hn.png`)
        .resize({
          width: Number(width),
          height: Number(height),
        })

        .toFile(`${path.resolve('./')}/assets/modified-images/hn-resized.png`)
        .then((data) => {
          req.flash('message', 'Image resized successfully');
          res.redirect('/modified-images/hn-resized.png');
        });
    } catch (error) {
      throw error;
    }
  }

  // };
};
