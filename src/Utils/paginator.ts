export class Paginator {
  static async paginate(querybuilder, req) {
    const page = Number(req.query.page) || 1;
    const pageSize = Number(req.query.pageSize) || 10;
    const offset = (page - 1) * pageSize;
    const totalItems = await querybuilder.getCount();
    const totalPages = Math.ceil(totalItems / pageSize);
    const currentPage = offset / pageSize + 1;
    const nextPage = currentPage < totalPages ? currentPage + 1 : null;
    const hasNext = currentPage < totalPages;
    const hasPrev = currentPage > 1;
    const records = await querybuilder.skip(offset).take(pageSize).getMany();

    const paginationInfo = {
      currentPage,
      pageSize,
      totalItems,
      nextPage,
      hasNext,
      hasPrev,
    };
    return {
      records,
      paginationInfo,
    };
  }
}
