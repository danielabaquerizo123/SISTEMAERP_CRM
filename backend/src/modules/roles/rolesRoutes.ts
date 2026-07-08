import { Router } from 'express';
import { rolesController } from './rolesController';
import { authMiddleware, adminMiddleware } from '../../middleware/authMiddleware';
import { validate } from '../../middleware/validationMiddleware';
import { createRoleSchema, updateRoleSchema } from './rolesValidations';

const router = Router();
router.use(authMiddleware, adminMiddleware);

router.get('/', rolesController.findAll);
router.get('/:id', rolesController.findById);
router.post('/', validate(createRoleSchema), rolesController.create);
router.put('/:id', validate(updateRoleSchema), rolesController.update);
router.delete('/:id', rolesController.delete);

export default router;
