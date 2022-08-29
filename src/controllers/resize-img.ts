import { Request, Response } from 'express';
import sharp from 'sharp';

import path from 'path';
import * as fsExtra from 'fs-extra';

export const resizeImage = async (req: Request, res: Response) => {
  const { filename, width, height } = req.query;

  // remove all images from modefied folder images
  fsExtra.emptyDirSync(`${path.resolve('./')}/assets/modified-images/`);

  //start resizing
  await sharp(`${path.resolve('./')}/assets/images/${filename}.png`)
    .resize({
      width: Number(width),
      height: Number(height),
    })
    .toFile(
      `${path.resolve(
        './'
      )}/assets/modified-images/${filename}_${width}_${height}.png`
    )
    .then((file) => {
      // fs.unlinkSync(
      //   path.resolve(
      //     `assets/modified-images/${filename}_${regex}_${regex}.png`
      //   )
      // );

      res.sendFile(
        path.resolve(
          `assets/modified-images/${filename}_${file.width}_${file.height}.png`
        )
      );
    });
};
