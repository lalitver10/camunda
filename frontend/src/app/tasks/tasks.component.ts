import { Component,OnInit } from '@angular/core';
import { camundaService } from '../services/camunda.service';
import {HttpClient,HttpResponse} from '@angular/common/http';
import {Router} from '@angular/router';
@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css'],
})
export class TasksComponent implements OnInit {
  constructor(private camundaservice:camundaService,private router:Router){

  }
  tasks: any[] = [];
  isLoading = true; 
  ngOnInit():void{
    this.camundaservice.getAllTask().subscribe((response: HttpResponse<any>)=>{
      this.tasks = response.body.message;  
      this.isLoading = false;  
    }) 
  }
  goToTask(taskData: { taskId: string, taskName: string }): void {
    if(taskData.taskName=='Approval For Guide')
      this.router.navigate(['/guideApproval',taskData.taskId]);
    if(taskData.taskName=='Approval For DGPRC')
      this.router.navigate(['/dgpcApproval',taskData.taskId]);
    if(taskData.taskName=='Approval For HOD')
      this.router.navigate(['/hodApproval',taskData.taskId]);
    if(taskData.taskName=='Applicant Approval')
      this.router.navigate(['/applicantForm',taskData.taskId]);
    
  }
}



