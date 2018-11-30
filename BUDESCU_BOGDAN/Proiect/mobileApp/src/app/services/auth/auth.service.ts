import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Login } from 'src/app/models/Login';
import { ConfService } from '../conf/conf.service';
import { Register } from 'src/app/models/Register';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // private readonly AUTH_KEY = localStorage.getItem("token");
  public isLogged: boolean = localStorage.getItem("token") != null;
  public userData: any;
  constructor(
    private _http: HttpClient,
    private _cfg: ConfService
  ) { }


  public login(loginData: Login) {

    let body = JSON.stringify(loginData);
    let options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this._http.post(`${this._cfg.BASE_URL}/users/login`, body, options);
 
  }
  
  public logout(){

    let options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization':  localStorage.getItem("token")
      })
    };
    return this._http.post(`${this._cfg.BASE_URL}/users/logout`, null, options);
  }

  public checkToken() {

    let options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization':  localStorage.getItem("token")
      })
    };
    return this._http.post(`${this._cfg.BASE_URL}/users/checkToken`, null, options);
  }

}