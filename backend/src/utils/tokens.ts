import jwt from 'jsonwebtoken';
import { env } from '../config/env';

export const signAuthToken = (payload: object) =>
  jwt.sign(payload, env.jwtSecret, { expiresIn: env.jwtExpiresIn });

export const signRefreshToken = (payload: object) =>
  jwt.sign(payload, env.refreshSecret, { expiresIn: '7d' });

export const signDownloadToken = (payload: object) =>
  jwt.sign(payload, env.downloadTokenSecret, { expiresIn: env.downloadTokenExpiration });

export const verifyDownloadToken = (token: string) =>
  jwt.verify(token, env.downloadTokenSecret);
