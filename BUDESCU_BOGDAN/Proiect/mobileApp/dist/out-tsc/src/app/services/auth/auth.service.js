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
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ConfService } from '../conf/conf.service';
var AuthService = /** @class */ (function () {
    function AuthService(_http, _cfg) {
        this._http = _http;
        this._cfg = _cfg;
        this.AUTH_KEY = localStorage.getItem("token");
        this.isLogged = localStorage.getItem("token") != null;
    }
    AuthService.prototype.login = function (loginData) {
        var body = JSON.stringify(loginData);
        var options = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        };
        return this._http.post(this._cfg.BASE_URL + "/api/users/login", body, options);
    };
    AuthService.prototype.logout = function () {
    };
    AuthService.prototype.checkToken = function () {
    };
    AuthService = __decorate([
        Injectable({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [HttpClient,
            ConfService])
    ], AuthService);
    return AuthService;
}());
export { AuthService };
//# sourceMappingURL=auth.service.js.map