import { ErrorRequestHandler, Response } from "express";
import { HTTPSTATUS } from "../config/http.config";
import { AppError } from "../utils/app-error";
import { ZodError } from "zod";
import { ErrorCodeEnum } from "../enums/error-code.enum";

const formatZodError = (res: Response, error: ZodError) => {
  const errors = error?.issues?.map((error) => ({
    field: error.path.join("."),
    message: error.message,
  }));

  return res.status(HTTPSTATUS.BAD_REQUEST).json({
    message: "Validation error",
    errors: errors,
    errorCode: ErrorCodeEnum.VALIDATION_ERROR,
  });
};
export const errorHandler: ErrorRequestHandler = (
  error,
  req,
  res,
  next
): any => {
  console.log("Error occurred on PATH:", req.path, "Error:", error);

  if (error instanceof ZodError) {
    return formatZodError(res, error);
  }
  if (error instanceof AppError) {
    return res.status(error.statusCode).json({
      message: error.message,
      error: error,
    });
  }
  res.status(HTTPSTATUS.INTERNAL_SERVER_ERROR).json({
    message: "Something went wrong",
    error: error.message,
  });
};
