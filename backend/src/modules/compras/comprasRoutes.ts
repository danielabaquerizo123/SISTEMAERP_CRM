import { Router } from 'express';
import { comprasController } from './comprasController';
import { authMiddleware } from '../../middleware/authMiddleware';
import { validate } from '../../middleware/validationMiddleware';
import { createCompraSchema } from './comprasValidations';

const router = Router();

router.use(authMiddleware);

router.get('/', comprasController.findAll);
router.get('/:id', comprasController.findById);
router.post('/', validate(createCompraSchema), comprasController.create);
router.delete('/:id', comprasController.delete);

export default router;
