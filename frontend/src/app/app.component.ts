import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'leave-application';
  private roles: string[] = [];
  isLoggedIn = false;
  username="Lalit Verma"
  constructor() { }

  ngOnInit(): void {
    this.isLoggedIn =false 

    if (this.isLoggedIn) {
      this.username="Shivam Verma"
    }
  }

  logout(): void {
    window.location.reload();
  }
}
