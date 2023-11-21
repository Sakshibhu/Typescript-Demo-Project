"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const mysql_1 = __importDefault(require("../database/mysql"));
const router = (0, express_1.Router)();
router.get('/heroes', (req, res) => {
    const query = `SELECT * FROM heroes`;
    mysql_1.default.query(query, (err, results) => {
        if (err) {
            res.status(400).json({
                ok: false,
                err,
            });
        }
        else {
            res.json({
                ok: true,
                heroes: results
            });
        }
    });
});
router.get('/heroes/:id', (req, res) => {
    const query = `SELECT * FROM heroes WHERE id=${mysql_1.default.escape(req.params.id)}`;
    mysql_1.default.query(query, (err, results) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        else {
            res.json({
                ok: true,
                hero: results[0],
            });
        }
    });
});
exports.default = router;
