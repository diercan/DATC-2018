"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Db_1 = require("./Db");
class ReservationsDb extends Db_1.Db {
    constructor() {
        super();
    }
    createReservation(reservation) {
        return new Promise((resolve, reject) => {
            this.pool.getConnection((err, connection) => {
                if (err) {
                    console.log("conn err, " + err.message);
                    resolve(false);
                }
                let sql = "insert into Reservations (ParkId, UserId, StartDate, EndDate) values (?, ?, ?, ?);";
                connection.query(sql, [
                    reservation.ParkId,
                    reservation.UserId,
                    reservation.StartDate,
                    reservation.EndDate
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
    getReservations() {
        return new Promise((resolve, reject) => {
            this.pool.getConnection((err, connection) => {
                if (err) {
                    console.log("conn err, " + err.message);
                    resolve(false);
                }
                let sql = "select * from Reservations";
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
    getReservationsByUserId(UserId) {
        return new Promise((resolve, reject) => {
            this.pool.getConnection((err, connection) => {
                if (err) {
                    console.log("conn err, " + err.message);
                    resolve(false);
                }
                let sql = "select * from Reservations where UserId = ?";
                connection.query(sql, [
                    UserId
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
exports.ReservationsDb = ReservationsDb;
