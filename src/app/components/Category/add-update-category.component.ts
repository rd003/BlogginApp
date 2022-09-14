import { Component, OnInit } from "@angular/core";
import {FormBuilder, FormGroup, FormGroupDirective, Validators } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { BlogCategory } from "src/app/models/blog-category";
import { MyErrorStateMatcher } from "src/app/models/error-matcher";
import { Status } from "src/app/models/status";
import { BlogCategoryService } from "src/app/services/blog-category.service";

@Component({
    selector:'app-add-update-category',
    templateUrl:'./add-update-category.component.html',
    styleUrls:['./add-update-category.component.css']
})

export class AddUpdateCategory implements OnInit{
    constructor(private blogCategoryService:BlogCategoryService,private fb:FormBuilder,
        private route:ActivatedRoute){
      
    }
    status!:Status;
    title:string="Add BlogCategory";
    categories!:BlogCategory[];
    blogCategoryForm:FormGroup= this.fb.group({
        'id':[0],
        'categoryName':['',Validators.required],
        'parentCategory_Id':['']
    })
    
    matcher= new MyErrorStateMatcher();
    get f(){
        return this.blogCategoryForm.controls;
     }
    onPost(fromGrouDirective:FormGroupDirective){
      this.status={statusCode:0,message:"wait..."};
      this.blogCategoryForm.setErrors({'invalid':true});

      const blogCategory:BlogCategory=Object.assign(this.blogCategoryForm.value);
      blogCategory.parentCategory_Id=blogCategory.parentCategory_Id==""?null:blogCategory.parentCategory_Id;

      this.blogCategoryService.addUpdate(blogCategory).subscribe({
        next:(data)=>{
            this.status=data;
            if(this.status.statusCode==1){
                if(blogCategory.id==0){
                this.blogCategoryForm.reset();
                fromGrouDirective.resetForm();
                }
            }
        },
        error:(err)=>{console.log(err);
            this.status={statusCode:0,message:"Error"};
        },
        complete:()=>{
      this.blogCategoryForm.setErrors(null);
        }
      });
    }

    private getCategories(){
        this.blogCategoryService.getCategoriesWithoutPaging().subscribe({
            next:(data)=>{
               this.categories=data; 
            },
            error:(err)=>{console.log(err)}
        })
    }
    
    private setCategoryForm(id:number):void{
        this.blogCategoryService.getById(id).subscribe({
            next:(response)=>{
                console.log(response)
              this.blogCategoryForm.patchValue(response);
            },
            error:(err)=>console.log(err)
        })
    }
    ngOnInit():void{
       this.getCategories();
       var id= this.route.snapshot.params['id'];
       if(id){
        this.title="Update blog category";
         this.setCategoryForm(id);
       }
    }
}