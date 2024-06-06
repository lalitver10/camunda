import { Component,OnInit } from '@angular/core';
import { FormBuilder,FormControl, FormGroup ,Validators} from '@angular/forms';
import {HttpClient,HttpResponse} from '@angular/common/http';
import {loginAndSignup} from '../services/login.service';
import { ToastrService } from 'ngx-toastr';
import {Router} from '@angular/router';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit{

  leaveForm: any;
  showGuideField = false;
  constructor(private fb: FormBuilder,private http:HttpClient,private loginservice:loginAndSignup,private toastr: ToastrService,private router:Router) {
    leaveForm: FormGroup;
  }

  ngOnInit() {
    this.leaveForm = this.fb.group({
      rollNum: ['', Validators.required],
      names: ['', Validators.required],
      course: ['', Validators.required],
      dept: ['', Validators.required],
      guide:['', Validators.required],
      password:['', Validators.required],
      userType:['', Validators.required]

    });
  }


onUserTypeChange() {
  const userType = this.leaveForm.get('userType').value;
  if (userType === 'student') {
    this.showGuideField = true;
    this.leaveForm.get('guide').setValidators(Validators.required);
  } else {
    this.showGuideField = false;
    this.leaveForm.get('guide').clearValidators();
  }
  this.leaveForm.get('guide').updateValueAndValidity();
}

  onSubmit() {
    if (!this.leaveForm.valid) return ;
    else{
      this.loginservice.createUser(this.leaveForm.value).subscribe((response: HttpResponse<any>) =>{
        if(response.status==200){
          this.toastr.success(response.body.message)
          this.router.navigate(['/login']);
        }
        else if(response.status==201){
          this.toastr.error(response.body.message);
        }
      })
    }
  }
}