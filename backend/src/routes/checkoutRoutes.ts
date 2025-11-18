import { Router } from 'express';
import { checkout, webhook } from '../controllers/checkoutController';
import { authenticate } from '../middleware/auth';

const router = Router();

router.post('/', authenticate, checkout);
router.post('/webhook', webhook);

export default router;
