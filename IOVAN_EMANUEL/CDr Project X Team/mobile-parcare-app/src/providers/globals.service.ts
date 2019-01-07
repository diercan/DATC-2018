import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the Providers provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class GlobalsService {
    serviceBase: string;
    userName: string;

    constructor() {
        //this.serviceBase = "http://localhost:56531/";
        this.serviceBase = "https://cdrxapiworker.azurewebsites.net/";
    }
}
