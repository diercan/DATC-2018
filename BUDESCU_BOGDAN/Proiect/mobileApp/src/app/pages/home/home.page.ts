import { Component, ViewChild, ElementRef } from '@angular/core';
import { Platform, ModalController } from '@ionic/angular';
import { google } from 'google-maps';
import { ConfService } from 'src/app/services/conf/conf.service';
import { HttpService } from 'src/app/services/http/http.service';
import { MessageService } from 'src/app/services/message/message.service';
import { Subscription, Observable } from 'rxjs';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { ReservePage } from '../reserve/reserve.page';
import * as momentz from 'moment-timezone';
declare var google: any;

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.css']
})
export class HomePage {
  @ViewChild('map') public mapElement: ElementRef;
  public map: any;
  public parkingSpaces: any[] = [];
  public parkingSpaceMarkers: google.maps.Marker[] = [];
  public infoWindow: google.maps.InfoWindow;

  idReqGetParkingSpaces: any;
  readonly DELAY_REQ = 2000;
  private _msgSubscription: Subscription;
  private _watch: Observable<any>;
  directionsService: google.maps.DirectionsService;
  directionsDisplay: google.maps.DirectionsRenderer;
  public originLocation;
  public destinationLocation;
  public reservations: any;
  constructor(
    private _platform: Platform,
    private _cfg: ConfService,
    private _httpService: HttpService,
    private _messageService: MessageService,
    public geolocation: Geolocation,
    public modalController: ModalController
  ) {
    // this.parkingSpaces = this._cfg.PARKING_SPACES;

  }

  ngAfterViewInit(): void {
    this._platform.ready().then((result) => {
      this.getParkingSpaces().then(() => {
        if (google == undefined) {
          alert("Error google api not found. Reload app!");
          setTimeout(() => this._initializeMap(), 1000)
        } else {
          this._initializeMap();
        }
      })

      this.idReqGetParkingSpaces = setInterval(() => {
        this.getParkingSpaces();
      }, this.DELAY_REQ);
      this._messageService.getMessage().subscribe((message) => {
        if (message.action == "change_tab") {
          message.content != "home" ? clearInterval(this.idReqGetParkingSpaces) : this.idReqGetParkingSpaces = setInterval(() => this.getParkingSpaces(), this.DELAY_REQ);
        }
      });
    })
  }

  ngOnDestroy(): void {
    this._msgSubscription ? this._msgSubscription.unsubscribe() : null;
    clearInterval(this.idReqGetParkingSpaces);
  }

  public getParkingSpaces() {
    return new Promise((resolve, reject) => {
      this._httpService.getParkingSpaces().subscribe((result: any) => {
        this.parkingSpaces = [];

        for (let i = 0; i < result.data.length; i++) {
          const element = result.data[i];
          this.parkingSpaces.push({
            id: i + 1,
            lng: element.Lng,
            lat: element.Lat,
            type: element.Status
          })
          try {

            this.parkingSpaceMarkers[i].setIcon({
              path: "M0,0 1.25,0 1.25,2.5 0,2.5",
              rotation: 331,
              scale: 8.5,
              fillColor: element.Status == 0 ? 'red' : 'green',
              fillOpacity: 0.7,
              strokeWeight: 0.4
            })
          }
          catch (err) { }
        }
        resolve(true)
      });

      this._httpService.getReservations().subscribe((data) => {
        this.reservations = data;
        console.log(this.reservations)
      })
    })
  }

  private _initializeMap(): void {
    this.directionsDisplay = new google.maps.DirectionsRenderer;
    let mapRef = this.mapElement.nativeElement;

    let mapOptions: google.maps.MapOptions = {
      zoom: 19.5,
      center: {
        lat: 45.7537406,
        lng: 21.2268751
      },
      tilt: 0,
      heading: 90
    }
    this.map = new google.maps.Map(mapRef, mapOptions);

    this.map.setMapTypeId('satellite');
    this.directionsDisplay.setMap(this.map)
    this._initEvents(this.map);
    this._loadParkingSpaces();

    this.directionsService = new google.maps.DirectionsService;
    this._watch = this.geolocation.watchPosition();
    this._watch.subscribe((data) => {
      console.log(data)
      this.originLocation = {
        lat: data.coords.latitude,
        lng: data.coords.longitude
      };
      try {
        // this.drawRoute().then(() => this.map.setCenter(this.destinationLocation));
      } catch (error) { }
    })

  }

  private _loadParkingSpaces(): void {

    for (let i = 0; i < this.parkingSpaces.length; i++) {
      const parkingSpaceCoord = this.parkingSpaces[i];
      let options: google.maps.MarkerOptions = {
        position: parkingSpaceCoord,
        map: this.map,
        icon: {
          path: "M0,0 1.25,0 1.25,2.5 0,2.5",
          rotation: 331,
          scale: 8.5,
          fillColor: parkingSpaceCoord.type == 0 ? 'red' : 'green',
          fillOpacity: 0.7,
          strokeWeight: 0.4
        }
        // icon: 'http://maps.google.com/mapfiles/ms/icons/' + parkingSpaceCoord.type + '-dot.png'
      };
      let parkingSpaceMarker: google.maps.Marker = new google.maps.Marker(options);
      parkingSpaceMarker.addListener('click', ev => this._onGoogleMapsMarkerClick(ev, i))

      this.parkingSpaceMarkers.push(parkingSpaceMarker)
    }
  }

