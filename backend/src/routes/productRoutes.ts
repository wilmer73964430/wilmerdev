import { Router } from 'express';
import { listProducts, createProduct, updateProduct } from '../controllers/productController';
import { authenticate, authorize } from '../middleware/auth';

const router = Router();

router.get('/', listProducts);
router.post('/', authenticate, authorize(['admin']), createProduct);
router.patch('/:id', authenticate, authorize(['admin']), updateProduct);

export default router;
