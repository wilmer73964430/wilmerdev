import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import { connectDb } from './config/db';
import { env } from './config/env';
import authRoutes from './routes/authRoutes';
import productRoutes from './routes/productRoutes';
import checkoutRoutes from './routes/checkoutRoutes';
import orderRoutes from './routes/orderRoutes';
import adminRoutes from './routes/adminRoutes';

const app = express();
app.use(helmet());
app.use(
  cors({
    origin: env.appUrl,
    credentials: true
  })
);
app.use(express.json({ verify: (req, _res, buf) => ((req as any).rawBody = buf) }));
app.use(cookieParser());

app.get('/health', (_req, res) => res.json({ ok: true, neon: true }));
app.use('/auth', authRoutes);
app.use('/products', productRoutes);
app.use('/checkout', checkoutRoutes);
app.use('/orders', orderRoutes);
app.use('/admin', adminRoutes);

connectDb()
  .then(() => {
    app.listen(env.port, () => console.log(`API futurista escuchando en ${env.port}`));
  })
  .catch((err) => {
    console.error('Error de conexión a BD', err);
    process.exit(1);
  });
