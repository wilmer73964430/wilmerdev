"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.profile = exports.login = exports.register = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const db_1 = require("../config/db");
const User_1 = require("../models/User");
const authValidators_1 = require("../validators/authValidators");
const password_1 = require("../utils/password");
const tokens_1 = require("../utils/tokens");
const env_1 = require("../config/env");
const register = async (req, res) => {
    const parsed = authValidators_1.registerSchema.safeParse(req.body);
    if (!parsed.success)
        return res.status(400).json({ message: parsed.error.message });
    const { email, password } = parsed.data;
    const userRepo = db_1.AppDataSource.getRepository(User_1.User);
    const exists = await userRepo.findOne({ where: { email } });
    if (exists)
        return res.status(400).json({ message: 'El usuario ya existe' });
    const passwordHash = await (0, password_1.hashPassword)(password);
    const user = userRepo.create({ email, passwordHash, role: 'user' });
    await userRepo.save(user);
    return res.status(201).json({ message: 'Registro exitoso' });
};
exports.register = register;
const login = async (req, res) => {
    const parsed = authValidators_1.loginSchema.safeParse(req.body);
    if (!parsed.success)
        return res.status(400).json({ message: parsed.error.message });
    const { email, password } = parsed.data;
    const userRepo = db_1.AppDataSource.getRepository(User_1.User);
    const user = await userRepo.findOne({ where: { email } });
    if (!user)
        return res.status(401).json({ message: 'Credenciales inválidas' });
    const valid = await (0, password_1.verifyPassword)(password, user.passwordHash);
    if (!valid)
        return res.status(401).json({ message: 'Credenciales inválidas' });
    const token = (0, tokens_1.signAuthToken)({ userId: user.id, role: user.role });
    res.cookie('token', token, {
        httpOnly: true,
        secure: env_1.env.cookieSecure,
        sameSite: 'lax'
    });
    return res.json({ message: 'Inicio de sesión exitoso', role: user.role });
};
exports.login = login;
const profile = async (req, res) => {
    const token = req.cookies?.token;
    if (!token)
        return res.status(401).json({ message: 'No autenticado' });
    try {
        const payload = jsonwebtoken_1.default.verify(token, env_1.env.jwtSecret);
        const userRepo = db_1.AppDataSource.getRepository(User_1.User);
        const user = await userRepo.findOne({ where: { id: payload.userId } });
        if (!user)
            return res.status(404).json({ message: 'Usuario no encontrado' });
        return res.json({ email: user.email, role: user.role, purchaseCount: user.purchaseCount });
    }
    catch (e) {
        return res.status(401).json({ message: 'Token inválido' });
    }
};
exports.profile = profile;