  private _initEvents(map: google.maps.Map): void {

    map.addListener('click', this._onGoogleMapsClick.bind(this));
  }

  private _onGoogleMapsClick(event): void {

    console.log({ lat: event.latLng.lat(), lng: event.latLng.lng() })
  }

  private _onGoogleMapsMarkerClick(event: google.maps.MouseEvent, indexMarker: number): void {

    this.infoWindow ? this.infoWindow.close() : {};
    let currentMarker: google.maps.Marker = this.parkingSpaceMarkers[indexMarker];
    let contentString: string = this._infoWindowContent(indexMarker);
    let infoWindowOptions: google.maps.InfoWindowOptions = {
      content: contentString
    };
    this.infoWindow = new google.maps.InfoWindow(infoWindowOptions);
    this.infoWindow.open(this.map, currentMarker);

    this.destinationLocation = {
      lat: this.parkingSpaces[indexMarker].lat,
      lng: this.parkingSpaces[indexMarker].lng
    }
    // this.drawRoute();

    // then((response: any) => {
    //   this.map.setZoom(19.5)
    //   this.map.setCenter(this.destinationLocation);
    // });

    setTimeout(() => {
      let btnMarkerRef: HTMLElement = document.getElementById('btn_marker');
      btnMarkerRef ? btnMarkerRef.addEventListener('click', ev => this._onInfoWindowClick(ev, indexMarker)) : {}

      let btnMarkerRouteRef: HTMLElement = document.getElementById('btn_marker_route');
      btnMarkerRouteRef ? btnMarkerRouteRef.addEventListener('click', ev => this.drawRoute()) : {}
    }, 100);
  }

  private async _onInfoWindowClick(ev, indexMarker) {

    console.log(ev, indexMarker);
    this._messageService.modal = await this.modalController.create({
      component: ReservePage,
      componentProps: {
        Id: indexMarker + 1
      },
      animated: true,
      showBackdrop: true,
      keyboardClose: true
    });

    await this._messageService.modal.present();
    const { data } = await this._messageService.modal.onDidDismiss();
    console.log(data);
  }

  private _infoWindowContent(indexMarker): string {

    let reservations = this.reservations.filter(res => res.ParkId == (indexMarker + 1));
    console.log(reservations)
    let sReservations = reservations.length == 0 ? `` : `<tr >
                            <th style='border:1px solid #c0c0c0;'>Name</th>
                            <th style='border:1px solid #c0c0c0;'>Start</th>
                            <th style='border:1px solid #c0c0c0;'>End</th>
                            <th style='border:1px solid #c0c0c0;'>Photo</th>
                         </tr>`;

    reservations.forEach(element => {
      sReservations += `<tr >
                          <td style='border:1px solid #c0c0c0;'> ${element.FirstName}</td>  
                          <td style='border:1px solid #c0c0c0;'> ${momentz(element.StartDate).format("YY-MM-DD h:mm")}</td>
                          <td style='border:1px solid #c0c0c0;'> ${momentz(element.EndDate).format("YY-MM-DD h:mm")}</td>
                          <td style='border:1px solid #c0c0c0;'><img style='width:45px;height:auto;margin:2px' src=${ this._cfg.BASE_URL + "/" + element.Photo}></td>
                        </tr>`;
    });
    let _btn = `<button style='background-color: #3880ff; 
                    border: none;
                    color: white;
                    padding: 10px 22px;
                    text-align: center;
                    border-radius: 6px;
                    text-decoration: none;
                    display: inline-block;
                    font-size: 14px;
                    min-width:125px;'
                  id='btn_marker'> Rezerva </button>`;

    let _btnRoute = `<button style='background-color: #3880ff; 
                    border: none;
                    color: white;
                    padding: 10px 22px;
                    text-align: center;
                    border-radius: 6px;
                    text-decoration: none;
                    display: inline-block;
                    font-size: 14px;
                    min-width:125px;'
                  id='btn_marker_route'> Afiseaza ruta </button>`;

    return `<div style='width:auto;height:auto;'>
              <h6> Loc parcare cu numarul ${this.parkingSpaces[indexMarker].id} </h6>
              <p style='font-size: 14px;'> Status : <b>${this.parkingSpaces[indexMarker].type == 0 ? 'ocupat' : 'liber'}</b></p>
              <div style='margin-top:4px'> ${this.parkingSpaces[indexMarker].type == 0 ? "" : _btn} </div>
              <div style='margin-top:4px'> ${_btnRoute} </div>
              <table style='margin-top:4px;text-align:center;font-weight:600;' > ${sReservations} </table>
            </div>`;
  }

  drawRoute() {

    return new Promise((resolve, reject) => {
      console.log("drawRoute", this.originLocation, this.destinationLocation)
      try {
        this.directionsService.route({
          origin: this.originLocation,
          destination: this.destinationLocation,
          travelMode: <any>'DRIVING'
        }, (response, status: any) => {
          if (status === 'OK') {
            this.directionsDisplay.setDirections(response);
            resolve(response);
          } else {
            window.alert('Directions request failed due to ' + status);
          }
        });
      } catch (err) {
        console.log(err, this.originLocation, this.destinationLocation)
      }
    })

  }

}
