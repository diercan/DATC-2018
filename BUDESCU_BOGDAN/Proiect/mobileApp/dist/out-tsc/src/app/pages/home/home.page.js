var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, ViewChild, ElementRef } from '@angular/core';
import { Platform } from '@ionic/angular';
import { ConfService } from 'src/app/services/conf/conf.service';
var HomePage = /** @class */ (function () {
    function HomePage(_platform, _cfg) {
        this._platform = _platform;
        this._cfg = _cfg;
        this.parkingSpaceMarkers = [];
        this.parkingSpaces = this._cfg.PARKING_SPACES;
    }
    HomePage.prototype.ngAfterViewInit = function () {
        var _this = this;
        //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
        //Add 'implements AfterViewInit' to the class.
        this._platform.ready().then(function (result) {
            _this.initializeMap();
        });
    };
    HomePage.prototype.initializeMap = function () {
        var mapRef = this.mapElement.nativeElement;
        var mapOptions = {
            zoom: 19.5,
            center: {
                lat: 45.7537406,
                lng: 21.2268751
            },
            tilt: 0,
            heading: 90
        };
        this.map = new google.maps.Map(mapRef, mapOptions);
        this.map.setMapTypeId('satellite');
        this.initEvents(this.map);
        this.loadParkingSpaces();
    };
    HomePage.prototype.loadParkingSpaces = function () {
        var _this = this;
        var _loop_1 = function (i) {
            var parkingSpaceCoord = this_1.parkingSpaces[i];
            var options = {
                position: parkingSpaceCoord,
                map: this_1.map,
                icon: 'http://maps.google.com/mapfiles/ms/icons/' + parkingSpaceCoord.type + '-dot.png'
            };
            var parkingSpaceMarker = new google.maps.Marker(options);
            parkingSpaceMarker.addListener('click', function (ev) { return _this.onGoogleMapsMarkerClick(ev, i); });
            this_1.parkingSpaceMarkers.push(parkingSpaceMarker);
        };
        var this_1 = this;
        for (var i = 0; i < this.parkingSpaces.length; i++) {
            _loop_1(i);
        }
    };
    HomePage.prototype.initEvents = function (map) {
        map.addListener('click', this.onGoogleMapsClick.bind(this));
    };
    HomePage.prototype.onGoogleMapsClick = function (event) {
        console.log({ lat: event.latLng.lat(), lng: event.latLng.lng() });
    };
    HomePage.prototype.onGoogleMapsMarkerClick = function (event, indexMarker) {
        var _this = this;
        var infoWindowOptions = {
            content: "<button id='btn_marker'>Click Me!</button>"
        };
        this.infoWindow = new google.maps.InfoWindow(infoWindowOptions);
        this.infoWindow.open(this.map, this.parkingSpaceMarkers[indexMarker]);
        setTimeout(function () {
            document.getElementById('btn_marker').addEventListener('click', _this.log);
        });
    };
    HomePage.prototype.log = function (a) {
        console.log(a);
    };
    __decorate([
        ViewChild('map'),
        __metadata("design:type", ElementRef)
    ], HomePage.prototype, "mapElement", void 0);
    HomePage = __decorate([
        Component({
            selector: 'app-home',
            templateUrl: 'home.page.html',
            styleUrls: ['home.page.scss']
        }),
        __metadata("design:paramtypes", [Platform,
            ConfService])
    ], HomePage);
    return HomePage;
}());
export { HomePage };
//# sourceMappingURL=home.page.js.map