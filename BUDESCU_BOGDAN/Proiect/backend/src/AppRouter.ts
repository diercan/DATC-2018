import { Router, Request, Response, NextFunction } from 'express';
import { Db } from './db/Db';
import { Util } from './Util';
import { UserDb } from './db/UserDb';
import { Register } from './models/Register';
import { Login } from './models/Login';
import { ParkingDb } from './db/ParkingDb';
const Queue = require("better-queue");
const { Worker, isMainThread, workerData } = require('worker_threads');
import * as Queue from 'better-queue';
import * as fs from 'fs'
import * as formidable from 'formidable';
import { ReservationsDb } from './db/ReservationsDb';
import { Reservation } from './models/Reservation';

export class AppRouter {
    public router: Router
    public userDb: UserDb;
    public parkingDb: ParkingDb;
    public reservationDb: ReservationsDb;
    public db: Db;
    public util: Util;

    public queue: any;
    public worker: any;
    constructor() {
        this.router = Router();
        this.db = new UserDb();
        this.userDb = new UserDb();
        this.parkingDb = new ParkingDb();
        this.reservationDb = new ReservationsDb();
        this.util = new Util();
        this.initWorker();
        this.initQueue();
        this.initRoutes();
    }

    private initQueue() {
        this.queue = new Queue((input, cb) => {
            this.worker.postMessage({ data: input });
            cb(null);
        });

        // setInterval(() => {
        //     this.worker.postMessage({ data: null });
        // }, 5000)
    }

    private initWorker() {
        let cb = (err, result) => {
            if (err) { return console.error(err); }
            console.log("Message From Worker: ", result.val);
        };

        this.worker = new Worker(__dirname + '/MyWorker.js', { workerData: null });
        this.worker.on('message', (msg) => {
            cb(null, msg)
        })
        this.worker.on('error', cb);
        this.worker.on('exit', (code) => {
            if (code != 0)
                console.error(new Error(`Worker stopped with exit code ${code}`))
        });
    }

    public async initRoutes() {

        this.router.post("/api/users/register", await this.register.bind(this));
        this.router.post("/api/users/login", await this.login.bind(this));
        this.router.get("/api/park/getParkingSpaces", await this.getParkingSpaces.bind(this));
        this.router.post("/api/park/addStatus", await this.addStatus.bind(this));
        this.router.use(await this._isAuthorized.bind(this));
        this.router.post("/api/users/checkToken", await this.checkToken.bind(this));
        this.router.post("/api/users/logout", await this.logout.bind(this));
        this.router.post("/api/users/getData", await this.getData.bind(this));
        this.router.post("/api/files/upload", await this.uploadFile.bind(this));
        this.router.post("/api/reservations/create", await this.createReservation.bind(this));
        this.router.get("/api/reservations/getReservations", await this.getReservations.bind(this));
        this.router.get("/api/reservations/getReservationsByUserId", await this.getReservationsByUserId.bind(this));
        this.router.post("/api/reservations/create", await this.createReservation.bind(this));
    }

    private async _isAuthorized(req: Request, res: Response, next: NextFunction) {

        let session: any = await this.userDb.getSessionByToken(req.headers.authorization);
        if (session.length > 0) {
            if (this.util.JWTVerify(session[0].AuthorizationToken, null)) {
                console.log("authorized")
                next();
            } else {
                res.status(401);
                res.json({ message: "Unauthorized." });
            }
        } else {
            res.status(401);
            res.json({ message: "Unauthorized." });
        }

    }

    public async register(req: Request, res: Response, next: NextFunction) {

        let registerData = <any>req.body as Register;
        if (!registerData.Email
            && !registerData.FirstName
            && !registerData.LastName
            && !registerData.Password
        ) {
            res.status(400);
            res.json({ message: "Incomplete data" });
            return;
        }

        let resultUser: any = await this.userDb.findUserByEmail(registerData.Email);

        if (resultUser.length != 0) {
            res.status(400);
            res.json({ message: "Already exist a user with this email !" });
        } else {

            let decPassword: string = this.util.decrypt(registerData.Password);
            registerData.Password = this.util.hashPassword(decPassword);

            let results: any = await this.userDb.addUser(registerData);
            if (results) {
                res.status(200);
                res.json({
                    message: "Successfull register.",
                    Id: results.insertId
                });
            } else {
                res.status(500);
                res.json({ message: "Error trying to register user." });
            }
        }
    }

