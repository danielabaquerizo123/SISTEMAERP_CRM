import { Router } from 'express';
import { dashboardController } from './dashboardController';
import { authMiddleware } from '../../middleware/authMiddleware';

const router = Router();

router.use(authMiddleware);

router.get('/general', dashboardController.getGeneral);
router.get('/sales', dashboardController.getSales);
router.get('/inventory', dashboardController.getInventory);
router.get('/crm', dashboardController.getCRM);

export default router;
