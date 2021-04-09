// response.service.ts
import { Response } from "express";

export const success = (
  res: Response,
  data: any,
  message?: any,
  code?: any,
  options?: any
) => {
  if (!res.headersSent) {
    res.status(code || 200);
    res.json({
      success: true,
      result: data,
      message,
      code: code || 200,
      options: options || null,
      error: null,
    });
  }
};

export const error = (
  res: Response,
  message: string,
  code?: any,
  opts?: any
) => {
  const result = {
    success: false,
    result: null,
    message: message || "Error",
    code: code || 400,
    options: opts || null,
  };

  if ((!opts || !opts.loggingOnly) && !res.headersSent) {
    res.status(code || 400);
    res.json(result);
  }
};
