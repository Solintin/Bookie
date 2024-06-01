import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import { ResponsePayload } from "./response";
import { StatusCodes } from "http-status-codes";

export class ErrorHandler {
  static handleError(fn) {
    return (req: Request, res: Response, next: NextFunction) => {
      Promise.resolve(fn(req, res, next).catch(next));
    };
  }
}

export class requestValidator {
  public static validate(req: Request, res: Response, next: NextFunction) {
    const result = validationResult(req);

    if (!result.isEmpty()) {
      return ResponsePayload.sendError(
        res,
        "Validation error",
        result.array(),
        StatusCodes.BAD_REQUEST
      );
    }
    next();
  }
}
