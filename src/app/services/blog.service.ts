import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { BlogModel } from "../models/blog-model";
import { GetBlogResponse } from "../models/get-blog-response";
import { IQueryStringParam } from "../models/querystring-param";
import { Status } from "../models/status";
@Injectable({
    'providedIn':'root'
})
export class BlogService{
    constructor(private http:HttpClient){
      
    }

    private basePath:string = environment.bseUrl+'/blog';
    
    addUpdate(blog:BlogModel){
        const url=this.basePath+'/addupdate';
        return this.http.post<Status>(url,blog);
    }

    getById(id:number){
        const url=this.basePath+'/getbyid/'+id;
        return this.http.get<BlogModel>(url);
    }

    delete(id:number){
        const url=this.basePath+'/delete/'+id;
        return this.http.delete<Status>(url);
    }

    getAll(data:IQueryStringParam){
        const url=this.basePath+'/getAll';
        let obj:{[k:string]:any}={pageNo:data.pageNo,pageSize:data.pageSize};
        if(data.term)
           obj['term']=data.term;
        if(data.orderBy)
           obj['orderBy']=data.orderBy;
        return this.http.get<GetBlogResponse>(url,{
            params:obj,
            withCredentials:false
        });
    }
     
}