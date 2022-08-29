import { NextFunction, Request, Response } from 'express';
import Messages from '../messages/messages';
import invalidOptionValidation from '../validation/validation.rules';
export const validationMiddelware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  //convert type of width and height

  const data = {
    filename: req.query.filename,
    width: req.query.width,
    height: req.query.height,
  };

  //validation
  for (const [key, value] of Object.entries(data)) {
    switch (invalidOptionValidation(data)) {
      case 'nullOrZero':
        return res.status(404).json(Messages(key).invalidInput);

      case 'empty':
        return res.status(404).json(Messages(value).requiredInput);

      case 'negativeValue':
        return res.status(404).json(Messages(key).negativeValue);
      case 'notFound':
        return res.status(404).json(Messages(key).notFound);
      case 'required':
        return res.json(Messages(data).requiredInput);
      case 'valid':
        next();
        return res.status(200);
      default:
        next();
    }
    return;
  }
  next();
};
