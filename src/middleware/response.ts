import { Response } from "express";

export class ResponsePayload {
  static sendSuccess<T>(
    res: Response,
    message: string,
    data: T | T[],
    statusCode: number = 200,
    paginationInfo: any = {}
  ): Response<T> {
    return res.status(statusCode).json({
      success: true,
      data: data,
      message,
      paginationInfo,
    });
  }

  static sendError<T>(
    res: Response,
    message: string,
    error: T,
    statusCode: number = 500
  ): Response<T> {
    return res.status(statusCode).json({
      success: false,
      message,
      error,
    });
  }
}
