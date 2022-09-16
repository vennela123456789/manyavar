import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactUsService {
token:string="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzaWQiOiI0MWFiN2ZkMS05ZWQ4LTRlMWMtYjRiOS03NjA2MWM3ZTcxYzEiLCJhaWQiOiI4QjQ4MTgzRC03QzQ5LTRDREUtQTk2OC0wNEExRjg3MEEwNUQiLCJkaWQiOiIxRUFGRUQ4MS0zOTc2LTQzOUYtODk2RC0wMUQxNEEzMjM1NEIiLCJuYmYiOjE2NjMyMTc1NDEsImV4cCI6MTY2MzMwMzk0MSwiaWF0IjoxNjYzMjE3NTQxfQ.pQtB2cAURErrefXTna-uipX2aJPh4qe_nu-Z2By5jNc"
  constructor(private http:HttpClient) { }

 public postService(url:string,data:any){
debugger
    const authValue = 'Bearer' + ' ' + this.token;
    
    const httpOptions = {
    
     headers: new HttpHeaders({ 'Accept': 'application/json', Authorization: authValue })
    
     };
    
   
    
   let  model = Object.assign({},data)
    
     return this.http.post(url,model,httpOptions).pipe(map((data:any) => {
    
      return data;
    
     }))
    
    
    
      }
}
