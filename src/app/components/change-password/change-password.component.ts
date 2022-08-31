import {Component,OnInit} from '@angular/core';
import { FormBuilder, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { Status } from 'src/app/models/status';
import { AuthService } from 'src/app/services/auth.service';
import { LoginService } from 'src/app/services/login.service';
import {ChangePasswordModel} from 'src/app/models/change-password.model';
import { Router } from '@angular/router';
import { MyErrorStateMatcher } from 'src/app/models/error-matcher';
import { MustMatch } from 'src/app/helpers/mustmatch.validator';
import { validPattern } from 'src/app/helpers/pattern.validator';

@Component({
    selector:'app-change-password',
    templateUrl:'./change-password.component.html'
})

export class ChangePasswordComponent implements OnInit{
 // use loginService.changePassword() method for changing the password
 constructor(private loginService:LoginService,private router:Router,
    private authService:AuthService,private fb:FormBuilder){
       
 }

 frm!:FormGroup;
 status!:Status;
 matcher= new MyErrorStateMatcher();
 get f(){
    return this.frm.controls;
 }
 ngOnInit(){
    const patternRegex= new RegExp('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*[#$^+=!*()@%&]).{6,}$');
    this.frm = this.fb.group({
        'currentPassword':['',Validators.required],
        'newPassword':['',[Validators.required,validPattern(patternRegex)]],
        'confirmPassword':['',Validators.required]
    },{
        validator:MustMatch('newPassword','confirmPassword')
    })
 }

 onPost(fromGrouDirective:FormGroupDirective){
    this.status={statusCode:0,message:"wait.."};
    let changePasswordModel:ChangePasswordModel = Object.assign(this.frm.value);
    changePasswordModel.username=this.authService.getUsername()??"";
    this.loginService.changePassword(changePasswordModel).subscribe({
        next:(data)=>{
            this.status=data;
            if(data.statusCode==1){
                alert('Password has changed successfully..now we are logging you out');
                this.authService.logout();
                this.router.navigate(['/login']);
            }
            else{
               this.frm.reset();
               fromGrouDirective.resetForm();
            }
        },
        error:(err)=>{console.log(err)}
    });
 }

}
