import { Router } from 'express';
import { configController } from './configController';
import { authMiddleware, adminMiddleware } from '../../middleware/authMiddleware';
import { validate } from '../../middleware/validationMiddleware';
import { updateConfigSchema } from './configValidations';

const router = Router();

router.use(authMiddleware, adminMiddleware);

router.get('/', configController.get);
router.put('/', validate(updateConfigSchema), configController.update);

export default router;
