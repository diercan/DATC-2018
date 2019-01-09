import { randomBytes, createCipher, createDecipher, pbkdf2Sync } from "crypto";
import { fstat, readFileSync, readFile } from 'fs';
import * as jwt from "jsonwebtoken";
import * as uuid from 'uuid/v1';

export class Util {
    private readonly ALGORITHM: string = "AES-256-CBC";
    private readonly KEY: any = Buffer.from("8479768f48481eeb9c8304ce0a58481eeb9c8304ce0a5e3cb5e3cb58479768f4", "hex")
    private PRIVATE_JWT_KEY: any;
    private PUBLIC_JWT_KEY: any;
    constructor() {

        // var input = "testing";

        // var encrypted = this.encrypt(input);
        // console.info('encrypted:', encrypted);
        // var decryped = this.decrypt(encrypted);
        // console.info('decryped: %s', decryped);

        // for JWT https://medium.com/@siddharthac6/json-web-token-jwt-the-right-way-of-implementing-with-node-js-65b8915d550e
        readFile("./dist/private.key", (err, data) => {
            this.PRIVATE_JWT_KEY = data.toString("utf8");
            // console.log(this.PRIVATE_JWT_KEY)
        });
        readFile("./dist/public.key", (err, data) => {
            this.PUBLIC_JWT_KEY = data.toString("utf8");
            // console.log(this.PUBLIC_JWT_KEY)
        });

        // let hash = this.hashPassword('test');
        // console.log('HASH = ' + hash);
        // console.log(this.verifyHash('test', hash)); // will return true
        // console.log(this.verifyHash('test1', hash));
    }

    public encrypt(input: string) {

        try {
            let data = Buffer.from(input).toString('binary');
            let iv: any = randomBytes(16);
            let cipher = createCipher(this.ALGORITHM, this.KEY, iv);
            let encrypted = Buffer.concat([cipher.update(data), cipher.final()]);
            let encoded = Buffer.from(iv, 'binary').toString('hex') + "$" + encrypted.toString('hex');
            return encoded;
        } catch (ex) {
            console.error(ex);
        }
    }

    public decrypt(encoded) {

        try {
            let data = encoded.split("$");
            let iv: any = Buffer.from(data[0], "hex");
            let edata = Buffer.from(data[1], "hex");
            let decipher = createDecipher(this.ALGORITHM, this.KEY, iv);
            let plaintext = Buffer.concat([decipher.update(edata), decipher.final()]).toString();
            return plaintext;
        } catch (ex) {
            console.error(ex);
        }
    }

    public hashPassword(data: string): string {

        const salt = randomBytes(16).toString('hex');
        const hash = pbkdf2Sync(data, salt, 2048, 32, 'sha512').toString('hex');
        return [salt, hash].join('$');
    }

    public verifyHash(data, original): boolean {
        const originalHash = original.split('$')[1];
        const salt = original.split('$')[0];
        const hash = pbkdf2Sync(data, salt, 2048, 32, 'sha512').toString('hex');

        return hash === originalHash;
    }

    public JWTSign(payload, options) {

        var signOptions = {
            expiresIn: "30d",    // 30 days validity
            algorithm: "RS256"
        };
        return jwt.sign(payload, this.PRIVATE_JWT_KEY, signOptions);
    }

    public JWTVerify(token, options) {
        var verifyOptions = {
            expiresIn: "30d",
            algorithm: "RS256"
        };
        try {
            return jwt.verify(token, this.PUBLIC_JWT_KEY, verifyOptions)
        } catch (err) {
            return false;
        }
    }

    public JWTDecode(token) {
        return jwt.decode(token, { complete: true });
    }

    public guidGenerator() {
        return uuid();
    }
}