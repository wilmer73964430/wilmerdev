import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import routes from './routes/index.js';
import sequelize, { Role } from './models/index.js';

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => res.json({ status: 'API Online' }));
app.use('/api', routes);

const PORT = process.env.PORT || 4000;

const start = async () => {
  await sequelize.sync();
  const baseRoles = ['SuperAdministrador', 'Administrador', 'Vendedor', 'Usuario'];
  await Promise.all(baseRoles.map((name) => Role.findOrCreate({ where: { name }, defaults: { name } })));
  app.listen(PORT, () => console.log(`Servidor escuchando en puerto ${PORT}`));
};

start();
