import { BlogCategory } from "./blog-category"
import { IPaginatorResponse } from "./IPaginatorResponse"

export interface GetBlogCategoriesResponse extends IPaginatorResponse{
    records:BlogCategory[]
}