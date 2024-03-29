import Joi, { ObjectSchema } from 'joi';

const loginSchema: ObjectSchema = Joi.object().keys({
  username: Joi.string().required().min(4).max(8).messages({
    'string.base': 'Username must be of type string',
    'string.min': 'Invalid username',
    'string.max': 'Invalid username',
    'string.empty': 'Username is a required field',
  }),
  password: Joi.string().required().min(4).max(12).messages({
    'string.base': 'Password should be of type string',
    'string.min': 'Password must be at least {#limit} characters long',
    'string.max': 'Invalid password',
    'string.empty': 'Password is a required field',
  }),
});

export { loginSchema };
