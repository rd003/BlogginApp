import {Component,OnInit} from '@angular/core';
import { LoginService } from 'src/app/services/login.service';

@Component({
    selector:'app-change-password',
    templateUrl:'./change-password.component.html'
})

export class ChangePasswordComponent implements OnInit{
// use loginService.changePassword() method for changing the password
 constructor(loginService:LoginService){
  
 }

 ngOnInit(){

 }

}
