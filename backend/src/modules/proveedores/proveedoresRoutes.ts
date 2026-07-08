import { Router } from 'express';
import { proveedoresController } from './proveedoresController';
import { authMiddleware } from '../../middleware/authMiddleware';
import { validate } from '../../middleware/validationMiddleware';
import { createProveedorSchema, updateProveedorSchema } from './proveedoresValidations';

const router = Router();

router.use(authMiddleware);

router.get('/', proveedoresController.findAll);
router.get('/:id', proveedoresController.findById);
router.post('/', validate(createProveedorSchema), proveedoresController.create);
router.put('/:id', validate(updateProveedorSchema), proveedoresController.update);
router.delete('/:id', proveedoresController.delete);

export default router;
