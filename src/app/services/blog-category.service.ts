import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { BlogCategory } from "../models/blog-category";
import { GetBlogCategoryParams } from "../models/get-blog-categories-param";
import { GetBlogCategoriesResponse } from "../models/get-blog-categories-response";
import { Status } from "../models/status";
import { AuthService } from "./auth.service";

@Injectable({providedIn:'root'})
export class BlogCategoryService{
    baseUrl:string=environment.bseUrl+'/BlogCategory';
    // baseUrl:string='https://localhost:44343/api/BlogCategory';
    constructor(private httpClient:HttpClient,private authService:AuthService){

    }
    
    addUpdate(model:BlogCategory){
         return this.httpClient.post<Status>(this.baseUrl+'/addupdate',model);
    }

    getAll(model:GetBlogCategoryParams){
        let obj :{[k:string]:any}={pageNo:model.pageNo,pageSize:model.pageSize};
        if(model.term)
           obj['term']=model.term;
        if(model.orderBy)
           obj['orderBy']=model.orderBy;
        // console.log(`paramsObj : ${JSON.stringify(obj)}`)
        return this.httpClient.get<GetBlogCategoriesResponse>(this.baseUrl+`/getall`,
        {
          params:obj,
          withCredentials:false
        });
    }

    getById(id:number){
        return this.httpClient.get<BlogCategory>(this.baseUrl+'/getbyid/'+id);
    }

    delete(id:number){
        return this.httpClient.delete<Status>(this.baseUrl+'/delete/'+id);
    }

    getCategoriesWithoutPaging(){
        return this.httpClient.get<BlogCategory[]>(this.baseUrl+'/GetCatgoriesWithoutPaging')
    }

}