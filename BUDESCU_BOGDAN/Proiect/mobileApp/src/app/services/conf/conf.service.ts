import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfService {

  public readonly BASE_URL: string = "http://localhost:3000/api";
  public readonly PARKING_SPACES: any[] =
    [
      {
        id: 1,
        lat: 45.75380776330037,
        lng: 21.22719311935225,
        type: "red"
      },
      {
        id: 2,
        lat: 45.753804698218545,
        lng: 21.227149593851664,
        type: "green"
      },
      {
        id: 3,
        lat: 45.7538150954001,
        lng: 21.227095204611032,
        type: "green"
      },
      {
        id: 4,
        lat: 45.75382133369664,
        lng: 21.22704826595327,
        type: "red"
      },
      {
        id: 5,
        lat: 45.75382866586218,
        lng: 21.226999587268438,
        type: "red"
      },
      {
        id: 6,
        lat: 45.753833214766416,
        lng: 21.226959075043396,
        type: "red"
      },
      {
        id: 7,
        lat: 45.75384035855563,
        lng: 21.226915218354634,
        type: "red"
      },
      {
        id: 8,
        lat: 45.75384834439878,
        lng: 21.226872149159703,
        type: "red"
      },
      {
        id: 9,
        lat: 45.75385562241893,
        lng: 21.22682446544161,
        type: "red"
      },
      {
        id: 10,
        lat: 45.7538587415686,
        lng: 21.226778271839066,
        type: "red"
      },
      {
        id: 11,
        lat: 45.75385226481221,
        lng: 21.22673775169767,
        type: "red"
      },
      {
        id: 12,
        lat: 45.753860062684744,
        lng: 21.22669379327101,
        type: "red"
      },
      {
        id: 13,
        lat: 45.75387045985595,
        lng: 21.22665132496502,
        type: "red"
      },
      {
        id: 14,
        lat: 45.753875121939096,
        lng: 21.226601651338,
        type: "red"
      },
      {
        id: 15,
        lat: 45.753875121939096,
        lng: 21.226550987388805,
        type: "green"
      },
      {
        id: 16,
        lat: 45.75388343968252,
        lng: 21.226501813560276,
        type: "red"
      },
      {
        id: 17,
        lat: 45.75388967797145,
        lng: 21.226454129839567,
        type: "red"
      }

    ];
  constructor() { }
}
