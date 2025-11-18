import jwt, { SignOptions } from 'jsonwebtoken';
import { env } from '../config/env';

export const signAuthToken = (payload: object) =>
  jwt.sign(payload, env.jwtSecret as any, { expiresIn: env.jwtExpiresIn } as SignOptions);

export const signRefreshToken = (payload: object) =>
  jwt.sign(payload, env.refreshSecret as any, { expiresIn: '7d' } as SignOptions);

export const signDownloadToken = (payload: object) =>
  jwt.sign(payload, env.downloadTokenSecret as any, { expiresIn: env.downloadTokenExpiration } as SignOptions);

export const verifyDownloadToken = (token: string) => jwt.verify(token, env.downloadTokenSecret as any);
