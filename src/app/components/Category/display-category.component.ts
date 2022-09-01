import { Component, OnInit } from "@angular/core";
import { PageEvent } from "@angular/material/paginator";
import { Router } from "@angular/router";
import { debounceTime } from "rxjs";
import { BlogCategory } from "src/app/models/blog-category";
import { GetBlogCategoryParams } from "src/app/models/get-blog-categories-param";
import { BlogCategoryService } from "src/app/services/blog-category.service";
@Component({
   selector:'app-display-category-component',
   templateUrl:'./display-category.component.html'
})

export class DisplayCategoryComponent implements OnInit{

    constructor(private blogCategoryService:BlogCategoryService,private router:Router){
       
    }
    
    blogCategories!:BlogCategory[];
    displayedColumns: string[] = ['category', 'parentCategory',"action"];
    // MatPaginator Inputs
  length = 0;
  pageSize = 5;
  pageNo=1;
  pageSizeOptions: number[] = [5, 10, 25, 100];
  // MatPaginator Output
  

  // setPageSizeOptions(setPageSizeOptionsInput: string) {debugger
  //   if (setPageSizeOptionsInput) {
  //     this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
  //   }
  // }
    ngOnInit():void{
    this.fetchBlogCategories();
    
    }

  
  
  onBtnEdit(id:number) {
    this.router.navigate([`/update-category/${id}`])
  }
  onBtnDelete(id:number){
    if(window.confirm('are you sure to delete?')){
      this.blogCategoryService.delete(id).subscribe({
        next:(data)=>{
        if(data.statusCode==1){
         // this.blogCategories=this.blogCategories.filter(a=>a.id!=id);
         this.fetchBlogCategories();
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

  //paginator change page funtion
  changePage(event:any){
    // console.log(`page size:${event.pageSize} index:${event.pageIndex} length:${event.length}`)
     this.pageNo=parseInt(event.pageIndex)+1;
    this.fetchBlogCategories();

   }

  searchData(term:string){
    this.fetchBlogCategories(term)
  }
    private fetchBlogCategories(searchTerm:string=''){
       var params:GetBlogCategoryParams= {term:searchTerm,pageNo:this.pageNo,pageSize:this.pageSize};
        this.blogCategoryService.getAll(params).pipe(debounceTime(100)).subscribe({
            next:(data)=>{
                this.blogCategories=data.records;
                this.length=data.totalCount;
            },
            error:(err)=>{console.log(err)}
        })
    }
}