import { Router } from 'express';
import { inventarioController } from './inventarioController';
import { authMiddleware } from '../../middleware/authMiddleware';
import { validate } from '../../middleware/validationMiddleware';
import { createMovimientoSchema } from './inventarioValidations';

const router = Router();

router.use(authMiddleware);

router.get('/', inventarioController.getStock);
router.get('/producto/:productoId', inventarioController.getStockByProducto);
router.get('/movimientos', inventarioController.getMovements);
router.post('/movimientos', validate(createMovimientoSchema), inventarioController.registerMovement);

export default router;
