import { Router } from 'express';
import { adminUsers, metrics, updatePurchaseSettings } from '../controllers/adminController';
import { authenticate, authorize } from '../middleware/auth';

const router = Router();
router.use(authenticate, authorize(['admin']));
router.get('/metrics', metrics);
router.get('/users', adminUsers);
router.patch('/purchase-settings', updatePurchaseSettings);

export default router;
