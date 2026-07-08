import { Router } from 'express';
import { categoriasController } from './categoriasController';
import { authMiddleware } from '../../middleware/authMiddleware';
import { validate } from '../../middleware/validationMiddleware';
import { createCategoriaSchema, updateCategoriaSchema } from './categoriasValidations';

const router = Router();

router.use(authMiddleware);

router.get('/', categoriasController.findAll);
router.get('/:id', categoriasController.findById);
router.post('/', validate(createCategoriaSchema), categoriasController.create);
router.put('/:id', validate(updateCategoriaSchema), categoriasController.update);
router.delete('/:id', categoriasController.delete);

export default router;
