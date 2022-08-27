import { NextFunction, Request, Response } from 'express';
import * as Joi from 'joi';

export const validationMiddelware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const Schema = Joi.object({
    name: Joi.string(),
    height: Joi.number(),
    width: Joi.number(),
  });

  const val: any = Schema.validate(req.body).error?.message;
  if (val !== undefined) {
    req.flash('message', val);
    res.redirect('/message');
  }
  next();
};

// the movie talk about suffring to achive the goal and satisfiction
//
// ant the suffring when any person have a dream
