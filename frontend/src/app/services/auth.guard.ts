import {
    CanActivate,
    ActivatedRouteSnapshot,
    RouterStateSnapshot,
    Router
  } from "@angular/router";
  import { Injectable } from "@angular/core";
  import { Observable } from "rxjs";
  
  import { loginAndSignup } from "./login.service";
  
  @Injectable()
  export class AuthGuard implements CanActivate {
    constructor(private authService: loginAndSignup, private router: Router) {}
  
    canActivate(
      route: ActivatedRouteSnapshot,
      state: RouterStateSnapshot
    ): boolean | Observable<boolean> | Promise<boolean> {
      const isAuth =localStorage.getItem('isAuthenticate');
      if (!isAuth) {
        this.router.navigate(['/login']);
      }
      return !!isAuth;
    }
  }