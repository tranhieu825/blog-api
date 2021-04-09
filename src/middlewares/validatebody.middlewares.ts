import { Request, Response, NextFunction } from "express";
import { SchemaLike, ValidationError, validate} from "joi";
//import * as joi from "joi";


export function commonValidateBody(schema: SchemaLike) {
  return (req: Request, res: Response, next: NextFunction) => {
    const value = req['body'];
    return validate(value, schema)
      .then(() => {
        return next();
      })
      .catch((errors: ValidationError) => {
        const firstError = errors.details[0];
        const error = {
          code: firstError.type,
          message: firstError.message,
        };

        return res.json(error);
      });
  };
}