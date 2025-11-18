import { Router } from 'express';
import { authenticate } from '../middleware/auth';
import { download, myOrders } from '../controllers/orderController';

const router = Router();
router.get('/me', authenticate, myOrders);
router.get('/download', authenticate, download);

export default router;
