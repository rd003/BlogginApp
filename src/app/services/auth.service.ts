import { Injectable } from "@angular/core"
     

@Injectable({
    providedIn:'root'
})
export class AuthService{
    loggedIn():boolean{
        return !!localStorage.getItem('token') 
      }
    
      getToken(){
        return localStorage.getItem('token')
      }
         
      logout():boolean{
        var loggedIn=this.loggedIn();
        if(loggedIn){
          console.log('logout');
        localStorage.removeItem('token');
        return true;
        }
        return false;
      }

       tokenExpired():boolean {
        const token: string=this.getToken()??"";
        const expiry = (JSON.parse(atob(token.split('.')[1]))).exp;
        return (Math.floor((new Date).getTime() / 1000)) >= expiry;
      }
       
      constructor(){

      }
}