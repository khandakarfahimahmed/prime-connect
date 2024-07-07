import { inject } from "@angular/core";
import { Router } from "@angular/router";
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";

export const canActivate = (router: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Promise<boolean | UrlTree> | Observable<boolean | UrlTree> => {
   const token = localStorage.getItem('token');
   const route = inject(Router);
   if(token) return true;
   else {
    return route.createUrlTree(['/login']);
   }
}