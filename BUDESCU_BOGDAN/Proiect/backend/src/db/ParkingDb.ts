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
}