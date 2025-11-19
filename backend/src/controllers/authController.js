import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User, Role, Wallet } from '../models/index.js';

export const register = async (req, res) => {
  const { email, password, name, role } = req.body;
  const roleRecord = await Role.findOne({ where: { name: role || 'Usuario' } });
  const hashed = await bcrypt.hash(password, 10);
  const user = await User.create({ email, password: hashed, name, roleId: roleRecord?.id });
  await Wallet.create({ userId: user.id });
  res.json({ message: 'Registrado', user });
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ where: { email }, include: Role });
  if (!user) return res.status(404).json({ message: 'No encontrado' });
  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return res.status(401).json({ message: 'Credenciales inválidas' });
  const token = jwt.sign({ id: user.id, role: user.Role?.name }, process.env.JWT_SECRET || 'secret', { expiresIn: '2h' });
  res.json({ token, user });
};
