"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mysql_1 = __importDefault(require("mysql"));
const body_parser_1 = __importDefault(require("body-parser"));
const app = (0, express_1.default)();
const PORT = 3000;
// MySQL connection
const connection = mysql_1.default.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'qwerty@123',
    database: 'userdb',
});
connection.connect();
app.use(body_parser_1.default.json());
// Create a new user
app.post('/users', (req, res) => {
    const { name, email } = req.body;
    const sql = 'INSERT INTO users (name, email) VALUES (?, ?)';
    connection.query(sql, [name, email], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Internal Server Error' });
        }
        else {
            res.status(201).json({ id: result.insertId, name, email });
        }
    });
});
// Get all users
app.get('/users', (req, res) => {
    const sql = 'SELECT * FROM users';
    connection.query(sql, (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Internal Server Error' });
        }
        else {
            res.status(200).json(results);
        }
    });
});
// Update a user by ID
app.put('/users/:id', (req, res) => {
    const { name, email } = req.body;
    const sql = 'UPDATE users SET name=?, email=? WHERE id=?';
    connection.query(sql, [name, email, req.params.id], (err) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Internal Server Error' });
        }
        else {
            res.status(200).json({ id: req.params.id, name, email });
        }
    });
});
// Delete a user by ID
app.delete('/users/:id', (req, res) => {
    const sql = 'DELETE FROM users WHERE id=?';
    connection.query(sql, [req.params.id], (err) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Internal Server Error' });
        }
        else {
            res.status(204).send();
        }
    });
});
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
