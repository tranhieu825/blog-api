import Joi from "joi";

export const PostCreateSchema = Joi.object({
  title: Joi.string().min(5).required(),
  content: Joi.string().min(50).required(),
});

export const PostUpdateSchema = Joi.object({
  title: Joi.string().min(5).required(),
  content: Joi.string().min(50).required(),
});