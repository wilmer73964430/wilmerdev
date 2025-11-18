import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { AppDataSource } from '../config/db';
import { User } from '../models/User';
import { registerSchema, loginSchema } from '../validators/authValidators';
import { hashPassword, verifyPassword } from '../utils/password';
import { signAuthToken } from '../utils/tokens';
import { env } from '../config/env';

export const register = async (req: Request, res: Response) => {
  const parsed = registerSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ message: parsed.error.message });

  const { email, password } = parsed.data;
  const userRepo = AppDataSource.getRepository(User);
  const exists = await userRepo.findOne({ where: { email } });
  if (exists) return res.status(400).json({ message: 'El usuario ya existe' });
  const passwordHash = await hashPassword(password);
  const user = userRepo.create({ email, passwordHash, role: 'user' });
  await userRepo.save(user);
  return res.status(201).json({ message: 'Registro exitoso' });
};

export const login = async (req: Request, res: Response) => {
  const parsed = loginSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ message: parsed.error.message });
  const { email, password } = parsed.data;
  const userRepo = AppDataSource.getRepository(User);
  const user = await userRepo.findOne({ where: { email } });
  if (!user) return res.status(401).json({ message: 'Credenciales inválidas' });
  const valid = await verifyPassword(password, user.passwordHash);
  if (!valid) return res.status(401).json({ message: 'Credenciales inválidas' });
  const token = signAuthToken({ userId: user.id, role: user.role });
  res.cookie('token', token, {
    httpOnly: true,
    secure: env.cookieSecure,
    sameSite: 'lax'
  });
  return res.json({ message: 'Inicio de sesión exitoso', role: user.role });
};

export const profile = async (req: Request, res: Response) => {
  const token = req.cookies?.token;
  if (!token) return res.status(401).json({ message: 'No autenticado' });
  try {
    const payload = jwt.verify(token, env.jwtSecret) as { userId: string; role: string };
    const userRepo = AppDataSource.getRepository(User);
    const user = await userRepo.findOne({ where: { id: payload.userId } });
    if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });
    return res.json({ email: user.email, role: user.role, purchaseCount: user.purchaseCount });
  } catch (e) {
    return res.status(401).json({ message: 'Token inválido' });
  }
};
