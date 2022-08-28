import { Request, Response } from 'express';
import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

export const resizeImage = async (req: Request, res: Response) => {
  const { filename, width, height } = req.query;

  if (!fs.existsSync(`${path.resolve('./')}/assets/images/${filename}.png`)) {
    res.json({ message: `This image doesn't exist` });
  } else {
    await sharp(`${path.resolve('./')}/assets/images/${filename}.png`)
      .resize({
        width: Number(width),
        height: Number(height),
      })

      .toFile(`${path.resolve('./')}/assets/modified-images/${filename}_${width}_${height}.png`)
      .then((file) => {
        console.log(file)
        res.sendFile(
          path.resolve(`assets/modified-images/${filename}_${file.width}_${file.height}.png`)
        );
      });
  }
};
