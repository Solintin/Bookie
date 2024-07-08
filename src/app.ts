import express, { Express, NextFunction, Request, Response } from "express";
import authorRoute from "./routes/authors";
import bodyParser from "body-parser";
import cors from "cors";
import { StatusCodes } from "http-status-codes";
import { EntityNotFoundError } from "typeorm";
import { ResponsePayload } from "./middleware/response";
import multer from "multer";
import { AuthorController } from "./controllers/authors.controller";

const app: Express = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/authors", authorRoute);
app.get("/", (_, res: Response) => {
  return res.status(StatusCodes.OK).json({
    success: false,
    message: "Hello, Welcome to Bookie App Homepage",
  });
});
app.get("/hello", (_, res: Response) => {
  return res.status(StatusCodes.OK).json({
    success: true,
    message: "Hello, Welcome to Bookie App",
  });
});
app.use("*", (_, res: Response) => {
  return res.status(StatusCodes.NOT_FOUND).json({
    success: false,
    message: "Route not found, get out of here.",
  });
});
app.use((err: any, req: any, res: any, next: any) => {
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
