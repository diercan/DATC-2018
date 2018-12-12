import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  public BASE_URL:string ="http://localhost:3000";
  constructor(private http: HttpClient) { }

  public getData() {
    let options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
   return this.http.get(this.BASE_URL +"/api/park/getParkingSpaces",  options);
  }
}
