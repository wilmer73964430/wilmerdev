import jwt from 'jsonwebtoken';
import { User, Role } from '../models/index.js';

export const authenticate = async (req, res, next) => {
  const token = req.headers.authorization?.replace('Bearer ', '');
  if (!token) return res.status(401).json({ message: 'Token requerido' });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret');
    const user = await User.findByPk(decoded.id, { include: Role });
    if (!user) return res.status(401).json({ message: 'Usuario no encontrado' });
    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Token inválido' });
  }
};

export const authorize = (roles = []) => (req, res, next) => {
  if (!roles.length) return next();
  if (!req.user || !roles.includes(req.user.Role?.name)) {
    return res.status(403).json({ message: 'Permisos insuficientes' });
  }
  return next();
};
