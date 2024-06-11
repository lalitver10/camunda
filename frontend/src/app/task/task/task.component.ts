import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { camundaService } from '../../services/camunda.service';
import { FormBuilder,FormControl, FormGroup ,Validators} from '@angular/forms';
@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {
  taskId: any;
  taskName:any;
  isLoading = true;
  data:any ;
  leaveForm: any;
  constructor(private route: ActivatedRoute,private camundaservice:camundaService,private fb: FormBuilder) {}

  ngOnInit(): void {
    
    this.taskId = this.route.snapshot.paramMap.get('id');
    this.taskName=this.camundaservice.getTaskName();
    console.log(this.taskName)
    this.camundaservice.getTask(this.taskId).subscribe(response=>{
      console.log(response)
      const data={
        
      };
      this.isLoading = false; 
      this.initializeForm();
      
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
  onSubmit() {
   
  }
  
}