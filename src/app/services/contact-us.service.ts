import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactUsService {
token:string="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzaWQiOiI3MzY0OGJhNS01ODA4LTRkY2EtOGYzNy0xMTVhZThmOWZhNGUiLCJhaWQiOiJDQUQ1MDU5MC1BMTg5LTQxNEYtQTJGNS0xMDMzOUQxRjlGOTciLCJkaWQiOiI0NDQ5NkIwMy0zNjQ3LTQ5MEMtQjJGMC0yRTE1OUIyN0QyNzgiLCJuYmYiOjE2NjMzMDgyNDMsImV4cCI6MTY2MzM5NDY0MywiaWF0IjoxNjYzMzA4MjQzfQ.XNv-KLSciFa8lVacGm-lqmQpUcpUZzwQi8m64pD0EkY"
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
