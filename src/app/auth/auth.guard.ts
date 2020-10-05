import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { UserService } from '../shared/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

 /**
  *
  */
 constructor(private router: Router , private service: UserService) {
  
 }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot):  boolean  {
      if(localStorage.getItem('token') != null) {
         let roles = next.data['permittedRoles'] as Array<string>;
        // Check whether the curent user has all the roles to access the route.
         if(roles) {
                if(this.service.roleMatch(roles)) return true; 
                else {
                  this.router.navigateByUrl('/forbidden');
                  return false;
                }

         }
      
    return true;
      }
    else 
     this.router.navigateByUrl('/user/login');
     return false;
  }
  
}
