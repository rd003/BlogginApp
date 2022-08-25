import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Login } from "../models/login-model";
import { environment } from "src/environments/environment";
import { Status } from "../models/status";
import { LoginResponse } from "../models/login-response";

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

}