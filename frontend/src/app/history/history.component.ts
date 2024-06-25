import { Component } from '@angular/core';
import { loginAndSignup } from '../services/login.service';
import {HttpClient,HttpResponse} from '@angular/common/http';
import {Router} from '@angular/router';
@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent {
  constructor(private userservice:loginAndSignup,private router:Router){

  }
  history: any[] = [];
  isLoading = true; 
  ngOnInit():void{
    this.userservice.getAllHistory().subscribe((response: HttpResponse<any>)=>{
      this.history = response.body;  
      console.log(this.history)
      this.isLoading = false;  
    }) 
  }
  goToTask(taskData: { processId: string}): void {

    // if(taskData.taskName=='Approval For Guide')
    //   this.router.navigate(['/guideApproval',taskData.taskId]);
    // if(taskData.taskName=='Approval For DGPRC')
    //   this.router.navigate(['/dgpcApproval',taskData.taskId]);
    // if(taskData.taskName=='Approval For HOD')
    //   this.router.navigate(['/hodApproval',taskData.taskId]);
    // if(taskData.taskName=='Applicant Approval')
    //   this.router.navigate(['/applicantForm',taskData.taskId]);
    
  }
}



