import { Injectable } from "@angular/core";
import {HttpClient,HttpResponse} from '@angular/common/http';
import {Router} from '@angular/router';
import { Observable, Subject } from "rxjs";
@Injectable({ providedIn: "root" })
export class loginAndSignup{
    private isAuthenticate=false;
    private token: any;

    private url="http://localhost:9002/api/user";
    private userDetails:any
    private authStatusListener = new Subject<boolean>();
    constructor(private http:HttpClient,private router:Router){};
    getToken() {
        return this.token;
      }
      getUserDetails(){
        return this.userDetails;
      }
      getIsAuth() {
        return this.isAuthenticate;
      }
      getAuthStatusListener() {
        return this.authStatusListener.asObservable();
      }
    createUser(data:any):Observable<HttpResponse<any>>{
      return this.http.post(`${this.url}/register`,data,{ observe: 'response' });
    }
    login(data:any){
    this.http.post<{ token: string,userDetails:any}>(`${this.url}/login`,data).subscribe(response => {
        const token = response.token;
        this.token = token;
        if (token) {
          this.isAuthenticate = true;
          localStorage.setItem('isAuthenticate',"true");
          localStorage.setItem('token',token);
          this.authStatusListener.next(true);
          this.userDetails=response.userDetails;
          localStorage.setItem('username',this.userDetails.names);        
          this.router.navigate(['/']);
        }
      });
   }
   getUser() {
    console.log("getUser")
    return this.http.get(`${this.url}/getUser`);
  }
  getAllHistory(){
    return this.http.get(`${this.url}/getHistory`,{ observe: 'response' })
  }

}