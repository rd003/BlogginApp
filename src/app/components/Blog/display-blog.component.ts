import {Component,OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { BlogModel } from 'src/app/models/blog-model';
import { IQueryStringParam } from 'src/app/models/querystring-param';
import { BlogService } from 'src/app/services/blog.service';
@Component({
   selector:'app-display-blog',
   templateUrl:'./display-blog.component.html'
})

export class DisplayBlogComponent implements OnInit{
     
     constructor(private router:Router,private blogService:BlogService) {
        
     }
     
  orderByQueryString='';
  searchTerm='';
  length = 0;
  pageSize = 5;
  pageNo=1;
  pageSizeOptions: number[] = [5, 10, 25, 100];
  blogs!:BlogModel[];
  displayedColumns: string[] = ['no','blogTitle', 'publishedDate',"action"];

     ngOnInit(): void {
        this.fetchBlogs(); 
     }

     onBtnEdit(id:number){
        this.router.navigate([`update-blog/${id}`]);
     }

     onBtnDelete(id:number){
        if(window.confirm('are you sure to delete?')){
            this.blogService.delete(id).subscribe({
              next:(data)=>{
              if(data.statusCode==1){
               // this.blogCategories=this.blogCategories.filter(a=>a.id!=id);
               this.fetchBlogs();
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
     this.fetchBlogs();
    
   }

   /** Announce the change in sort state for assistive technology. */
  announceSortChange(sortState: any) {
    if (sortState.active && sortState.direction) {
      this.orderByQueryString=`${sortState.active} ${sortState.direction}`;
    this.fetchBlogs();
    } 
  }

  searchData(term:string){
    this.searchTerm=term;
    this.fetchBlogs();
  }

     private fetchBlogs():void{
        var param:IQueryStringParam= {pageNo:this.pageNo,pageSize:this.pageSize,term:this.searchTerm,orderBy:this.orderByQueryString};
       this.blogService.getAll(param).subscribe({
        next:(resp)=>{
            this.blogs=resp.records;
            this.length=resp.totalCount;
        },
        error:(err)=>{
         console.log(err);
        }
       })
     }

}