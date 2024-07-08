import express from "express";
import { check } from "express-validator";
import { AuthorController } from "../controllers/authors.controller";
import { ErrorHandler, requestValidator } from "../middleware/errorhandler";
import { FileUploader } from "../middleware/fileUploader";

const authorRoute = express.Router();

const authorController = new AuthorController();

authorRoute.get("/", authorController.getAuthors);
authorRoute.get(
  "/:id",
  ErrorHandler.handleError(authorController.getSingleAuthor)
);
authorRoute.put(
  "/:id",
  [
    check("name").notEmpty().isString().withMessage("Please enter a name"),
    check("bio").optional().isString(),
    check("image")
      .optional()
      .custom((_, { req }) => {
        if (!req.file) {
          throw new Error("No file uploaded.");
        }
        return true;
      }),
  ],
  requestValidator.validate,
  ErrorHandler.handleError(authorController.updateAuthor)
);
authorRoute.post(
  "/",
  FileUploader.upload("image", "authors"),
  [
    check("name").notEmpty().isString().withMessage("Please enter a name"),
    check("bio").optional().isString(),
    check("image").custom((_, { req }) => {
      if (!req.file) {
        throw new Error("No file uploaded.");
      }
      return true;
    }),
  ],
  requestValidator.validate,
  ErrorHandler.handleError(authorController.createAuthor)
);

export default authorRoute;
