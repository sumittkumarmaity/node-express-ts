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


}

export default UsersValidation
