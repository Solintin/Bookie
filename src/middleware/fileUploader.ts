import fs from "fs";
import multer from "multer";
import path from "path";
import crypto from "crypto";

export class FileUploader {
  static upload(
    fileFieldName: string,
    folderName?: string,
    fileSize?: number,
    fileTypes: string[] = ["image/jpeg", "image/png"]
  ) {
    const storage = multer.diskStorage({
      destination: (req, file, cb) => {
        const folder = path.resolve(`uploads/${folderName}`);
        if (!fs.existsSync(folder)) {
          fs.mkdirSync(folder);
        }
        cb(null, folder);
      },
      filename: (req, file, cb) => {
        cb(
          null,
          crypto.randomUUID().toString() + path.extname(file.originalname)
        );
      },
    });
    const fileFilter = (req: any, file: any, cb: any) => {
      if (fileTypes.includes(file.mimetype)) {
        cb(null, true);
      } else {
        cb(
          new Error("Invalid file type. Only JPEG and PNG images are allowed."),
          false
        );
      }
    };
    let upload = multer({
      storage: storage,
      limits: { fileSize: fileSize },
      fileFilter,
    }).single(fileFieldName);
    return upload;
  }
}
