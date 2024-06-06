import { Component,OnInit, OnDestroy } from '@angular/core';
import { Subscription } from "rxjs";
import {loginAndSignup} from '../services/login.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {
  
  isLoggedIn = false;
  username:any;
  private authListenerSubs: any
  constructor(private loginservice:loginAndSignup,private router:Router){}
  
  ngOnInit(): void {
    this.isLoggedIn=!!localStorage.getItem('isAuthenticate');
    this.authListenerSubs = this.loginservice
    .getAuthStatusListener()
    .subscribe(isAuthenticated => {
      this.isLoggedIn = isAuthenticated;
      this.username=localStorage.getItem('username');
    });
    
  }

  logout(): void {
    localStorage.clear();
    this.router.navigate(['\login']);
  }
  ngOnDestroy() {
    this.authListenerSubs.unsubscribe();
  }
}

