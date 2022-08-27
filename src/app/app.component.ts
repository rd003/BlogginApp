import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'BloggerApp';
  isLoggedIn!:boolean;
  
  logout(){
   const loggedOut:boolean=this.authService.logout();
   if(loggedOut){
       this.router.navigate(['/login']);
   }
  }

  checkLoggedInUser(){
    this.isLoggedIn=this.authService.loggedIn();
  }
  constructor(private authService:AuthService,private router:Router){
      if(authService.tokenExpired()){
        alert("token has expired");
      }
  }
}
