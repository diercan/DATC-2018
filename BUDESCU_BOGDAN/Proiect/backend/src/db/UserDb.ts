import { Db } from "./Db";
import { Register } from "../models/Register";
import { MysqlError, PoolConnection, FieldInfo } from "mysql";

export class UserDb extends Db {

    constructor() {
        super();

    }

    public addUser(data: Register) {

        return new Promise((resolve, reject) => {
            this.pool.getConnection((err: MysqlError, connection: PoolConnection) => {
                if (err) {
                    console.log("conn err, " + err.message);
                    resolve(false);
                }
                let sql = "insert into Users ( FirstName, LastName, Email, Password) values (?, ?, ?, ?)";
                connection.query(sql,
                    [
                        data.FirstName,
                        data.LastName,
                        data.Email,
                        data.Password
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
        });
    }

    public findUserByEmail(Email: string) {

        return new Promise((resolve, reject) => {
            this.pool.getConnection((err: MysqlError, connection: PoolConnection) => {
                if (err) {
                    console.log("conn err, " + err.message);
                    resolve(false);
                }
                let sql = "select Id, FirstName, LastName, Email, Password from Users where Email = ?";
                connection.query(sql,
                    Email,
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

    public findUserById(Id) {

        return new Promise((resolve, reject) => {
            this.pool.getConnection((err: MysqlError, connection: PoolConnection) => {
                if (err) {
                    console.log("conn err, " + err.message);
                    resolve(false);
                }
                let sql = "select Id, FirstName, LastName, Email, Photo from Users where Id = ?";
                connection.query(sql,
                    Id,
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

    public findUserByToken(Token: string) {

        return new Promise((resolve, reject) => {
            this.pool.getConnection((err: MysqlError, connection: PoolConnection) => {
                if (err) {
                    console.log("conn err, " + err.message);
                    resolve(false);
                }
                let sql = "select Users.Id, Users.Email, Users.FirstName, Users.LastName, Users.Photo from UserSessions, Users where UserSessions.AuthorizationToken = ? and UserSessions.UserId = Users.Id";
                connection.query(sql,
                    Token,
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

    public registerSession(UserId, Token) {

        return new Promise((resolve, reject) => {
            this.pool.getConnection((err: MysqlError, connection: PoolConnection) => {
                if (err) {
                    console.log("conn err, " + err.message);
                    resolve(false);
                }
                let sql = "insert into UserSessions (UserId, AuthorizationToken) values (?, ?)";
                connection.query(sql,
                    [
                        UserId,
                        Token
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

    public getSessionByToken(Token) {

        return new Promise((resolve, reject) => {
            this.pool.getConnection((err: MysqlError, connection: PoolConnection) => {
                if (err) {
                    console.log("conn err, " + err.message);
                    resolve(false);
                }
                let sql = 'select * from UserSessions where AuthorizationToken = ?';
                connection.query(sql, [Token], (error: MysqlError, results: any, fields: FieldInfo[]) => {
                    connection.release();
                    if (error) {
                        console.log("mysql query err, " + error.message);
                        resolve(false);
                    }

                    resolve(results);
                })
            })
        });
    }

    public deleteSession(Token) {

        return new Promise((resolve, reject) => {
            this.pool.getConnection((err: MysqlError, connection: PoolConnection) => {
                if (err) {
                    console.log("conn err, " + err.message);
                    resolve(false);
                }
                let sql = 'delete from UserSessions where AuthorizationToken = ?';
                connection.query(sql, [Token], (error: MysqlError, results: any, fields: FieldInfo[]) => {
                    connection.release();
                    if (error) {
                        console.log("mysql query err, " + error.message);
                        resolve(false);
                    }

                    resolve(results);
                })
            })
        });
    }

    public setUserPhoto(UserId, FileName){

        return new Promise((resolve, reject) => {
            this.pool.getConnection((err: MysqlError, connection: PoolConnection) => {
                if (err) {
                    console.log("conn err, " + err.message);
                    resolve(false);
                }
                let sql = "update Users set Photo = ? where Id = ?";
                connection.query(sql,
                    [
                        FileName,
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