import { RequestHandler } from 'express';
import { HttpException } from '@exceptions/HttpException';
import * as Joi from "joi";
import pick from '@/utils/pick';

const validate = (schema) => (req, res, next): RequestHandler => {

  const validSchema = pick(schema, ['params', 'query', 'body']);
  const object = pick(req, Object.keys(validSchema));
  const { value, error } = Joi.compile(validSchema).prefs({ errors: { label: 'key' } }).validate(object);

  if (error) {
    const errorMessage = error.details.map((details) => details.message).join(', ');
    return next(new HttpException(400, errorMessage));
  }
  Object.assign(req, value);
  return next();
};

export default validate;