import Joi from "joi";

// Kiểm tra form create
export const CommentCreateSchema = Joi.object({
  content: Joi.string().max(100).required(),
});


// Kiểm tra form update
export const CommentUpdateSchema = Joi.object({
  content: Joi.string().max(100).required(),
});