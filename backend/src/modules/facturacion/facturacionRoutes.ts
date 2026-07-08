import { Router } from 'express';
import { facturacionController } from './facturacionController';
import { authMiddleware } from '../../middleware/authMiddleware';
import { validate } from '../../middleware/validationMiddleware';
import { createFacturaSchema } from './facturacionValidations';

const router = Router();

router.use(authMiddleware);

router.get('/', facturacionController.findAll);
router.get('/:id', facturacionController.findById);
router.post('/', validate(createFacturaSchema), facturacionController.generate);
router.put('/:id', facturacionController.update);
router.delete('/:id', facturacionController.delete);

export default router;
