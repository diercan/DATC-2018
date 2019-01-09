"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const crypto_1 = require("crypto");
const fs_1 = require("fs");
const jwt = require("jsonwebtoken");
const uuid = require("uuid/v1");
class Util {
    constructor() {
        // var input = "testing";
        this.ALGORITHM = "AES-256-CBC";
        this.KEY = Buffer.from("8479768f48481eeb9c8304ce0a58481eeb9c8304ce0a5e3cb5e3cb58479768f4", "hex");
        // var encrypted = this.encrypt(input);
        // console.info('encrypted:', encrypted);
        // var decryped = this.decrypt(encrypted);
        // console.info('decryped: %s', decryped);
        // for JWT https://medium.com/@siddharthac6/json-web-token-jwt-the-right-way-of-implementing-with-node-js-65b8915d550e
        fs_1.readFile("./dist/private.key", (err, data) => {
            this.PRIVATE_JWT_KEY = data.toString("utf8");
            // console.log(this.PRIVATE_JWT_KEY)
        });
        fs_1.readFile("./dist/public.key", (err, data) => {
            this.PUBLIC_JWT_KEY = data.toString("utf8");
            // console.log(this.PUBLIC_JWT_KEY)
        });
        // let hash = this.hashPassword('test');
        // console.log('HASH = ' + hash);
        // console.log(this.verifyHash('test', hash)); // will return true
        // console.log(this.verifyHash('test1', hash));
    }
    encrypt(input) {
        try {
            let data = Buffer.from(input).toString('binary');
            let iv = crypto_1.randomBytes(16);
            let cipher = crypto_1.createCipher(this.ALGORITHM, this.KEY, iv);
            let encrypted = Buffer.concat([cipher.update(data), cipher.final()]);
            let encoded = Buffer.from(iv, 'binary').toString('hex') + "$" + encrypted.toString('hex');
            return encoded;
        }
        catch (ex) {
            console.error(ex);
        }
    }
    decrypt(encoded) {
        try {
            let data = encoded.split("$");
            let iv = Buffer.from(data[0], "hex");
            let edata = Buffer.from(data[1], "hex");
            let decipher = crypto_1.createDecipher(this.ALGORITHM, this.KEY, iv);
            let plaintext = Buffer.concat([decipher.update(edata), decipher.final()]).toString();
            return plaintext;
        }
        catch (ex) {
            console.error(ex);
        }
    }
    hashPassword(data) {
        const salt = crypto_1.randomBytes(16).toString('hex');
        const hash = crypto_1.pbkdf2Sync(data, salt, 2048, 32, 'sha512').toString('hex');
        return [salt, hash].join('$');
    }
    verifyHash(data, original) {
        const originalHash = original.split('$')[1];
        const salt = original.split('$')[0];
        const hash = crypto_1.pbkdf2Sync(data, salt, 2048, 32, 'sha512').toString('hex');
        return hash === originalHash;
    }
    JWTSign(payload, options) {
        var signOptions = {
            expiresIn: "30d",
            algorithm: "RS256"
        };
        return jwt.sign(payload, this.PRIVATE_JWT_KEY, signOptions);
    }
    JWTVerify(token, options) {
        var verifyOptions = {
            expiresIn: "30d",
            algorithm: "RS256"
        };
        try {
            return jwt.verify(token, this.PUBLIC_JWT_KEY, verifyOptions);
        }
        catch (err) {
            return false;
        }
    }
    JWTDecode(token) {
        return jwt.decode(token, { complete: true });
    }
    guidGenerator() {
        return uuid();
    }
}
exports.Util = Util;
