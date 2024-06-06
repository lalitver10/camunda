import { Component } from '@angular/core';
import { FormBuilder,FormControl, FormGroup ,Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {loginAndSignup} from '../services/login.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  private isLoggedIn=false;
  leaveForm: any;
  constructor(private fb: FormBuilder,private router:Router,private loginservice:loginAndSignup) {
    this.leaveForm=FormGroup
  }

  ngOnInit() {
      this.isLoggedIn=!!localStorage.getItem('isAuthenticate');
      if(this.isLoggedIn){
        this.router.navigate(['/allTask']);
      }
      this.leaveForm = this.fb.group({
      rollNum: ['', Validators.required],
      password:['', Validators.required]

    });
  }

  onSubmit() {
    if(this.leaveForm.invalid)return;
      const data={
        "rollNum":this.leaveForm.value.rollNum,
        "password":this.leaveForm.value.password
      }
      this.loginservice.login(data);

  }
}