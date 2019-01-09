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
import * as crypto from "crypto-browserify";
var CryptoService = /** @class */ (function () {
    function CryptoService() {
        this.ALGORITHM = "AES-256-CBC";
        this.KEY = "8479768f48481eeb9c8304ce0a58481eeb9c8304ce0a5e3cb5e3cb58479768f4";
        var input = "testing";
        var encrypted = this.encrypt(input);
        console.info('encrypted:', encrypted);
        // var decryped = this.decrypt(encrypted);
        // console.info('decryped:', decryped);
    }
    CryptoService.prototype.encrypt = function (input) {
        try {
            var data = new Buffer(input).toString('binary');
            var iv = crypto.randomBytes(16);
            var key = new Buffer(this.KEY, "hex");
            var cipher = crypto.createCipheriv(this.ALGORITHM, key, iv);
            var encrypted = void 0;
            encrypted = cipher.update(data, 'utf8', 'binary') + cipher.final('binary');
            var encoded = new Buffer(iv, 'binary').toString('hex') + "$" + new Buffer(encrypted, 'binary').toString('hex'); // for php explode
            // let encoded = new Buffer(iv, 'binary').toString('hex') +  new Buffer(encrypted, 'binary').toString('hex'); // for js
            return encoded;
        }
        catch (ex) {
            console.error(ex);
        }
    };
    ;
    CryptoService.prototype.decrypt = function (encoded) {
        var combined = new Buffer(encoded, 'hex');
        var key = new Buffer(this.KEY, "hex");
        var iv = new Buffer(16);
        combined.copy(iv, 0, 0, 16);
        var edata = combined.slice(16).toString('binary');
        var decipher = crypto.createDecipheriv(this.ALGORITHM, key, iv);
        var plaintext;
        plaintext = (decipher.update(edata, 'binary', 'utf8') + decipher.final('utf8'));
        return plaintext;
    };
    ;
    CryptoService = __decorate([
        Injectable({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [])
    ], CryptoService);
    return CryptoService;
}());
export { CryptoService };
//# sourceMappingURL=crypto.service.js.map