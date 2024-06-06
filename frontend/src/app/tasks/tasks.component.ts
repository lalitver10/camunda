import { Component,OnInit } from '@angular/core';
import { camundaService } from '../services/camunda.service';
import {HttpClient,HttpResponse} from '@angular/common/http';
@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css'],
})
export class TasksComponent implements OnInit {
  constructor(private camundaservice:camundaService){

  }
  tasks: any[] = [];
  isLoading = true; 
  ngOnInit(): void{
    // this.camundaservice.getAllTask().subscribe((response: HttpResponse<any>)=>{
    //   this.tasks = response.body.message;  
    //   this.isLoading = false;  
    // }) 
  }
}



// <div *ngIf="isLoading" class="loading-indicator">
//     Loading...
//   </div>
  
// <div class="card-container">
//     <div *ngFor="let task of tasks" class="card">
//       <h3>{{ task.name }}</h3>
//       <p>{{task.id}}</p>
//       <p>Leave Application date: {{ task.created }}</p>
//     </div>
//   </div>
