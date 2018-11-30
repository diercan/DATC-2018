import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfService {

  public readonly BASE_URL: string = "http://localhost:3000/api";
  public readonly PARKING_SPACES: any[] =
    [
      {
        lat: 45.75380776330037,
        lng: 21.22719311935225,
        type: "red"
      },
      {
        lat: 45.753804698218545,
        lng: 21.227149593851664,
        type: "green"
      },
      {
        lat: 45.7538150954001,
        lng: 21.227095204611032,
        type: "green"
      },
      {
        lat: 45.75382133369664,
        lng: 21.22704826595327,
        type: "red"
      },
      {
        lat: 45.75382866586218,
        lng: 21.226999587268438,
        type: "red"
      },
      {
        lat: 45.753833214766416,
        lng: 21.226959075043396,
        type: "red"
      }
    ];
  constructor() { }
}
