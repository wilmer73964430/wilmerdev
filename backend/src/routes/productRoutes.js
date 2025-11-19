import { Router } from 'express';
import { authenticate, authorize } from '../middleware/auth.js';
import { listProducts, createProduct, updateProduct, deleteProduct } from '../controllers/productController.js';

const router = Router();

router.get('/', listProducts);
router.post('/', authenticate, authorize(['Vendedor', 'Administrador', 'SuperAdministrador']), createProduct);
router.put('/:id', authenticate, authorize(['Vendedor', 'Administrador', 'SuperAdministrador']), updateProduct);
router.delete('/:id', authenticate, authorize(['Administrador', 'SuperAdministrador']), deleteProduct);

export default router;
