import { NextFunction, Request, Response } from 'express';
import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

export const resizeImage = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { filename, width, height } = req.query;

  if (!fs.existsSync(`${path.resolve('./')}/assets/images/${filename}.png`)) {
    res.json({ message: `This image doesn't exist` });
  } else {
    try {
      console.log();
      await sharp(`${path.resolve('./')}/assets/images/${filename}.png`)
        .resize({
          width: Number(width),
          height: Number(height),
        })

        .toFile(`${path.resolve('./')}/assets/modified-images/hn-resized.png`)
        .then((data) => {
          res.sendFile(
            path.resolve(`assets/modified-images/${filename}-resized.png`)
          );
        });
    } catch (error) {
      throw error;
    }
  }
};
