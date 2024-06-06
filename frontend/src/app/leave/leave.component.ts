import { Component,OnInit } from '@angular/core';
import { FormBuilder,FormControl, FormGroup ,Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {loginAndSignup} from '../services/login.service';
import {camundaService} from '../services/camunda.service';
import {Router} from '@angular/router';
@Component({
  selector: 'app-leave',
  templateUrl: './leave.component.html',
  styleUrls: ['./leave.component.css']
})
export class LeaveComponent {
   
   leaveForm: any;
   userDetails:any;
  constructor(private fb: FormBuilder,
    private http:HttpClient,
    private router:Router,
    private loginservice:loginAndSignup,
    private camundaService:camundaService
  ){}

  ngOnInit() {
    this.initializeForm();
    this.getDetails();
    
  }
  getDetails(){
    this.loginservice.getUser().subscribe(response=>{
      this.userDetails=response;
      this.updateForm();
    })
    
  }
  initializeForm(){
    this.leaveForm = this.fb.group({
      rollNum: ['', Validators.required],
      name: ['', Validators.required],
      course: ['', Validators.required],
      dept: ['', Validators.required],
      fromDate:['', Validators.required],
      toDate:['', Validators.required],
      remLeave:['', Validators.required],
      assignee:['', Validators.required],
      comment:['', Validators.required],
    });
  }
  updateForm(){
    this.leaveForm.patchValue({
      rollNum: this.userDetails.rollNum,
      name: this.userDetails.name,
      course: this.userDetails.course,
      dept: this.userDetails.dept,
      assignee: this.userDetails.guide
    });
  }
  onSubmit() {
    if (this.leaveForm.valid) {
      this.camundaService.postLeave(this.leaveForm.value).subscribe(response=>{  
         if(response){
          this.router.navigate([''])
         }
      });
    } else {
      console.log('Form is invalid');
    }
  }
}
