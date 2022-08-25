import { Component, OnInit } from "@angular/core";
import { BlogCategory } from "src/app/models/blog-category";
import { BlogCategoryService } from "src/app/services/blog-category.service";
@Component({
   selector:'app-display-category-component',
   templateUrl:'./display-category.component.html',
   styles:['table {width: 100%;margin:atuo}']
})

export class DisplayCategoryComponent implements OnInit{

    categories!:BlogCategory[];
    displayedColumns: string[] = ['categoryName', 'parentCategoryName'];
    constructor(private blogCategoryService:BlogCategoryService){

    }
    
    ngOnInit():void{
    this.fetchBlogCategories();
    
    }

    // getBlogCategories(){
    //     const url='http://localhost:81/api/blogcategory/getall';
    //     const header={'Authorization':`Bearer ${localStorage.getItem('token')}`};
    //     fetch(url,{
    //         headers:header
    //     }).then(resp=>resp.json())
    //         .then(data=>{console.log(data)})
    //     .catch(err=>console.log(err))
    // }

    fetchBlogCategories(){
        this.blogCategoryService.getAll().subscribe({
            next:(data)=>{
                this.categories=data;
            },
            error:(err)=>{console.log(err)}
        })
    }
}