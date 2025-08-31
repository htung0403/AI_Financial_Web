import { ErrorRequestHandler, Response } from "express";
import { HTTPSTATUS } from "../config/http.config";
import { AppError } from "../utils/app-error";
import { ZodError } from "zod";
import { ErrorCodeEnum } from "../enums/error-code.enum";
import { MulterError } from "multer";

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

const handleMulterError = (error: MulterError) => {
  const messages = {
    LIMIT_UNEXPECTED_FILE: "Invalid file field name. Please use 'file'.",
    LIMIT_FILE_SIZE: "File is too large.",
    LIMIT_FILE_COUNT: "Too many files.",
    default: "File upload error",
  };

  return {
    status: HTTPSTATUS.BAD_REQUEST,
    message: messages[error.code as keyof typeof messages] || messages.default,
    error: error.message,
  };
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

  if (error instanceof MulterError) {
    const { status, message, error: err } = handleMulterError(error);
    return res.status(status).json({
      message,
      error: err,
      errorCode: ErrorCodeEnum.FILE_UPLOAD_ERROR,
    });
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
