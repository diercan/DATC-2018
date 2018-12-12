"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Db_1 = require("./Db");
class UserDb extends Db_1.Db {
    constructor() {
        super();
    }
    addUser(data) {
        return new Promise((resolve, reject) => {
            this.pool.getConnection((err, connection) => {
                if (err) {
                    console.log("conn err, " + err.message);
                    resolve(false);
                }
                let sql = "insert into Users ( FirstName, LastName, Email, Password) values (?, ?, ?, ?)";
                connection.query(sql, [
                    data.FirstName,
                    data.LastName,
                    data.Email,
                    data.Password
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
    findUserByEmail(Email) {
        return new Promise((resolve, reject) => {
            this.pool.getConnection((err, connection) => {
                if (err) {
                    console.log("conn err, " + err.message);
                    resolve(false);
                }
                let sql = "select Id, FirstName, LastName, Email, Password from Users where Email = ?";
                connection.query(sql, Email, (error, results, fields) => {
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
    findUserById(Id) {
        return new Promise((resolve, reject) => {
            this.pool.getConnection((err, connection) => {
                if (err) {
                    console.log("conn err, " + err.message);
                    resolve(false);
                }
                let sql = "select Id, FirstName, LastName, Email from Users where Id = ?";
                connection.query(sql, Id, (error, results, fields) => {
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
    findUserByToken(Token) {
        return new Promise((resolve, reject) => {
            this.pool.getConnection((err, connection) => {
                if (err) {
                    console.log("conn err, " + err.message);
                    resolve(false);
                }
                let sql = "select Users.Id, Users.Email, Users.FirstName, Users.LastName from UserSessions, Users where UserSessions.AuthorizationToken = ? and UserSessions.UserId = Users.Id";
                connection.query(sql, Token, (error, results, fields) => {
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
    registerSession(UserId, Token) {
        return new Promise((resolve, reject) => {
            this.pool.getConnection((err, connection) => {
                if (err) {
                    console.log("conn err, " + err.message);
                    resolve(false);
                }
                let sql = "insert into UserSessions (UserId, AuthorizationToken) values (?, ?)";
                connection.query(sql, [
                    UserId,
                    Token
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
    getSessionByToken(Token) {
        return new Promise((resolve, reject) => {
            this.pool.getConnection((err, connection) => {
                if (err) {
                    console.log("conn err, " + err.message);
                    resolve(false);
                }
                let sql = 'select * from UserSessions where AuthorizationToken = ?';
                connection.query(sql, [Token], (error, results, fields) => {
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
    deleteSession(Token) {
        return new Promise((resolve, reject) => {
            this.pool.getConnection((err, connection) => {
                if (err) {
                    console.log("conn err, " + err.message);
                    resolve(false);
                }
                let sql = 'delete from UserSessions where AuthorizationToken = ?';
                connection.query(sql, [Token], (error, results, fields) => {
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
exports.UserDb = UserDb;
