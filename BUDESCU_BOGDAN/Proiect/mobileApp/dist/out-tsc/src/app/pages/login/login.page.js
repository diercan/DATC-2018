var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CryptoService } from 'src/app/services/crypto/crypto.service';
import { AuthService } from 'src/app/services/auth/auth.service';
var LoginPage = /** @class */ (function () {
    function LoginPage(_router, _crypto, _auth) {
        this._router = _router;
        this._crypto = _crypto;
        this._auth = _auth;
        this.loginModel = {
            Email: "",
            Password: ""
        };
    }
    LoginPage.prototype.ngOnInit = function () {
    };
    LoginPage.prototype.goToRegister = function () {
        this._router.navigateByUrl("register");
    };
    LoginPage.prototype.submitLoginForm = function () {
        console.log(this.loginModel);
        this._router.navigateByUrl("tabs");
    };
    LoginPage = __decorate([
        Component({
            selector: 'app-login',
            templateUrl: './login.page.html',
            styleUrls: ['./login.page.scss'],
        }),
        __metadata("design:paramtypes", [Router,
            CryptoService,
            AuthService])
    ], LoginPage);
    return LoginPage;
}());
export { LoginPage };
//# sourceMappingURL=login.page.js.map