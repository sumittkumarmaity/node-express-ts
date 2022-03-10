import * as Joi from "joi";
import CustomValidation from '@validation/custom.validation';

class UsersValidation extends CustomValidation {

  static signup = {
    body: Joi.object().keys({
      name: Joi.string().required(),
      email: Joi.string().required().email().messages({
        'string.email': 'Not a valid email address.',
        'string.empty': 'Email is required.',
      }),
      password: Joi.string().required().custom(CustomValidation.password),
    }),
  };

  static login = {
    body: Joi.object().keys({
      email: Joi.string().required().email().messages({
        'string.email': 'Not a valid email address.',
        'string.empty': 'Email is required.',
      }),
      password: Joi.string().required().custom(CustomValidation.password),
    }),
  };

  // static getUserData = {
  //   body: Joi.object().keys({
  //     userId: Joi.string().required(),
  //   }),
  // };

  static getUserData = {
    userId: Joi.string().required()
  };

  static updateUserDtls = {
    body: Joi.object().keys({
      userId: Joi.string().required(),
      name: Joi.string().optional(),
      email: Joi.string().optional().email().messages({
        'string.email': 'Not a valid email address.',
        'string.empty': 'Email is required.',
      }),
      password: Joi.string().optional().custom(CustomValidation.password),
    }),
  };

}

export default UsersValidation
