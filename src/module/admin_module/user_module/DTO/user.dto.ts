import Joi from "joi";

export const UserCreateSchema = Joi.object({
  email: Joi.string().email().min(10).required(),
  password: Joi.string().min(8).required(),
  name: Joi.string().min(8).required(),
  phone: Joi.string().min(10).required(),
  role: Joi.string(),

});

export const UserLoginSchema = Joi.object({
  email: Joi.string().email().min(10).required(),
  password: Joi.string().min(8).required(),
});

export const UserEmailLoginSchema = Joi.object({
  email: Joi.string().email().min(10).required(),
  password: Joi.string().min(8).required(),
});

export const UserChangeSchema = Joi.object({
  oldpassword: Joi.string().min(8).required(),
  newpassword: Joi.string().min(8).required(),
  renewpassword: Joi.string().min(8).required(),
});

