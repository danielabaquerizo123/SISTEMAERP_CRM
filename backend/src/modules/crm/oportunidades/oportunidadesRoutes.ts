import { Router } from 'express';
import { oportunidadesController } from './oportunidadesController';
import { authMiddleware } from '../../../middleware/authMiddleware';
import { validate } from '../../../middleware/validationMiddleware';
import { createOportunidadSchema, updateOportunidadSchema } from './oportunidadesValidations';

const router = Router();

router.use(authMiddleware);

router.get('/', oportunidadesController.findAll);
router.get('/:id', oportunidadesController.findById);
router.post('/', validate(createOportunidadSchema), oportunidadesController.create);
router.put('/:id', validate(updateOportunidadSchema), oportunidadesController.update);
router.delete('/:id', oportunidadesController.delete);

export default router;
