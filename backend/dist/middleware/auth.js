"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorize = exports.authenticate = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const env_1 = require("../config/env");
const db_1 = require("../config/db");
const User_1 = require("../models/User");
const authenticate = async (req, res, next) => {
    try {
        const token = req.cookies?.token;
        if (!token)
            return res.status(401).json({ message: 'No autenticado' });
        const payload = jsonwebtoken_1.default.verify(token, env_1.env.jwtSecret);
        const userRepo = db_1.AppDataSource.getRepository(User_1.User);
        const user = await userRepo.findOne({ where: { id: payload.userId } });
        if (!user)
            return res.status(401).json({ message: 'Usuario no encontrado' });
        req.user = user;
        next();
    }
    catch (error) {
        return res.status(401).json({ message: 'Token inválido' });
    }
};
exports.authenticate = authenticate;
const authorize = (roles) => {
    return (req, res, next) => {
        if (!req.user)
            return res.status(401).json({ message: 'No autenticado' });
        if (!roles.includes(req.user.role))
            return res.status(403).json({ message: 'No autorizado' });
        next();
    };
};
exports.authorize = authorize;