    public async login(req: Request, res: Response, next: NextFunction) {

        console.log("login()")
        let loginData = <any>req.body as Login;
        if (!loginData.Email && !loginData.Password) {
            res.status(400);
            res.json({ message: "Incomplete data" });
        }

        let resultUser: any = await this.userDb.findUserByEmail(loginData.Email);

        if (resultUser.length == 0) {
            res.status(404);
            res.json({ message: "Email not found !" });
        } else {

            let decPassword: string = this.util.decrypt(loginData.Password);

            if (this.util.verifyHash(decPassword, resultUser[0].Password)) {

                let token = this.util.JWTSign({ Id: resultUser[0].Id }, null);
                await this.userDb.registerSession(resultUser[0].Id, token);
                let userData = await this.userDb.findUserById(resultUser[0].Id);
                res.status(200);
                res.json({
                    message: "Successfull login.",
                    token: token,
                    userData: userData[0]
                });
            } else {
                res.status(401);
                res.json({ message: "Incorrect password !" });
            }
        }
    }

    public async checkToken(req: Request, res: Response, next: NextFunction) {

        console.log("checkToken()")
        let result: any = await this.userDb.findUserByToken(req.headers.authorization);
        if (result) {
            res.status(200);
            res.json({
                userData: result[0],
                message: "Token Valid."
            });
        } else {
            res.status(400);
            res.json({ message: "Token invalid" });
        }
    }

    public async logout(req: Request, res: Response, next: NextFunction) {

        console.log("logout()")
        let result: any = await this.userDb.deleteSession(req.headers.authorization);
        if (result) {
            res.status(200);
            res.json({ message: "Successful logout." });
        } else {
            res.status(400);
            res.json({ message: "Error trying to delete session." });
        }
    }

    public async getData(req: Request, res: Response, next: NextFunction) {

        console.log("getData()")
        let result: any = await this.userDb.findUserByToken(req.headers.authorization);
        if (result) {
            res.status(200);
            res.json({ data: result[0] });
        } else {
            res.status(400);
            res.json({ message: "Error trying to get data about User." });
        }
    }

    public async getParkingSpaces(req: Request, res: Response, next: NextFunction) {

        console.log("getParkingSpaces()")
        let result: any = await this.parkingDb.getParkingSpaces();
        if (result) {
            res.status(200);
            res.json({ data: result });
        } else {
            res.status(400);
            res.json({ message: "Error trying to get data about parking system." });
        }
    }

    public async uploadFile(req: Request, res: Response, next: NextFunction) {

        console.log("uploadFile()")
        let userData: any = await this.userDb.findUserByToken(req.headers.authorization);
        let form = new formidable.IncomingForm();
        form.uploadDir = "./uploaded_files"
        form.parse(req, (err, fields, files) => { });

        form.on('file', (name, file) => {
            let oldpath = file.path;
            let filename = this.util.guidGenerator() + "." + file.type.split("/")[1];
            let newpath = "./uploaded_files/" + filename;
            this.userDb.setUserPhoto(userData[0].Id, filename).then(() => {
                fs.rename(oldpath, newpath, (err) => {
                    if (err) throw err;
                    res.json({ FileName: filename });
                });
            })
        });
    }

    public async createReservation(req: Request, res: Response, next: NextFunction) {

        console.log("getParkingSpaces()")
        let userData: any = await this.userDb.findUserByToken(req.headers.authorization);
        let reservation: Reservation = new Reservation(req.body.ParkId, userData[0].Id, req.body.StartDate, req.body.EndDate);
        let result: any = await this.reservationDb.createReservation(reservation);
        res.json(result.insertId)
    }

    public async getReservations(req: Request, res: Response, next: NextFunction) {

        console.log("getReservations()")
        let results = await this.reservationDb.getReservations();
        res.json(results)
    }

    public async getReservationsByUserId(req: Request, res: Response, next: NextFunction) {

        console.log("getReservationsByUserId()")
        let userData: any = await this.userDb.findUserByToken(req.headers.authorization);
        let results = await this.reservationDb.getReservationsByUserId(userData[0].Id);
        res.json(results)
    }

    public async addStatus(req: Request, res: Response, next: NextFunction) {

        console.log("addStatus()")
        this.queue.push("status");
        for (let i = 0; i < req.body.length; i++) {
            const element = req.body[i];
            await this.parkingDb.addParkStatus(element.ParkId, element.Status);
        }
        res.json(true);
    }
}
