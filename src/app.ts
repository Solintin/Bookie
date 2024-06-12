import express, { Express, NextFunction, Request, Response } from "express";

import authorRoute from "./routes/authors";
import bodyParser from "body-parser";
import cors from "cors";
import { StatusCodes } from "http-status-codes";
import { EntityNotFoundError } from "typeorm";
import { ResponsePayload } from "./middleware/response";
import multer from "multer";

const app: Express = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/authors", authorRoute);
app.get("/hello", (req, res) => {
  res.status(200).json({
    message: "Hello World, Bookie App is Here",
  });
});
app.use("*", (_, res: Response) => {
  return res.status(StatusCodes.NOT_FOUND).json({
    success: false,
    message: "Route not found",
  });
});
app.use((err, req, res, next) => {
  if (
    err instanceof multer.MulterError ||
    err.message === "Invalid file type. Only JPEG and PNG images are allowed."
  ) {
    return res.status(400).json({ errors: [{ msg: err.message }] });
  }
  next(err);
});
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof EntityNotFoundError) {
    return ResponsePayload.sendError(
      res,
      "Item not found",
      null,
      StatusCodes.NOT_FOUND
    );
  }
  return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
    success: false,
    message: "something went wrong",
  });
});

export default app;
