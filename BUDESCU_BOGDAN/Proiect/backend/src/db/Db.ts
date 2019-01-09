import { Connection, createConnection, createPool, ConnectionConfig, MysqlError, Pool, PoolConfig, PoolConnection, Query, FieldInfo } from 'mysql';

export class Db {

    private _connectionConfig: PoolConfig = {
        connectionLimit: 10000,
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'datc'
    }
    public pool: Pool;
    constructor() {

        this.pool = createPool(this._connectionConfig);
    }

    public getData() {

        return new Promise((resolve, reject) => {
            this.pool.getConnection((err: MysqlError, connection: PoolConnection) => {
                if (err) {
                    console.log("conn err, " + err.message);
                    resolve(false);
                }
                let sql = 'select * from users';
                connection.query(sql, (error: MysqlError, results: any, fields: FieldInfo[]) => {
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

 
} 