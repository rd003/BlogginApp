import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { BlogCategory } from "src/app/models/blog-category";
import { GetBlogCategoryParams } from "src/app/models/get-blog-categories-param";
import { BlogCategoryService } from "src/app/services/blog-category.service";
@Component({
   selector:'app-display-category-component',
   templateUrl:'./display-category.component.html',
   styles:[`table {
    width: 90%;
    }`]
})

export class DisplayCategoryComponent implements OnInit{

    constructor(private blogCategoryService:BlogCategoryService,private router:Router){
       
    }
    
    blogCategories!:BlogCategory[];
    displayedColumns: string[] = ['categoryName', 'parentCategoryName'];
    ngOnInit():void{
    this.fetchBlogCategories();
    
    }

  
  
  onBtnEdit(id:number) {
    this.router.navigate([`/update-category/${id}`])
  }
  onBtnDelete(id:number,index:number){
    if(window.confirm('are you sure to delete?')){
      this.blogCategoryService.delete(id).subscribe({
        next:(data)=>{
        if(data.statusCode==1){
          this.blogCategories.splice(index,1);
        }
        else{
          alert(data.message);
        }
      },
      error:(err)=>{
        console.log(err);
      }
      })
    }
  }

    fetchBlogCategories(){
       var params:GetBlogCategoryParams= {term:'',pageNo:1,pageSize:5};
        this.blogCategoryService.getAll(params).subscribe({
            next:(data)=>{
                this.blogCategories=data.records;
            },
            error:(err)=>{console.log(err)}
        })
    }
}