import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {HttpResponse} from '@angular/common/http';
import { camundaService } from '../services/camunda.service';
@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {
  taskId: any;
  isLoading = true; 
  constructor(private route: ActivatedRoute,private camundaservice:camundaService) {}

  ngOnInit(): void {
    this.taskId = this.route.snapshot.paramMap.get('id');
    this.camundaservice.getTask().subscribe((response: HttpResponse<any>)=>{
        
      this.isLoading = false;  
    }) 
  }
}