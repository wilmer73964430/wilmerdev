"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyDownloadToken = exports.signDownloadToken = exports.signRefreshToken = exports.signAuthToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const env_1 = require("../config/env");
const signAuthToken = (payload) => jsonwebtoken_1.default.sign(payload, env_1.env.jwtSecret, { expiresIn: env_1.env.jwtExpiresIn });
exports.signAuthToken = signAuthToken;
const signRefreshToken = (payload) => jsonwebtoken_1.default.sign(payload, env_1.env.refreshSecret, { expiresIn: '7d' });
exports.signRefreshToken = signRefreshToken;
const signDownloadToken = (payload) => jsonwebtoken_1.default.sign(payload, env_1.env.downloadTokenSecret, { expiresIn: env_1.env.downloadTokenExpiration });
exports.signDownloadToken = signDownloadToken;
const verifyDownloadToken = (token) => jsonwebtoken_1.default.verify(token, env_1.env.downloadTokenSecret);
exports.verifyDownloadToken = verifyDownloadToken;
