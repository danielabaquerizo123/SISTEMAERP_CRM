import { Router } from 'express';
import { clientesController } from './clientesController';
import { authMiddleware } from '../../middleware/authMiddleware';
import { validate } from '../../middleware/validationMiddleware';
import { createClienteSchema, updateClienteSchema } from './clientesValidations';

const router = Router();

router.use(authMiddleware);

router.get('/', clientesController.findAll);
router.get('/:id', clientesController.findById);
router.post('/', validate(createClienteSchema), clientesController.create);
router.put('/:id', validate(updateClienteSchema), clientesController.update);
router.delete('/:id', clientesController.delete);

export default router;
