var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
var ConfService = /** @class */ (function () {
    function ConfService() {
        this.BASE_URL = "http://localhost/api";
        this.PARKING_SPACES = [
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
    }
    ConfService = __decorate([
        Injectable({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [])
    ], ConfService);
    return ConfService;
}());
export { ConfService };
//# sourceMappingURL=conf.service.js.map