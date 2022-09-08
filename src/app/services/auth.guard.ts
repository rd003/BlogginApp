import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService:AuthService,private router:Router){

  }
  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
     if(this.authService.loggedIn()) //
       return true;
    else
       {
        alert('logged out,trying to refresh');
        const isRefreshed=  await this.authService.refreshingToken(); 
        if(!isRefreshed){
          this.router.navigate(['/login']);
        }
        return isRefreshed;
       }
  }
  
}
