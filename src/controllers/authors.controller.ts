import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { ResponsePayload } from "../middleware/response";
import { AppDataSource } from "../database/data-source";
import { Author } from "../entities/Author";
import { Paginator } from "../Utils/paginator";

export class AuthorController {
  async getAuthors(req: Request, res: Response): Promise<Response> {
    const authors = await AppDataSource.getRepository(Author)
      .createQueryBuilder()
      .orderBy("id", "ASC");
    const { records, paginationInfo } = await Paginator.paginate(authors, req);

    return ResponsePayload.sendSuccess<Author>(
      res,
      "Authors fetched Successfully",
      records,
      StatusCodes.OK,
      paginationInfo
    );
  }

  async getSingleAuthor(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const author = await AppDataSource.getRepository(Author).findOneByOrFail({
      id: +id,
    });
    return ResponsePayload.sendSuccess<Author>(
      res,
      "Single Author fetched Successfully",
      author,
      StatusCodes.OK
    );
  }

  async createAuthor(req: Request, res: Response): Promise<Response> {
    const authorData = req.body;
    authorData.image = req.file?.filename;
    console.log(authorData);

    const repo = await AppDataSource.getRepository(Author);
    const author = repo.create(authorData);
    await repo.save(author);

    return ResponsePayload.sendSuccess(
      res,
      "New Author created successfully",
      author,
      StatusCodes.OK
    );
  }
}
