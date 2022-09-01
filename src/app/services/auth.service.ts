import { Injectable } from "@angular/core"
     

@Injectable({
    providedIn:'root'
})
export class AuthService{
    loggedIn():boolean{
        return !!localStorage.getItem('token') && !this.tokenExpired()
      }
    
      getToken(){
        return localStorage.getItem('token')
      }

      getUsername(){
        return localStorage.getItem('username')
      }
         
      logout():boolean{
        var loggedIn=this.loggedIn();
        if(loggedIn){
        localStorage.removeItem('token');
        localStorage.removeItem('username');
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
       
      constructor(){

      }
}