"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Db_1 = require("./Db");
class ParkingDb extends Db_1.Db {
    constructor() {
        super();
    }
    getParkingSpaces() {
        return new Promise((resolve, reject) => {
            this.pool.getConnection((err, connection) => {
                if (err) {
                    console.log("conn err, " + err.message);
                    resolve(false);
                }
                let sql = "select * from ParkingSpaces";
                connection.query(sql, (error, results, fields) => {
                    connection.release();
                    if (error) {
                        console.log("mysql query err, ", {
                            code: error.code,
                            errno: error.code,
                            message: error.message,
                            sql: error.sql
                        });
                        resolve(false);
                    }
                    resolve(results);
                });
            });
        });
    }
    addParkStatus(ParkId, Status) {
        return new Promise((resolve, reject) => {
            this.pool.getConnection((err, connection) => {
                if (err) {
                    console.log("conn err, " + err.message);
                    resolve(false);
                }
                let sql = "insert into TempParkingSpaces (ParkId, Status, ModifyDate) values (?, ?, now())";
                connection.query(sql, [
                    ParkId,
                    Status
                ], (error, results, fields) => {
                    connection.release();
                    if (error) {
                        console.log("mysql query err, ", {
                            code: error.code,
                            errno: error.code,
                            message: error.message,
                            sql: error.sql
                        });
                        resolve(false);
                    }
                    resolve(results);
                });
            });
        });
    }
    getLastTempParkStatus(ParkId) {
        return new Promise((resolve, reject) => {
            this.pool.getConnection((err, connection) => {
                if (err) {
                    console.log("conn err, " + err.message);
                    resolve(false);
                }
                let sql = "select * from TempParkingSpaces where ParkId = ? order by ModifyDate desc limit 1;";
                connection.query(sql, [
                    ParkId
                ], (error, results, fields) => {
                    connection.release();
                    if (error) {
                        console.log("mysql query err, ", {
                            code: error.code,
                            errno: error.code,
                            message: error.message,
                            sql: error.sql
                        });
                        resolve(false);
                    }
                    resolve(results);
                });
            });
        });
    }
    updateParkStatus(ParkId, Status) {
        return new Promise((resolve, reject) => {
            this.pool.getConnection((err, connection) => {
                if (err) {
                    console.log("conn err, " + err.message);
                    resolve(false);
                }
                let sql = "update ParkingSpaces set Status = ?, ModifyDate = now() where Id = ?";
                connection.query(sql, [
                    Status,
                    ParkId
                ], (error, results, fields) => {
                    connection.release();
                    if (error) {
                        console.log("mysql query err, ", {
                            code: error.code,
                            errno: error.code,
                            message: error.message,
                            sql: error.sql
                        });
                        resolve(false);
                    }
                    resolve(results);
                });
            });
        });
    }
}
exports.ParkingDb = ParkingDb;
