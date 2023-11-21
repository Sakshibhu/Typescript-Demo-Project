"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mysql = require("mysql");
class MySQL {
    constructor() {
        this.connected = false;
        this.connection = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: 'qwerty@123',
            database: 'node_db',
        });
        this.connect();
    }
    static get instance() {
        return this._instance || (this._instance = new this());
    }
    static query(query, callback) {
        this.instance.connection.query(query, (err, results, fields) => {
            if (err) {
                callback(err);
            }
            else if (results.length === 0) {
                callback('There is no record');
            }
            else {
                callback(null, results);
            }
        });
    }
    static escape(id) {
        return this.instance.connection.escape(id);
    }
    connect() {
        this.connection.connect((err) => {
            if (err) {
                console.log(err.message);
                return;
            }
            this.connected = true;
            console.log('MySQL Connection stablished!');
        });
    }
}
exports.default = MySQL;
