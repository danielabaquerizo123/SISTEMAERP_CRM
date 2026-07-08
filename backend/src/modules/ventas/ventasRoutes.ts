import { Router } from 'express';
import { ventasController } from './ventasController';
import { authMiddleware } from '../../middleware/authMiddleware';
import { validate } from '../../middleware/validationMiddleware';
import { createVentaSchema } from './ventasValidations';

const router = Router();

router.use(authMiddleware);

router.get('/', ventasController.findAll);
router.get('/:id', ventasController.findById);
router.post('/', validate(createVentaSchema), ventasController.create);
router.delete('/:id', ventasController.delete);

export default router;
