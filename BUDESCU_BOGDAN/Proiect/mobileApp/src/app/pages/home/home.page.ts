import { Component, ViewChild, ElementRef } from '@angular/core';
import { Platform } from '@ionic/angular';
import { google } from 'google-maps';
import { ConfService } from 'src/app/services/conf/conf.service';

declare var google: any;

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage {
  @ViewChild('map') public mapElement: ElementRef;
  public map: any;
  public parkingSpaces: any[];
  public parkingSpaceMarkers: google.maps.Marker[] = [];
  public infoWindow: google.maps.InfoWindow;
  constructor(
    private _platform: Platform,
    private _cfg: ConfService
  ) {
    this.parkingSpaces = this._cfg.PARKING_SPACES;
    this._platform.ready().then((result) => {
      if (google == undefined) {
        setTimeout(() => {
          this._initializeMap();
        }, 1000)
      } else {
        this._initializeMap();
      }
    })
  }

  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
  }

  private _initializeMap(): void {

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
    this._initEvents(this.map);
    this._loadParkingSpaces();

  }

  private _loadParkingSpaces(): void {

    for (let i = 0; i < this.parkingSpaces.length; i++) {
      const parkingSpaceCoord = this.parkingSpaces[i];
      let options: google.maps.MarkerOptions = {
        position: parkingSpaceCoord,
        map: this.map,
        icon: 'http://maps.google.com/mapfiles/ms/icons/' + parkingSpaceCoord.type + '-dot.png'
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

    setTimeout(() => {
      let btnMarkerRef: HTMLElement = document.getElementById('btn_marker');
      btnMarkerRef ? btnMarkerRef.addEventListener('click', ev => this._onInfoWindowClick(ev, indexMarker)) : {}
    }, 100);
  }

  private _onInfoWindowClick(ev, indexMarker) {

    console.log(ev, indexMarker);
  }

  private _infoWindowContent(indexMarker): string {

    return `<div style='width:200px;height:170px;'>
              <button id='btn_marker'>${this.parkingSpaces[indexMarker].type}</button>
            </div>`;
  }
}
