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
return this.http.postMethod('https://localhost:7172/AddEmp',data,false,head);
  }
getEmployees(){
  let head={
    headers:new HttpHeaders({
      'content-type':'application/json'
    })
  };
  return this.http.getMethod('https://localhost:7172/GetAllEmployees',false,head)
}

deleteEmp(Emp:any){
let head={
  header:new HttpHeaders({
    'content-type':'application/json'
  })
};
return this.http.deleteMethod('https://localhost:7172/DeleteEmp?Id='+Emp,false,head);
}

updateEmp(Emp:any){
  let head={
  header:new HttpHeaders({
    'content-type':'application/json'
  })
};
return this.http.putMethod('https://localhost:7172/EditEmployee',Emp,false,head);
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
