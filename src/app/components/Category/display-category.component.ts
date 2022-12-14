import { Component, OnInit } from "@angular/core";
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
    displayedColumns: string[] = ['no','categoryName', 'parentCategoryName',"action"];
    // MatPaginator Inputs
  orderByQueryString='';
  searchTerm='';
  length = 0;
  pageSize = 5;
  pageNo=1;
  pageSizeOptions: number[] = [5, 10, 25, 100];
  // MatPaginator Output
  
  
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
     this.pageSize=event.pageSize;
     this.fetchBlogCategories();

   }

   /** Announce the change in sort state for assistive technology. */
  announceSortChange(sortState: any) {
    if (sortState.active && sortState.direction) {
      this.orderByQueryString=`${sortState.active} ${sortState.direction}`;
    this.fetchBlogCategories();
    } 
  }

  searchData(term:string){
    this.searchTerm=term;
    this.fetchBlogCategories();
  }
    private fetchBlogCategories(){
       var params:GetBlogCategoryParams= {term:this.searchTerm,pageNo:this.pageNo,pageSize:this.pageSize,orderBy:this.orderByQueryString};
       this.blogCategoryService.getAll(params).pipe(debounceTime(100)).subscribe({
            next:(data)=>{
                this.blogCategories=data.records;
                this.length=data.totalCount;
            },
            error:(err)=>{console.log(err)}
        })
    }
}