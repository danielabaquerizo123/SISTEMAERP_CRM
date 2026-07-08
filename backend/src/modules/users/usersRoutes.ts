import { Router } from 'express';
import { usersController } from './usersController';
import { authMiddleware, adminMiddleware } from '../../middleware/authMiddleware';
import { validate } from '../../middleware/validationMiddleware';
import { createUserSchema, updateUserSchema } from './usersValidations';

const router = Router();

router.use(authMiddleware, adminMiddleware);

router.get('/', usersController.findAll);
router.get('/:id', usersController.findById);
router.put('/:id', validate(updateUserSchema), usersController.update);
router.delete('/:id', usersController.delete);

export default router;
