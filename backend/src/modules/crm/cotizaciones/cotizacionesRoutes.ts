import { Router } from 'express';
import { cotizacionesController } from './cotizacionesController';
import { authMiddleware } from '../../../middleware/authMiddleware';
import { validate } from '../../../middleware/validationMiddleware';
import { createCotizacionSchema, updateCotizacionSchema } from './cotizacionesValidations';

const router = Router();

router.use(authMiddleware);

router.get('/', cotizacionesController.findAll);
router.get('/:id', cotizacionesController.findById);
router.post('/', validate(createCotizacionSchema), cotizacionesController.create);
router.put('/:id', validate(updateCotizacionSchema), cotizacionesController.update);
router.delete('/:id', cotizacionesController.delete);

export default router;
