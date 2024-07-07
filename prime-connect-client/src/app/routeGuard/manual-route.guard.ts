import { Injectable } from '@angular/core';
import { CanActivate,NavigationStart, ActivatedRouteSnapshot, RouterStateSnapshot, Router, NavigationEnd, UrlTree } from '@angular/router';
import { filter,takeWhile,map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ManualRouteGuard implements CanActivate {

    private previousUrl: string | UrlTree = '';

  constructor(private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    

    // Log the previous and current routes
    console.log('Previous Route:', this.previousUrl);
    console.log('Current Route:', state.url);
    console.log(this.previousUrl == state.url);
    if( this.router.url == '/') {
        this.router.navigateByUrl('/login');
        return false;
    }
    return true; 
  }
}
