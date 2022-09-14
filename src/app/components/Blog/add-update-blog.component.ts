import {Component,OnInit} from '@angular/core';
import { FormBuilder, FormGroup,FormGroupDirective,Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { convertDate } from 'src/app/helpers/date-helper';
import { BlogCategory } from 'src/app/models/blog-category';
import { BlogModel } from 'src/app/models/blog-model';
import { MyErrorStateMatcher } from 'src/app/models/error-matcher';
import { Status } from 'src/app/models/status';
import { AuthService } from 'src/app/services/auth.service';
import { BlogCategoryService } from 'src/app/services/blog-category.service';
import { BlogService } from 'src/app/services/blog.service';

@Component({
    selector:'app-add-update-blog',
    templateUrl:'./add-update-blog.component.html'
})

export class AddUpdateBlogComponent implements OnInit{
    status!:Status;
    frm!:FormGroup;
    categories!:BlogCategory[];
    matcher= new MyErrorStateMatcher();
    get f(){
        return this.frm.controls;
     }

     // constructor
    constructor(private blogService:BlogService,private fb:FormBuilder,private authService:AuthService,
        private categoryService:BlogCategoryService,private route:ActivatedRoute
        ){
       
    }

    // post method for form
    onPost(formGroupDirective:FormGroupDirective){
      this.status={statusCode:0,message:"wait..."};
      this.frm.setErrors({'invalid':true});
      let blog:BlogModel=Object.assign(this.frm.value);
      if(blog.id==0){
      blog.publishedDate= new Date().toISOString();  
      }

      this.blogService.addUpdate(blog).subscribe({
        next:(resp)=>{
          this.status=resp;
          if(this.status.statusCode==1){
            if(blog.id==0){
            this.frm.reset();
            formGroupDirective.resetForm();
            }
        }
        },
        error:(err)=>{
            console.log(err);
        }
      })
    }

    ngOnInit(): void {
        
        this.frm=this.fb.group({
            'id':[0],
            'publishedDate':[''],
            'isPublished':[true],
            'isDeleted':[false],
            'categoryId':['',Validators.required],
            'blogTitle':['',Validators.required],
            'blogContent':['',Validators.required],
            'authorUsername':[this.authService.getUsername()]
           }) 

           this.loadCategories();

           var id= this.route.snapshot.params['id'];
           if(id){
              this.blogService.getById(id).subscribe({
                next:(data)=>{
                   this.frm.patchValue(data);
                },
                error:(err)=>console.log(err)
              })
           }
    }

    //private method for loading categories
    private loadCategories(){
        this.categoryService.getCategoriesWithoutPaging().subscribe({
            next:(resp)=>{
                this.categories=resp;
            },
            error:(err)=>console.log(err)
        })
    }
}