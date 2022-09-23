import { state } from '@angular/animations';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { franchise, stateApi } from '../constants/constants';

@Injectable({
  providedIn: 'root',
})
export class FranchiseService {
  token: string =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzaWQiOiIzMzQxZDhmYy02NDI1LTQzOWItOTQ0ZS0yNDUyNzY4ODI3OWEiLCJhaWQiOiJDQUQ1MDU5MC1BMTg5LTQxNEYtQTJGNS0xMDMzOUQxRjlGOTciLCJkaWQiOiI0NDQ5NkIwMy0zNjQ3LTQ5MEMtQjJGMC0yRTE1OUIyN0QyNzgiLCJuYmYiOjE2NjM5MDY4MjQsImV4cCI6MTY2Mzk5MzIyNCwiaWF0IjoxNjYzOTA2ODI0fQ.Tec6T_R4CpJG6xJwfjmbs-Qr2Dm4NauszaHgCw_0kBc';

  constructor(private http: HttpClient) {}

  abc = new HttpHeaders({
    //'Content-Type': 'application/json',

    Authorization: 'Bearer ' + this.token,
  });
  options = { headers: this.abc };

  CountryRequest() {
    debugger;
    return this.http.get(franchise, this.options).pipe(
      map((data: any) => {
        return data;
      })
    );
  }
  StateRequest(CountryId: any) {
    return this.http.get(stateApi + CountryId, this.options).pipe(
      map((data: any) => {
        return data;
      })
    );
  }

  postCity(url: string, data: any) {
    let model = Object.assign({}, data);

    return this.http.post(url, model, this.options).pipe(
      map((data: any) => {
        return data;
      })
    );
  }
  postData(url: string, data: any) {
    return this.http.post(url, data, this.options).pipe(
      map((data: any) => {
        return data;
      })
    );
  }
}
