import Joi from "joi";

export const CategoryCreateSchema = Joi.object({
  title: Joi.string().required(),
});

export const CategoryUpdateSchema = Joi.object({
  title: Joi.string().required(),
});