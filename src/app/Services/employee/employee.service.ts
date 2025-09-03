import { Injectable } from '@angular/core';
//import { HttpService } from '../http/http.service';
import { HttpHeaders } from '@angular/common/http';
import { HttpService } from '../http/http.service';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http:HttpService) { }

  addEmp(data:any){
    let head={
       headers:new HttpHeaders({
         'content-type':'application/json'
      })
     };
     console.log(data);
     //return this.http.PostMethod('https://localhost:7172/api/Employee/AddEmp',data,false,head);
return this.http.PostMethod('https://localhost:7172/AddEmp',data,false,head);
  }

  // addEmp(data:any){
  //   let head={
  //     headers:new HttpHeaders({
  //       'content-type':'application/json'
  //     })
  //   }
  //   console.log(data);
  //   return this.http.PostMethod('https://localhost:7172/api/Employee/AddEmp',data,false,head);
  // }
}
