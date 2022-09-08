import { Injectable } from "@angular/core"
import { TokenInfoModel } from "../models/token-info";
import { TokenService } from "./token.service";
     

@Injectable({
    providedIn:'root'
})
export class AuthService{
      loggedIn():boolean{
        return !!localStorage.getItem('token') && !this.tokenExpired()
      }
    
      // methods for local storage handling starts
      
      getUsername(){
        return localStorage.getItem('username')
      }

      setUserName(username:string){
        localStorage.setItem('username',username);
      }

      removeUserName(){
        localStorage.removeItem('username');
      }

      getToken(){
        return localStorage.getItem('token')
      }

      getRefreshToken(){
        return localStorage.getItem('refreshToken');
      }

      setTokens(accessToken:string,refreshToken:string){
       localStorage.setItem('token',accessToken);
       localStorage.setItem('refreshToken',refreshToken);
      }

      removeTokens(){
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
      }
      

      // methods for local storage handling ends here
         
      logout():boolean{
        var loggedIn=this.loggedIn();
        if(loggedIn){
        this.removeTokens();
        this.removeUserName();
        return true;
        }
        return false;
      }

        tokenExpired():boolean {
        const token: string=this.getToken()??"";
        if(!token)
          return false;
        const tokenSplit:string=token.split('.')[1];
        const decodedString:string=atob(tokenSplit);
        const jsonString=JSON.parse(decodedString);
        const expiry = (jsonString).exp;
        return (Math.floor((new Date).getTime() / 1000)) >= expiry;
      }

      async refreshingToken():Promise<boolean>{
        const token = this.getToken();
        const refreshToken = this.getRefreshToken();
        if(!token || !refreshToken){
           return false;
        }
        let success!:boolean;
        const data:TokenInfoModel={accessToken:token,refreshToken:refreshToken};
        this.tokenService.generateRefreshToken(data).subscribe({
           next: (response)=>{
              this.setTokens(response.accessToken,response.refreshToken);
               success=true;
           },
           error: (error)=>{
            console.log(error);
            success=false;
           }
        });
        return success;
      }
       
      constructor(private tokenService:TokenService){

      }
}