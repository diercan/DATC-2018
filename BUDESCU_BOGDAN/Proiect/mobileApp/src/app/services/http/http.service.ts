import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Login } from 'src/app/models/Login';
import { ConfService } from '../conf/conf.service';
import { Register } from 'src/app/models/Register';

@Injectable({
  providedIn: 'root'
})
export class HttpService {


  constructor(
    private _http: HttpClient,
    private _cfg: ConfService
  ) { }

  public register(registerData: Register) {

    let body = JSON.stringify(registerData);
    let options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this._http.post(`${this._cfg.BASE_URL}/users/register`, body, options);
  }

  public getData() {

    let options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization':  localStorage.getItem("token")
      })
    };
    return this._http.post(`${this._cfg.BASE_URL}/users/getData`, null, options);
  }

 
}