import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactUsService {
  token: string = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzaWQiOiI5MjI2ZTdmNy0wYzk0LTQxNmYtOWViNi1jM2NjZjI0NzY5N2YiLCJhaWQiOiJDQUQ1MDU5MC1BMTg5LTQxNEYtQTJGNS0xMDMzOUQxRjlGOTciLCJkaWQiOiI0NDQ5NkIwMy0zNjQ3LTQ5MEMtQjJGMC0yRTE1OUIyN0QyNzgiLCJuYmYiOjE2NjM0MTA2OTAsImV4cCI6MTY2MzQ5NzA5MCwiaWF0IjoxNjYzNDEwNjkwfQ.R89ohLQoXRnKbkiwMHzfsUwP45jSu1_K6icZZar0a08"
  constructor(private http: HttpClient) { }

  public postService(url: string, data: any) {
    debugger
    const authValue = 'Bearer' + ' ' + this.token;

    const httpOptions = {

      headers: new HttpHeaders({ 'Accept': 'application/json', Authorization: authValue })

    };



    let model = Object.assign({}, data)

    return this.http.post(url, model, httpOptions).pipe(map((data: any) => {

      return data;

    }))



  }
}
