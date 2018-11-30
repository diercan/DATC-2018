import { Injectable } from '@angular/core';
import * as crypto from "crypto-browserify";
declare const Buffer;

@Injectable({
  providedIn: 'root'
})
export class CryptoService {
  private readonly ALGORITHM: string = "AES-256-CBC";
  private readonly KEY: any = new Buffer("8479768f48481eeb9c8304ce0a58481eeb9c8304ce0a5e3cb5e3cb58479768f4", "hex")
  constructor() {
    var input = "testing";

    var encrypted = this.encrypt(input);
    console.info('encrypted:', encrypted);
    // var decryped = this.decrypt(encrypted);
    // console.info('decryped:', decryped);

  }

  public encrypt(input) {
    try {

      let data = Buffer.from(input).toString('binary');
      let iv: any = crypto.randomBytes(16);
      let cipher = crypto.createCipher(this.ALGORITHM, this.KEY, iv);
      let encrypted = Buffer.concat([cipher.update(data), cipher.final()]);
      let encoded = Buffer.from(iv, 'binary').toString('hex') + "$" + encrypted.toString('hex');
      return encoded;
    } catch (ex) {
      console.error(ex);
    }
  };

  public decrypt(encoded) {

    try {
      let data = encoded.split("$");
      let iv: any = Buffer.from(data[0], "hex");
      let edata = Buffer.from(data[1], "hex");
      let decipher = crypto.createDecipher(this.ALGORITHM, this.KEY, iv);
      let plaintext = Buffer.concat([decipher.update(edata), decipher.final()]);
      return plaintext;
    } catch (ex) {
      console.error(ex);
    }

  };
}