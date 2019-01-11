import { Db } from "./Db";
import { MysqlError, PoolConnection, FieldInfo } from "mysql";

export class ReservationsDb extends Db {

    constructor() {
        super();

    }


    public createReservation(reservation) {
        return new Promise((resolve, reject) => {
            this.pool.getConnection((err: MysqlError, connection: PoolConnection) => {
                if (err) {
                    console.log("conn err, " + err.message);
                    resolve(false);
                }
                let sql = "insert into Reservations (ParkId, UserId, StartDate, EndDate,ModifyDate) values (?, ?, ?, ?, now());";
                connection.query(sql,
                    [
                        reservation.ParkId,
                        reservation.UserId,
                        reservation.StartDate,
                        reservation.EndDate
                    ]
                    ,
                    (error: MysqlError, results: any, fields: FieldInfo[]) => {
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
                    })
            })
        })
    }

    public getReservations() {
        return new Promise((resolve, reject) => {
            this.pool.getConnection((err: MysqlError, connection: PoolConnection) => {
                if (err) {
                    console.log("conn err, " + err.message);
                    resolve(false);
                }
                let sql = "select Reservations.*, Users.Photo, Users.FirstName from Reservations, Users where Reservations.UserId = Users.Id and EndDate > now();";
                connection.query(sql,
                    (error: MysqlError, results: any, fields: FieldInfo[]) => {
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
                    })
            })
        })
    }

    public getReservationsByUserId(UserId) {
        return new Promise((resolve, reject) => {
            this.pool.getConnection((err: MysqlError, connection: PoolConnection) => {
                if (err) {
                    console.log("conn err, " + err.message);
                    resolve(false);
                }
                let sql = "select * from Reservations where UserId = ?";
                connection.query(sql,
                    [
                        UserId
                    ],
                    (error: MysqlError, results: any, fields: FieldInfo[]) => {
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
                    })
            })
        })
    }
}