import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { GlobalsService } from './globals.service';

/*
  Generated class for the Providers provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class RequestsService {

  constructor(public http: Http, 
              private globals: GlobalsService) {
    
  }

  get(route){
    var headers = new Headers();
    headers.append('Accept','application/json');
    headers.append('Content-type','application/json');
    headers.append('Access-Control-Allow-Origin', '*');
    return this.http.get(this.globals.serviceBase + route, 
            { headers: headers })
    .map(res => res.json());
  }
  
  post(route, model){
    var headers = new Headers();
    headers.append('Accept','application/json');
    headers.append('Content-type','application/json');
    return this.http.post(this.globals.serviceBase + route, model,
            { headers: headers })
    .map(res => res.json());
  }
}
