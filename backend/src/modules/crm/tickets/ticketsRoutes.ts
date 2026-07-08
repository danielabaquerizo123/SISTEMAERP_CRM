import { Router } from 'express';
import { ticketsController } from './ticketsController';
import { authMiddleware } from '../../../middleware/authMiddleware';
import { validate } from '../../../middleware/validationMiddleware';
import { createTicketSchema, updateTicketSchema } from './ticketsValidations';

const router = Router();

router.use(authMiddleware);

router.get('/', ticketsController.findAll);
router.get('/:id', ticketsController.findById);
router.post('/', validate(createTicketSchema), ticketsController.create);
router.put('/:id', validate(updateTicketSchema), ticketsController.update);
router.delete('/:id', ticketsController.delete);

export default router;
