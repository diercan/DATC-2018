import { Component } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public lat = 45.753767;
  public lng = 21.226784;
  public zoom = 20;
  public spots: Spot[];

  constructor() {
    const socket = Observable.webSocket('ws://localhost:9091');

    socket.subscribe(
      (datas: any) => {
        this.spots = datas.map((data) => ({
          position: {
            latitude: data.position.latitude,
            longitude: data.position.longitude
          },
          icon: data.isOccupied ? 'assets/occupied.png' : 'assets/free.png'
        }));
      }
    );
  }
}

export interface Spot {
  position: {
    latitude: number;
    longitude: number;
  };
  icon: string;
}
