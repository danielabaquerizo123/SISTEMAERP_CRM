import { Router } from 'express';
import { reportesController } from './reportesController';
import { authMiddleware } from '../../middleware/authMiddleware';

const router = Router();

router.use(authMiddleware);

router.post('/ventas', reportesController.getVentas);
router.post('/compras', reportesController.getCompras);
router.post('/inventario', reportesController.getInventario);
router.post('/crm', reportesController.getCRM);

export default router;
