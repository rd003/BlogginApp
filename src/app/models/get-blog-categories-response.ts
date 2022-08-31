import { BlogCategory } from "./blog-category"

export interface GetBlogCategoriesResponse{
    currentPage: number,
    totalPages: number,
    pageSize: number,
    hasPrevious: boolean,
    hasNext: boolean,
    records:BlogCategory[]
}