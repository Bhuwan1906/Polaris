import { Router } from 'express';
import {
  generateContent,
  listOutreach,
  getOutreach,
  updateOutreach,
  updateOutreachStatus,
  deleteOutreach,
} from '../controllers/outreach.controller';
import { authenticate } from '../middleware/auth.middleware';
import { requireAdmin } from '../middleware/role.middleware';
import { validate } from '../middleware/validate.middleware';
import { outreachGenerateSchema } from '../shared/validation';

const router = Router();

router.get('/', authenticate, requireAdmin, listOutreach);
router.get('/:id', authenticate, requireAdmin, getOutreach);
router.post('/generate', authenticate, requireAdmin, validate(outreachGenerateSchema), generateContent);
router.put('/:id', authenticate, requireAdmin, updateOutreach);
router.put('/:id/status', authenticate, requireAdmin, updateOutreachStatus);
router.delete('/:id', authenticate, requireAdmin, deleteOutreach);

export default router;
