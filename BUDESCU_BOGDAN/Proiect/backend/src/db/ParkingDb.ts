import { Db } from "./Db";
import { MysqlError, PoolConnection, FieldInfo } from "mysql";

export class ParkingDb extends Db {

    constructor() {
        super();

    }

    public getParkingSpaces() {
        return new Promise((resolve, reject) => {
            this.pool.getConnection((err: MysqlError, connection: PoolConnection) => {
                if (err) {
                    console.log("conn err, " + err.message);
                    resolve(false);
                }
                let sql = "select * from ParkingSpaces";
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

    public addParkStatus(ParkId, Status) {
        return new Promise((resolve, reject) => {
            this.pool.getConnection((err: MysqlError, connection: PoolConnection) => {
                if (err) {
                    console.log("conn err, " + err.message);
                    resolve(false);
                }
                let sql = "insert into TempParkingSpaces (ParkId, Status, ModifyDate) values (?, ?, now())";
                connection.query(sql,
                    [
                        ParkId,
                        Status
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

    public getLastTempParkStatus(ParkId) {
        return new Promise((resolve, reject) => {
            this.pool.getConnection((err: MysqlError, connection: PoolConnection) => {
                if (err) {
                    console.log("conn err, " + err.message);
                    resolve(false);
                }
                let sql = "select * from tempparkingspaces where ParkId = ? order by ModifyDate desc limit 1;";
                connection.query(sql,
                    [
                        ParkId
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

    public updateParkStatus(ParkId, Status) {
        return new Promise((resolve, reject) => {
            this.pool.getConnection((err: MysqlError, connection: PoolConnection) => {
                if (err) {
                    console.log("conn err, " + err.message);
                    resolve(false);
                }
                let sql = "update ParkingSpaces set Status = ?, ModifyDate = now() where Id = ?";
                connection.query(sql,
                    [
                        Status,
                        ParkId
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