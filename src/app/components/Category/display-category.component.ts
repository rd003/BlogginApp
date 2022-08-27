import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ColDef } from "ag-grid-community";
import { BlogCategory } from "src/app/models/blog-category";
import { BlogCategoryService } from "src/app/services/blog-category.service";
import { BtnCellRendererComponent } from "../btn-cell-renderer/btn-cell-renderer.component";
@Component({
   selector:'app-display-category-component',
   templateUrl:'./display-category.component.html'
})

export class DisplayCategoryComponent implements OnInit{

    constructor(private blogCategoryService:BlogCategoryService,private router:Router){
        this.frameworkComponents = {
            buttonRenderer: BtnCellRendererComponent,
          }
    }
    
    rowData!:BlogCategory[];
    colDefs:ColDef[]=[
        {field:'id',hide:true},
        {field:'categoryName',filter:true,sortable:true},
        {field:'parentCategory_Id',hide:true},
        {field:'parentCategoryName',filter:true,sortable:true},
        {
         headerName: 'Edit',
         cellRenderer: 'buttonRenderer',
         cellRendererParams: {
           onClick: this.onBtnEdit.bind(this),
           label: 'Edit',
           cssClass:'btn btn-success'
         }
       },
       {
         headerName: 'Delete',
         cellRenderer: 'buttonRenderer',
         cellRendererParams: {
           onClick: this.onBtnDelete.bind(this),
           label: 'Delete',
           cssClass:'btn btn-danger'
         }
       }
      ];
   
      frameworkComponents: any;
      api:any;
    
    ngOnInit():void{
    this.fetchBlogCategories();
    
    }

    onGridReady(params:any)
{
  this.api = params.api;
}
  
  onBtnEdit(e:any) {
    var data= e.rowData;
    this.router.navigate([`/update-category/${data.id}`])
  }
  onBtnDelete(e:any){
    if(window.confirm('are you sure to delete?')){
    var data=e.rowData;
      this.blogCategoryService.delete(data.id).subscribe({
        next:(data)=>{
        if(data.statusCode==0){
          console.log(data.message);
        }
        else{
    this.api.updateRowData({remove: [e.rowData]});
        }
      },
      error:(err)=>{
        console.log(err);
      }
      })
    }
  }

    fetchBlogCategories(){
        this.blogCategoryService.getAll().subscribe({
            next:(data)=>{
                this.rowData=data;
            },
            error:(err)=>{console.log(err)}
        })
    }
}