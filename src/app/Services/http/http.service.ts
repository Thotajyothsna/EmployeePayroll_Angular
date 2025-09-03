import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http:HttpClient) { }
  PostMethod(reqUrl: string,payload:any, token:boolean=false,httpoptions: any={})
  {
    return  this.http.post(reqUrl,payload,token && httpoptions);
  }
  PostMethodreset(reqUrl: string,payload:any, token:boolean=true,httpoptions: any={})
  {
    return  this.http.post(reqUrl,payload,token && httpoptions);
  }
  GetMethod(url:string,token:boolean=true,httpoptions:any={}){
    return this.http.get(url,token && httpoptions);
  }
  GetMethodreset(url:string,token:boolean=false,httpoptions:any={}){
    return this.http.get(url,token && httpoptions);
  }
  PutMethod(reqUrl: string,payload:any, token:boolean=true,httpoptions: any={}){
    return this.http.put(reqUrl,payload,token && httpoptions);
  }
  DeleteMethod(reqUrl: string,token:boolean=true,httpoptions: any={}){
    return this.http.delete(reqUrl,token && httpoptions);
  }
}
