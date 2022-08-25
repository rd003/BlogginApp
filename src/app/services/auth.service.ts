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

      constructor(){

      }
}