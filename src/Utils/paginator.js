"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Paginator = void 0;
class Paginator {
    static paginate(querybuilder, req) {
        return __awaiter(this, void 0, void 0, function* () {
            const page = Number(req.query.page) || 1;
            const pageSize = Number(req.query.pageSize) || 10;
            const offset = (page - 1) * pageSize;
            const totalItems = yield querybuilder.getCount();
            const totalPages = Math.ceil(totalItems / pageSize);
            const currentPage = offset / pageSize + 1;
            const nextPage = currentPage < totalPages ? currentPage + 1 : null;
            const hasNext = currentPage < totalPages;
            const hasPrev = currentPage > 1;
            const records = yield querybuilder.skip(offset).take(pageSize).getMany();
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
        });
    }
}
exports.Paginator = Paginator;
