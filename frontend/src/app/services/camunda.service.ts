import { Injectable } from "@angular/core";
import {HttpClient,HttpResponse} from '@angular/common/http';
import {Router} from '@angular/router';
import { Observable} from "rxjs";
@Injectable({ providedIn: "root" })
export class camundaService{
    private taskName:any;
    private baseUrl="http://localhost:9002/api/camunda";
    constructor(private http:HttpClient,private router:Router){}
   
    postLeave(data:any) {
        return this.http.post(`${this.baseUrl}/postLeave`,data);
      }
      
      getAllTask():Observable<HttpResponse<any>>{
        return this.http.get(`${this.baseUrl}/getAlltask`,{ observe: 'response' });
      }
      getTask(taskId:string){
        const body={
          '_id':taskId
        }
        return this.http.post(`${this.baseUrl}/gettask`,body);
      }
      setTaskName(name:string){
        this.taskName=name;
        
      }
    
      getTaskName(){
        return this.taskName;
      }
      completeTask(data:any){
        console.log(data)
        return this.http.post(`${this.baseUrl}/completeTask`,data); 
      }
}