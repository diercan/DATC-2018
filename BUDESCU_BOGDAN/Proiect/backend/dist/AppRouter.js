"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Util_1 = require("./Util");
const UserDb_1 = require("./db/UserDb");
const ParkingDb_1 = require("./db/ParkingDb");
const Queue = require("better-queue");
const { Worker, isMainThread, workerData } = require('worker_threads');
const fs = require("fs");
const formidable = require("formidable");
const ReservationsDb_1 = require("./db/ReservationsDb");
const Reservation_1 = require("./models/Reservation");
class AppRouter {
    constructor() {
        this.router = express_1.Router();
        this.db = new UserDb_1.UserDb();
        this.userDb = new UserDb_1.UserDb();
        this.parkingDb = new ParkingDb_1.ParkingDb();
        this.reservationDb = new ReservationsDb_1.ReservationsDb();
        this.util = new Util_1.Util();
        this.initWorker();
        this.initQueue();
        this.initRoutes();
    }
    initQueue() {
        this.queue = new Queue((input, cb) => {
            this.worker.postMessage({ data: input });
            cb(null);
        });
    }
    initWorker() {
        let cb = (err, result) => {
            if (err) {
                return console.error(err);
            }
            console.log("Message From Worker: ", result.val);
        };
        this.worker = new Worker(__dirname + '/MyWorker.js', { workerData: null });
        this.worker.on('message', (msg) => {
            cb(null, msg);
        });
        this.worker.on('error', cb);
        this.worker.on('exit', (code) => {
            if (code != 0)
                console.error(new Error(`Worker stopped with exit code ${code}`));
        });
    }
    initRoutes() {
        return __awaiter(this, void 0, void 0, function* () {
            this.router.post("/api/users/register", yield this.register.bind(this));
            this.router.post("/api/users/login", yield this.login.bind(this));
            this.router.get("/api/park/getParkingSpaces", yield this.getParkingSpaces.bind(this));
            this.router.use(yield this._isAuthorized.bind(this));
            this.router.post("/api/users/checkToken", yield this.checkToken.bind(this));
            this.router.post("/api/users/logout", yield this.logout.bind(this));
            this.router.post("/api/users/getData", yield this.getData.bind(this));
            this.router.post("/api/files/upload", yield this.uploadFile.bind(this));
            this.router.post("/api/reservations/create", yield this.createReservation.bind(this));
            this.router.get("/api/reservations/getReservations", yield this.getReservations.bind(this));
            this.router.get("/api/reservations/getReservationsByUserId", yield this.getReservationsByUserId.bind(this));
        });
    }
    _isAuthorized(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            let session = yield this.userDb.getSessionByToken(req.headers.authorization);
            if (session.length > 0) {
                if (this.util.JWTVerify(session[0].AuthorizationToken, null)) {
                    console.log("authorized");
                    next();
                }
                else {
                    res.status(401);
                    res.json({ message: "Unauthorized." });
                }
            }
            else {
                res.status(401);
                res.json({ message: "Unauthorized." });
            }
        });
    }
    register(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            let registerData = req.body;
            if (!registerData.Email
                && !registerData.FirstName
                && !registerData.LastName
                && !registerData.Password) {
                res.status(400);
                res.json({ message: "Incomplete data" });
                return;
            }
            let resultUser = yield this.userDb.findUserByEmail(registerData.Email);
            if (resultUser.length != 0) {
                res.status(400);
                res.json({ message: "Already exist a user with this email !" });
            }
            else {
                let decPassword = this.util.decrypt(registerData.Password);
                registerData.Password = this.util.hashPassword(decPassword);
                let results = yield this.userDb.addUser(registerData);
                if (results) {
                    res.status(200);
                    res.json({
                        message: "Successfull register.",
                        Id: results.insertId
                    });
                }
                else {
                    res.status(500);
                    res.json({ message: "Error trying to register user." });
                }
            }
        });
    }
    login(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("login()");
            let loginData = req.body;
            if (!loginData.Email && !loginData.Password) {
                res.status(400);
                res.json({ message: "Incomplete data" });
            }
            let resultUser = yield this.userDb.findUserByEmail(loginData.Email);
            if (resultUser.length == 0) {
                res.status(404);
                res.json({ message: "Email not found !" });
            }
            else {
                let decPassword = this.util.decrypt(loginData.Password);
                if (this.util.verifyHash(decPassword, resultUser[0].Password)) {
                    let token = this.util.JWTSign({ Id: resultUser[0].Id }, null);
                    yield this.userDb.registerSession(resultUser[0].Id, token);
                    let userData = yield this.userDb.findUserById(resultUser[0].Id);
                    res.status(200);
                    res.json({
                        message: "Successfull login.",
                        token: token,
                        userData: userData[0]
                    });
                }
                else {
                    res.status(401);
                    res.json({ message: "Incorrect password !" });
                }
            }
        });
    }
    checkToken(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("checkToken()");
            let result = yield this.userDb.findUserByToken(req.headers.authorization);
            if (result) {
                res.status(200);
                res.json({
                    userData: result[0],
                    message: "Token Valid."
                });
            }
            else {
                res.status(400);
                res.json({ message: "Token invalid" });
            }
        });
    }
    logout(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("logout()");
            let result = yield this.userDb.deleteSession(req.headers.authorization);
            if (result) {
                res.status(200);
                res.json({ message: "Successful logout." });
            }
            else {
                res.status(400);
                res.json({ message: "Error trying to delete session." });
            }
        });
    }
    getData(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("getData()");
            let result = yield this.userDb.findUserByToken(req.headers.authorization);
            if (result) {
                res.status(200);
                res.json({ data: result[0] });
            }
            else {
                res.status(400);
                res.json({ message: "Error trying to get data about User." });
            }
        });
    }
    getParkingSpaces(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("getParkingSpaces()");
            let result = yield this.parkingDb.getParkingSpaces();
            this.queue.push(result[0]);
            if (result) {
                res.status(200);
                res.json({ data: result });
            }
            else {
                res.status(400);
                res.json({ message: "Error trying to get data about parking system." });
            }
        });
    }
    uploadFile(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("uploadFile()");
            let userData = yield this.userDb.findUserByToken(req.headers.authorization);
            let form = new formidable.IncomingForm();
            form.uploadDir = "./uploaded_files";
            form.parse(req, (err, fields, files) => { });
            form.on('file', (name, file) => {
                let oldpath = file.path;
                let filename = this.util.guidGenerator() + "." + file.type.split("/")[1];
                let newpath = "./uploaded_files/" + filename;
                this.userDb.setUserPhoto(userData[0].Id, filename).then(() => {
                    fs.rename(oldpath, newpath, (err) => {
                        if (err)
                            throw err;
                        res.json({ FileName: filename });
                    });
                });
            });
        });
    }
    createReservation(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("getParkingSpaces()");
            let userData = yield this.userDb.findUserByToken(req.headers.authorization);
            let reservation = new Reservation_1.Reservation(req.body.ParkId, userData[0].Id, req.body.StartDate, req.body.EndDate);
            let result = yield this.reservationDb.createReservation(reservation);
            res.json(result.insertId);
        });
    }
    getReservations(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("getReservations()");
            let results = yield this.reservationDb.getReservations();
            res.json(results);
        });
    }
    getReservationsByUserId(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("getReservationsByUserId()");
            let userData = yield this.userDb.findUserByToken(req.headers.authorization);
            let results = yield this.reservationDb.getReservationsByUserId(userData[0].Id);
            res.json(results);
        });
    }
}
exports.AppRouter = AppRouter;
