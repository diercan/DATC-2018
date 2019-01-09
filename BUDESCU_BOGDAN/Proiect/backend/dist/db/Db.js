"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mysql_1 = require("mysql");
class Db {
    constructor() {
        this._connectionConfig = {
            connectionLimit: 10000,
            host: 'localhost',
            user: 'root',
            password: '',
            database: 'datc'
        };
        this.pool = mysql_1.createPool(this._connectionConfig);
    }
    getData() {
        return new Promise((resolve, reject) => {
            this.pool.getConnection((err, connection) => {
                if (err) {
                    console.log("conn err, " + err.message);
                    resolve(false);
                }
                let sql = 'select * from users';
                connection.query(sql, (error, results, fields) => {
                    connection.release();
                    if (error) {
                        console.log("mysql query err, " + error.message);
                        resolve(false);
                    }
                    resolve(results);
                });
            });
        });
    }
}
exports.Db = Db;
