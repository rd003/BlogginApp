import { BlogCategory } from "./blog-category"
import { BlogModel } from "./blog-model"
import { IPaginatorResponse } from "./IPaginatorResponse"
export interface GetBlogResponse extends IPaginatorResponse{
    records:BlogModel[]
}