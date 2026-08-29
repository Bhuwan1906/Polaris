import { Router } from 'express';
import {
  listExpeditions,
  getExpedition,
  createExpedition,
  updateExpedition,
  deleteExpedition,
  getFeaturedExpeditions,
  getExpeditionResources,
} from '../controllers/expeditions.controller';
import { authenticate } from '../middleware/auth.middleware';
import { requireAdmin } from '../middleware/role.middleware';
import { validate } from '../middleware/validate.middleware';
import { expeditionCreateSchema, expeditionUpdateSchema } from '../shared/validation';

const router = Router();

// Public routes
router.get('/featured', getFeaturedExpeditions);
router.get('/', listExpeditions);
router.get('/:id', getExpedition);
router.get('/:id/resources', getExpeditionResources);

// Admin routes
router.post('/', authenticate, requireAdmin, validate(expeditionCreateSchema), createExpedition);
router.put('/:id', authenticate, requireAdmin, validate(expeditionUpdateSchema), updateExpedition);
router.delete('/:id', authenticate, requireAdmin, deleteExpedition);

export default router;
