import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Login } from "../models/login-model";
import { environment } from "src/environments/environment";
import { Status } from "../models/status";
import { LoginResponse } from "../models/login-response";
import { ChangePasswordComponent } from "../components/change-password/change-password.component";
import { ChangePasswordModel } from "../models/change-password.model";

@Injectable({
    providedIn:"root"
})

export class LoginService{
private path:string=environment.bseUrl+'/authentication';
constructor(private http:HttpClient){
 
}

Login(model:Login){
 return this.http.post<LoginResponse>(this.path+'/login',model);
}

changePassword(changePasswordModel:ChangePasswordModel){
 return this.http.post<Status>(this.path+'/change-password',changePasswordModel);

}

}