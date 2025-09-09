import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http:HttpClient) { }
  postMethod(reqUrl: string,payload:any, token:boolean=false,httpoptions: any={})
  {
    return  this.http.post(reqUrl,payload,token && httpoptions);
  }
  postMethodreset(reqUrl: string,payload:any, token:boolean=true,httpoptions: any={})
  {
    return  this.http.post(reqUrl,payload,token && httpoptions);
  }
  getMethod(url:string,token:boolean=true,httpoptions:any={}){
    return this.http.get(url,token && httpoptions);
  }
  getMethodreset(url:string,token:boolean=false,httpoptions:any={}){
    return this.http.get(url,token && httpoptions);
  }
  putMethod(reqUrl: string,payload:any, token:boolean=true,httpoptions: any={}){
    return this.http.put(reqUrl,payload,token && httpoptions);
  }
  deleteMethod(reqUrl: string,token:boolean=true,httpoptions: any={}){
    return this.http.delete(reqUrl,token && httpoptions);
  }
}
