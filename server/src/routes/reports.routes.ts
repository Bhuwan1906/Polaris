import { Router } from 'express';
import {
  listReports,
  getReport,
  createReport,
  updateReport,
  deleteReport,
} from '../controllers/reports.controller';
import { authenticate } from '../middleware/auth.middleware';
import { requireAdmin } from '../middleware/role.middleware';
import { validate } from '../middleware/validate.middleware';
import { reportCreateSchema } from '../shared/validation';

const router = Router();

router.get('/', listReports);
router.get('/:id', getReport);
router.post('/', authenticate, requireAdmin, validate(reportCreateSchema), createReport);
router.put('/:id', authenticate, requireAdmin, updateReport);
router.delete('/:id', authenticate, requireAdmin, deleteReport);

export default router;
