import { Router } from 'express';
import { actividadesController } from './actividadesController';
import { authMiddleware } from '../../../middleware/authMiddleware';
import { validate } from '../../../middleware/validationMiddleware';
import { createActividadSchema, updateActividadSchema } from './actividadesValidations';

const router = Router();

router.use(authMiddleware);

router.get('/', actividadesController.findAll);
router.get('/:id', actividadesController.findById);
router.post('/', validate(createActividadSchema), actividadesController.create);
router.put('/:id', validate(updateActividadSchema), actividadesController.update);
router.delete('/:id', actividadesController.delete);

export default router;
