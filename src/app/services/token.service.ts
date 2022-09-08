import { HttpClient } from '@angular/common/http';
import {Injectable} from '@angular/core';
import { environment } from 'src/environments/environment';
import { TokenInfoModel } from '../models/token-info';
@Injectable({
    providedIn:'root'
})
export class TokenService{
  constructor(private http:HttpClient){

  }
  private baseUrl:string=environment.bseUrl+'/token';
  generateRefreshToken(data:TokenInfoModel){
    const url= this.baseUrl+'/refresh';
    return this.http.post<TokenInfoModel>(url,data);
  }

  revokeRefreshToken(){
   const url=this.baseUrl+'/revoke';
   return this.http.post(url,null);
  }
}