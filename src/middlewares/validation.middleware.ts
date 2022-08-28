import { NextFunction, Request, Response } from 'express';
import Joi from 'joi';

import path from 'path';
export const validationMiddelware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const Schema = Joi.object({
    filename: Joi.string(),
    width: Joi.number(),
    height: Joi.number(),
  });

  const val: any = Schema.validate(req.query).error?.message;
  if (val !== undefined) {
    console.log(Schema.validate(req.query).error);
    res.json(val);
  } else {
    next();
  }
};

// the movie talk about suffring to achive the goal and satisfiction
//
// ant the suffring when any person have a dream
