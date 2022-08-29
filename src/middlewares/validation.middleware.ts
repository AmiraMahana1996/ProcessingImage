import { NextFunction, Request, Response } from 'express';
import Messages from '../messages/messages';
import invalidOptionValidation from '../validation/validation.rules';
export const validationMiddelware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  //convert type of width and height
  console.log(req.query);
  const data = {
    filename: req.query.filename,
    width: req.query.width,
    height: req.query.height,
  };

  console.log(data);
  for (const [key, value] of Object.entries(data)) {
    console.log(value);
    switch (invalidOptionValidation(data)) {
      case 'nullOrZero':
        return res.send(Messages(key).invalidInput);

      case 'empty':
        return res.send(Messages(key).requiredInput);

      case 'negativeValue':
        return res.send(Messages(key).negativeValue);
      case 'notFound':
        return res.send(Messages(key).notFound);
      case 'required':
        return res.send(Messages(data).requiredInput);
      default:
        next();
    }
    return;
  }
  next();
  // const element = array[index];
};
