import { Injectable } from "@angular/core";
import {HttpClient,HttpResponse} from '@angular/common/http';
import {Router} from '@angular/router';
import { Observable} from "rxjs";
@Injectable({ providedIn: "root" })
export class camundaService{
    private baseUrl="http://localhost:9002/api/camunda";
    constructor(private http:HttpClient,private router:Router){}
   
    postLeave(data:any) {
        return this.http.post(`${this.baseUrl}/postLeave`,data);
      }
      
      getAllTask():Observable<HttpResponse<any>>{
        return this.http.get(`${this.baseUrl}/getAlltask`,{ observe: 'response' });
      }
}