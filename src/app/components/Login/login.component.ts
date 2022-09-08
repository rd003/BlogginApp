import { Component,OnInit } from "@angular/core";
import { FormBuilder, FormGroupDirective, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { MyErrorStateMatcher } from "src/app/models/error-matcher";
import { Login } from "src/app/models/login-model";
import { Status } from "src/app/models/status";
import { AuthService } from "src/app/services/auth.service";
import { LoginService } from "src/app/services/login.service";


@Component({
    selector:'app-login',
    templateUrl:'./login.component.html',
    styleUrls:['./login.component.css']
})

export class LoginComponent implements OnInit{
    matcher = new MyErrorStateMatcher();
    loginForm=this.fb.group({
      'username':['',Validators.required],
      'password':['',Validators.required]
    });
    status!:Status;
    disable:boolean=this.loginForm.invalid;
    constructor(private loginService:LoginService,private fb:FormBuilder,private router:Router,private authService:AuthService){
         
    }
    
    ngOnInit():void{
        if(this.authService.loggedIn())
          {
            this.router.navigate(['/dashboard']);
          }
    }

    get f(){
       return this.loginForm.controls;
    }
    
    onPost(formDirective:FormGroupDirective){
        this.status={statusCode:2,message:"wait..."};
        this.disable=true;
        const loginData:Login=Object.assign(this.loginForm.value);
        this.loginService.Login(loginData).subscribe({
            next:(data)=>{
                this.status={statusCode:data.statusCode,message:data.message}
                if(data.statusCode==1){
                    this.status={statusCode:0,message:''};
                    this.authService.setUserName(data.username);
                    this.authService.setTokens(data.token,data.refreshToken);
                    this.loginForm.reset();
                    this.router.navigate(['/dashboard']);
                }
                this.loginForm.reset();
                formDirective.resetForm();
            },
            error:(error)=>{
                console.error(error);
            },
            complete:()=>{
                this.disable=false;
            }
        });
       
    }
}