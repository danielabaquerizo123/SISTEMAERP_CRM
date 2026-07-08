import { Router } from 'express';
import { productosController } from './productosController';
import { authMiddleware } from '../../middleware/authMiddleware';
import { validate } from '../../middleware/validationMiddleware';
import { createProductoSchema, updateProductoSchema } from './productosValidations';

const router = Router();

router.use(authMiddleware);

router.get('/', productosController.findAll);
router.get('/:id', productosController.findById);
router.post('/', validate(createProductoSchema), productosController.create);
router.put('/:id', validate(updateProductoSchema), productosController.update);
router.delete('/:id', productosController.delete);

export default router;
