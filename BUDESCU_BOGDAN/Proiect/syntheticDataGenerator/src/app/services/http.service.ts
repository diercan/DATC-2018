import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
export interface ParkStatus {
  ParkId:number;
  Status:number
}
@Injectable({
  providedIn: 'root'
})
export class HttpService {

  public BASE_URL:string ="http://192.168.1.7:8081";
  constructor(private http: HttpClient) { }

  public addData(data:ParkStatus[]) {
    let body = JSON.stringify(data);
    let options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
   return this.http.post(this.BASE_URL +"/api/park/addStatus", body, options);
  }
}
